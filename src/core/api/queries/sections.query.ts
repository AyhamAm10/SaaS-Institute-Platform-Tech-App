import { useQuery } from '@tanstack/react-query';
import { get } from '../client';
import type { TeacherSection } from '../types';

export const sectionsKeys = { list: ['teacher', 'sections'] as const };

/** Sections (with subjects and student counts) the teacher teaches in this year. Shared by sections and exams. */
export function useSectionsQuery() {
  return useQuery({ queryKey: sectionsKeys.list, queryFn: () => get<TeacherSection[]>('/teacher/sections') });
}
