import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { IIssue } from "@/components/Task/utils/utils";
import { useParams } from "react-router-dom";
import { Token } from "@/components/Storage/Storage";
import { projectIssues } from "../api/project-api";

const CalendarLayout = () => {
  const { projectId } = useParams();
  const [issues, setData] = useState<IIssue[]>([]);

  const [getInitialView, setInitialView] = useState("dayGridMonth");

  const retrieveIssue = async () => {
    try {
      const data = await projectIssues(projectId);
      data ? setData(data) : null;
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    retrieveIssue();
  }, [Token]);

  const seperateEvents = issues.flatMap((item) => [
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
      color: "red",
      extendedProps: { item },
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  selectedDate;

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
  };

  useEffect(() => {
    if (window.innerWidth < 800) {
      setInitialView("timeGridDay"); 
    }
  }, []);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={getInitialView}
        events={seperateEvents}
        eventClick={handleDateClick}
        height="750px"
        // contentHeight="auto"
        aspectRatio={1.45}
      />
    </div>
  );
};

export default CalendarLayout;
