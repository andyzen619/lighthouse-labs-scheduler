import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);

  //Returns the schedule after looping through appointments
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
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            data-testid="appointment"
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
            bookInterview={bookInterview}
            data-testid="appointment"
          />
        );
      }
  });
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
            propDay={state.day}
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
