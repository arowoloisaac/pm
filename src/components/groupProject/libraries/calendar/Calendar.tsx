import { Token } from '@/components/Storage/Storage';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { retrieveProjectCalendar } from '../../api/api';
import { IIssue } from '@/components/Task/utils/utils';

const Calendar = () => {
    const { organizationId, groupId, projectId } = useParams<{
      organizationId:string|any;
      groupId: string|any;
      projectId: string|any;
    }>();
    const [getCalendarTasks, setCalendarTasks] = useState<IIssue[]>([]);

    const retrieveIssue = async () => {
      try {
        const data = await retrieveProjectCalendar(projectId, organizationId, groupId);
        data ? setCalendarTasks(data) : null;
      } catch (error: any) {
        alert(error.response.data);
      }
    };

    useEffect(() => {
      retrieveIssue();
    }, [Token]);

    const seperateEvents = getCalendarTasks.flatMap((item) => [
      {
        id: `${item.id}-start`,
        title: `➡ ${item.name}`,
        start: item.startDate,
        allDay: true,
        // color: "green",
        extendedProps: { item },
      },
      {
        id: `${item.id}-end`,
        title: `⬅ ${item.name}`,
        start: item.endDate,
        allDay: true,
        // color: "red",
        color: "",
        extendedProps: { item },
      },
    ]);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    selectedDate;

    const handleDateClick = (info: any) => {
      setSelectedDate(info.dateStr);
    };

    return (
      <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={seperateEvents}
          eventClick={handleDateClick}
        />
      </div>
    );
}

export default Calendar