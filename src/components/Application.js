import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

const Ax = require("axios");

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  /**
   * Sets the day property of state to day.
   * @param {*} day
   */
  const setDay = day => setState({ ...state, day });

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map(appointment => {
    let interview = getInterview(state, appointment.interview);
    let interviewers = getInterviewersForDay(state, state.day)
      if(interview){
        return (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview.interviewer}
            student={interview.student}
            interviewers={interviewers}
          />
        );
      }
      else{
        return (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={null}
            interviewers={interviewers}
          />
        );
      }
  });

  useEffect(() => {
    let days = Ax.get("/api/days");
    let appointments = Ax.get("/api/appointments");
    let interviewers = Ax.get("/api/interviewers");

    Promise.all([days, appointments, interviewers]).then(res => {
      days = res[0].data;
      appointments = res[1].data;
      interviewers = res[2].data;

      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
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
      <section className="schedule"> {schedule}</section>{" "}
    </main>
  );
}
