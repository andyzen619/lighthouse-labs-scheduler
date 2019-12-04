/**
 * Reducer for handling all update and fetch states
 * @param {*} state 
 * @param {*} action 
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "setDay":
      return { ...state, day: action.value };

    case "updateInterview":

      let currentDay = state.days.find(
        day => day.appointments.includes(action.id)
      );

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

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default reducer;