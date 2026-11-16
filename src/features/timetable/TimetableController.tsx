import { useState } from 'react';
import { useRouter } from 'expo-router';
import { TimetableContext, createTimetableStore } from './store/timetable.store';
import { TimetableQuerySync } from './TimetableQuerySync';
import { TimetableView } from './ui/TimetableView';

/** Weekly timetable: owns its isolated store, mounts the query bridge, renders the view. */
export function TimetableController() {
  const [store] = useState(createTimetableStore);
  const router = useRouter();
  return (
    <TimetableContext.Provider value={store}>
      <TimetableQuerySync store={store} />
      <TimetableView onNotifications={() => router.push('/notifications')} />
    </TimetableContext.Provider>
  );
}
