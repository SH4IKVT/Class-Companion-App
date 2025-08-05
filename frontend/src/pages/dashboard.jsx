import React, { useEffect } from 'react'
import { userAtom } from '../lib/atom'
import StudentDashboard from '../pages/StudentDashboard';
import TeacherDashboard from '../pages/TeacherDashboard';
import { useAtom } from 'jotai';

export default function Dashboard() {
    const [user, setUser] = useAtom(userAtom);
   
  return (
    <div>
      {
        user?.type === "student" ? <StudentDashboard user={user} /> : <TeacherDashboard user={user} />
      }
    </div>
  )
}
