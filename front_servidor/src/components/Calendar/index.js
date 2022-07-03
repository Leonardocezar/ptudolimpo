import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import brLocale from "@fullcalendar/core/locales/pt-br";
import "./main.scss";
export default function Calendar({ data, eventClick, dateClick }) {
  return (
    <FullCalendar
      header={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      locale={brLocale}
      height={600}
      events={data}
      minTime="06:00:00"
      maxTime="20:00:00"
      dateClick={(date) => dateClick(date)}
      eventClick={(event) => eventClick(event)}
      defaultView="timeGridDay"
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      selectable={true}
    />
  );
}
