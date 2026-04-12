/**
 * Snapshot from family records (April 2025). Update in data when team changes.
 */

export interface CareTeamRow {
  provider: string
  role: string
  status: string
}

export const CARE_TEAM_APRIL_2025: CareTeamRow[] = [
  { provider: 'Dr. Shola Faniran, Mediclinic', role: 'Consultant Paediatrician', status: 'Active — follow-up May 2025' },
  { provider: 'Arcadia School, Year 3', role: 'Education', status: 'Active' },
  { provider: 'LSA at Arcadia', role: 'School support', status: 'Active — BCBA training in progress' },
  { provider: 'BCBA (re-engaged late 2024)', role: 'Behaviour specialist', status: 'Active — FBA done, plan in place' },
  { provider: 'Neuropedia', role: 'Behavioural consultations', status: 'Active — in-clinic + home' },
  { provider: 'OT (weekly since May 2023)', role: 'Motor, sensory', status: 'Active' },
  { provider: 'Speech therapy (since Sep 2024)', role: 'Communication', status: 'Active — intermittent' },
  { provider: 'Giulia Maccarini, Autism Clinic London', role: 'CFT psychologist', status: 'Completed consultation Nov–Dec 2024' },
  { provider: 'Dr. Zeinab Alloub, AJCH', role: 'Paediatrician', status: 'Historical' },
  { provider: 'Carbone Clinic', role: 'BCBA / behaviour therapy', status: 'Historical' },
]
