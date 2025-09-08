import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work, FAQ, Contact } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Kardan",
  lastName: "Dev",
  name: "kardan.dev",
  role: "Software Development Studio",
  avatar: "/images/logo.jpg",
  email: "contact@kardan.dev",
  location: "America/Sao_Paulo",
  languages: ["English", "Portuguese"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.name}'s Newsletter</>,
  description: <>Actionable insights on SaaS, modern software, and digital strategy.</>,
};

const contact: Contact = {
  title: "Let's get in touch!",
  description: "Fill the in the form below, and we'll get back to you as soon as possible.",
  labels: {
    clientName: "Full name",
    companyName: "Your Company Name",
    industry: "What industry do you operate in?",
    isCompany: "Are you a company?",
    serviceType: "What type of service do you require?"
  }
}

const social: Social = [
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "dannyk-dev",
  },
  {
    name: "Facebook",
    icon: "facebook",
    link: "facebook",
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} – Software Studio`,
  description:
    "kardan.dev is a Brazil-based software studio specializing in SaaS, websites, and ecommerce solutions. Operated by a solo developer with an on-demand team, we deliver scalable digital products tailored to each client.",
  headline: <>We build SaaS, websites, and ecommerce platforms that scale</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">kardan.dev</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured Project
        </Text>
      </Row>
    ),
    href: "/work/our-saas-products",
  },
  subline: (
    <>
      <strong>kardan.dev</strong> is a Brazil-based software studio run by a solo developer with an
      on-demand team. Projects are executed lean and efficiently, scaling resources only when needed
      — delivering high-quality software without unnecessary overhead.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Discover how ${person.name} builds SaaS products and digital solutions with a scalable, on-demand team structure.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/kardan",
  },
  intro: {
    display: true,
    title: "Who We Are",
    description: (
      <>
        <strong>kardan.dev</strong> is a software development studio based in Brazil. Founded and
        operated by a solo developer, the studio specializes in SaaS, web applications, and
        ecommerce platforms. The delivery model is intentionally lean: once a project scope is
        defined, I assess the required resources. Smaller projects are executed solo, while larger
        initiatives are supported by a curated network of outsourced professionals. This flexible
        structure provides the efficiency of a boutique studio with the capability of a full-scale
        team.
      </>
    ),
  },
  work: {
    display: true,
    title: "Core Expertise",
    experiences: [
      {
        company: "kardan.dev",
        timeframe: "2022 – Present",
        role: "Software Development Studio",
        achievements: [
          "Built and maintained proprietary SaaS products serving diverse industries.",
          "Delivered websites, ecommerce platforms, and SaaS applications for startups and established businesses.",
          "Scaled delivery capacity through an on-demand network of developers, designers, and consultants.",
        ],
        images: [
          {
            src: "/images/projects/saas-product.jpg",
            alt: "Our SaaS Product",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: false,
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: true,
    title: "Services",
    skills: [
      {
        title: "Websites",
        description: (
          <>
            High-performance landing pages and corporate websites, optimized for speed and
            conversion.
          </>
        ),
        tags: [
          { name: "Next.js", icon: "nextjs" },
          { name: "Vercel", icon: "vercel" },
        ],
        images: [],
      },
      {
        title: "Ecommerce Platforms",
        description: (
          <>
            Custom ecommerce websites with secure payment integrations, logistics, and analytics
            support.
          </>
        ),
        tags: [
          { name: "Shopify", icon: "shopify" },
          { name: "Stripe", icon: "stripe" },
        ],
        images: [],
      },
      {
        title: "SaaS Applications",
        description: (
          <>Design and development of SaaS products — from MVPs to production-scale platforms.</>
        ),
        tags: [
          { name: "Supabase", icon: "supabase" },
          { name: "React", icon: "react" },
        ],
        images: [],
      },
      {
        title: "Extended Services",
        description: (
          <>
            Through strategic partners, we offer{" "}
            <strong>branding, graphic design, social media management, and consulting</strong> to
            complement software delivery.
          </>
        ),
        tags: [{ name: "Branding" }, { name: "Consulting" }, { name: "Marketing" }],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Insights on SaaS and Software Development",
  description: `Practical insights from ${person.name} on building SaaS, scaling software, and digital business strategy.`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Case Studies – ${person.name}`,
  description: `Selected SaaS products and client projects delivered by ${person.name}.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Visual Showcase – ${person.name}`,
  description:
    "A collection of visuals from our SaaS products, client work, and design explorations.",
  images: [
    { src: "/images/gallery/horizontal-1.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-4.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/horizontal-3.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-1.jpg", alt: "image", orientation: "vertical" },
  ],
};

const faq: FAQ = {
  path: "/faq",
  label: "FAQ",
  title: `Frequently Asked Questions – ${person.name}`,
  description: `Answers to common questions about working with ${person.name}.`,
  questions: [
    {
      question: "Who operates kardan.dev?",
      answer:
        "kardan.dev is operated by a solo developer based in Brazil. Depending on project requirements, the studio scales by assembling an outsourced team of developers, designers, and consultants.",
    },
    {
      question: "How do you adapt to different project sizes?",
      answer:
        "Every engagement starts with a detailed scope. Small and medium projects are typically handled directly by the founder. For larger initiatives, an on-demand team is formed to match the required expertise and capacity.",
    },
    {
      question: "What services do you provide?",
      answer:
        "Our core services include SaaS development, custom websites, and ecommerce platforms. Extended services — such as branding, design, social media, and consulting — are delivered through trusted partners.",
    },
    {
      question: "Do you only work with Brazilian clients?",
      answer:
        "No. While based in Brazil, kardan.dev collaborates with clients worldwide. All projects are managed remotely with clear communication and delivery processes.",
    },
    {
      question: "Can you handle both MVPs and long-term projects?",
      answer:
        "Yes. We work with startups needing rapid MVPs as well as established companies requiring scalable, long-term software solutions.",
    },
    {
      question: "How can I get started?",
      answer:
        "You can reach out directly at contact@kardan.dev or schedule a call through our calendar. After discussing your goals, we’ll propose a solution and determine the appropriate delivery setup.",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery, faq, contact };
