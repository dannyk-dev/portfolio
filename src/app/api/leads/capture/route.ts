import { NextResponse } from 'next/server';
import { appendLeadObject, appendLeadRow } from '@/lib/sheets';
import { leadSchema } from '@/schemas/leads';
import { sendLeadConfirmation, sendLeadNotification } from '@/lib/emails';

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const parsedSchema = leadSchema.safeParse(json);
		const { error, data: p } = parsedSchema;
		const timestamp = new Date().toISOString();

		if (error) {
			return NextResponse.json({ ok: false, error: error.message }, { status: 422 });
		}

		await appendLeadObject({
      ClientName: p.clientName,
      IsCompany: p.isCompany,
      CompanyName: p.isCompany ? p.companyName ?? "" : "",
      Industry: p.industry,
      ServiceType: p.serviceType,
      OtherService: p.serviceType === "Other" ? p.otherService ?? "" : "",
      Phone: p.phone,
      Email: p.email,
      Country: p.country,
      State: p.state,
      City: p.city,
      Message: p.message,
      TimestampISO: timestamp,
    });

    const payload = {
        clientName: p.clientName,
        isCompany: p.isCompany,
        companyName: p.companyName ?? null,
        industry: p.industry,
        serviceType: p.serviceType,
        otherService: p.otherService ?? null,
        phone: p.phone,
        email: p.email,
        country: p.country,
        city: p.city,
        state: p.state,
        message: p.message,
        submittedAtISO: timestamp,
      }

    await Promise.all([
      sendLeadConfirmation(payload),
      sendLeadNotification(payload),
    ]);

		return NextResponse.json({ ok: true }, { status: 201 });
	} catch (err: any) {
		const msg = err?.message || 'Invalid request';
		// zod error
		if (err?.issues) {
			return NextResponse.json({ ok: false, errors: err.issues }, { status: 400 });
		}

    console.log(err);
		return NextResponse.json({ ok: false, error: msg }, { status: 500 });
	}
}
