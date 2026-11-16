import { EmptyState, Module, Row, Stack, StatusPill, Surface, Text, Timeline } from '@/components';
import type { Overview } from '@/core/api/types';
import { ar } from '@/core/strings/ar';
import { lessonState } from '../utils/today.utils';

/** Today's lessons on a rail: the current one is highlighted, the next one is labelled. */
export function LessonsBlock({ overview }: { overview: Overview }) {
  const { lessons, now, isWorkingDay } = overview;
  const nextIndex = lessons.findIndex((l) => lessonState(l, now) === 'upcoming');
  return (
    <Module>
      <Module.Header title={ar.today.lessonsTitle} />
      <Module.Content>
        {!isWorkingDay ? (
          <EmptyState icon="moon" title={ar.today.dayOff} />
        ) : lessons.length === 0 ? (
          <EmptyState icon="cafe" title={ar.today.noLessons} hint={ar.today.noLessonsHint} />
        ) : (
          <Timeline>
            {lessons.map((lesson, i) => {
              const state = lessonState(lesson, now);
              return (
                <Timeline.Item key={lesson.id} time={lesson.startTime} state={state} last={i === lessons.length - 1}>
                  <Surface variant={state === 'current' ? 'hero' : 'glass'} padding="md" gap="xs">
                    <Row justify="between" gap="sm">
                      <Stack fill gap="none">
                        <Text variant="label" numberOfLines={1}>{lesson.subjectName}</Text>
                        <Text variant="caption" tone="secondary" numberOfLines={1}>
                          {lesson.room ? `${lesson.sectionName} · ${lesson.room}` : lesson.sectionName}
                        </Text>
                      </Stack>
                      {state === 'current' ? <StatusPill label={ar.today.currentLesson} tone="accent" icon="play" /> : null}
                      {i === nextIndex ? <StatusPill label={ar.today.nextLesson} tone="info" /> : null}
                    </Row>
                  </Surface>
                </Timeline.Item>
              );
            })}
          </Timeline>
        )}
      </Module.Content>
    </Module>
  );
}
