import z from 'zod';

const ServiceTypes = [
	'Landing page',
	'App development',
	'Web App (saas)',
	'misc (graphic design, branding, marketing)',
	'automation',
	'Other',
] as const;

const Industries = [
	'Technology',
	'E-commerce',
	'Healthcare',
	'Finance',
	'Education',
	'Hospitality',
	'Real Estate',
	'Manufacturing',
	'Other',
] as const;

export const leadSchema = z
	.object({
		clientName: z.string().min(2).max(120),
		isCompany: z.boolean(),
		companyName: z
			.string()
			.max(160)
			.nullable()
			.transform((v) => v ?? null),
		industry: z.enum(Industries),
		serviceType: z.enum(ServiceTypes),
		otherService: z
			.string()
			.max(240)
			.nullable()
			.transform((v) => v ?? null),
		phone: z.string().max(60).optional().default(''),
		email: z.string().email(),
		country: z.string().max(80).optional().default(''),
		city: z.string().max(80).optional().default(''),
		state: z.string().max(80).optional().default(''),
		message: z.string().max(2000).optional().default(''),
	})
	.superRefine((data, ctx) => {
		if (data.isCompany && (!data.companyName || data.companyName.trim().length < 2)) {
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Company name required', path: ['companyName'] });
		}
		if (data.serviceType === 'Other' && (!data.otherService || data.otherService.trim().length < 3)) {
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Describe the other service', path: ['otherService'] });
		}
	});

export type TLeadSchema = z.infer<typeof leadSchema>;
