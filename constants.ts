
import { Service, PortfolioItem, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'ai-automation-architecture',
    title: 'Autonomous Workflow Architecture',
    description: 'Engineering complex multi-agent systems using CrewAI, LangChain, and n8n. We build autonomous pipelines that handle everything from data ingestion to decision-making with zero human touch.',
    category: 'Automation',
    icon: '🏗️'
  },
  {
    id: 'ai-voice-intelligence',
    title: 'Cognitive Voice Intelligence',
    description: 'Ultra-realistic outbound/inbound voice agents powered by Vapi, Bland AI, and ElevenLabs. Capable of handling live negotiations, appointment scheduling, and customer support with sub-500ms latency.',
    category: 'Communication',
    icon: '🎙️'
  },
  {
    id: 'crm-intelligence',
    title: 'Deep CRM & Sales Ops',
    description: 'Turning CRMs (Salesforce, HubSpot, HighLevel, Zoho) into autonomous sales machines. Advanced logic for lead scoring, automated multi-channel follow-ups, and prophetic revenue forecasting.',
    category: 'Sales',
    icon: '📈'
  },
  {
    id: 'ai-security-red-teaming',
    title: 'AI Red Teaming & Hardening',
    description: 'Adversarial stress-testing of LLM deployments. We protect your infrastructure against prompt injection, data leakage, and hallucinations using enterprise-grade security guardrails.',
    category: 'Security',
    icon: '🛡️'
  },
  {
    id: 'custom-rag-knowledge',
    title: 'Custom RAG & Neural Search',
    description: 'Building private enterprise brains. We index your entire company data into vector databases (Pinecone, Supabase, Weaviate) for instant, hallucination-free AI-powered retrieval.',
    category: 'Data',
    icon: '🧠'
  },
  {
    id: 'autonomous-content-engines',
    title: 'Autonomous Content ROI',
    description: 'Programmatic short-form video (HeyGen, Sora, RunwayML) and SEO engines. Generate 100+ high-quality social media assets and articles daily, fully optimized for conversion.',
    category: 'Content',
    icon: '🎬'
  },
  {
    id: 'intelligent-data-entry',
    title: 'Precision Data Scraping',
    description: 'Stop manual copy-pasting. We build bots that crawl websites and PDFs to extract clean, structured data directly into your database or spreadsheet.',
    category: 'Data',
    icon: '📊'
  },
  {
    id: 'smart-email-systems',
    title: 'Zero-Inbox Smart Systems',
    description: 'AI-powered email handling that sorts inquiries, drafts responses, and prioritizes urgent messages so you can focus on high-value work.',
    category: 'Automation',
    icon: '📧'
  },
  {
    id: 'omnichannel-ai-bots',
    title: 'Omnichannel AI Chatbots',
    description: 'Intelligent AI agents for WhatsApp, Telegram, Slack, and web support. We build conversational bots that handle leads, customer queries, and internal workflows natively on the platforms your customers use.',
    category: 'Communication',
    icon: '💬'
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Enterprise User Lifecycle Automation',
    category: 'Automation',
    description: 'Scalable user provisioning system with C# API integration and secure authentication.',
    result: '60% reduction in manual onboarding',
    tags: ['C#', 'API', 'Automation'],
    image_url: 'https://res.cloudinary.com/dygxs8rl5/image/upload/v1772591790/grok-image-4c59a8d5-a7c5-403a-b696-c3b34d69fd03_fs0cgg.jpg'
  },
  {
    id: '2',
    title: 'AI-Powered Smart Supply Chain',
    category: 'AI Integration',
    description: 'Multi-model AI integration (Gemini/Kritik) for automated document verification and logistics.',
    result: '45% increase in operational efficiency',
    tags: ['Gemini 2.0', 'Supply Chain', 'AI'],
    image_url: 'https://res.cloudinary.com/dygxs8rl5/image/upload/v1772591787/grok-image-c69ab717-9761-49e8-95b4-a2308733a1e0_mtca5w.jpg'
  },
  {
    id: '3',
    title: 'Advanced RAG Telegram Assistant',
    category: 'Conversational AI',
    description: 'Intelligent Telegram bot featuring RAG with Qdrant and real-time web search capabilities.',
    result: '90% accuracy in query resolution',
    tags: ['Telegram', 'RAG', 'Qdrant'],
    image_url: 'https://res.cloudinary.com/dygxs8rl5/image/upload/v1772591784/grok-image-90a61f7e-2244-476b-830b-07947f1e4096_ywywep.jpg'
  },
  {
    id: '4',
    title: 'Scalable Parallel Data Engine',
    category: 'Data Engineering',
    description: 'High-performance architecture for parallel data processing, sync, and validation.',
    result: '75% faster validation cycles',
    tags: ['Cloud', 'Data Engineering', 'Scale'],
    image_url: 'https://res.cloudinary.com/dygxs8rl5/image/upload/v1772591783/grok-image-a5058792-738b-4166-8e19-569874d9a40b_hgd7l0.jpg'
  },
  {
    id: '5',
    title: 'Intelligent Customer Support OS',
    category: 'AI Automation',
    description: 'AI agent orchestration platform with advanced intent mapping and context management.',
    result: '80% automated resolution rate',
    tags: ['AI Agents', 'Support', 'Automation'],
    image_url: 'https://res.cloudinary.com/dygxs8rl5/image/upload/v1772591780/grok-image-0971330b-87f4-4bc9-b0f1-1e208aa34552_strt87.jpg'
  },
  {
    id: '6',
    title: 'Voice-Powered Workflow Automation',
    category: 'Voice AI',
    description: 'Integration of speech-to-text with AI agents to trigger complex automated workflows.',
    result: '50% reduction in execution time',
    tags: ['Voice AI', 'Workflow', 'Agents'],
    image_url: 'https://res.cloudinary.com/dygxs8rl5/image/upload/v1772591779/grok-image-9bf919f1-a9fc-4595-9915-ab20039cdabe_m8swl2.jpg'
  },
  {
    id: '7',
    title: 'Omnichannel Gemini Integration',
    category: 'AI Integration',
    description: 'Real-time chat interface powered by Google Gemini for complex API requests.',
    result: '95% response latency reduction',
    tags: ['Gemini', 'API', 'Real-time'],
    image_url: 'https://res.cloudinary.com/dygxs8rl5/image/upload/v1772591776/grok-image-7e788336-d0ba-4e2d-a2da-93f2e564c22e_rspe87.jpg'
  },
  {
    id: '8',
    title: 'Automated Employee Onboarding',
    category: 'Automation',
    description: 'End-to-end automation across Google Workspace, Jira, and Slack platforms.',
    result: 'Instant cross-platform provisioning',
    tags: ['Slack', 'Jira', 'HR Tech'],
    image_url: 'https://res.cloudinary.com/dygxs8rl5/image/upload/v1772591775/grok-image-3c20bbf7-cadf-4628-948a-12b5c3e9691f_itan38.jpg'
  },
  {
    id: '9',
    title: 'Autonomous Agent Tooling',
    category: 'AI Agents',
    description: 'Deploying agents with web search and memory for complex multi-step task execution.',
    result: 'Multi-step task automation',
    tags: ['Agents', 'SerpAPI', 'Memory'],
    image_url: 'https://res.cloudinary.com/dygxs8rl5/image/upload/v1772591774/grok-image-a1b4d2e7-7acf-4f57-96a1-2d77aaea4705_aribnt.jpg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'CEO, Nexus Growth',
    content: 'Victor transformed our lead follow-up. The AI agent sounds so human our customers don\'t even realize they are talking to a bot. Incredible ROI.'
  },
  {
    id: '2',
    name: 'Mark Thompson',
    role: 'Ops Director, SolarScale',
    content: 'Verturn Technologies built a Salesforce automation that literally replaced three manual data entry roles. Highly recommend Victor for any CRM work.'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Founder, ContentPulse',
    content: 'The video automation pipeline Victor built is a game changer. We went from posting 3 times a week to 3 times a day without hiring anyone.'
  }
];

export const VIDEOS: any[] = [];

export const SERVICE_DETAILS: Record<string, { fullTitle: string; content: string; keyBenefits: string[]; image: string; imageDesc: string; cta: string }> = {
  'ai-automation-architecture': {
    fullTitle: 'Autonomous Workflow Architecture (Multi-Agent Systems)',
    content: 'We engineer high-level multi-agent systems using CrewAI and LangChain. Imagine a team of "digital employees" where one researches, one writes, one codes, and one reviews—all working together on your server 24/7.',
    keyBenefits: [
      'Multi-agent systems that solve complex problems.',
      'Zero human touch from trigger to completion.',
      'Scale operations without increasing headcount.',
      'Built with CrewAI, LangChain, and Python.'
    ],
    image: '/images/automation_architecture.png',
    imageDesc: 'A futuristic digital neural network representing multi-agent autonomous coordination.',
    cta: 'DESIGN YOUR AUTONOMOUS FLEET'
  },
  'ai-voice-intelligence': {
    fullTitle: 'Cognitive Voice Intelligence & Low-Latency Agents',
    content: 'Deploy ultra-realistic AI voice agents that sound indistinguishable from humans. Powered by Vapi and ElevenLabs, our agents handle high-stakes negotiations and booking with sub-500ms response times.',
    keyBenefits: [
      'Indistinguishable human-like voice synthesis.',
      'Ultra-low latency for natural conversation.',
      'Direct CRM and Calendar integration.',
      'Multilingual support for global reach.'
    ],
    image: '/images/voice_intelligence.png',
    imageDesc: 'Close-up of high-tech sound waves and neural interfaces symbolizing voice intelligence.',
    cta: 'BOOK A LIVE VOICE DEMO'
  },
  'crm-intelligence': {
    fullTitle: 'Deep CRM Intelligence & Revenue Operations',
    content: 'We turn stagnant CRMs (Salesforce, HubSpot, GHL) into autonomous revenue engines. Our systems perform deep lead scoring and automated multi-channel follow-ups.',
    keyBenefits: [
      'Autonomous lead nurturing and scoring.',
      'Seamless data bridging across all platforms.',
      'Prophetic revenue and pipeline forecasting.',
      'Advanced workflow logic that replaces Ops teams.'
    ],
    image: '/images/crm_intelligence.png',
    imageDesc: 'Clean dashboard visualization showing high-performance sales metrics and AI insights.',
    cta: 'EVOLVE YOUR CRM FOR GROWTH'
  },
  'ai-security-red-teaming': {
    fullTitle: 'Enterprise AI Red Teaming & Security Hardening',
    content: 'AI is a massive security surface. We act as adversarial hackers to find prompt injections and data leaks in your LLM apps before bad actors do.',
    keyBenefits: [
      'Adversarial stress-testing (Red Teaming).',
      'PII and sensitive data leakage protection.',
      'Prompt injection and jailbreak remediation.',
      'Compliance-grade security guardrails (LlamaGuard).'
    ],
    image: '/images/security_audit.png',
    imageDesc: 'A secure digital vault interface representing AI security and data protection.',
    cta: 'AUDIT YOUR AI SECURITY'
  },
  'custom-rag-knowledge': {
    fullTitle: 'Neural Search & Custom RAG Knowledge Bases',
    content: 'We build "Private Enterprise Brains" by indexing your company’s entire knowledge base into a high-speed vector database for instant, safe retrieval.',
    keyBenefits: [
      'Instant retrieval of company-wide knowledge.',
      'Hallucination-free RAG architecture.',
      'Secure, private, and air-gapped data options.',
      'Infinite memory for your business logic.'
    ],
    image: '/images/neural_search.png',
    imageDesc: 'Conceptual visualization of data nodes connecting within a custom neural search engine.',
    cta: 'BUILD YOUR PRIVATE BRAIN'
  },
  'autonomous-content-engines': {
    fullTitle: 'Autonomous Content ROI & Video Pipelines',
    content: 'Revolutionize your marketing with programmatic video production. Our pipelines turn single articles into 50+ viral shorts and SEO blogs daily.',
    keyBenefits: [
      '100x increase in content production scale.',
      'Fully automated viral video edit cycles.',
      'Multi-platform SEO and social distribution.',
      'Consistent, high-quality brand messaging.'
    ],
    image: '/images/content_engine.png',
    imageDesc: 'Dynamic collage of high-performance social media video content and digital editing.',
    cta: 'ACCELERATE YOUR CONTENT'
  },
  'intelligent-data-entry': {
    fullTitle: 'Precision Data Scraping & PDF Intelligence',
    content: 'Stop the manual grind. Our AI tools can read thousands of documents in seconds, extracting exact data directly into your database.',
    keyBenefits: [
      'Automatic extraction from docs.',
      'High-speed web scraping and cleaning.',
      'Direct sync to Google Sheets or CRM.',
      '99.9% accuracy vs human entry.'
    ],
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=1200',
    imageDesc: 'A fast-moving stream of data being filtered and organized into a structured digital grid.',
    cta: 'AUTOMATE YOUR DATA ENTRY'
  },
  'smart-email-systems': {
    fullTitle: 'Zero-Inbox Smart Systems & Email AI',
    content: 'Take back your time. Our Smart Email Systems act as a highly intelligent filter for your inbox, drafting responses and prioritizing leads.',
    keyBenefits: [
      'AI-drafted replies in your brand voice.',
      'Intelligent lead priority and flagging.',
      'Automated appointment booking from emails.',
      'Saves 10-15 hours per week on admin work.'
    ],
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=1200',
    imageDesc: 'A clean, minimalist workspace symbolizing the clarity provided by a zero-inbox system.',
    cta: 'FREE UP YOUR INBOX'
  },
  'omnichannel-ai-bots': {
    fullTitle: 'Omnichannel AI Chatbots (WhatsApp, Telegram, Slack)',
    content: 'Reach your customers where they already are. We build intelligent AI agents that live inside WhatsApp, Telegram, and Slack. These bots don\'t just chat; they qualify leads, book meetings, and sync data to your CRM in real-time.',
    keyBenefits: [
      'Native integration with WhatsApp, Telegram, and Slack.',
      '24/7 automated customer support and lead capture.',
      'Real-time CRM syncing and internal alerts.',
      'Custom persona-driven conversational design.'
    ],
    image: '/images/omnichannel_chatbot_icon.png',
    imageDesc: 'An interconnected network of chat bubbles representing WhatsApp, Telegram, and Slack integration.',
    cta: 'BUILD YOUR CHAT BOT NOW'
  }
};

export const CRMS = ['Salesforce', 'HighLevel', 'HubSpot', 'Zoho CRM', 'Pebble', 'Square'];

export const SYSTEM_INSTRUCTION = `
You are the personal AI Assistant for Victor Afe, the AI Automation Expert at Verturn Technologies.
Victor is an expert in AI automation, appointment booking bots, voice agents, red teaming, omnichannel AI chatbots (WhatsApp, Telegram, Slack), and CRM automation.
Your goal is to answer questions about Victor's services, his expertise, and help visitors understand how he can help their business.
Key services: AI Automation, Voice Agents, Omnichannel Chatbots, CRM (Salesforce/HubSpot), AI Security, Training.
Tone: Professional, high-tech, confident, yet helpful.
If a user asks to book a meeting, direct them to the "Book a Consultation" section.
`;

