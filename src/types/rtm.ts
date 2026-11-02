/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SchoolMetadata {
  schoolName: string;
  subTitle: string;
  district: string;
  province: string;
  npsn?: string;
  principalName: string;
  principalTitle: string;
  principalNip?: string;
  supervisorName?: string;
  meetingYear: number;
  meetingCycle: string;
  meetingDate: string;
  audience: string[];
}

export interface MetricIndicator {
  id: string;
  name: string;
  category: string;
  value2025: number;
  value2026: number;
  target2027: number;
  unit: string;
  scaleMax: number;
  thresholds: {
    kurang: number;
    cukup: number;
    baik: number;
  };
  delta: number;
  statusText: string;
  context: string;
  subFactors: string[];
}

export interface PriorityProgram {
  id: string;
  name: string;
  status: 'green' | 'amber' | 'red';
  statusLabel: string;
  targetQuantity: string;
  realizationQuantity: string;
  pctSuccess: number;
  impactAssessment: string;
  gapAnalysis: string;
}

export interface FishboneCause {
  id: string;
  category: string; // e.g., 'Kemitraan DUDI', 'Sistem & Jadwal', 'Kurikulum & Asesmen', 'SDM Guru'
  iconName: string;
  mainFinding: string;
  findingNumber: number;
  rootCauses: string[];
  evidence: string;
  recommendedFix: string;
}

export interface RTMDecision {
  id: string;
  category: 'Bidang Industri' | 'Bidang Pembelajaran' | 'Bidang Numerasi';
  title: string;
  strategicObjective: string;
  targetKPI: string;
  pic: string;
  timeline: string;
  implementationSteps: string[];
}

export interface TargetRoadmap {
  year: number;
  title: string;
  focus: string;
  milestones: string[];
}

export interface SlideDefinition {
  id: number;
  slideNumber: number;
  title: string;
  subtitle: string;
  category: string;
  allocatedMinutes: number; // e.g. 1.5 - 2 minutes each to total 10-15 mins
  presenterNote: string;
  keyTalkingPoints: string[];
}
