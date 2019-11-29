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
  
  /**
   * Books interview
   * @param {*} id 
   * @param {*} interview 
   */
  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //Make put request to update state locally and on server
    return Ax.put(`/api/appointments/${id}`, {interview})
    .then(res=>{
      console.log(res);
      setState(
        {...state, appointments}
      );
    });
  }

  /**
   * Cancels interview for slot id
   * @param {*} id 
   */
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return Ax.delete(`/api/appointments/${id}`)
    .then(res=>{
      console.log(res);
      setState(
        {...state, appointments}
      );
    });
  } 

  
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
