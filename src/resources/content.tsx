import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work, FAQ, Contact } from '@/types';
import { Line, Logo, Row, Text } from '@once-ui-system/core';

const person: Person = {
	firstName: 'Daniel',
	lastName: 'Kruger',
	name: 'kardan.dev',
	role: 'Fullstack Developer',
	avatar: '/images/logo.jpg',
	email: 'contact@kardan.dev',
	location: 'America/Sao_Paulo',
	languages: ['English', 'Portuguese'],
};

const newsletter: Newsletter = {
	display: true,
	title: <>Subscribe to updates from {person.name}</>,
	description: <>Engineering notes on React/Next.js, performance, testing, and building SaaS products.</>,
};

const contact: Contact = {
	title: 'Let’s build something great',
	description: 'Tell me about your product and goals. I usually reply within one business day with next steps.',
	labels: {
		clientName: 'Full name',
		companyName: 'Company (optional)',
		industry: 'Industry',
		isCompany: 'I’m contacting on behalf of a company',
		serviceType: 'What do you need?',
	},
};

const social: Social = [
	{ name: 'Email', icon: 'email', link: `mailto:${person.email}` },
	{ name: 'Instagram', icon: 'instagram', link: 'https://www.instagram.com/dk.kruger' },
	{ name: 'Github', icon: 'github', link: 'https://github.com/dannyk-dev' },
	{ name: 'LinkedIn', icon: 'linkedin', link: 'https://www.linkedin.com/in/dannyk-dev' },
];

const home: Home = {
	path: '/',
	image: '/images/og/home.jpg',
	label: 'Home',
	title: `${person.name} — Frontend Engineering Portfolio`,
	description:
		'Fullstack software developer focused on SaaS, React/Next.js, TypeScript, and performance. I ship fast, reliable, and accessible interfaces.',
	headline: <>I build fast, scalable software</>,
	featured: {
		display: true,
		title: (
			<Row gap='12' vertical='center'>
				<strong className='ml-4'>Selected Work</strong>
				<Line background='brand-alpha-strong' vert height='20' />
				<Text marginRight='4' onBackground='brand-medium'>
					Case Study
				</Text>
			</Row>
		),
		href: '/work/our-saas-products',
	},
	subline: (
		<>
			React/Next.js, TypeScript, Tailwind UI engineering, comprehensive testing, and performance optimization. I work
			independently or embed with teams to move product metrics.
		</>
	),
};

const about: About = {
	path: '/about',
	label: 'About',
	title: `About – ${person.name}`,
	description: 'How I design, build, and scale modern web apps with performance-first thinking.',
	tableOfContent: { display: true, subItems: false },
	avatar: { display: true },
	calendar: { display: true, link: 'https://cal.com/kardan' },
	intro: {
		display: true,
		title: 'How I work',
		description: (
			<>
				I partner with founders and teams to deliver measurable outcomes: faster apps, cleaner architectures, and a
				healthier codebase. I keep scope clear, automate testing, and use performance budgets to protect UX as you grow.
			</>
		),
	},
	work: {
		display: true,
		title: 'Experience',
		experiences: [
			{
				company: 'kardan.dev',
				timeframe: '2022 – Present',
				role: 'Independent Contractor and Consultant',
				achievements: [
					'Led frontend architecture for multiple SaaS products (multi-tenant, RBAC, org/teams).',
					'Improved Core Web Vitals and conversion through code-splitting, caching, and runtime audits.',
					'Built design-system driven UIs with Tailwind, strong typing with TypeScript, and full test coverage.',
				],
				images: [{ src: '/images/projects/saas-product.jpg', alt: 'SaaS product interface', width: 16, height: 9 }],
			},
			{
				company: 'CloudCRM / Pyxpay',
				timeframe: '2024 – Present',
				role: 'Fullstack software developer',
				achievements: [
					'Led and developed migrating a 7 year old legacy front-end with modern stack and increased performance optimizations by 60% and security. This included improved DX and UX, with interactive storybook documentation and typescript implementations',
					'Contributed to high level FinTech software and products. This includes multi-currency systems, multi-bank integrations, and payment gateway integrations',
				],
				images: [],
			},
			{
				company: 'CrowTech',
				timeframe: '[2023 – 2024]',
				role: 'Fullstack Software Developer',
				achievements: [
					'Handled large ecommerce platforms in paraguai for over 30 clients. This included interacting with clients, consulting and developing requested features.',
					'Implemented complex cache systems to properly filter and fetch data at a large scale of over 50K records.',
					'Contributed to developing automated backup systems to ensure data security and storage',
					'Refactored outdated front-ends made in Laravel + Blade with a cleaner UI and improved DX.',
				],
				images: [],
			},
		],
	},
	studies: {
		display: false,
		title: 'Studies',
		institutions: [
			{
				name: 'UniAmerica',
				description: 'Software engineering - foz do iguacu',
			},
		],
	},
	technical: {
		display: true,
		title: 'Skills',
		skills: [
			{
				title: 'React / Next.js',
				description: <>App architecture, server/client components, routing, data-fetching, and SSR/SSG strategies.</>,
				tags: [
					{ name: 'React', icon: 'react' },
					{ name: 'Next.js', icon: 'nextjs' },
					{ name: 'SSR' },
					{ name: 'Advanced caching' },
				],
				images: [],
			},
			{
				title: 'TypeScript',
				description: <>Type-safe APIs, complex generics, utility types, and strict configs for robust DX.</>,
				tags: [{ name: 'TypeScript', icon: 'typescript' }],
				images: [],
			},
			{
				title: 'Tailwind CSS & UI Engineering',
				description: <>Design systems, accessibility, component APIs, and responsive layouts with semantic HTML.</>,
				tags: [
					{ name: 'Tailwind', icon: 'tailwind' },
					{ name: 'Chakra UI' },
					{ name: 'Shadcn/UI' },
					{ name: 'HeroUI' },
				],
				images: [],
			},
			{
				title: 'Testing (e2e & Unit)',
				description: <>Playwright/Cypress, Jest, Testing Library, and CI setup to catch regressions early.</>,
				tags: [{ name: 'Playwright' }, { name: 'Cypress' }, { name: 'Jest' }],
				images: [],
			},
			{
				title: 'Performance Engineering',
				description: <>Profiling, code-splitting, caching, CDN strategy, and Core Web Vitals budgeting.</>,
				tags: [{ name: 'Lighthouse' }, { name: 'Web Vitals' }],
				images: [],
			},
			{
				title: 'RPC & Security Patterns',
				description: (
					<>Type-safe RPC (e.g., tRPC-style), auth, RBAC, and multi-tenant boundaries for Nextjs applications.</>
				),
				tags: [{ name: 'RPC' }, { name: 'RBAC' }, { name: 'TRPC' }],
				images: [],
			},
			{
				title: 'Python',
				description: <>Automation, data scripts, and service glue for product workflows.</>,
				tags: [{ name: 'Python' }, { name: 'Flask' }, { name: 'Pandas' }, { name: 'FastApi' }, { name: 'MatPlot' }],
				images: [],
			},
			{
				title: 'PHP / Laravel',
				description: <>APIs and services that integrate with modern React/Next.js front-ends.</>,
				tags: [{ name: 'Laravel' }, { name: 'APIs' }, { name: 'Livewire' }],
				images: [],
			},
		],
	},
};

const blog: Blog = {
	path: '/blog',
	label: 'Blog',
	title: 'Engineering Notes',
	description: `Hands-on articles from ${person.name} about building and scaling modern front-ends, testing, and performance.`,
};

const work: Work = {
	path: '/work',
	label: 'Work',
	title: `Case Studies – ${person.name}`,
	description: 'Selected projects and outcomes—performance wins, UI engineering at scale, and SaaS foundations.',
};

const gallery: Gallery = {
	path: '/gallery',
	label: 'Gallery',
	title: `Visual Showcase – ${person.name}`,
	description: 'Interfaces, components, and brand moments from recent builds.',
	images: [
		{ src: '/images/gallery/horizontal-1.jpg', alt: 'image', orientation: 'horizontal' },
		{ src: '/images/gallery/vertical-4.jpg', alt: 'image', orientation: 'vertical' },
		{ src: '/images/gallery/horizontal-3.jpg', alt: 'image', orientation: 'horizontal' },
		{ src: '/images/gallery/vertical-1.jpg', alt: 'image', orientation: 'vertical' },
	],
};

const faq: FAQ = {
	path: '/faq',
	label: 'FAQ',
	title: 'Frequently Asked Questions',
	description: 'Straight answers about collaboration, scope, and timelines.',
	questions: [
		{
			question: 'Who will I work with?',
			answer:
				'You work directly with me. For larger scopes, I bring in trusted specialists while staying your single point of contact.',
		},
		{
			question: 'How do projects start?',
			answer:
				'We begin with a short call to clarify goals and constraints. I propose a clear scope, timeline, and price so you can decide quickly.',
		},
		{
			question: 'What do you deliver?',
			answer:
				'High-quality front-ends, design-system driven UIs, and measurable performance improvements. I prioritize maintainability and DX.',
		},
		{
			question: 'Do you work with clients outside Brazil?',
			answer: 'Yes. I work remotely with async updates and scheduled check-ins across time zones.',
		},
		{
			question: 'Can you support after launch?',
			answer:
				'Yes. I offer iterative improvements, test coverage expansion, and performance reviews to keep shipping velocity high.',
		},
		{
			question: 'How do we get started?',
			answer: 'Email contact@kardan.dev or book a call. I’ll reply with a simple plan and next steps.',
		},
	],
};

export { person, social, newsletter, home, about, blog, work, gallery, faq, contact };
