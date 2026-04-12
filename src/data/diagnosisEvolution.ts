export interface DiagnosisEvolutionRow {
  date: string
  age: string
  assessor: string
  diagnosis: string
}

export const DIAGNOSIS_EVOLUTION: DiagnosisEvolutionRow[] = [
  {
    date: 'Jun 2021',
    age: '4y10m',
    assessor: 'Carla Chedid, OpenMinds',
    diagnosis: 'ASD probable / SCD differential — left open pending further input',
  },
  {
    date: 'Aug 2021',
    age: '4y11m',
    assessor: 'Al Jalila (ADOS-2 pathway)',
    diagnosis: 'ASD confirmed — Mild',
  },
  {
    date: 'Jan 2022',
    age: '5y2m',
    assessor: 'AJCH full report',
    diagnosis: 'ASD Mild + Twice Exceptional (2e)',
  },
  {
    date: 'Mar 2023',
    age: '6y5m',
    assessor: 'Carbone BCBA',
    diagnosis: 'ASD — mainstream placement supported (VB-MAPP)',
  },
  {
    date: 'Jan 2025',
    age: '8y4m',
    assessor: 'Dr. Faniran, Mediclinic',
    diagnosis: 'ASD Level 2 — substantial support (upgraded)',
  },
]
