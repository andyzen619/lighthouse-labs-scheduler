export function getAppointmentsForDay(state, day) {

  let theDay = state.days.filter(d => d.name === day)[0];
  if(!theDay){
    return [];
  }
  let result = [];
  for(const id of theDay.appointments){
    const appointmentObj = state.appointments[id];
    console.log(appointmentObj);
    result.push(appointmentObj);
  }

  return result;
}