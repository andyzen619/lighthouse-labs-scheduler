import React, { useReducer, useEffect } from "react";

const Ax = require("axios");

const reducer = (state, action) => {
  switch (action.type) {
    case "setDay":
      return { ...state, day: action.value };
    case "update":
      return { ...state, appointments: action.value };
    case "setData":
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };
    case "setSpots":
      return {
        //Code to update spots 
        ...state, 
        days: [
          ...state.days, 
          {...state.days[action.id - 1], spots: action.value}
        ]
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
      //Updates state with new appointment in days and appointment keys
      dispatch({type: "setSpots", value: state.days.appointments + 1, id: id});
      dispatch({ type: "update", value: appointments });  
    });
  };

  /**
   * Cancels interview for slot id
   * @param {*} id
   */
  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Ax.delete(`/api/appointments/${id}`).then(res => {
      console.log(res);
      dispatch({ type: "update", value: appointments });
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
