/** Formal reports on file — matches family document register (compiled April 2025). */

export interface DocumentInventoryRow {
  n: number
  document: string
  institution: string
  reportDate: string
  assessmentPeriod: string
  age: string
  sourceFile: string
}

export const DOCUMENT_INVENTORY: DocumentInventoryRow[] = [
  {
    n: 1,
    document: 'Comprehensive Psychological Report',
    institution: 'OpenMinds Centre, Dubai',
    reportDate: 'August 2021',
    assessmentPeriod: 'June–July 2021',
    age: '4y10m',
    sourceFile: 'OpenMinds report',
  },
  {
    n: 2,
    document: 'ASD Diagnostic Evaluation',
    institution: "Al Jalila Children's Specialty Hospital",
    reportDate: 'January 2022',
    assessmentPeriod: '23 Aug–15 Nov 2021',
    age: '4y11m–5y2m',
    sourceFile: 'AJCH attested report',
  },
  {
    n: 3,
    document: 'Initial Consultation Report (VB-MAPP)',
    institution: 'Carbone Clinic, Dubai',
    reportDate: '5 March 2023',
    assessmentPeriod: '2–3 March 2023',
    age: '6y5m',
    sourceFile: 'Carbone CC0131',
  },
  {
    n: 4,
    document: 'Summary of Psychology Input (CFT)',
    institution: 'Autism Clinic London (Harley Street)',
    reportDate: 'Filed 22 Jan 2026',
    assessmentPeriod: '26 Nov–10 Dec 2024',
    age: '8y2m',
    sourceFile: 'Update Notes 22_1_26.doc',
  },
  {
    n: 5,
    document: 'Paediatric Assessment Report',
    institution: 'Mediclinic City Hospital, Dubai',
    reportDate: '12 February 2025',
    assessmentPeriod: '9, 21, 23, 24 Jan 2025',
    age: '8y4m',
    sourceFile: 'Mediclinic Dr Faniran',
  },
]
