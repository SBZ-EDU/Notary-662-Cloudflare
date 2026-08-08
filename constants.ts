export interface ReportTypeOption {
  value: string;
  label: string;
}

export const REPORT_TYPES: ReportTypeOption[] = [
  { value: 'petition', label: 'دادخواست' },
  { value: 'complaint', label: 'شکواییه' },
  { value: 'contract', label: 'قرارداد' },
  { value: 'legal_letter', label: 'اظهارنامه' },
  { value: 'defense_brief', label: 'لایحه دفاعیه' },
  { value: 'legal_research', label: 'تحقیق حقوقی' },
  { value: 'legal_training', label: 'آموزش حقوقی' },
  { value: 'power_of_attorney', label: 'وکالت‌نامه' },
  { value: 'title_deed', label: 'سند مالکیت' },
  { value: 'will', label: 'وصیت‌نامه' },
  { value: 'lease_agreement', label: 'اجاره‌نامه' },
  { value: 'commitment_letter', label: 'تعهدنامه' },
  { value: 'settlement_deed', label: 'صلح‌نامه' },
  { value: 'affidavit', label: 'اقرارنامه' },
];

// --- TRANSLATIONS ---

export const en = {
    langCode: 'en',
    header: {
        home: 'Home',
        aiAssistant: 'AI Drafter',
        lawyerFinder: 'Lawyer Directory',
        notaryFinder: 'Notary Finder',
        newsSummarizer: 'News Summary',
        caseStrategist: 'Project Planner',
        webAnalyzer: 'Web Analyzer',
        documentAnalyzer: 'Document Analyzer',
        legalTraining: 'Legal Training',
        services: 'Services',
        about: 'About Us',
        contact: 'Contact Us',
        createCheckpoint: 'Create Checkpoint',
        createCheckpointTitle: 'Save current state',
        checkpoints: 'Checkpoints',
        projectHistory: 'Project History',
        restore: 'Restore',
        delete: 'Delete',
        noCheckpoints: 'No checkpoints created yet.'
    },
    hero: {
        title: "Still have an unanswered question?",
        subtitle: "Contact us, our colleagues are here to answer you.",
        button1: "Start with Assistant",
        button2: "Contact Us",
    },
    home: {
        servicesTitle: "Our Smart Services",
        aboutTitle: "About Notary Office 662 Tehran",
        aboutText: "Notary Office 662 in Tehran, under the management of Ms. Leila Farrokhzad, an experienced and veteran notary public, is ready to provide all registration services with a specialized and committed team. Accuracy, speed, and customer satisfaction are the main principles of this office.",
        whyAITitle: "Why Use Our AI Assistant?",
        whyAISubtitle: "Leverage cutting-edge technology to enhance your legal work.",
        whyAIFeatures: [
            { title: "Speed and Accuracy", description: "Instantly analyze documents and generate drafts with high precision." },
            { title: "Strategic Planning", description: "Break down complex goals into actionable, step-by-step plans." },
            { title: "Cost Efficiency", description: "Reduce time spent on research and drafting, optimizing your resources." },
            { title: "Up-to-Date Information", description: "Access the latest news and information with AI-powered web analysis." }
        ],
        guidesTitle: "Featured Guides & Tools",
        guidesSubtitle: "Explore practical applications of our AI tools to solve real-world challenges.",
        guides: [
            { title: "Mastering Personal Branding for Lawyers", description: "Develop a step-by-step plan to build your professional brand and attract more clients.", link: "case_strategist" },
            { title: "The Art of Writing a Compelling Petition", description: "Use our AI Drafter to create a perfect petition for your case, starting with an example.", link: "legal_drafter" },
            { title: "Analyzing Competitor Marketing", description: "Use the Web Analyzer to understand the online strategies of other law firms in your field.", link: "web_analyzer" },
            { title: "Understanding New Contract Laws", description: "Get a summary of the latest legal articles and news related to contract regulations.", link: "news_summarizer" }
        ],
    },
    footer: {
        aboutTitle: "About Us",
        description: "Notary Office 662 Tehran provides all notarial and legal services with precision and commitment, utilizing modern technologies to ensure client satisfaction.",
        contactTitle: "Contact Information",
        address: "Unit 1, No. 67, Jordan St., Jahan Kodak Intersection, Tehran",
        phone1: "021-48195217",
        phone2: "09196625662",
        quickLinksTitle: "Quick Access",
        quickLinks: [
            { text: "Home", link: "#" },
            { text: "AI Assistant", link: "#assistant" },
            { text: "Lawyer Directory", link: "#lawyer-finder" },
            { text: "Privacy Policy", link: "#" },
        ],
        copyright: "Notary Office 662 Tehran - All rights reserved.",
        poweredBy: "Powered by Google Gemini",
    },
    aiHero: {
        title: 'Your AI Legal Co-Pilot',
        subtitle: 'From legal research to drafting winning arguments, let AI accelerate your success.'
    },
    generatorForm: {
        title: 'Generate a New Legal Document',
        docType: 'Document Type',
        topic: 'Subject / Case Title',
        topicPlaceholder: 'e.g., Claim for unpaid dues, Divorce petition',
        description: 'Key Facts & Information',
        descriptionPlaceholder: 'Enter all relevant details, dates, names, and key events for your case...',
        buttonText: 'Generate Document',
        validationError: 'Please fill in both the subject and description fields.',
        useExample: 'Use an example',
    },
    reportTypes: {
        petition: 'Petition',
        complaint: 'Complaint',
        contract: 'Contract',
        legal_letter: 'Legal Letter',
        defense_brief: 'Defense Brief',
        legal_research: 'Legal Research',
        legal_training: 'Legal Training',
        power_of_attorney: 'Power of Attorney',
        title_deed: 'Title Deed',
        will: 'Will',
        lease_agreement: 'Lease Agreement',
        commitment_letter: 'Commitment Letter',
        settlement_deed: 'Settlement Deed',
        affidavit: 'Affidavit',
    },
    reportExamples: {
        petition: {
            topic: 'Claim for Unpaid Check',
            description: 'I received a check (No. 12345, dated 2024/04/04) from Mr. [Debtor\'s Name] for the amount of 50,000,000 IRR. The check bounced due to insufficient funds. A certificate of non-payment has been obtained from [Bank Name], [Branch Name]. Despite repeated requests, he has refused to pay.'
        },
        complaint: {
            topic: 'Fraud and Sale of Another\'s Property',
            description: 'Mr. [Accused\'s Name] sold me an apartment at [Property Address], which belonged to someone else, using forged documents. I paid 200,000,000 Toman as a down payment. Upon visiting the property, I discovered the real owner is someone else, and the accused has absconded.'
        },
        contract: {
            topic: 'Residential Lease Agreement',
            description: 'This is a one-year lease agreement for a two-bedroom apartment located at [Apartment Address]. The monthly rent is 10,000,000 IRR, with a security deposit of 50,000,000 IRR. The lease begins on 2024/06/01. Utilities are not included.'
        },
        legal_letter: {
            topic: 'Final Demand for Payment of Debt',
            description: 'This is a final notice regarding the outstanding debt of 25,000,000 IRR based on invoice #INV-2023-08-15. Payment is due within 72 hours of receiving this letter. Failure to pay will result in legal action without further notice.'
        },
        defense_brief: {
            topic: 'Defense Against Breach of Contract Claim',
            description: 'The plaintiff claims a breach of contract regarding the delivery of goods. However, the delay was caused by a force majeure event (unforeseen import restrictions) as stipulated in Article 9 of our contract. We have evidence that we notified the plaintiff of the delay in a timely manner.'
        },
        legal_research: {
            topic: 'Legal Basis for Intellectual Property in Software',
            description: 'What are the primary laws and regulations in Iran that protect the intellectual property rights of software developers? Please include information on copyright, patents, and trade secrets as they apply to software code and applications.'
        }
    },
    reportDisplay: {
        title: 'Generated Document',
        export: 'Export',
        copy: 'Copy Text',
        downloadMD: 'Download (.md)',
        downloadDOCX: 'Download (.docx)',
        downloadHTML: 'Download (.html)',
        printPDF: 'Print / Save as PDF',
        generating: 'Generating...',
        placeholder1: 'Your generated document will appear here.',
        placeholder2: 'Fill out the form and click "Generate".',
        docTitle: 'Generated Document',
        headerTitle: "Notary Office 662 Legal Services",
        headerDate: "Date",
        headerCaseNo: "Case No.",
        caseNoPlaceholder: "[Placeholder]",
    },
    documentViewer: {
        title: 'Document Preview',
        sendToNotary: 'Send to Notary via WhatsApp',
        print: 'Print',
        exportPdf: 'Export PDF',
        copy: 'Copy Text',
        close: 'Close',
        versionHistory: 'Version History',
        version: 'Version',
        previousVersion: 'Previous',
        nextVersion: 'Next',
        headerTitle: "Notary Office 662 Legal Services",
        headerDate: "Date",
        headerCaseNo: "Case No.",
    },
    lawyerFinder: {
        title: 'AI Lawyer Finder',
        subtitle: 'Describe your legal issue or desired specialty to find relevant lawyers.',
        keywordsLabel: 'Describe Your Legal Need (e.g., "divorce lawyer in Tehran")',
        keywordsPlaceholder: 'e.g., corporate law, criminal defense, family court...',
        maxResults: 'Maximum Results',
        findButton: 'Find Lawyers',
        finding: 'Finding lawyers...',
        validationError: 'Please describe your legal need to start the search.',
        loadingTitle: 'Searching for Lawyers...',
        loadingSubtitle: 'Our AI is scanning the web for the best matches. This may take a moment.',
        resultsTitle: 'Found Lawyers',
        relevance: 'Relevance',
        specialty: 'Specialty',
        contact: 'Contact Info',
        address: 'Address',
        save: 'Save to Contacts',
        saved: 'Saved',
        sortBy: 'Sort by',
        sort: {
            relevance: 'Relevance',
            city: 'City',
            experience_desc: 'Experience (High to Low)',
            city_specialty: 'City, then Specialty'
        },
        savedTitle: 'Saved Lawyers',
        clearAll: 'Clear All',
        remove: 'Remove',
        notesLabel: 'My Notes',
        notesPlaceholder: 'Add your notes and strategy here...',
        parseErrorTitle: 'Could not structure all results',
        parseErrorSubtitle: 'The AI returned some information, but it could not be formatted into a table automatically. The raw text is displayed below.',
        crateTitle: 'Lawyer Directory',
        crateSubtitle: 'All lawyers discovered by the AI are stored here.',
        clearCrate: 'Clear Directory',
        crateEmpty: 'Perform a search to discover lawyers. They will be saved here permanently.',
        semanticSearchBadge: 'Powered by Semantic Search: The AI understands the meaning behind your query to find better results.',
        filterByCity: 'Filter by City',
        filterBySpecialty: 'Filter by Specialty',
        filterByExperience: 'Min Years of Experience',
        noFilterResults: 'No lawyers match your current filters.',
        prompt: `You are an expert AI legal assistant specializing in finding lawyers in Iran. Your primary goal is to understand the user's legal situation semantically and find the most suitable lawyers using your Google Search tool.

Instead of simple keyword matching, analyze the user's query: "{queries}" for its underlying legal intent and context. For example, if the user says "my business partner stole from me", you should look for lawyers specializing in corporate disputes, fraud, or commercial litigation.

Find the {maxResults} lawyers whose expertise and experience best match this intent.

Your entire response MUST be a markdown table. Do NOT include any introductory text, summary, or explanations before or after the table.

The table MUST have the following columns precisely:
- Name
- Specialty
- City
- Address
- Contact Info
- Website (A direct markdown link to the lawyer's main page or firm website)
- Years of Experience (A number representing their years of professional experience)
- Relevance Score (a percentage from 0% to 100% indicating how well the lawyer matches the user's *semantic intent*)
`,
        example: {
            keywords: 'I need a lawyer specializing in intellectual property for a software startup in Tehran.'
        },
        sendDraft: 'Send Draft via WhatsApp',
        sendDraftTooltip: 'Send the active draft from the AI Drafter to this lawyer.',
        noDraftToSend: 'Create a draft in the AI Drafter first to enable sending.',
    },
     notaryFinder: {
        title: 'Notary Public Finder',
        subtitle: 'Describe the service you need and the desired city to find official Notary Public offices.',
        keywordsLabel: 'Describe your need (e.g., "notary for car deed of sale in Isfahan")',
        keywordsPlaceholder: 'e.g., power of attorney, signature certification, real estate deed...',
        findButton: 'Find Notaries',
        finding: 'Finding offices...',
        validationError: 'Please describe your need to start the search.',
        resultsTitle: 'Found Notary Offices',
        office: 'Office Name/Number',
        contact: 'Contact Info',
        address: 'Address',
        services: 'Services',
        sortBy: 'Sort by',
        sort: {
            officeName: 'Office Name',
            city: 'City',
        },
        filterByCity: 'Filter by City',
        filterByOfficeName: 'Filter by Office Name',
        filterByService: 'Filter by Service',
        noFilterResults: 'No offices match your current filters.',
        parseErrorTitle: 'Could not structure all results',
        parseErrorSubtitle: 'The AI returned some information, but it could not be formatted into a table automatically. The raw text is displayed below.',
        semanticSearchBadge: 'Powered by Semantic Search: The AI understands the meaning behind your query to find better results.',
        prompt: `You are an expert AI assistant specializing in finding Notary Public offices ("محضر اسناد رسمی") in Iran. Analyze the user's query: "{queries}" to identify the required service and location. Find the most relevant notary offices using your Google Search tool.

Your entire response MUST be a markdown table. Do NOT include any introductory text, summary, or explanations before or after the table.

The table MUST have the following columns precisely:
- Office Name
- City
- Address
- Contact Info
- Website (A direct markdown link to the office's website, if available)
- Services Offered (A comma-separated list of common services like 'property deeds', 'power of attorney', 'signature certification')
`,
        example: {
            keywords: 'I need to create a legally binding power of attorney for my elderly father in Shiraz.'
        },
        sendDraft: 'Send Draft via WhatsApp',
        sendDraftTooltip: 'Send the active draft from the AI Drafter to this notary.',
        noDraftToSend: 'Create a draft in the AI Drafter first to enable sending.',
    },
    newsSummarizer: {
        title: 'AI News Briefing',
        subtitle: 'Get a quick summary of the latest news on any topic, with sources.',
        queryLabel: 'What news would you like to summarize?',
        queryPlaceholder: 'e.g., latest technology laws in Iran...',
        buttonText: 'Summarize News',
        summarizing: 'Summarizing...',
        resultsTitle: 'News Summary',
        sourcesTitle: 'Sources',
        noSources: 'No sources were found for this summary.',
        validationError: 'Please enter a topic to summarize.',
        prompt: `As an expert news analyst, provide a concise summary of the latest news regarding "{query}" in Iran. Base your summary solely on the provided search results. The summary should be in English. Structure your response clearly using markdown.`,
        example: {
            query: 'What are the latest developments in Iran\'s automotive industry?'
        }
    },
    webAnalyzer: {
        title: 'AI Web Page Analyzer',
        subtitle: 'Provide a URL and a question to analyze its content.',
        urlLabel: 'Web Page URL to Analyze',
        urlPlaceholder: 'https://example.com/article',
        queryLabel: 'What do you want to know about this page?',
        queryPlaceholder: 'e.g., Summarize the main points, extract all mentioned names, what are the key arguments...',
        buttonText: 'Analyze Page',
        analyzing: 'Analyzing...',
        resultsTitle: 'Analysis Result',
        validationError: 'Please provide both a URL and a question.',
        prompt: `You are an expert web page analyst. Your task is to analyze the content of a specific URL and answer a user's question based *only* on that content. Do not use general knowledge or information from other websites.

The URL to analyze is: {url}

The user's question is: "{query}"

Analyze the content at the given URL and provide a detailed, well-structured answer in markdown format. If the URL is inaccessible or doesn't contain the answer, state that clearly.`,
        example: {
            url: 'https://www.irna.ir/news/85250499/Some-new-achievements-in-nanotechnology-unveiled-in-Iran',
            query: 'Summarize the key nanotechnology achievements mentioned in this article.'
        }
    },
    documentAnalyzer: {
        title: 'AI Document Analyzer',
        subtitle: 'Paste your legal text and ask the AI to review it for errors, suggest improvements, or check for specific clauses.',
        textLabel: 'Document Text to Analyze',
        textPlaceholder: 'Paste the full text of your contract, petition, or legal clause here...',
        queryLabel: 'What should the AI check for?',
        queryPlaceholder: 'e.g., "Find any ambiguous language", "Improve the legal wording", "Does this comply with standard contract law?"',
        buttonText: 'Analyze Document',
        analyzing: 'Analyzing...',
        resultsTitle: 'Analysis Result',
        validationError: 'Please provide both the document text and a question to start the analysis.',
        prompt: `You are an expert Iranian legal advisor and analyst. Your task is to meticulously review a provided legal document based on a user's specific request. Provide a structured, critical, and helpful analysis in markdown format. Refer to Iranian legal principles and language where applicable.

The document text is:
---
{documentText}
---

The user's specific analysis request is: "{query}"

Analyze the document according to the request and provide your feedback. Structure your response with clear headings, bullet points, and explanations.`,
        example: {
            text: 'The tenant agrees to be responsible for any and all repairs, regardless of cause.',
            query: 'Is this lease clause fair and enforceable in Iran? Suggest a better wording.'
        }
    },
    legalTraining: {
        title: 'AI Legal Training',
        subtitle: 'Enter a legal topic, and the AI will generate a structured educational article for you.',
        queryLabel: 'What legal topic do you want to learn about?',
        queryPlaceholder: 'e.g., "Basics of Contract Law", "Intellectual Property Rights in Software", "Civil Procedure Overview"',
        buttonText: 'Generate Training',
        generating: 'Generating...',
        resultsTitle: 'Educational Material',
        validationError: 'Please enter a topic to generate training material.',
        prompt: `You are an experienced law professor in Iran. Your task is to create a comprehensive and well-structured educational article on a specific legal topic for a law student or junior lawyer.

The topic is: "{topic}"

**Instructions:**
1.  Structure the response clearly using Markdown with headings, subheadings, bullet points, and bold text for key terms.
2.  Start with a clear introduction and definition of the main concepts.
3.  Explain the key legal principles and relevant laws in Iran concerning the topic. Cite major legal articles where appropriate (e.g., from the Civil Code, Commercial Code, etc.).
4.  Provide practical examples or a short case study to illustrate the concepts.
5.  Conclude with a summary of the key takeaways.
6.  The language must be clear, educational, and professional.
`,
        example: {
            query: 'A brief overview of Iranian Cheque Law'
        }
    },
    caseStrategist: {
        title: 'AI Project Planner',
        subtitle: 'Describe your goal and get a step-by-step strategic plan with actionable tasks.',
        goalLabel: 'What is your primary goal or project?',
        goalPlaceholder: 'e.g., Launch a new tech startup, write a research paper on international law, start a legal tech podcast...',
        buttonText: 'Generate Strategy',
        generating: 'Generating Strategy...',
        resultsTitle: 'Your Strategic Plan',
        effort: 'Effort',
        deliverable: 'Deliverable',
        suggestedPrompt: 'Show Suggested Prompt',
        executeTask: 'Create Draft with AI',
        executingTask: 'Preparing Drafter...',
        validationError: 'Please describe your goal to generate a strategy.',
        prompt: `You are an expert project manager and strategist. The user will provide a high-level goal. Your task is to break down this goal into a series of concrete, actionable steps. For the user's goal of "{goal}", generate a strategic plan. Your entire response MUST be a JSON array of objects, conforming to the provided schema. Do not include any introductory text, summary, or explanations before or after the JSON. Each object in the array represents a task and must contain: "taskName": A concise name for the task. "description": A brief explanation of what the task involves. "effortPercentage": An estimated percentage of the total project effort this task will take. "deliverableType": A short, clear name for the output of this task (e.g., "Business Plan", "Market Research Report", "Podcast Script", "Code Prototype"). "suggestedPrompt": A detailed, high-quality prompt that the user could give to another AI to generate the deliverable for this task. This prompt should be specific and incorporate details from the user's original goal.`,
        example: {
            goal: 'Develop a comprehensive legal and business strategy to launch an e-commerce platform that sells handmade Iranian crafts internationally.'
        }
    },
    quotaErrorModal: {
        title: 'API Quota Exceeded',
        body: 'You have used your full API quota for today. To continue, please check your billing settings or wait for your quota to reset.',
        cta: 'Check Billing',
        close: 'Close'
    },
    aiGuide: {
        button: "Enter Smart Assistant",
        title: "What do you want to accomplish?",
        subtitle: "Describe your goal, and our AI will suggest the best tool for the job.",
        placeholder: "e.g., 'I need to sue someone for not paying me back', 'Find me a corporate lawyer in Shiraz', 'What are the new import regulations?', 'I want to launch a company'...",
        submitButton: "Get Suggestions",
        gettingSuggestions: "Analyzing...",
        resultsTitle: "AI Suggestions",
        confidence: "Confidence",
        goTo: "Go to",
        validationError: "Please describe your goal to get suggestions.",
        contextualSuggestionsTitle: "Suggestions for you",
        predefinedSuggestions: [
            "Draft a petition for an unpaid check",
            "Find a corporate lawyer in Tehran",
            "Summarize the latest changes to import laws",
            "Plan the steps to register a new company"
        ],
        contextualSuggestionsPrompt: `You are a helpful AI assistant. Based on the titles of the user's previous chat sessions, suggest 3 creative, relevant, and forward-looking next steps or new topics they might be interested in. The user is a legal professional in Iran.

Previous chat titles:
{chatTitles}

Keep the suggestions concise (under 15 words) and actionable. Frame them as things the user can ask the AI to do. Your entire response MUST be a JSON array of 3 strings. Do not include any other text.
Example response: ["Draft a response to the latest court filing", "Research precedents for intellectual property theft", "Summarize the new corporate tax law"]`,
        prompt: `You are an intelligent router for a legal AI application. Your task is to analyze the user's goal and predict which application module is most suitable. Provide a ranked list of the top 3 most relevant suggestions.

The user's goal is: "{goal}"

Here are the available modules:
- 'legal_drafter': Best for when the user wants to generate a specific legal document like a petition, contract, complaint, or legal letter. The user typically knows what kind of document they need.
- 'lawyer_finder': Use this when the user explicitly asks to find, search for, or get a list of lawyers, often specifying a specialty and/or location.
- 'notary_finder': Use this when the user asks to find a Notary Public office, often for official document certification or deeds.
- 'news_summarizer': Ideal for when the user asks for updates, summaries, or information about recent events, laws, or news topics. It uses Google Search to find current information.
- 'case_strategist': The best choice for broad, high-level goals that require multiple steps, like starting a business, planning a complex legal case, or creating a project. It breaks the goal down into a sequence of tasks.
- 'web_analyzer': Use this when the user provides a specific URL and wants to summarize, analyze, or extract information from that single page.
- 'document_analyzer': Best for when the user has an existing piece of text (like a contract or clause) and wants it reviewed, checked for errors, or improved.
- 'legal_training': Suitable when the user wants to learn about or get an explanation of a legal concept, law, or procedure.

Your entire response MUST be a JSON array of objects, conforming to the provided schema. Do not include any text before or after the JSON. Each object should represent a suggested module. Order the array from most to least confident.
`,
        example: {
            prompt: 'My small business hasn\'t been paid by a client for a large invoice. What are my options?'
        }
    },
    aiSuggestions: {
        thinking: 'Thinking...',
        noResults: 'No suggestions found.',
    },
    prepareDraftFromTask: {
        prompt: `You are a helpful assistant. A user wants to use our 'Legal Drafter' tool based on a task from a project plan. The task is: Task Name: '{taskName}', Description: '{description}', Suggested AI Prompt: '{suggestedPrompt}'.
Our drafter tool needs a 'docType', a 'topic', and a 'description'. Please analyze the task and determine the best values for these three fields.
The available 'docType' options are: [{docTypeOptions}]. Choose the most relevant one.
The 'topic' should be a concise title for the document.
The 'description' should be a detailed paragraph for the AI drafter, combining the key information from the task description and the suggested prompt.
Your entire response MUST be a JSON object with the keys 'docType', 'topic', and 'description'.`
    },
    promptMap: {
      petition: `You are an experienced Iranian lawyer. Your task is to prepare a complete and professional petition draft based on the information provided by the user.

**Petition Subject (Topic):** {topic}
**Description of the incident and supplementary information (Description):** {description}

**Instructions:**
Prepare the petition draft using Markdown format and adhering to the standard structure below. The tone should be formal, legal, and authoritative.

- **Plaintiff:** [Plaintiff's full name], son of [Father's name], with national ID number [National ID], residing at [Exact address]
- **Defendant:** [Defendant's full name], son of [Father's name], with national ID number [National ID], residing at [Exact address]
- **Lawyer or Legal Representative:** [If any]
- **Statement of Claim and its Value:** {topic} [with precise details and financial value if possible]
- **Evidence and Attachments:**
    - [List of documents such as certified copy of ID, national card, contract, witness testimony, etc.]
- **Body of the Petition:**
    - **Honorable Presiding Judge of the Public Civil Court of [City]**
    - Greetings and respects;
    - It is hereby brought to your attention that I, [Plaintiff's name], on [Date]... [In this section, write a full and accurate account of the events, the relationship between the parties, and the legal basis for the claim based on the information provided in {description}.]
    - [State your legal reasoning by referring to relevant legal articles (if possible).]
    - Therefore, considering the above and based on the attached evidence and documents, I request a ruling as described in the statement of claim.

  With renewed respects
  [Plaintiff's name]
  [Signature]
  `,
      complaint: `You are a lawyer specializing in criminal matters. Your task is to draft a precise and lawful complaint for submission to the prosecutor's office.

**Charge (Topic):** {topic}
**Complaint Description (Description):** {description}

**Instructions:**
Prepare the complaint draft in Markdown format with the following structure.

- **Complainant:** [Full name], son of [Father's name], with national ID number [National ID], residing at [Exact address]
- **Accused:** [Full name], son of [Father's name], [If known: national ID and exact address]
- **Complainant's Lawyer:** [If any]
- **Subject of Complaint:** {topic}
- **Evidence and Attachments:**
    - [List of documents such as police report, witness testimony, text messages, documents, etc.]
- **Text of Complaint:**
    - **Honorable Public and Revolutionary Prosecutor of [City]**
    - Greetings and respects;
    - I, [Complainant's name], hereby state that on [Date] at [Location of crime], a person named [Accused's name]... [Write a full account of the criminal act based on the information in {description}, including details of time, place, and manner of commission.]
    - [Explain which legal article (if known) the accused's act corresponds to.]
    - Therefore, given the submitted evidence and documents, I request the prosecution and punishment of the said person for the charge of {topic} from your honorable judicial authority.

  With thanks and appreciation
  [Complainant's name]
  [Signature]
  `,
      contract: `You are a legal consultant specializing in drafting contracts. Prepare a comprehensive contract draft based on the user's request.

**Contract Subject (Topic):** {topic}
**Details and Conditions (Description):** {description}

**Instructions:**
Prepare a complete contract draft in Markdown format. Be sure to include the following standard sections and extract details from {description}.

- **Contract Title:** Contract {topic}
- **Article 1: Parties to the Contract**
    - **First Party (e.g., Seller/Lessor/Employer):** Company/Mr./Ms. ... registration/national ID no. ... at address ...
    - **Second Party (e.g., Buyer/Lessee/Employee):** Company/Mr./Ms. ... registration/national ID no. ... at address ...
- **Article 2: Subject of the Contract**
    - It consists of ... [Detailed description of the subject of the contract based on {topic} and {description}]
- **Article 3: Duration of the Contract**
    - This contract is valid from ... to ... for a period of ...
- **Article 4: Contract Amount and Payment Method**
    - The total contract amount is ... Rials, to be paid as follows: ...
- **Article 5: Obligations of the First Party**
    - [List of obligations of the first party]
- **Article 6: Obligations of the Second Party**
    - [List of obligations of the second party]
- **Article 7: Guarantees (if any)**
- **Article 8: Termination of the Contract**
    - [Specify the conditions for termination]
- **Article 9: Force Majeure**
- **Article 10: Dispute Resolution**
    - All disputes arising from this contract will first be resolved through negotiation, and in case of disagreement, the competent authority shall be the courts of [City] / arbitration.
- **Article 11: Copies of the Contract**
    - This contract is drawn up in 11 articles and two copies of equal validity and has been signed by both parties.

  **Signature of the First Party** | **Signature of the Second Party**
  `,
      legal_letter: `You are a lawyer. Draft a formal and legal notice to be sent to the addressee, based on the user's information.

**Subject of the Notice (Topic):** {topic}
**Request and Description (Description):** {description}

**Instructions:**
Draft a formal notice in Markdown format with the following structure.

- **Declarant's (your client's) Details and Residence:**
    - Name: [Full name]
    - Address: [Exact address]
- **Addressee's Details and Residence:**
    - Name: [Full name]
    - Address: [Exact address]
- **Subject of the Notice:** {topic}
- **Summary of Statements:**
    - **Dear Addressee, Mr./Ms. [Addressee's name]**
    - Greetings,
    - As you are aware, under [basis of the legal relationship, e.g., contract no. ...], you had an obligation to [...].
    - [Write a brief description of the unfulfilled obligations or the current legal situation based on {description}.]
    - Unfortunately, despite repeated follow-ups, no action has been taken by you so far.
- **Summary of Request:**
    - Therefore, you are formally notified to, within [number of days, e.g., 72 hours] from the date of this notice, take action to [write your specific request, e.g., pay the debt/vacate the property/fulfill the obligation].
    - It is obvious that if the contents of this notice are disregarded, I reserve the right to pursue the matter through the competent judicial authorities.

  With respect,
  [Declarant's name]
  `,
      defense_brief: `You are an experienced defense attorney. Draft a reasoned and solid defense brief for submission to the court.

**Case Subject (Topic):** {topic}
**Defense Arguments and Key Points (Description):** {description}

**Instructions:**
Prepare a defense brief in Markdown format with the following structure. The tone should be completely legal, respectful, and well-reasoned.

- **Case File No.:** [File number]
- **Branch:** [Branch number] Court of [Court type] [City]
- **Subject:** Defense brief regarding the case of {topic}
- **Submitted by:** [Client's name], [defendant/accused] in the case
- **Submitted to:** Honorable Presiding Judge of Branch [Branch number] of the [Court type] Court

  **Honorable Presiding Judge,**
  With greetings and respects;
  
  Respectfully, regarding the above-mentioned case file, in defense of my client, [Mr./Ms. ...], the following points are brought to your high attention:

  - **1. Description of the incident from the client's perspective:**
      - [Provide a summary of the events from your client's viewpoint based on {description}.]
  - **2. Substantive Defenses:**
      - **A)** [State your first defense argument. E.g., lack of causation, absence of malice, reliance on documents, etc.]
      - **B)** [State your second defense argument and support it with evidence and documents from the case file.]
      - **C)** [If necessary, cite relevant legal articles and provide your interpretation.]
  - **3. Conclusion and Request:**
      - In view of all the mentioned points and considering [the most important defense argument], and in light of the presumption of innocence, it is evident that the charge against the client is without legal basis.
      - Therefore, from your honorable authority, a worthy verdict of [specific request, e.g., acquittal of the client/dismissal of the plaintiff's claim] is requested.

  With thanks and renewed respect,
  [Lawyer's name]
  Attorney at Law
  `,
      legal_research: `You are a legal researcher. Research the user's legal question and provide a documented answer.

**Legal Question (Topic):** {topic}
**Further Details (Description):** {description}

**Instructions:**
Provide a comprehensive and structured response in Markdown format.

- **Research Topic:** {topic}
- **Summary of the Question:**
    - [Rewrite the user's question clearly.]
- **Legal Answer:**
    - **1. Introduction and Definition of Concepts:**
        - [Define key concepts related to the question.]
    - **2. Review of Relevant Laws and Regulations:**
        - [Refer to the main legal articles (such as the Civil Code, Islamic Penal Code, Commercial Code, etc.) that are relevant to the topic, and cite the text of the article.]
        - **Article ... of Law ...:** "[Text of the article]"
    - **3. Analysis and Conclusion:**
        - [Analyze the user's question based on the mentioned laws. Examine different aspects of the issue and personalize the answer based on the information in {description}.]
    - **4. Judicial Precedent (if possible):**
        - [If there is a relevant advisory opinion or a binding precedent, mention it.]
- **Disclaimer:**
    - Please note that this response is for informational and research purposes only and is by no means a substitute for legal advice from a specialized lawyer. The circumstances of each case are unique and must be reviewed individually.
  `,
      legal_training: `You are an experienced law professor in Iran. Your task is to create a comprehensive and well-structured educational article on a specific legal topic for a law student or junior lawyer. The response must be in Persian. The topic is: "{topic}". Instructions: 1. Structure the response clearly using Markdown with headings, subheadings, bullet points, and bold text for key terms. 2. Start with a clear introduction and definition of the main concepts. 3. Explain the key legal principles and relevant laws in Iran concerning the topic. Cite major legal articles where appropriate (e.g., from the Civil Code, Commercial Code, etc.). 4. Provide practical examples or a short case study to illustrate the concepts. 5. Conclude with a summary of the key takeaways. 6. The language must be clear, educational, and professional.`,
      power_of_attorney: `شما یک سردفتر اسناد رسمی خبره در ایران هستید. یک پیش‌نویس وکالت‌نامه رسمی بر اساس موضوع: {topic} و شرح: {description} تنظیم کنید.`,
      title_deed: `شما یک سردفتر اسناد رسمی خبره در ایران هستید. یک پیش‌نویس سند مالکیت یا انتقال حقوق بر اساس موضوع: {topic} و شرح: {description} تنظیم کنید.`,
      will: `شما یک سردفتر اسناد رسمی خبره در ایران هستید. یک پیش‌نویس وصیت‌نامه رسمی بر اساس موضوع: {topic} و شرح: {description} تنظیم کنید.`,
      lease_agreement: `شما یک سردفتر اسناد رسمی خبره در ایران هستید. یک پیش‌نویس اجاره‌نامه رسمی بر اساس موضوع: {topic} و شرح: {description} تنظیم کنید.`,
      commitment_letter: `شما یک سردفتر اسناد رسمی خبره در ایران هستید. یک پیش‌نویس تعهدنامه رسمی بر اساس موضوع: {topic} و شرح: {description} تنظیم کنید.`,
      settlement_deed: `شما یک سردفتر اسناد رسمی خبره در ایران هستید. یک پیش‌نویس صلح‌نامه رسمی بر اساس موضوع: {topic} و شرح: {description} تنظیم کنید.`,
      affidavit: `شما یک سردفتر اسناد رسمی خبره در ایران هستید. یک پیش‌نویس اقرارنامه رسمی بر اساس موضوع: {topic} و شرح: {description} تنظیم کنید.`,
    },
};

export const fa = {
    langCode: 'fa',
    header: {
        home: 'صفحه اصلی',
        aiAssistant: 'پیش‌نویس ساز',
        lawyerFinder: 'جستجوی وکیل',
        notaryFinder: 'جستجوی محضر',
        newsSummarizer: 'خلاصه اخبار',
        caseStrategist: 'برنامه‌ریز پروژه',
        webAnalyzer: 'تحلیلگر وب',
        documentAnalyzer: 'تحلیلگر سند',
        legalTraining: 'آموزش حقوقی',
        services: 'خدمات',
        about: 'درباره ما',
        contact: 'تماس با ما',
        createCheckpoint: 'ایجاد ایست بازرسی',
        createCheckpointTitle: 'ذخیره وضعیت فعلی',
        checkpoints: 'ایست‌های بازرسی',
        projectHistory: 'تاریخچه پروژه',
        restore: 'بازیابی',
        delete: 'حذف',
        noCheckpoints: 'هنوز ایست بازرسی ایجاد نشده است.'
    },
    hero: {
        title: "هنوز هم سوال بی جوابی دارید؟",
        subtitle: "با ما در تماس باشید همکاران ما پاسخگوی شما هستند.",
        button1: "ورود به دستیار هوشمند",
        button2: "تماس با ما",
    },
    home: {
        servicesTitle: "خدمات هوشمند ما",
        aboutTitle: "درباره دفتر اسناد رسمی ۶۶۲ تهران",
        aboutText: "دفتر اسناد رسمی ۶۶۲ تهران تحت مدیریت سرکار خانم لیلا فرخ زاد، سردفتر باتجربه و پیشکسوت، با تیمی متخصص و متعهد آماده ارائه کلیه خدمات ثبتی به شما عزیزان می‌باشد. دقت، سرعت و رضایت مراجعین، اصول اصلی این دفترخانه است.",
        whyAITitle: "چرا از دستیار هوشمند ما استفاده کنید؟",
        whyAISubtitle: "از تکنولوژی پیشرفته برای ارتقای فعالیت‌های حقوقی خود بهره‌مند شوید.",
        whyAIFeatures: [
            { title: "سرعت و دقت", description: "اسناد را فوراً تحلیل کرده و پیش‌نویس‌ها را با دقت بالا تولید کنید." },
            { title: "برنامه‌ریزی استراتژیک", description: "اهداف پیچیده را به برنامه‌های عملیاتی و گام به گام تبدیل کنید." },
            { title: "صرفه‌جویی در هزینه", description: "زمان تحقیق و نگارش را کاهش داده و منابع خود را بهینه سازید." },
            { title: "اطلاعات به‌روز", description: "با تحلیل وب مبتنی بر هوش مصنوعی، به آخرین اخبار و اطلاعات دسترسی پیدا کنید." }
        ],
        guidesTitle: "راهنماها و ابزارهای ویژه",
        guidesSubtitle: "کاربردهای عملی ابزارهای هوشمند ما را برای حل چالش‌های واقعی کشف کنید.",
        guides: [
            { title: "برندسازی شخصی برای وکلا", description: "یک برنامه گام به گام برای ساخت برند حرفه‌ای و جذب موکل بیشتر تدوین کنید.", link: "case_strategist" },
            { title: "هنر نگارش یک دادخواست متقاعدکننده", description: "با استفاده از پیش‌نویس‌ساز هوشمند، یک دادخواست بی‌نقص برای پرونده خود ایجاد کنید.", link: "legal_drafter" },
            { title: "تحلیل بازاریابی رقبا", description: "از تحلیلگر وب برای درک استراتژی‌های آنلاین سایر موسسات حقوقی در حوزه خود استفاده کنید.", link: "web_analyzer" },
            { title: "آشنایی با قوانین جدید قراردادها", description: "خلاصه‌ای از آخرین مقالات و اخبار حقوقی مرتبط با مقررات قراردادها را دریافت کنید.", link: "news_summarizer" }
        ],
    },
    footer: {
        aboutTitle: "درباره ما",
        description: "دفتر اسناد رسمی ۶۶۲ تهران با بهره‌گیری از تکنولوژی‌های نوین، کلیه خدمات اسناد رسمی و مشاوره‌های حقوقی را با دقت و تعهد کامل ارائه می‌دهد تا رضایت کامل مراجعین را جلب نماید.",
        contactTitle: "اطلاعات تماس",
        address: "تهران، چهارراه جهان کودک، بلوار حقانی، نرسیده به گاندی شمالی، پلاک 67، طبقه همکف",
        phone1: "۰۲۱-۸۸۱۹۵۲۱۷",
        phone2: "۰۹۱۹۶۶۲۵۶۶۲",
        quickLinksTitle: "دسترسی سریع",
        quickLinks: [
            { text: "صفحه اصلی", link: "#" },
            { text: "دستیار هوشمند", link: "#assistant" },
            { text: "جستجوی وکیل", link: "#lawyer-finder" },
            { text: "سیاست حفظ حریم خصوصی", link: "#" },
        ],
        copyright: "دفتر اسناد رسمی ۶۶۲ تهران - تمام حقوق محفوظ است.",
        poweredBy: "قدرت گرفته از Google Gemini",
    },
    aiHero: {
        title: 'همکار هوشمند حقوقی شما',
        subtitle: 'از تحقیقات حقوقی تا تنظیم لوایح برنده، اجازه دهید هوش مصنوعی موفقیت شما را تسریع کند.'
    },
    generatorForm: {
        title: 'تنظیم سند حقوقی جدید',
        docType: 'نوع سند',
        topic: 'موضوع / عنوان پرونده',
        topicPlaceholder: 'مثال: مطالبه وجه چک، دادخواست طلاق',
        description: 'شرح ماجرا و اطلاعات کلیدی',
        descriptionPlaceholder: 'تمام جزئیات مرتبط، تاریخ‌ها، اسامی و وقایع کلیدی پرونده خود را وارد کنید...',
        buttonText: 'تنظیم سند',
        validationError: 'لطفاً هر دو فیلد موضوع و شرح ماجرا را پر کنید.',
        useExample: 'استفاده از نمونه',
    },
    reportTypes: {
        petition: 'دادخواست',
        complaint: 'شکواییه',
        contract: 'قرارداد',
        legal_letter: 'اظهارنامه',
        defense_brief: 'لایحه دفاعیه',
        legal_research: 'تحقیق حقوقی',
        legal_training: 'آموزش حقوقی',
        power_of_attorney: 'وکالت‌نامه',
        title_deed: 'سند مالکیت',
        will: 'وصیت‌نامه',
        lease_agreement: 'اجاره‌نامه',
        commitment_letter: 'تعهدنامه',
        settlement_deed: 'صلح‌نامه',
        affidavit: 'اقرارنامه',
    },
    reportExamples: {
        petition: {
            topic: 'مطالبه وجه چک بلامحل',
            description: 'اینجانب یک فقره چک به شماره ۱۲۳۴۵ مورخ ۱۴۰۳/۰۱/۱۵ از آقای [نام بدهکار] به مبلغ ۵۰,۰۰۰,۰۰۰ ریال دریافت نمودم. چک مذکور در تاریخ سررسید به دلیل کسر موجودی برگشت خورد. گواهی عدم پرداخت از بانک [نام بانک] شعبه [نام شعبه] دریافت شده است. با وجود مراجعات مکرر، ایشان از پرداخت وجه خودداری می‌کنند.'
        },
        complaint: {
            topic: 'کلاهبرداری و فروش مال غیر',
            description: 'آقای [نام متهم] یک واحد آپارتمان واقع در [آدرس ملک] را که متعلق به شخص دیگری بوده، با ارائه اسناد جعلی به اینجانب فروخته و مبلغ ۲۰۰,۰۰۰,۰۰۰ تومان به عنوان بیعانه دریافت کرده است. پس از مراجعه به ملک، متوجه شدم که مالک واقعی شخص دیگری است و متهم متواری شده است.'
        },
        contract: {
            topic: 'قرارداد اجاره واحد مسکونی',
            description: 'قرارداد اجاره یکساله برای یک واحد آپارتمان دوخوابه به نشانی [آدرس آپارتمان]. مبلغ اجاره ماهیانه ۱۰,۰۰۰,۰۰۰ ریال و مبلغ ودیعه ۵۰,۰۰۰,۰۰۰ ریال می‌باشد. تاریخ شروع قرارداد ۱۴۰۳/۰۴/۰۱ است. هزینه‌های آب، برق و گاز بر عهده مستاجر است.'
        },
        legal_letter: {
            topic: 'اخطار نهایی برای پرداخت بدهی',
            description: 'این یک اخطار نهایی در خصوص بدهی معوقه به مبلغ ۲۵,۰۰۰,۰۰۰ ریال بر اساس فاکتور شماره INV-2023-08-15 است. مهلت پرداخت ظرف ۷۲ ساعت از تاریخ دریافت این اظهارنامه می‌باشد. در صورت عدم پرداخت، اقدام قانونی بدون اخطار بعدی صورت خواهد گرفت.'
        },
        defense_brief: {
            topic: 'دفاع در برابر دعوای نقض قرارداد',
            description: 'خواهان ادعای نقض قرارداد در خصوص تحویل کالا را دارد. اما تاخیر ایجاد شده به دلیل وقوع فورس ماژور (محدودیت‌های پیش‌بینی نشده واردات) بوده که در ماده ۹ قرارداد ما نیز پیش‌بینی شده است. مدارک مبنی بر اطلاع‌رسانی به موقع به خواهان در خصوص تاخیر موجود است.'
        },
        legal_research: {
            topic: 'مبانی حقوقی مالکیت فکری در نرم‌افزار',
            description: 'قوانین و مقررات اصلی در ایران که از حقوق مالکیت فکری توسعه‌دهندگان نرم‌افزار حمایت می‌کنند کدامند؟ لطفاً اطلاعاتی در مورد حق نشر (کپی‌رایت)، ثبت اختراع و اسرار تجاری در مورد کدها و اپلیکیشن‌های نرم‌افزاری ارائه دهید.'
        }
    },
    reportDisplay: {
        title: 'سند تنظیم شده',
        export: 'خروجی',
        copy: 'کپی متن',
        downloadMD: 'دانلود (.md)',
        downloadDOCX: 'دانلود (.docx)',
        downloadHTML: 'دانلود (.html)',
        printPDF: 'چاپ / ذخیره به عنوان PDF',
        generating: 'در حال تنظیم...',
        placeholder1: 'سند تنظیم شده شما در اینجا نمایش داده خواهد شد.',
        placeholder2: 'فرم را پر کرده و روی "تنظیم سند" کلیک کنید.',
        docTitle: 'سند تنظیم شده',
        headerTitle: "خدمات حقوقی دفتر اسناد رسمی ۶۶۲",
        headerDate: "تاریخ",
        headerCaseNo: "شماره پرونده",
        caseNoPlaceholder: "[جای خالی]",
    },
    documentViewer: {
        title: 'پیش نمایش سند',
        sendToNotary: 'ارسال به محضر در واتساپ',
        print: 'چاپ',
        exportPdf: 'خروجی PDF',
        copy: 'کپی متن',
        close: 'بستن',
        versionHistory: 'تاریخچه نسخه‌ها',
        version: 'نسخه',
        previousVersion: 'قبلی',
        nextVersion: 'بعدی',
        headerTitle: 'دفتر اسناد رسمی ۶۶۲ تهران',
        headerDate: 'تاریخ',
        headerCaseNo: 'شماره پرونده',
    },
    lawyerFinder: {
        title: 'یابنده وکیل با هوش مصنوعی',
        subtitle: 'موضوع حقوقی یا تخصص مورد نظر خود را برای یافتن وکلای مرتبط شرح دهید.',
        keywordsLabel: 'نیاز حقوقی خود را شرح دهید (مثال: "وکیل طلاق در تهران")',
        keywordsPlaceholder: 'مثال: حقوق شرکت‌ها، دفاع کیفری، دادگاه خانواده...',
        maxResults: 'حداکثر نتایج',
        findButton: 'جستجوی وکیل',
        finding: 'در حال یافتن وکلا...',
        validationError: 'لطفاً نیاز حقوقی خود را برای شروع جستجو شرح دهید.',
        loadingTitle: 'در حال جستجوی وکلا...',
        loadingSubtitle: 'هوش مصنوعی ما در حال بررسی وب برای یافتن بهترین گزینه‌ها است. این ممکن است لحظاتی طول بکشد.',
        resultsTitle: 'وکلای یافت شده',
        relevance: 'ارتباط',
        specialty: 'تخصص',
        contact: 'اطلاعات تماس',
        address: 'آدرس',
        save: 'ذخیره در مخاطبین',
        saved: 'ذخیره شد',
        sortBy: 'مرتب‌سازی بر اساس',
        sort: {
            relevance: 'مرتبط بودن',
            city: 'شهر',
            experience_desc: 'سابقه (نزولی)',
            city_specialty: 'شهر، سپس تخصص'
        },
        savedTitle: 'وکلای ذخیره شده',
        clearAll: 'پاک کردن همه',
        remove: 'حذف',
        notesLabel: 'یادداشت‌های من',
        notesPlaceholder: 'یادداشت‌ها و استراتژی خود را اینجا اضافه کنید...',
        parseErrorTitle: 'ساختاربندی همه نتایج ممکن نبود',
        parseErrorSubtitle: 'هوش مصنوعی اطلاعاتی را برگرداند، اما به طور خودکار به جدول تبدیل نشد. متن خام در زیر نمایش داده شده است.',
        crateTitle: 'فهرست وکلا',
        crateSubtitle: 'تمام وکلای کشف شده توسط هوش مصنوعی در اینجا ذخیره می‌شوند.',
        clearCrate: 'پاک کردن فهرست',
        crateEmpty: 'برای کشف وکلا جستجو کنید. نتایج به طور دائم در اینجا ذخیره خواهند شد.',
        semanticSearchBadge: 'مجهز به جستجوی معنایی: هوش مصنوعی مفهوم درخواست شما را برای یافتن نتایج بهتر درک می‌کند.',
        prompt: `شما یک دستیار هوش مصنوعی حقوقی متخصص در یافتن وکلا در ایران هستید. هدف اصلی شما درک معنایی وضعیت حقوقی کاربر و یافتن مناسب‌ترین وکلا با استفاده از ابزار جستجوی گوگل است.

به جای تطبیق کلیدواژه‌های ساده، درخواست کاربر یعنی "{queries}" را برای یافتن نیت و زمینه حقوقی پنهان در آن تحلیل کنید. به عنوان مثال، اگر کاربر بگوید "شریک تجاری‌ام از من دزدی کرده"، شما باید به دنبال وکلای متخصص در اختلافات شرکتی، کلاهبرداری یا دعاوی تجاری بگردید.

{maxResults} وکیل را که تخصص و تجربه آن‌ها بیشترین تطابق را با این نیت دارد، پیدا کنید.

کل پاسخ شما باید یک جدول مارک‌داون باشد. هیچ متن مقدماتی، خلاصه یا توضیحی قبل یا بعد از جدول نیاورید.

جدول باید دقیقاً شامل ستون‌های زیر باشد:
- Name (نام)
- Specialty (تخصص)
- City (شهر)
- Address (آدرس)
- Contact Info (اطلاعات تماس)
- Website (لینک مستقیم مارک‌داون به صفحه اصلی وکیل یا وب‌سایت موسسه)
- Years of Experience (سابقه کار حرفه‌ای به صورت یک عدد)
- Relevance Score (امتیاز ارتباط - درصدی از ۰٪ تا ۱۰۰٪ که میزان تطابق وکیل با *نیت معنایی* کاربر را نشان می‌دهد)
`,
        example: {
            keywords: 'برای یک استارتاپ نرم‌افزاری در تهران به وکیل متخصص در زمینه مالکیت فکری نیاز دارم.'
        },
        sendDraft: 'ارسال پیش‌نویس با واتس‌اپ',
        sendDraftTooltip: 'پیش‌نویس فعال در دستیار هوشمند را برای این وکیل ارسال کنید.',
        noDraftToSend: 'برای ارسال، ابتدا یک پیش‌نویس در دستیار هوشمند ایجاد کنید.',
    },
    notaryFinder: {
        title: 'یابنده محضر اسناد رسمی',
        subtitle: 'نوع کار و شهر مورد نظر خود را برای یافتن دفاتر اسناد رسمی شرح دهید.',
        keywordsLabel: 'نیاز خود را شرح دهید (مثال: "محضر برای تنظیم وکالت فروش خودرو در اصفهان")',
        keywordsPlaceholder: 'مثال: تنظیم سند ملک، گواهی امضا، تعهدنامه...',
        findButton: 'جستجوی محضر',
        finding: 'در حال یافتن دفاتر...',
        validationError: 'لطفاً نیاز خود را برای شروع جستجو شرح دهید.',
        resultsTitle: 'دفاتر اسناد رسمی یافت شده',
        office: 'نام/شماره دفتر',
        contact: 'اطلاعات تماس',
        address: 'آدرس',
        services: 'خدمات',
        sortBy: 'مرتب‌سازی بر اساس',
        sort: {
            officeName: 'نام دفتر',
            city: 'شهر',
        },
        filterByCity: 'فیلتر بر اساس شهر',
        filterByOfficeName: 'فیلتر بر اساس نام دفتر',
        filterByService: 'فیلتر بر اساس خدمات',
        noFilterResults: 'دفتری با فیلترهای فعلی شما مطابقت ندارد.',
        parseErrorTitle: 'ساختاربندی همه نتایج ممکن نبود',
        parseErrorSubtitle: 'هوش مصنوعی اطلاعاتی را برگرداند، اما به طور خودکار به جدول تبدیل نشد. متن خام در زیر نمایش داده شده است.',
        semanticSearchBadge: 'مجهز به جستجوی معنایی: هوش مصنوعی مفهوم درخواست شما را برای یافتن نتایج بهتر درک می‌کند.',
        prompt: `شما یک دستیار هوش مصنوعی متخصص در یافتن دفاتر اسناد رسمی (محضر) در ایران هستید. درخواست کاربر یعنی "{queries}" را تحلیل کرده و مناسب‌ترین دفاتر را با استفاده از ابزار جستجوی گوگل پیدا کنید.

کل پاسخ شما باید یک جدول مارک‌داون باشد. هیچ متن مقدماتی، خلاصه یا توضیحی قبل یا بعد از جدول نیاورید.

جدول باید دقیقاً شامل ستون‌های زیر باشد:
- Office Name (نام دفتر / شماره)
- City (شهر)
- Address (آدرس)
- Contact Info (اطلاعات تماس)
- Website (لینک مستقیم مارک‌داون به وب‌سایت در صورت وجود)
- Services Offered (لیستی از خدمات رایج با کاما جدا شده، مانند 'تنظیم سند ملک'، 'وکالتنامه'، 'گواهی امضا')
`,
        example: {
            keywords: 'می‌خواهم یک وکالت‌نامه رسمی برای پدر سالمندم در شیراز تنظیم کنم.'
        },
        sendDraft: 'ارسال پیش‌نویس با واتس‌اپ',
        sendDraftTooltip: 'پیش‌نویس فعال در دستیار هوشمند را برای این محضر ارسال کنید.',
        noDraftToSend: 'برای ارسال، ابتدا یک پیش‌نویس در دستیار هوشمند ایجاد کنید.',
    },
    newsSummarizer: {
        title: 'خلاصه اخبار هوشمند',
        subtitle: 'خلاصه‌ای سریع از آخرین اخبار در هر موضوعی را به همراه منابع دریافت کنید.',
        queryLabel: 'چه خبری را می‌خواهید خلاصه کنید؟',
        queryPlaceholder: 'مثال: آخرین قوانین مربوط به فناوری در ایران...',
        buttonText: 'خلاصه کن',
        summarizing: 'در حال خلاصه کردن...',
        resultsTitle: 'خلاصه اخبار',
        sourcesTitle: 'منابع',
        noSources: 'منبعی برای این خلاصه یافت نشد.',
        validationError: 'لطفاً موضوعی را برای خلاصه کردن وارد کنید.',
        prompt: `به عنوان یک تحلیلگر خبره اخبار، خلاصه‌ای موجز از آخرین اخبار مربوط به "{query}" در ایران ارائه دهید. خلاصه خود را صرفاً بر اساس نتایج جستجوی ارائه شده استوار کنید. خلاصه باید به زبان فارسی باشد. پاسخ خود را با استفاده از مارک‌داون به وضوح ساختاربندی کنید.`,
        example: {
            query: 'آخرین تحولات در صنعت خودروسازی ایران چیست؟'
        }
    },
     webAnalyzer: {
        title: 'تحلیلگر صفحه وب با هوش مصنوعی',
        subtitle: 'یک URL و یک سوال برای تحلیل محتوای آن ارائه دهید.',
        urlLabel: 'URL صفحه وب برای تحلیل',
        urlPlaceholder: 'https://example.com/article',
        queryLabel: 'چه چیزی می‌خواهید از این صفحه بدانید؟',
        queryPlaceholder: 'مثال: نکات اصلی را خلاصه کن، تمام اسامی ذکر شده را استخراج کن، استدلال‌های کلیدی چیست...',
        buttonText: 'تحلیل صفحه',
        analyzing: 'در حال تحلیل...',
        resultsTitle: 'نتیجه تحلیل',
        validationError: 'لطفاً هم URL و هم سوال را ارائه دهید.',
        prompt: `شما یک تحلیلگر متخصص صفحات وب هستید. وظیفه شما تحلیل محتوای یک URL مشخص و پاسخ به سوال کاربر *صرفاً* بر اساس آن محتوا است. از دانش عمومی یا اطلاعات وب‌سایت‌های دیگر استفاده نکنید.

URL مورد تحلیل: {url}

سوال کاربر: "{query}"

محتوای URL داده شده را تحلیل کرده و پاسخی دقیق و ساختاریافته در قالب مارک‌داون ارائه دهید. اگر URL قابل دسترس نیست یا حاوی پاسخ سوال نیست، این موضوع را به وضوح بیان کنید.`,
        example: {
            url: 'https://www.irna.ir/news/85424576/۱۰-طرح-کلان-ملی-در-حوزه-صنعت-برق-و-انرژی-به-بهره-برداری-رسید',
            query: 'طرح‌های کلان ملی در حوزه برق که در این مقاله به آن‌ها اشاره شده را خلاصه کن.'
        }
    },
    documentAnalyzer: {
        title: 'تحلیلگر سند با هوش مصنوعی',
        subtitle: 'متن حقوقی خود را وارد کرده و از هوش مصنوعی بخواهید تا آن را برای یافتن خطا، پیشنهاد بهبود یا بررسی موارد خاص بازبینی کند.',
        textLabel: 'متن سند برای تحلیل',
        textPlaceholder: 'متن کامل قرارداد، دادخواست، یا بند حقوقی خود را اینجا وارد کنید...',
        queryLabel: 'هوش مصنوعی چه موردی را باید بررسی کند؟',
        queryPlaceholder: 'مثال: "هرگونه عبارت مبهم را پیدا کن"، "نگارش حقوقی متن را بهبود ببخش"، "آیا این بند با قوانین استاندارد قراردادها مطابقت دارد؟"',
        buttonText: 'تحلیل سند',
        analyzing: 'در حال تحلیل...',
        resultsTitle: 'نتیجه تحلیل',
        validationError: 'لطفاً هم متن سند و هم سوال خود را برای شروع تحلیل وارد کنید.',
        prompt: `شما یک مشاور و تحلیلگر حقوقی خبره در ایران هستید. وظیفه شما بازبینی دقیق یک سند حقوقی ارائه شده بر اساس درخواست مشخص کاربر است. یک تحلیل ساختاریافته، منتقدانه و مفید در قالب مارک‌داون ارائه دهید. در موارد مقتضی به اصول حقوقی و ادبیات حقوقی ایران ارجاع دهید.

متن سند به شرح زیر است:
---
{documentText}
---

درخواست مشخص کاربر برای تحلیل این است: "{query}"

سند را مطابق با درخواست تحلیل کرده و بازخورد خود را ارائه دهید. پاسخ خود را با عناوین واضح، لیست‌های شماره‌گذاری شده و توضیحات کامل ساختاربندی کنید.`,
        example: {
            text: 'مستاجر مسئول هرگونه تعمیرات در ملک است، صرف نظر از علت آن.',
            query: 'آیا این بند در قرارداد اجاره، منصفانه و در ایران قابل اجراست؟ یک نگارش بهتر پیشنهاد بده.'
        }
    },
    legalTraining: {
        title: 'آموزش حقوقی با هوش مصنوعی',
        subtitle: 'یک موضوع حقوقی وارد کنید تا هوش مصنوعی یک مقاله آموزشی ساختاریافته برای شما تولید کند.',
        queryLabel: 'در مورد چه موضوع حقوقی می‌خواهید یاد بگیرید؟',
        queryPlaceholder: 'مثال: «مبانی حقوق قراردادها»، «حقوق مالکیت فکری در نرم‌افزار»، «مروری بر آیین دادرسی مدنی»',
        buttonText: 'ایجاد آموزش',
        generating: 'در حال تولید محتوا...',
        resultsTitle: 'محتوای آموزشی',
        validationError: 'لطفاً یک موضوع برای ایجاد محتوای آموزشی وارد کنید.',
        prompt: `شما یک استاد حقوق با تجربه در ایران هستید. وظیفه شما ایجاد یک مقاله آموزشی جامع و خوش‌ساختار در مورد یک موضوع حقوقی مشخص برای یک دانشجوی حقوق یا وکیل تازه‌کار است. پاسخ باید به زبان فارسی باشد.

موضوع این است: "{topic}"

**دستورالعمل‌ها:**
1.  پاسخ را با استفاده از مارک‌داون با عناوین، زیرعنوان‌ها، لیست‌ها و **متن برجسته** برای اصطلاحات کلیدی به وضوح ساختاربندی کنید.
2.  با یک مقدمه و تعریف واضح از مفاهیم اصلی شروع کنید.
3.  اصول کلیدی حقوقی و قوانین مرتبط در ایران را در مورد موضوع توضیح دهید. در موارد مقتضی به مواد قانونی مهم (مثلاً از قانون مدنی، قانون تجارت و غیره) استناد کنید.
4.  مثال‌های عملی یا یک مطالعه موردی کوتاه برای روشن شدن مفاهیم ارائه دهید.
5.  با خلاصه‌ای از نکات کلیدی به پایان برسانید.
6.  زبان باید واضح، آموزشی و حرفه‌ای باشد.
`,
        example: {
            query: 'مروری کوتاه بر قانون چک در ایران'
        }
    },
     caseStrategist: {
        title: 'برنامه‌ریز پروژه با هوش مصنوعی',
        subtitle: 'هدف خود را شرح دهید و یک برنامه استراتژیک گام به گام با وظایف عملی دریافت کنید.',
        goalLabel: 'هدف اصلی یا پروژه شما چیست؟',
        goalPlaceholder: 'مثال: راه‌اندازی یک استارتاپ فناوری جدید، نوشتن یک مقاله تحقیقی در مورد حقوق بین‌الملل، شروع یک پادکست حقوقی...',
        buttonText: 'ایجاد استراتژی',
        generating: 'در حال ایجاد استراتژی...',
        resultsTitle: 'برنامه استراتژیک شما',
        effort: 'حجم کار',
        deliverable: 'خروجی',
        suggestedPrompt: 'نمایش پرامپت پیشنهادی',
        executeTask: 'ایجاد پیش‌نویس با AI',
        executingTask: 'در حال آماده‌سازی...',
        validationError: 'لطفاً هدف خود را برای ایجاد استراتژی شرح دهید.',
        prompt: `شما یک مدیر پروژه و استراتژیست خبره هستید. کاربر یک هدف سطح بالا ارائه می‌دهد. وظیفه شما این است که این هدف را به مجموعه‌ای از مراحل مشخص و قابل اجرا تقسیم کنید. برای هدف کاربر یعنی "{goal}"، یک برنامه استراتژیک ایجاد کنید. کل پاسخ شما باید یک آرایه JSON از اشیاء باشد که با اسکیمای ارائه شده مطابقت دارد. هیچ متن مقدماتی، خلاصه یا توضیحی قبل یا بعد از JSON نیاورید. هر شیء در آرایه نشان‌دهنده یک وظیفه است و باید شامل موارد زیر باشد: "taskName": نامی مختصر برای وظیفه. "description": توضیحی کوتاه در مورد آنچه وظیفه شامل می‌شود. "effortPercentage": درصدی تخمینی از کل تلاش پروژه که این وظیفه به خود اختصاص می‌دهد. "deliverableType": نامی کوتاه و واضح برای خروجی این وظیفه (مثلاً «طرح تجاری»، «گزارش تحقیقات بازار»، «اسکریپت پادکست»، «نمونه اولیه کد»). "suggestedPrompt": یک پرامپت دقیق و با کیفیت بالا که کاربر می‌تواند به یک هوش مصنوعی دیگر برای تولید خروجی این وظیفه بدهد. این پرامپت باید مشخص و شامل جزئیات از هدف اصلی کاربر باشد.`,
        example: {
            goal: 'یک استراتژی جامع حقوقی و تجاری برای راه‌اندازی یک پلتفرم تجارت الکترونیک که صنایع دستی ایرانی را به صورت بین‌المللی می‌فروشد، تدوین کن.'
        }
    },
    quotaErrorModal: {
        title: 'سهمیه API تمام شده است',
        body: 'شما از سهمیه کامل API خود برای امروز استفاده کرده‌اید. برای ادامه، لطفاً تنظیمات صورتحساب خود را بررسی کنید یا منتظر بمانید تا سهمیه شما بازنشانی شود.',
        cta: 'بررسی صورتحساب',
        close: 'بستن'
    },
    aiGuide: {
        button: "ورود به دستیار هوشمند",
        title: "قصد انجام چه کاری را دارید؟",
        subtitle: "هدف خود را شرح دهید، و هوش مصنوعی ما بهترین ابزار را برای کار شما پیشنهاد می‌دهد.",
        placeholder: "مثال: 'می‌خواهم از کسی که پولم را پس نمی‌دهد شکایت کنم'، 'یک وکیل شرکتی در شیراز پیدا کن'، 'مقررات جدید واردات چیست؟'، 'می‌خواهم یک شرکت تاسیس کنم'...",
        submitButton: "دریافت پیشنهادات",
        gettingSuggestions: "در حال تحلیل...",
        resultsTitle: "پیشنهادات هوش مصنوعی",
        confidence: "درصد اطمینان",
        goTo: "رفتن به",
        validationError: "لطفا هدف خود را برای دریافت پیشنهاد شرح دهید.",
        contextualSuggestionsTitle: "پیشنهادات برای شما",
        predefinedSuggestions: [
            "یک دادخواست برای مطالبه وجه چک تنظیم کن",
            "یک وکیل شرکتی در تهران پیدا کن",
            "آخرین تغییرات قوانین واردات را خلاصه کن",
            "مراحل ثبت یک شرکت جدید را برنامه‌ریزی کن"
        ],
        contextualSuggestionsPrompt: `شما یک دستیار هوشمند مفید هستید. بر اساس عناوین جلسات چت قبلی کاربر، ۳ پیشنهاد خلاقانه، مرتبط و آینده‌نگر برای مراحل بعدی یا موضوعات جدیدی که ممکن است به آن‌ها علاقه‌مند باشد، ارائه دهید. کاربر یک متخصص حقوقی در ایران است.

عناوین چت‌های قبلی:
{chatTitles}

پیشنهادات را کوتاه (زیر ۱۵ کلمه) و عملی نگه دارید. آن‌ها را به صورت کارهایی که کاربر می‌تواند از هوش مصنوعی بخواهد، قاب‌بندی کنید. کل پاسخ شما باید یک آرایه JSON از ۳ رشته باشد. هیچ متن دیگری اضافه نکنید.
مثال پاسخ: ["یک پاسخ به آخرین لایحه دادگاه تنظیم کن", "در مورد رویه‌های قضایی سرقت مالکیت معنوی تحقیق کن", "قانون جدید مالیات شرکت‌ها را خلاصه کن"]`,
        prompt: `شما یک مسیریاب هوشمند برای یک اپلیکیشن حقوقی مبتنی بر هوش مصنوعی هستید. وظیفه شما تحلیل هدف کاربر و پیش‌بینی مناسب‌ترین ماژول اپلیکیشن است. یک لیست مرتب شده از ۳ پیشنهاد مرتبط ارائه دهید.

هدف کاربر این است: "{goal}"

ماژول‌های موجود به شرح زیر است:
- 'legal_drafter': بهترین گزینه برای زمانی که کاربر قصد تولید یک سند حقوقی مشخص مانند دادخواست، قرارداد، شکواییه یا اظهارنامه را دارد. کاربر معمولا نوع سندی که نیاز دارد را می‌داند.
- 'lawyer_finder': زمانی استفاده شود که کاربر به صراحت درخواست یافتن، جستجو یا لیستی از وکلا را دارد، و اغلب تخصص و/یا مکان را مشخص می‌کند.
- 'notary_finder': زمانی استفاده شود که کاربر درخواست یافتن یک دفتر اسناد رسمی (محضر) را دارد، اغلب برای کارهایی مانند گواهی امضا، تنظیم سند یا وکالتنامه.
- 'news_summarizer': ایده‌آل برای زمانی که کاربر درخواست بروزرسانی، خلاصه یا اطلاعاتی در مورد رویدادها، قوانین یا موضوعات خبری اخیر را دارد. این ماژول از جستجوی گوگل برای یافتن اطلاعات جاری استفاده می‌کند.
- 'case_strategist': بهترین انتخاب برای اهداف کلی و سطح بالا که نیازمند چندین مرحله هستند، مانند راه‌اندازی یک کسب و کار، برنامه‌ریزی یک پرونده حقوقی پیچیده، یا ایجاد یک پروژه. این ماژول هدف را به دنباله‌ای از وظایf تقسیم می‌کند.
- 'web_analyzer': زمانی استفاده شود که کاربر یک URL مشخص ارائه می‌دهد و قصد خلاصه کردن، تحلیل یا استخراج اطلاعات از آن صفحه خاص را دارد.
- 'document_analyzer': بهترین گزینه زمانی است که کاربر یک متن موجود (مانند یک قرارداد یا بند) دارد و می‌خواهد آن را بازبینی، برای خطاها بررسی یا بهبود بخشد.
- 'legal_training': مناسب زمانی است که کاربر قصد یادگیری یا دریافت توضیح در مورد یک مفهوم، قانون یا رویه حقوقی را دارد.

کل پاسخ شما باید یک آرایه JSON از اشیاء باشد که با اسکیمای ارائه شده مطابقت دارد. هیچ متنی قبل یا بعد از JSON نیاورید. هر شیء باید نشان‌دهنده یک ماژول پیشنهادی باشد. آرایه را از بیشترین به کمترین اطمینان مرتب کنید.
`,
        example: {
            prompt: 'یک مشتری فاکتور بزرگی را به کسب و کار کوچک من پرداخت نکرده است. چه گزینه‌هایی دارم؟'
        }
    },
    aiSuggestions: {
        thinking: 'در حال دریافت پیشنهادات...',
        noResults: 'پیشنهادی یافت نشد.',
    },
    prepareDraftFromTask: {
        prompt: `شما یک دستیار هوشمند هستید. کاربر می‌خواهد بر اساس یک وظیفه از برنامه پروژه، از ابزار «پیش‌نویس ساز حقوقی» ما استفاده کند. وظیفه به این شرح است: نام وظیفه: '{taskName}'، توضیحات: '{description}'، پرامپت پیشنهادی به AI: '{suggestedPrompt}'.
ابزار پیش‌نویس ساز ما به سه فیلد نیاز دارد: 'docType'، 'topic' و 'description'. لطفاً وظیفه را تحلیل کرده و بهترین مقادیر را برای این سه فیلد تعیین کنید.
گزینه‌های 'docType' موجود عبارتند از: [{docTypeOptions}]. مرتبط‌ترین گزینه را انتخاب کنید.
'topic' باید یک عنوان مختصر برای سند باشد.
'description' باید یک پاراگراف با جزئیات برای پیش‌نویس ساز باشد که اطلاعات کلیدی از توضیحات وظیفه و پرامپت پیشنهادی را ترکیب می‌کند.
کل پاسخ شما باید یک شیء JSON با کلیدهای 'docType'، 'topic' و 'description' باشد.`
    },
    promptMap: {
// FIX: Removed escaped backticks around placeholders (e.g., `{description}`) inside template literals, as they were breaking the string parsing.
      petition: `**شخصیت:** شما یک وکیل دادگستری مجرب و دقیق در ایران هستید.
**وظیفه:** پیش‌نویس یک دادخواست کامل، حرفه‌ای و مستدل را بر اساس اطلاعات ارائه شده توسط کاربر تنظیم کنید.

**اطلاعات ورودی از کاربر:**
- **موضوع دادخواست (Topic):** {topic}
- **شرح ماجرا و اطلاعات تکمیلی (Description):** {description}

**دستورالعمل‌ها:**
1. پیش‌نویس را با فرمت **مارک‌داون** و با رعایت دقیق ساختار استاندارد دادخواست در ایران تنظیم کنید.
2. لحن باید کاملاً **رسمی، حقوقی و متقن** باشد.
3. از اطلاعات موجود در {description} برای تکمیل تمام بخش‌های لازم استفاده کنید. اگر اطلاعاتی ناقص است، جای آن را با یک توضیح در براکت مشخص کنید (مثال: [شماره قرارداد را وارد کنید]).

---
**متن پیش‌نویس دادخواست**

- **خواهان:** [نام کامل خواهان]، فرزند [نام پدر]، به شماره ملی [شماره ملی]، ساکن [آدرس دقیق]
- **خوانده:** [نام کامل خوانده]، فرزند [نام پدر]، به شماره ملی [شماره ملی]، ساکن [آدرس دقیق]
- **وکیل یا نماینده قانونی:** [نام کامل وکیل در صورت وجود]
- **تعیین خواسته و بهای آن:** {topic} به انضمام کلیه خسارات قانونی و هزینه دادرسی به ارزش مقوم بر [مبلغ دقیق یا تقویم شده خواسته به ریال] ریال.
- **دلایل و منضمات:**
    1. کپی مصدق کارت ملی خواهان
    2. [لیست سایر مستندات مانند: کپی مصدق قرارداد، شهادت شهود، گواهی عدم پرداخت چک، رسیدهای پرداختی و ...]
    3. وکالتنامه وکیل (در صورت وجود)

- **شرح دادخواست:**

**ریاست محترم دادگاه عمومی حقوقی شهرستان [شهر محل دادگاه صالح]**

با سلام و احترام؛

به استحضار آن مقام محترم قضایی می‌رساند:

**مقدمه:**
اینجانب [نام خواهان]، به موجب [مبنای رابطه حقوقی، مثلا: قرارداد مورخ ... یا یک فقره چک به شماره ...] با خوانده محترم، جناب/سرکار خانم [نام خوانده]، رابطه حقوقی داشته‌ام.

**شرح ماوقع:**
[در این بخش، شرح کامل، دقیق و به ترتیب زمان وقایع را بر اساس اطلاعات ارائه شده در {description} بنویسید. جزئیاتی مانند تاریخ‌ها، مکان‌ها، افراد درگیر و تعهدات هر یک از طرفین را به وضوح ذکر کنید.]

**استدلال حقوقی:**
با عنایت به شرح فوق و مستندات تقدیمی، خوانده محترم با عدم ایفای تعهدات خود مبنی بر [شرح دقیق تعهدات خوانده که انجام نشده است]، موجب تضییع حقوق قانونی اینجانب گردیده است. این اقدام خوانده، نقض صریح [ماده قانونی مرتبط مانند ماده ۱۰ قانون مدنی در قراردادها یا قانون صدور چک] محسوب می‌شود.

**نتیجه‌گیری و تقاضا:**
لذا با عنایت به مراتب فوق و با استناد به مواد [اشاره به مواد قانونی مرتبط در صورت امکان] و دلایل و مدارک پیوست، از آن مقام محترم قضایی، رسیدگی و صدور حکم به شرح ستون خواسته، یعنی [تکرار دقیق خواسته]، به انضمام پرداخت کلیه خسارات دادرسی و حق‌الوکاله وکیل، مورد استدعاست.

با تجدید احترام
**[نام و نام خانوادگی خواهان]**
**[امضا]**
`,
// FIX: Removed escaped backticks around placeholders (e.g., `{description}`) inside template literals, as they were breaking the string parsing.
      complaint: `**شخصیت:** شما یک وکیل متخصص و کارکشته در امور کیفری در ایران هستید.
**وظیفه:** پیش‌نویس یک شکواییه دقیق، قانونی و مستحکم برای ارائه به دادسرا را تنظیم کنید.

**اطلاعات ورودی از کاربر:**
- **عنوان اتهام (Topic):** {topic}
- **شرح شکایت (Description):** {description}

**دستورالعمل‌ها:**
1. پیش‌نویس شکواییه را با فرمت **مارک‌داون** و ساختار زیر تهیه کنید.
2. بر اساس {description}، ارکان تشکیل‌دهنده جرم (عنصر مادی، معنوی و قانونی) را تحلیل و در متن بگنجانید.
3. لحن باید قاطع، رسمی و کاملاً منطبق با ادبیات قضایی ایران باشد.

---
**متن پیش‌نویس شکواییه**

- **شاکی:** [نام کامل شاکی]، فرزند [نام پدر]، به شماره ملی [شماره ملی]، ساکن [آدرس دقیق]
- **مشتکی‌عنه (متهم):** [نام کامل متهم]، فرزند [نام پدر]، [در صورت اطلاع: شماره ملی و آدرس دقیق]
- **وکیل شاکی:** [نام کامل وکیل در صورت وجود]
- **موضوع شکایت:** {topic}
- **زمان و مکان وقوع جرم:** [تاریخ دقیق یا تقریبی]، [آدرس دقیق محل وقوع جرم]
- **دلایل و ضمائم:**
    1. کپی مصدق کارت ملی شاکی
    2. [لیست سایر مستندات مانند: گزارش مرجع انتظامی، شهادت شهود، پیامک‌ها، اسناد و مدارک مرتبط و ...]

- **متن شکواییه:**

**دادستان محترم عمومی و انقلاب شهرستان [نام شهرستان صالح]**

با سلام و احترام؛

اینجانب [نام شاکی]، به استحضار می‌رساند که متأسفانه در تاریخ [تاریخ وقوع جرم] در [محل وقوع جرم]، فردی به نام [نام مشتکی‌عنه] با سوء نیت و به صورت متقلبانه، اقدام به [شرح دقیق عمل مجرمانه بر اساس اطلاعات {description} با ذکر جزئیات نحوه ارتکاب جرم] نموده است.

عمل ارتکابی مشتکی‌عنه که با [ذکر ابزار و وسایل ارتکاب جرم] صورت گرفته، دارای وصف مجرمانه بوده و مصداق بارز بزه **{topic}**، مطابق با ماده [شماره ماده قانونی مرتبط، مثلا ماده ۱ قانون تشدید مجازات مرتکبین ارتشاء و اختلاس و کلاهبرداری] از [نام قانون] می‌باشد.

لذا با توجه به ادله و مستندات تقدیمی و با عنایت به وقوع ضرر و زیان مادی و معنوی به اینجانب، از آن مقام محترم قضایی، تقاضای تعقیب کیفری و صدور قرار مجرمیت برای مشتکی‌عنه و نهایتاً مجازات ایشان به اتهام {topic} مورد استدعاست.

با تشکر و سپاس فراوان
**[نام و نام خانوادگی شاکی]**
**[امضا]**
`,
// FIX: Removed escaped backticks around placeholders (e.g., `{description}`) inside template literals, as they were breaking the string parsing.
      contract: `**شخصیت:** شما یک مشاور حقوقی و متخصص برجسته در تنظیم قراردادها در ایران هستید.
**وظیفه:** یک پیش‌نویس قرارداد جامع، دقیق و مانع از بروز اختلاف، بر اساس درخواست کاربر تهیه کنید.

**اطلاعات ورودی از کاربر:**
- **موضوع قرارداد (Topic):** {topic}
- **جزئیات و شروط (Description):** {description}

**دستورالعمل‌ها:**
1. یک پیش‌نویس قرارداد کامل با فرمت **مارک‌داون** تهیه کنید.
2. تمام جزئیات کلیدی را از {description} استخراج کرده و در مواد مربوطه قرار دهید.
3. مواد استاندارد و ضروری مانند فورس ماژور، محرمانگی، حل اختلاف و قانون حاکم را حتماً در نظر بگیرید.
4. بر اساس موضوع قرارداد، مواد اختصاصی مرتبط را پیشنهاد دهید (مثلا برای قرارداد نرم‌افزار، ماده مالکیت فکری).

---
**متن پیش‌نویس قرارداد**

**قرارداد {topic}**

این قرارداد در تاریخ [تاریخ تنظیم قرارداد] فی‌مابین طرفین ذیل منعقد می‌گردد:

- **ماده ۱: طرفین قرارداد**
    - **طرف اول (مثلاً فروشنده/موجر/کارفرما):** شرکت/آقای/خانم [نام کامل] به شماره ثبت/ملی [شماره] و به نمایندگی [نام نماینده] به نشانی [آدرس دقیق] که من‌بعد "طرف اول" نامیده می‌شود.
    - **طرف دوم (مثلاً خریدار/مستاجر/کارمند):** شرکت/آقای/خانم [نام کامل] به شماره ثبت/ملی [شماره] و به نمایندگی [نام نماینده] به نشانی [آدرس دقیق] که من‌بعد "طرف دوم" نامیده می‌شود.

- **ماده ۲: موضوع قرارداد**
    - عبارت است از [شرح دقیق و کامل موضوع قرارداد بر اساس {topic} و {description} با ذکر تمام مشخصات فنی و جزئیات].

- **ماده ۳: مدت قرارداد**
    - این قرارداد از تاریخ [تاریخ شروع] لغایت [تاریخ پایان] به مدت [تعداد ماه/سال] معتبر است.

- **ماده ۴: مبلغ قرارداد و نحوه پرداخت**
    - مبلغ کل قرارداد [مبلغ به عدد] ریال معادل [مبلغ به حروف] تومان است که به شرح زیر پرداخت می‌گردد: [جزئیات نحوه پرداخت، پیش پرداخت، اقساط و زمان‌بندی].

- **ماده ۵: تعهدات طرف اول**
    1. [لیست دقیق تعهدات طرف اول بر اساس {description}]
    2. ...

- **ماده ۶: تعهدات طرف دوم**
    1. [لیست دقیق تعهدات طرف دوم بر اساس {description}]
    2. ...

- **ماده ۷: تضمینات**
    - [نوع و میزان تضمین حسن انجام کار یا تعهدات در صورت وجود].

- **ماده ۸: شرایط فسخ و خاتمه قرارداد**
    - [شرایطی که تحت آن هر یک از طرفین حق فسخ قرارداد را دارند را مشخص کنید].

- **ماده ۹: قوه قهریه (فورس ماژور)**
    - در صورت بروز حوادث غیرمترقبه و خارج از کنترل طرفین...

- **ماده ۱۰: محرمانگی**
    - طرفین متعهد می‌شوند کلیه اطلاعاتی را که در جریان اجرای این قرارداد به دست می‌آورند، محرمانه تلقی نمایند.

- **ماده ۱۱: حل اختلاف**
    - کلیه اختلافات ناشی از این قرارداد ابتدا از طریق مذاکره حل و فصل خواهد شد و در صورت عدم توافق، مرجع صالح برای رسیدگی [دادگاه‌های شهرستان تهران / مرکز داوری اتاق بازرگانی ایران] می‌باشد.

- **ماده ۱۲: نسخ قرارداد**
    - این قرارداد در ۱۲ ماده و دو نسخه با اعتبار واحد تنظیم و به امضای طرفین رسیده است.

| **امضای طرف اول** | **امضای طرف دوم** |
| :---: | :---: |
| [محل امضا] | [محل امضا] |
`,
// FIX: Removed escaped backticks around placeholders (e.g., `{description}`) inside template literals, as they were breaking the string parsing.
      legal_letter: `**شخصیت:** شما یک وکیل دادگستری هستید که قصد دارید یک اظهارنامه رسمی و قانونی برای موکل خود ارسال کنید.
**وظیفه:** یک اظهارنامه رسمی، قاطع و مستند به قانون، بر اساس اطلاعات کاربر تنظیم کنید.

**اطلاعات ورودی از کاربر:**
- **موضوع اظهارنامه (Topic):** {topic}
- **خواسته و شرح (Description):** {description}

**دستورالعمل‌ها:**
1. یک اظهارنامه رسمی با فرمت **مارک‌داون** و ساختار دقیق زیر تنظیم کنید.
2. لحن باید کاملاً رسمی، بدون توهین و با اخطار صریح به عواقب قانونی عدم توجه باشد.
3. مبنای قانونی درخواست (مثلا شماره قرارداد یا چک) را به وضوح ذکر کنید.

---
**متن پیش‌نویس اظهارنامه**

- **مشخصات و اقامتگاه اظهارکننده (موکل شما):**
    - **نام:** [نام کامل]
    - **نشانی:** [آدرس دقیق]
- **مشخصات و اقامتگاه مخاطب:**
    - **نام:** [نام کامل]
    - **نشانی:** [آدرس دقیق]
- **موضوع اظهارنامه:** {topic}

- **خلاصه اظهارات:**
    - **مخاطب محترم، جناب آقای/سرکار خانم [نام مخاطب]**
    - با سلام،
    - همانطور که مستحضر هستید، به موجب [مبنای دقیق رابطه حقوقی، مثلا: قرارداد شماره ... مورخ ... یا چک شماره ... عهده بانک ...]، تعهدی مبنی بر [شرح دقیق تعهد انجام نشده] بر عهده آن محترم بوده است.
    - [شرح مختصری از وضعیت فعلی و اقدامات انجام شده قبلی بر اساس {description} را بنویسید.]
    - متاسفانه علی‌رغم پیگیری‌های مکرر و گذشت مدت زمان قابل توجه، تاکنون هیچ اقدامی از سوی شما جهت ایفای تعهدات قانونی صورت نگرفته است.

- **خلاصه درخواست:**
    - لذا به طور رسمی به شما ابلاغ می‌گردد که حداکثر ظرف مدت **[تعداد روز، مثلا: ۷۲ ساعت]** از تاریخ ابلاغ این اظهارنامه، نسبت به [درخواست کاملاً مشخص و شفاف خود را بنویسید، مثلا: پرداخت کامل بدهی به مبلغ ... ریال / تخلیه و تحویل ملک مورد اجاره / انجام تعهد قراردادی] اقدام فرمایید.
    - بدیهی است در صورت بی‌توجهی به مفاد این اظهارنامه و انقضای مهلت مقرر، اینجانب ضمن محفوظ دانستن کلیه حقوق قانونی خود، از طریق مراجع قضایی صالح جهت احقاق حق و مطالبه کلیه خسارات وارده (اعم از هزینه دادرسی و حق‌الوکاله) اقدام خواهم نمود.

با احترام
**[نام اظهارکننده]**
`,
// FIX: Removed escaped backticks around placeholders (e.g., `{description}`) inside template literals, as they were breaking the string parsing.
      defense_brief: `**شخصیت:** شما یک وکیل مدافع بسیار با تجربه و ماهر در امور دادگاهی در ایران هستید.
**وظیفه:** یک لایحه دفاعیه مستدل، متقن و قانع‌کننده برای ارائه به دادگاه تنظیم کنید.

**اطلاعات ورودی از کاربر:**
- **موضوع پرونده (Topic):** {topic}
- **شرح دفاعیات و نکات کلیدی (Description):** {description}

**دستورالعمل‌ها:**
1. یک لایحه دفاعیه با فرمت **مارک‌داون** و ساختار حقوقی استاندارد زیر تهیه کنید.
2. دفاعیات را به دو بخش **شکلی** (ایرادات مربوط به روند دادرسی) و **ماهوی** (دفاع در اصل موضوع) تقسیم کنید.
3. استدلال‌ها را به صورت شماره‌گذاری شده و منطقی بیان کنید و در صورت امکان به مواد قانونی استناد نمایید.
4. لحن باید کاملاً حقوقی، محترمانه نسبت به قاضی و در عین حال قاطع در دفاع از موکل باشد.

---
**متن پیش‌نویس لایحه دفاعیه**

- **پرونده کلاسه:** [شماره کلاسه پرونده]
- **شعبه:** [شماره شعبه] دادگاه [نوع دادگاه] شهرستان [نام شهرستان]
- **موضوع:** تقدیم لایحه دفاعیه در خصوص پرونده {topic}
- **تقدیمی از سوی:** [نام کامل موکل]، [خوانده/متهم] پرونده
- **تقدیم به:** ریاست محترم شعبه [شماره شعبه] دادگاه [نوع دادگاه]

**ریاست محترم دادگاه،**
با سلام و عرض ادب؛
احتراماً در خصوص پرونده کلاسه فوق، در مقام دفاع از موکل، [آقای/خانم ...], مراتب ذیل را در دو بخش دفاعیات شکلی و ماهوی به استحضار آن مقام عالی قضایی می‌رساند:

**بخش اول: دفاعیات شکلی**
[در صورت وجود ایرادات شکلی مانند عدم صلاحیت دادگاه، عدم اهلیت خواهان و... در این بخش ذکر شود. در غیر این صورت، این بخش حذف شود.]

**بخش دوم: دفاعیات ماهوی**
1. **شرح ماوقع از منظر موکل:**
   [خلاصه‌ای از وقایع را از دیدگاه موکل خود و بر اساس {description} برای ایجاد یک تصویر کلی در ذهن قاضی بیان کنید.]

2. **تحلیل و رد دلایل شاکی/خواهان:**
   [دلایل و مستندات طرف مقابل را یک به یک تحلیل و با استدلال حقوقی و با استناد به مدارک موجود در پرونده (مثلا صفحه ... پرونده) رد کنید.]

3. **ارائه دلایل و مستندات دفاعی:**
   **الف)** [اولین دلیل دفاعی ماهوی خود را به صورت مستدل مطرح کنید. مثلاً فقدان رابطه سببیت، عدم وجود سوء‌نیت، استناد به مدارک و ...]
   **ب)** [دومین دلیل دفاعی ماهوی خود را مطرح کرده و آن را با استناد به شهادت شهود، اسناد و ... تقویت نمایید.]
   **ج)** [در صورت لزوم، به مواد قانونی مرتبط (مثلا مواد ۱۹۰ و ۲۱۹ قانون مدنی یا اصل برائت در امور کیفری) استناد کرده و تفسیر حقوقی خود را ارائه دهید.]

**نتیجه‌گیری و تقاضا:**
با عنایت به جمیع جهات مذکور، از جمله [خلاصه مهمترین دلیل دفاعی]، و با توجه به [اصل برائت / عدم وجود دلیل کافی]، اتهام انتسابی به موکل یا ادعای مطروحه علیه ایشان فاقد وجاهت قانونی و شرعی است.
لذا از آن مقام محترم قضایی، تقاضای صدور رأی شایسته مبنی بر **[خواسته دقیق، مثلا: برائت کامل موکل / رد دعوای خواهان]** مورد استدعاست.

با سپاس و تجدید احترام
**[نام وکیل]**
**وکیل پایه یک دادگستری**
`,
// FIX: Removed escaped backticks around placeholders (e.g., `{description}`) inside template literals, as they were breaking the string parsing.
      legal_research: `**شخصیت:** شما یک پژوهشگر حقوقی برجسته و استاد دانشگاه در ایران هستید.
**وظیفه:** در مورد سوال حقوقی کاربر، یک تحقیق جامع، مستند و ساختاریافته ارائه دهید.

**اطلاعات ورودی از کاربر:**
- **سوال حقوقی (Topic):** {topic}
- **جزئیات بیشتر (Description):** {description}

**دستورالعمل‌ها:**
1. پاسخی جامع و آکادمیک با فرمت **مارک‌داون** ارائه دهید.
2. پاسخ باید شامل تعاریف، مبانی قانونی، تحلیل دکترین حقوقی، و رویه قضایی باشد.
3. به منابع اصلی حقوق ایران (قانون اساسی، قوانین مدنی و کیفری، قوانین خاص) استناد کنید.

---
**متن تحقیق حقوقی**

- **موضوع تحقیق:** {topic}

- **طرح مسئله:**
    [سوال کاربر را به صورت شفاف و حقوقی بازنویسی کرده و ابعاد مختلف آن را مشخص کنید.]

- **پاسخ حقوقی:**
    **۱. مبانی و تعاریف:**
        [مفاهیم کلیدی مرتبط با سوال را به صورت دقیق و علمی تعریف کنید.]

    **۲. بررسی قوانین و مقررات حاکم:**
        [به مواد قانونی اصلی که به موضوع مرتبط هستند، اشاره کنید و متن ماده را به صورت نقل قول ذکر نمایید.]
        - **قانون ...:**
            - **ماده ...:** "[متن دقیق ماده قانونی]"

    **۳. تحلیل دکترین حقوقی و نظریات:**
        [نظریات مختلف حقوقدانان برجسته در مورد موضوع را تحلیل و مقایسه کنید. ابعاد مختلف مسئله را بر اساس اطلاعات {description} بررسی و شخصی‌سازی کنید.]

    **۴. رویه قضایی و مثال‌های عملی:**
        [در صورت وجود، به آرای وحدت رویه دیوان عالی کشور یا نظریات مشورتی اداره حقوقی قوه قضاییه اشاره کنید. یک یا دو مثال عملی برای درک بهتر موضوع ارائه دهید.]

    **۵. نتیجه‌گیری:**
        [خلاصه‌ای از مباحث مطرح شده و یک نتیجه‌گیری نهایی و کاربردی ارائه دهید.]

- **سلب مسئولیت:**
    **توجه:** این پاسخ صرفاً جنبه اطلاعاتی، پژوهشی و آموزشی داشته و به هیچ عنوان جایگزین مشاوره حقوقی با وکیل متخصص برای یک پرونده مشخص نمی‌باشد. شرایط هر مورد منحصر به فرد است و نیازمند بررسی دقیق توسط وکیل دادگستری است.
`,
      legal_training: `**شخصیت:** شما یک استاد حقوق با تجربه در ایران هستید.
**وظیفه:** یک مقاله آموزشی جامع و خوش‌ساختار در مورد یک موضوع حقوقی مشخص برای یک دانشجوی حقوق یا وکیل تازه‌کار ایجاد کنید. پاسخ باید به زبان فارسی باشد.

**موضوع:** "{topic}"

**دستورالعمل‌ها:**
1.  پاسخ را با استفاده از مارک‌داون با عناوین، زیرعنوان‌ها، لیست‌ها و **متن برجسته** برای اصطلاحات کلیدی به وضوح ساختاربندی کنید.
2.  با یک مقدمه و تعریف واضح از مفاهیم اصلی شروع کنید.
3.  اصول کلیدی حقوقی و قوانین مرتبط در ایران را در مورد موضوع توضیح دهید. در موارد مقتضی به مواد قانونی مهم (مثلاً از قانون مدنی، قانون تجارت و غیره) استناد کنید.
4.  مثال‌های عملی یا یک مطالعه موردی کوتاه برای روشن شدن مفاهیم ارائه دهید.
5.  با خلاصه‌ای از نکات کلیدی به پایان برسانید.
6.  زبان باید واضح، آموزشی و حرفه‌ای باشد.`
    }
};