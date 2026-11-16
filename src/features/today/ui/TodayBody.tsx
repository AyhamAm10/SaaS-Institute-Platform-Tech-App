import { Module, Reveal } from '@/components';
import type { Overview } from '@/core/api/types';
import { ExamsBlock } from './ExamsBlock';
import { LessonsBlock } from './LessonsBlock';
import { PendingBlock } from './PendingBlock';

/** The blocks of the day in order of urgency; each reveals with a short stagger. */
export function TodayBody({ overview, onOpenExam }: { overview: Overview; onOpenExam: (examId: number, sectionId: number) => void }) {
  return (
    <Module>
      <Reveal index={0}><LessonsBlock overview={overview} /></Reveal>
      {overview.pendingMarks.length > 0 ? <Reveal index={1}><PendingBlock items={overview.pendingMarks} onOpen={onOpenExam} /></Reveal> : null}
      <Reveal index={2}><ExamsBlock exams={overview.upcomingExams} onOpen={onOpenExam} /></Reveal>
    </Module>
  );
}
