
import { Question, QuestionType } from './types';

export const ASSESSMENT_QUESTIONS: Question[] = [
  // CATEGORY 1: MULTIPLE CHOICE (1-5) - Focus on Basics & Recaps
  {
    id: 1,
    type: QuestionType.MCQ,
    category: "PHISHING BASICS",
    title: "What is the primary goal of an attacker when sending a phishing email?",
    options: [
      { id: 'a', text: 'To educate the user on better security habits' },
      { id: 'b', text: 'To make victims click fast and think later' },
      { id: 'c', text: 'To ensure professional communication standards' }
    ],
    correctOptionId: 'b',
    explanation: "Slide 2: Phishing uses deception and urgency to force victims into acting quickly before they have a chance to verify the message."
  },
  {
    id: 2,
    type: QuestionType.MCQ,
    category: "WHY THIS MATTERS",
    title: "Which of the following is a potential consequence of a single successful phishing click?",
    options: [
      { id: 'a', text: 'Compromised work systems and financial loss' },
      { id: 'b', text: 'Improved inbox organization' },
      { id: 'c', text: 'Automatic password rotation' }
    ],
    correctOptionId: 'a',
    explanation: "Slide 3: One wrong click can expose personal privacy, affect your finances, or compromise entire corporate work systems."
  },
  {
    id: 3,
    type: QuestionType.MCQ,
    category: "RECOGNIZING SIGNALS",
    title: "Why do attackers often use brand impersonation (like banks or HR) in their emails?",
    options: [
      { id: 'a', text: 'They are legally required to state their affiliation' },
      { id: 'b', text: 'They want to provide a helpful service to employees' },
      { id: 'c', text: 'They study what people expect to see in their inbox' }
    ],
    correctOptionId: 'c',
    explanation: "Slide 3 & 4: Real-life phishing blends into normal tasks by mimicking brands and departments you deal with daily."
  },
  {
    id: 4,
    type: QuestionType.MCQ,
    category: "BEHAVIORAL RISK",
    title: "Which emotion is commonly exploited to override logic during a phishing attack?",
    options: [
      { id: 'a', text: 'Satisfaction with current security' },
      { id: 'b', text: 'Fear of losing access or missing deadlines' },
      { id: 'c', text: 'Indifference to email notifications' }
    ],
    correctOptionId: 'b',
    explanation: "Slide 7: Emotions like fear (losing access) or duty (urgent request) often override logical checking."
  },
  {
    id: 5,
    type: QuestionType.MCQ,
    category: "DEFENSIVE ACTIONS",
    title: "What is the recommended first step when an email 'feels off'?",
    options: [
      { id: 'a', text: 'Forward it to your teammates to ask their opinion' },
      { id: 'b', text: 'Pause and do not click right away' },
      { id: 'c', text: 'Reply to the sender and ask for verification' }
    ],
    correctOptionId: 'b',
    explanation: "Slide 10: The most critical step is to PAUSE. Breaking the cycle of urgency gives you time to check details carefully."
  },
  
  // CATEGORY 2: TRUE OR FALSE (6-10) - Rapid fire validation
  {
    id: 6,
    type: QuestionType.TRUE_FALSE,
    category: "RED FLAGS",
    title: "Spelling, formatting errors, or tone mismatches are common signs of a phishing attempt.",
    correctOptionId: 'true',
    explanation: "Slide 4: Attackers often make slight errors in branding, spelling, or tone that differ from legitimate corporate messages."
  },
  {
    id: 7,
    type: QuestionType.TRUE_FALSE,
    category: "TECHNICAL SIGNALS",
    title: "Attachments with ZIP or EXE formats from unknown senders are considered low-risk.",
    correctOptionId: 'false',
    explanation: "Slide 8: These are high-risk formats used to deliver malware; they should never be opened from unverified sources."
  },
  {
    id: 8,
    type: QuestionType.TRUE_FALSE,
    category: "VERIFICATION",
    title: "Confirming a suspicious request through another channel (call or official site) is a safe way to verify.",
    correctOptionId: 'true',
    explanation: "Slide 10: Always verify out-of-band. Never use the contact info provided within the suspicious email itself."
  },
  {
    id: 9,
    type: QuestionType.TRUE_FALSE,
    category: "HABITS",
    title: "Phishing thrives because it copies everyday situations that users expect.",
    correctOptionId: 'true',
    explanation: "Slide 11: By mimicking routine tasks, attackers increase the chance that a busy user will skim rather than check."
  },
  {
    id: 10,
    type: QuestionType.TRUE_FALSE,
    category: "OFFICE PRESSURE",
    title: "Attackers often time their emails to arrive at slow periods, like weekends, to avoid detection.",
    correctOptionId: 'false',
    explanation: "Slide 7: They often send emails during peak work hours when users are busy and more likely to skim through their inbox."
  },

  // CATEGORY 3: EMAIL IDENTIFICATION (11-15) - Analyze Communication
  {
    id: 11,
    type: QuestionType.EMAIL_ID,
    category: "WORK SIMULATION",
    title: "Analyze the Communication",
    emailData: {
      from: "IT Service Desk",
      email: "it.helpdesk@company-internal-support.net",
      subject: "Ticket #9921: Urgent Security Update Required",
      body: "Hello,\n\nOur system indicates your workstation is missing a critical security patch. Please click the link below to run the automated update tool immediately. Failure to update within 2 hours will result in a temporary lock of your network credentials to protect the company.\n\nThis is a mandatory compliance action.",
      linkText: "Run Security Patch Tool",
      hoverUrl: "http://update-secure-login.net/patch/auth"
    },
    correctOptionId: 'phishing',
    explanation: "Red Flags: High urgency (2 hours), threat of account lock, and an external .net domain instead of company.com."
  },
  {
    id: 12,
    type: QuestionType.EMAIL_ID,
    category: "FINANCE SIMULATION",
    title: "Analyze the Communication",
    emailData: {
      from: "Accounts Payable",
      email: "finance@yourcompany.com",
      subject: "Monthly Expense Reimbursement - Processed",
      body: "Hi there,\n\nYour recent travel expense report (ID: EX-402) has been approved and sent to payroll. You should see the funds in your next direct deposit.\n\nNo further action is required from you. If you have questions, please reach out via our internal portal.",
      linkText: "View internal portal",
      hoverUrl: "https://finance.yourcompany.com/portal"
    },
    correctOptionId: 'legitimate',
    explanation: "Legitimate: Correct internal domain, no urgency, and provides a 'no action required' message consistent with real finance tasks."
  },
  {
    id: 13,
    type: QuestionType.EMAIL_ID,
    category: "PERSONAL LIFE SIMULATION",
    title: "Analyze the Communication",
    emailData: {
      from: "Netflix Support",
      email: "billing-notices@netflix-verify-account.com",
      subject: "Action Required: Your subscription has been suspended",
      body: "Valued Member,\n\nWe were unable to process your most recent payment. Your streaming service will be suspended immediately unless you update your credit card details.\n\nPlease follow the link below to secure your billing info and keep watching your favorite shows.",
      linkText: "Update Payment Method",
      hoverUrl: "https://auth-netflix-billing-update.com/login"
    },
    correctOptionId: 'phishing',
    explanation: "Red Flags: Generic greeting ('Valued Member'), immediate urgency, and a suspicious domain (netflix-verify-account.com)."
  },
  {
    id: 14,
    type: QuestionType.EMAIL_ID,
    category: "HR SIMULATION",
    title: "Analyze the Communication",
    emailData: {
      from: "HR Benefits",
      email: "benefits@yourcompany.com",
      subject: "New Policy Update: 2024 Remote Work Guidelines",
      body: "Team,\n\nWe have updated the internal handbook regarding 2024 remote work guidelines. Please review the changes at your earliest convenience on the company intranet.\n\nThank you for your cooperation.",
      linkText: "https://intranet.yourcompany.com/hr/handbook",
      hoverUrl: "https://intranet.yourcompany.com/hr/handbook"
    },
    correctOptionId: 'legitimate',
    explanation: "Legitimate: Consistent internal links, professional tone, and no artificial pressure to act instantly."
  },
  {
    id: 15,
    type: QuestionType.EMAIL_ID,
    category: "DELIVERY SIMULATION",
    title: "Analyze the Communication",
    emailData: {
      from: "FedEx Delivery",
      email: "tracking@fedex-shipping-notifications.org",
      subject: "Delivery Exception: Package #FX-292193",
      body: "Hello,\n\nWe were unable to deliver your package today as a signature was required. \n\nPlease view the attached delivery manifest to reschedule or redirect your package to a local FedEx Office location.",
      linkText: "View Manifest.zip",
      hoverUrl: "http://tracking-fedex-shipping.net/download/manifest"
    },
    correctOptionId: 'phishing',
    explanation: "Red Flags: ZIP attachment (huge risk), external .org sender domain, and mismatched hover URL."
  }
];
