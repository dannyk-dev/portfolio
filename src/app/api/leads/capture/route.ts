import { NextResponse } from 'next/server';
import { appendLeadRow } from '@/lib/sheets';
import { leadSchema } from '@/schemas/leads';

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const parsedSchema = leadSchema.safeParse(json);
		const { error, data: parsed } = parsedSchema;
		const timestamp = new Date().toISOString();

		if (error) {
			return NextResponse.json({ ok: false, error: error.message }, { status: 422 });
		}

		const row = [
			timestamp,
			parsed.clientName,
			parsed.isCompany,
			parsed.isCompany ? parsed.companyName : null,
			parsed.industry,
			parsed.serviceType,
			parsed.serviceType === 'Other' ? parsed.otherService : null,
			parsed.phone || '',
			parsed.email,
			parsed.country || '',
			parsed.state || '',
			parsed.city || '',
			parsed.message || '',
		];

		await appendLeadRow(row);

		return NextResponse.json({ ok: true }, { status: 201 });
	} catch (err: any) {
		const msg = err?.message || 'Invalid request';
		// zod error
		if (err?.issues) {
			return NextResponse.json({ ok: false, errors: err.issues }, { status: 400 });
		}
		return NextResponse.json({ ok: false, error: msg }, { status: 500 });
	}
}
