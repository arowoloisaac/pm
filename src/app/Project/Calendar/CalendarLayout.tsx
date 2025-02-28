import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import { IIssue } from "@/app/Issue/utils/utils";
import { useParams } from "react-router-dom";
import { Token } from "@/components/Storage/Storage";
import { projectIssues } from "../api-functions/project-api";

const CalendarLayout = () => {
  const { projectId } = useParams();
  const [issues, setData] = useState<IIssue[]>([]);

  const retrieveIssue = async () => {
    try {
      const data = await projectIssues(projectId);
      data ? setData(data) : null;
    } catch (error:any) {
      alert(error.response.data)
    }
  };

  useEffect(() => {
    retrieveIssue()
  }, [Token]);


  const seperateEvents = issues.flatMap((item) => [
    {
      id: `${item.id}-start`,
      title: `🟢 ${item.name}`,
      start: item.startDate,
      allDay: true,
      color: "green",
      extendedProps: { item },
    },
    {
      id: `${item.id}-end`,
      title: `🔴 ${item.name}`,
      start: item.endDate,
      allDay: true,
      color: "red",
      extendedProps: { item },
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  selectedDate

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
};

export default CalendarLayout;
