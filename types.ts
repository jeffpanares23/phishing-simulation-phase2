
export enum QuestionType {
  MCQ = 'MCQ',
  TRUE_FALSE = 'TRUE_FALSE',
  EMAIL_ID = 'EMAIL_ID'
}

export interface Option {
  id: string;
  text: string;
}

export interface EmailData {
  from: string;
  email: string;
  subject: string;
  body: string;
  linkText?: string;
  hoverUrl?: string;
  // Property to track if the email is a simulated phishing attempt
  isPhishing?: boolean;
  // Array of strings describing the specific red flags for a phishing email
  redFlags?: string[];
}

export interface Question {
  id: number;
  type: QuestionType;
  category: string;
  title: string;
  questionText?: string;
  options?: Option[];
  correctOptionId: string;
  explanation: string;
  emailData?: EmailData;
}

export interface QuizState {
  view: 'landing' | 'quiz' | 'result';
  currentStep: number;
  score: number;
  selectedOptionId: string | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
}
