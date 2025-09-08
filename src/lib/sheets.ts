import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const DEFAULT_TZ = process.env.LEADS_TIMEZONE || 'UTC';

export const HEADER = [
	'TimestampISO',
	'ClientName',
	'IsCompany',
	'CompanyName',
	'Industry',
	'ServiceType',
	'OtherService',
	'Phone',
	'Email',
	'Country',
	'State',
	'City',
	'Message',
] as const;

type RawValue = string | boolean | number | null | undefined;

function requireEnv(name: string): string {
	const v = process.env[name];
	if (!v) throw new Error(`Missing env: ${name}`);
	return v;
}

function getAuth() {
	const email = requireEnv('GOOGLE_SHEETS_CLIENT_EMAIL');
	const key = requireEnv('GOOGLE_SHEETS_PRIVATE_KEY').replace(/\\n/g, '\n');
	return new google.auth.JWT({ email, key, scopes: SCOPES });
}

function getSheetsClient(auth = getAuth()) {
	return google.sheets({ version: 'v4', auth });
}

export function dailyTabTitle(date: Date, timeZone = DEFAULT_TZ): string {
	const parts = new Intl.DateTimeFormat('en-CA', {
		timeZone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})
		.formatToParts(date)
		.reduce<Record<string, string>>((acc, p) => {
			if (p.type !== 'literal') acc[p.type] = p.value;
			return acc;
		}, {});
	const y = parts.year;
	const m = parts.month;
	const d = parts.day;
	return `leads_${y}_${m}_${d}`;
}

function colName(n: number) {
	let s = '';
	while (n > 0) {
		const m = (n - 1) % 26;
		s = String.fromCharCode(65 + m) + s;
		n = Math.floor((n - 1) / 26);
	}
	return s;
}

async function ensureTabAndHeader(
	sheets: ReturnType<typeof getSheetsClient>,
	spreadsheetId: string,
	title: string,
	header: readonly string[]
): Promise<number> {
	const meta = await sheets.spreadsheets.get({ spreadsheetId });
	const match = meta.data.sheets?.find((s) => s.properties?.title === title);
	let sheetId = match?.properties?.sheetId ?? undefined;

	if (sheetId == null) {
		const addResp = await sheets.spreadsheets.batchUpdate({
			spreadsheetId,
			requestBody: {
				requests: [{ addSheet: { properties: { title, gridProperties: { frozenRowCount: 1 } } } }],
			},
		});
		sheetId =
			addResp.data.replies?.[0]?.addSheet?.properties?.sheetId ??
			(() => {
				throw new Error('Failed to create sheet tab');
			})();

		await sheets.spreadsheets.values.update({
			spreadsheetId,
			range: `${title}!A1:${colName(header.length)}1`,
			valueInputOption: 'RAW',
			requestBody: { values: [header as string[]] },
		});

		return sheetId;
	}

	const existing = await sheets.spreadsheets.values.get({
		spreadsheetId,
		range: `${title}!1:1`,
	});
	const firstRow = (existing.data.values?.[0] ?? []).map((v) => String(v ?? ''));

	const needsHeaderRewrite =
		firstRow.length < header.length || header.some((h, i) => (firstRow[i] ?? '').toString().trim() !== h);

	if (needsHeaderRewrite) {
		await sheets.spreadsheets.values.update({
			spreadsheetId,
			range: `${title}!A1:${colName(header.length)}1`,
			valueInputOption: 'RAW',
			requestBody: { values: [header as string[]] },
		});
		await sheets.spreadsheets.batchUpdate({
			spreadsheetId,
			requestBody: {
				requests: [
					{
						updateSheetProperties: {
							properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
							fields: 'gridProperties.frozenRowCount',
						},
					},
				],
			},
		});
	}

	return sheetId!;
}

/**
 * Append a lead row to the daily tab.
 * - If TimestampISO is provided in values[0], that timestamp selects the tab (in the given time zone).
 * - Otherwise, the current time is used and injected into values[0].
 * - The header order is enforced; any missing trailing values are filled with "".
 */
export async function appendLeadRow(values: RawValue[], opts?: { timeZone?: string }) {
	const spreadsheetId = requireEnv('GOOGLE_SHEETS_SPREADSHEET_ID');
	const tz = opts?.timeZone || DEFAULT_TZ;

	// Determine timestamp for tab naming and first column
	let ts =
		typeof values[0] === 'string' && Date.parse(values[0] as string) ? new Date(values[0] as string) : new Date();

	// Ensure ISO timestamp in column 1
	const iso = ts.toISOString();
	values[0] = iso;

	const title = dailyTabTitle(ts, tz);

	const sheets = getSheetsClient();
	await ensureTabAndHeader(sheets, spreadsheetId, title, HEADER);

	// Align row to header width
	const row = HEADER.map((_h, i) => (values[i] ?? '').toString());

	// Append
	await sheets.spreadsheets.values.append({
		spreadsheetId,
		range: `${title}!A:Z`,
		valueInputOption: 'RAW',
		insertDataOption: 'INSERT_ROWS',
		requestBody: { values: [row] },
	});
}


export type LeadRecord = {
	TimestampISO?: string;
	ClientName: string;
	IsCompany: boolean;
	CompanyName?: string | null;
	Industry: string;
	ServiceType: string;
	OtherService?: string | null;
	Phone?: string;
	Email: string;
	Country?: string;
	State?: string;
	City?: string;
	Message?: string;
};

export async function appendLeadObject(lead: LeadRecord, opts?: { timeZone?: string }) {
	const ordered: RawValue[] = [
		lead.TimestampISO ?? new Date().toISOString(),
		lead.ClientName,
		!!lead.IsCompany,
		lead.IsCompany ? lead.CompanyName ?? '' : '',
		lead.Industry,
		lead.ServiceType,
		lead.ServiceType === 'Other' ? lead.OtherService ?? '' : '',
		lead.Phone ?? '',
		lead.Email,
		lead.Country ?? '',
		lead.State ?? '',
		lead.City ?? '',
		lead.Message ?? '',
	];
	await appendLeadRow(ordered, opts);
}
