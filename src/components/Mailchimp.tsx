'use client';

import { contact } from '@/resources/content';
import {
	Button,
	Heading,
	Input,
	Text,
	Background,
	Column,
	Row,
	Select,
	Textarea,
	Checkbox,
} from '@once-ui-system/core';
import type { opacity, SpacingToken } from '@once-ui-system/core';
import { useForm } from 'react-hook-form';

import { mailchimp as effects } from '@/resources';

const INDUSTRIES = [
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

const SERVICES = [
	'Landing page',
	'App development',
	'Web App (saas)',
	'misc (graphic design, branding, marketing)',
	'automation',
	'Other',
] as const;

type FormValues = {
	clientName: string;
	isCompany: boolean;
	companyName: string | null;
	industry: (typeof INDUSTRIES)[number];
	serviceType: (typeof SERVICES)[number];
	otherService: string | null;
	phone: string;
	email: string;
	country: string;
	city: string;
	state: string;
	message: string;
	honeypot?: string;
};

export const Mailchimp: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isSubmitting },
		...form
	} = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: {
			clientName: '',
			isCompany: false,
			companyName: null,
			industry: 'Technology',
			serviceType: 'Landing page',
			otherService: null,
			phone: '',
			email: '',
			country: '',
			city: '',
			state: '',
			message: '',
			honeypot: '',
		},
	});

	const isCompany = watch('isCompany');
	const serviceType = watch('serviceType');

	async function onSubmit(data: FormValues) {
		if (data.honeypot && data.honeypot.trim().length > 0) return;

		const payload = {
			clientName: data.clientName.trim(),
			isCompany: !!data.isCompany,
			companyName: data.isCompany ? (data.companyName ?? '').trim() : null,
			industry: data.industry,
			serviceType: data.serviceType,
			otherService: data.serviceType === 'Other' ? (data.otherService ?? '').trim() : null,
			phone: data.phone.trim(),
			email: data.email.trim(),
			country: data.country.trim(),
			city: data.city.trim(),
			state: data.state.trim(),
			message: data.message.trim(),
		};

		const res = await fetch('/api/leads/capture', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});

		if (!res.ok) {
			const j = await res.json().catch(() => ({}));
			throw new Error(j?.error || 'Failed to submit. Please try again.');
		}

		reset();
		alert('Thanks—your message was sent. I’ll reply within one business day.');
	}

	return (
		<Column
			overflow='hidden'
			fillWidth
			radius='l'
			padding='l'
			marginBottom='m'
			horizontal='center'
			align='center'
			background='surface'
			border='neutral-alpha-weak'
			{...flex}
		>
			<Background
				top='0'
				position='absolute'
				mask={{
					x: effects.effects.mask.x,
					y: effects.effects.mask.y,
					radius: effects.effects.mask.radius,
					cursor: effects.effects.mask.cursor,
				}}
				gradient={{
					display: effects.effects.gradient.display,
					opacity: effects.effects.gradient.opacity as opacity,
					x: effects.effects.gradient.x,
					y: effects.effects.gradient.y,
					width: effects.effects.gradient.width,
					height: effects.effects.gradient.height,
					tilt: effects.effects.gradient.tilt,
					colorStart: effects.effects.gradient.colorStart,
					colorEnd: effects.effects.gradient.colorEnd,
				}}
				dots={{
					display: effects.effects.dots.display,
					opacity: effects.effects.dots.opacity as opacity,
					size: effects.effects.dots.size as SpacingToken,
					color: effects.effects.dots.color,
				}}
				grid={{
					display: effects.effects.grid.display,
					opacity: effects.effects.grid.opacity as opacity,
					color: effects.effects.grid.color,
					width: effects.effects.grid.width,
					height: effects.effects.grid.height,
				}}
				lines={{
					display: effects.effects.lines.display,
					opacity: effects.effects.lines.opacity as opacity,
					size: effects.effects.lines.size as SpacingToken,
					thickness: effects.effects.lines.thickness,
					angle: effects.effects.lines.angle,
					color: effects.effects.lines.color,
				}}
			/>

			<Column maxWidth='xs' horizontal='center'>
				<Heading marginBottom='s' variant='display-strong-xs'>
					{contact.title}
				</Heading>
				<Text wrap='balance' marginBottom='l' variant='body-default-l' onBackground='neutral-weak'>
					{contact.description}
				</Text>
			</Column>

			<form
				style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<Row id='lead_capture_form' fillWidth direction='column' gap='12'>
					{/* Name + Email */}
					<Row gap='8' s={{ direction: 'column' }}>
						<Input
							id='mc-FULLNAME'
							label={contact.labels.clientName}
							{...register('clientName', {
								required: 'Please enter your full name.',
								minLength: { value: 2, message: 'Name must be at least 2 characters.' },
								maxLength: { value: 120, message: 'Name is too long.' },
							})}
							errorMessage={errors.clientName?.message}
						/>
						<Input
							id='mc_EMAIL'
							type='email'
							label='Email'
							{...register('email', {
								required: 'Please enter a valid email.',
								pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email.' },
								maxLength: { value: 254, message: 'Email is too long.' },
							})}
							errorMessage={errors.email?.message}
						/>
					</Row>

					<Input
						id='mc_Phone'
						placeholder='Phone'
						inputMode='tel'
						{...register('phone', { maxLength: { value: 60, message: 'Phone is too long.' } })}
						errorMessage={errors.phone?.message}
					/>

					<Row align='center' gap='8' marginTop='4'>
						<Checkbox
							id='mc_ISCOMPANY'
							isChecked={form.getValues().isCompany}
							onToggle={() => form.setValue('isCompany', !form.getValues().isCompany)}
							label='I’m contacting on behalf of a company'
						/>
					</Row>

					{isCompany && (
						<Input
							id='mc_CompanyName'
							placeholder='Company name*'
							{...register('companyName', {
								required: 'Company name required.',
								minLength: { value: 2, message: 'Company name is too short.' },
								maxLength: { value: 160, message: 'Company name is too long.' },
							})}
							errorMessage={errors.companyName?.message || undefined}
						/>
					)}

					{/* Industry + Service type */}
					<Row gap='8' s={{ direction: 'column' }} fillWidth>
						<Row direction='column' fillWidth>
							<Select
								id='mc_INDUSTRY'
								value={form.getValues().industry}
								onSelect={(country) => form.setValue('industry', country)}
								label={contact.labels.industry}
								options={INDUSTRIES.map((item) => ({ label: item, value: item }))}
								prefix='chevronDwn'
                searchable
							/>
							{errors.industry && (
								<Text onBackground='neutral-strong' variant='body-default-s'>
									Please select your industry.
								</Text>
							)}
						</Row>

						<Row direction='column' fillWidth>
							<Select
								value={form.getValues().serviceType}
								searchable
								onSelect={(country) => form.setValue('serviceType', country)}
								id='mc_SERVICE'
								label={contact.labels.serviceType}
								options={SERVICES.map((item) => ({ label: item, value: item }))}
								prefix='chevronDwn'
							/>
							{errors.serviceType && (
								<Text onBackground='neutral-strong' variant='body-default-s'>
									Please select a service.
								</Text>
							)}
						</Row>
					</Row>

					{serviceType === 'Other' && (
						<Input
							id='mc_SERVICE'
							placeholder='Describe the service*'
							{...register('otherService', {
								required: 'Please describe the service.',
								minLength: { value: 3, message: 'Please add a few more details.' },
								maxLength: { value: 240, message: 'Please shorten to 240 characters.' },
							})}
							errorMessage={errors.otherService?.message}
						/>
					)}

					{/* Location */}
					<Row gap='8' s={{ direction: 'column' }}>
						<Input
							id='mc_COUNTRY'
							placeholder='Country'
							{...register('country', { maxLength: { value: 80, message: 'Too long.' } })}
							errorMessage={errors.country?.message}
						/>
						<Input
							id='mc_STATE'
							placeholder='State/Province'
							{...register('state', { maxLength: { value: 80, message: 'Too long.' } })}
							errorMessage={errors.state?.message}
						/>
						<Input
							id='mc_CITY'
							placeholder='City'
							{...register('city', { maxLength: { value: 80, message: 'Too long.' } })}
							errorMessage={errors.city?.message}
						/>
					</Row>

					<div className='grid gap-2'>
						<Textarea
							id='mc_MESSAGE'
							lines={5}
							placeholder='Tell me about your project, timeline, and goals.'
							{...register('message', { maxLength: { value: 2000, message: 'Please shorten your message.' } })}
						/>
						{errors.message && (
							<Text onBackground='neutral-strong' variant='body-default-s'>
								{errors.message.message}
							</Text>
						)}
					</div>

					<div style={{ display: 'none' }}>
						<input tabIndex={-1} autoComplete='off' {...register('honeypot')} />
					</div>

					<Row height='48' vertical='center'>
						<Button size='m' suffixIcon='send' fillWidth type='submit' disabled={isSubmitting}>
							{isSubmitting ? 'Sending...' : 'Send'}
						</Button>
					</Row>
				</Row>
			</form>
		</Column>
	);
};
