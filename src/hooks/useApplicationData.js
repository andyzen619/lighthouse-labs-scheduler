import { useReducer, useEffect } from "react";

import axios from "axios";

import reducer from "../reducers/application";

/**
 * Returns our state and book/cancel interview functions
 */
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
   
    //Make put request to update state locally and on server
    return axios.put(`/api/appointments/${id}`, { interview }).then(res => {
    });
  };

  /**
   * Cancels interview for slot id
   * @param {*} id
   */
  const cancelInterview = id => {

    return axios.delete(`/api/appointments/${id}`).then(res => {
    });
  };

  useEffect(() => {
    let days = axios.get("/api/days");
    let appointments = axios.get("/api/appointments");
    let interviewers = axios.get("/api/interviewers");

    Promise.all([days, appointments, interviewers]).then(res => {
      days = res[0].data;
      appointments = res[1].data;
      interviewers = res[2].data;

      //Sends set up data to reducer to render correct state of application
      dispatch({
        type: "setData",
        value: { days, appointments, interviewers }
      });


      //Websocket set up
      const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      socket.onopen = () => {
        console.log("Web socket opened");
        socket.send("Ping...");
      };

      //On message from server, update state with interview
      socket.onmessage = appointmentData => {
        const appointment = JSON.parse(appointmentData.data);
        console.log(appointment);

        if (appointment.type === "SET_INTERVIEW") {

          dispatch({ type: "updateInterview", id: appointment.id, interview: appointment.interview});
        }
      };
    });
  }, []);
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplictionData;
