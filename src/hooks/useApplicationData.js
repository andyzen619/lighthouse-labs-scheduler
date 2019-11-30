import React, { useReducer, useEffect } from "react";
import { stat } from "fs";

const Ax = require("axios");

const reducer = (state, action) => {
  switch (action.type) {
    case "setDay":
      return { ...state, day: action.value };
    case "updateInterview":
      return { ...state, appointments: action.value };
    case "setData":
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };
    case "setSpots":

      let newDaysArr = [...state.days];
      newDaysArr[action.dayIndex].spots = action.value;

      debugger
      return {
        //Code to update spots 
        ...state, 
        days: newDaysArr
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

const useApplictionData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  /**
   * Sets the day property of state to day.
   * @param {*} day
   */
  const setDay = day => dispatch({ type: "setDay", value: day });

  /**
   * Books interview
   * @param {*} id
   * @param {*} interview
   */
  const bookInterview = (id, interview) => {

    //Used with 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Make put request to update state locally and on server
    return Ax.put(`/api/appointments/${id}`, { interview }).then(res => {
      
      //Updates current day spots when apppoint has been successfully booked
      let currentDay = state.days.find(day => day.name === state.day);

      dispatch({type: "setSpots", value: currentDay.spots -1, dayIndex: currentDay.id - 1});

      //Updates appointment with correct booked interview information
      dispatch({ type: "updateInterview", value: appointments });  
    });
  };

  /**
   * Cancels interview for slot id
   * @param {*} id
   */
  const cancelInterview = id => {

    //Used for removing interview from appointment
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // dispatch({type: "setSpots", value: state.days[id -1].spots + 1, id: });
    return Ax.delete(`/api/appointments/${id}`).then(res => {

      //Increases spots available for current day when an appointment is canceled.
      let currentDay = state.days.find(day => day.name === state.day);

      dispatch({type: "setSpots", value: currentDay.spots + 1, dayIndex: currentDay.id - 1});

      // Removes interview from appointment when interview is canceled.
      dispatch({ type: "updateInterview", value: appointments });
    });
  };

  useEffect(() => {
    let days = Ax.get("/api/days");
    let appointments = Ax.get("/api/appointments");
    let interviewers = Ax.get("/api/interviewers");

    Promise.all([days, appointments, interviewers]).then(res => {
      days = res[0].data;
      appointments = res[1].data;
      interviewers = res[2].data;

      dispatch({
        type: "setData",
        value: { days, appointments, interviewers }
      });
    });
  }, []);
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplictionData;
