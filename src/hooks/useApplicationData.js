import { useReducer, useEffect } from "react";

const Ax = require("axios");

const reducer = (state, action) => {
  switch (action.type) {
    case "setDay":
      return { ...state, day: action.value };

    case "updateInterview":

      let currentDay = state.days.find(day => day.appointments.includes(action.id));

      if(action.interview){
        currentDay.spots -= 1;
        const appointment = {
          ...state.appointments[action.id],
          interview: { ...action.interview }
        };
        
        const appointments = {
          ...state.appointments,
          [ action.id]: appointment
        };
        let newDaysArr = [...state.days];
        newDaysArr[currentDay.id -1] = currentDay;
        return { ...state, appointments: appointments, days: newDaysArr };
      }
      else{
        currentDay.spots += 1;
        const appointment = {
          ...state.appointments[action.id],
          interview: null
        };
        
        const appointments = {
          ...state.appointments,
          [ action.id]: appointment
        };

        let newDaysArr = [...state.days];
        newDaysArr[currentDay.id -1] = currentDay;

        return { ...state, appointments: appointments, days: newDaysArr };
      }

    case "setData":
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers

      };
    // case "setSpots":
    //   let newDaysArr = [...state.days];
    //   newDaysArr[action.dayIndex].spots = action.value;

    //   return {
    //     //Code to update spots
    //     ...state,
    //     days: newDaysArr
    //   };
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
   
    //Make put request to update state locally and on server
    return Ax.put(`/api/appointments/${id}`, { interview }).then(res => {
    });
  };

  /**
   * Cancels interview for slot id
   * @param {*} id
   */
  const cancelInterview = id => {

    return Ax.delete(`/api/appointments/${id}`).then(res => {
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

      const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      socket.onopen = () => {
        console.log("Web socket opened");
        socket.send("Ping...");
      };
      socket.onmessage = appointmentData => {
        const appointment = JSON.parse(appointmentData.data);
        console.log(appointment);

        if (appointment.type === "SET_INTERVIEW") {

          // let currentDay = state.days.find(day => day.name === state.day);
          // dispatch({
          //   type: "setSpots",
          //   value: currentDay.spots + 1,
          //   dayIndex: currentDay.id - 1
          // });


          dispatch({ type: "updateInterview", id: appointment.id, interview: appointment.interview});
        }
      };
    });
  }, []);
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplictionData;
