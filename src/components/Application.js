import React, { useState, useEffect } from "react";
import Ax from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment"


const days = [];

const appointments = [
  {
    id: 1,
    time: "12pm"
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Andy Liang",
      interviewer: {
        id: 2,
        name: "Jackson Hayes",
        avatar:
          "https://s3media.247sports.com/Uploads/Assets/721/173/9173721.jpg"
      }
    }
  },
  {
    id: 4,
    time: "6pm",
    interview: {
      student: "Alred Payton",
      interviewer: {
        id: 3,
        name: "Coach POP",
        avatar:
          "https://s.yimg.com/ny/api/res/1.2/XmGyHIs3CYaE.ntojBDWTA--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en-GB/homerun/omnisport.uk/1db87d8b96528fc07de24ea5412bc64e"
      }
    }
  },
  {
    id: "last",
    time: "10am"
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");

  return (
    <main className="layout">
      <section className="sidebar">
        {" "}
        {/* Replace this with the sidebar elements during the "Environment Setup" activity. */}{" "}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={day => {
              setDay(day);
            }}
          />{" "}
        </nav>{" "}
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>{" "}
      <section className="schedule">
        {" "}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}{" "}

        {appointments.map((appointment) => 
        <Appointment
        key={appointment.id}
        {...appointment}
        >
        </Appointment>)}
      </section>{" "}
    </main>
  );
}
