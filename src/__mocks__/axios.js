// Data that fakes our api-database server

const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 }
    },
    "4": { id: 4, time: "3pm", interview: null }
  },
  interviewers: {
    "1": {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png"
    },
    "4": {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg"
    }
  }
};


//Defines our fake get, put, delete requestion from our fake axios. For testing purposes.
  const defaults =  { url: "http://localhost:8000/"}

  /**
   * Mock Axios. get, returns status
   */
  const get = jest.fn(url => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.days
      });
    }

    if (url === "/api/appointments") {
      /* Resolve appointments data */

      return Promise.resolve({
        state: 200,
        statusText: "OK",
        data: fixtures.appointments
      })
    }

    if (url === "/api/interviewers") {
      /* Resolve interviewers data */

      return Promise.resolve({
        status: 200,
        statusText:"OK",
        data: fixtures.interviewers
      })
    }
  });


  /**
   * Axios.put, returns status code
   */
  const put = jest.fn((url, interview) => {
    const appointment_position = url[url.length-1];
    const interview_appointment = interview.interview;

    fixtures.appointments[appointment_position].interview = interview_appointment;
    console.log("Axios PUT succesfull");
    return Promise.resolve(
      {
      state: 204,
      statusText: "No Content",
      }
    )
  });


  export default {
    defaults,
    get,
    put,
    delete: jest.fn(url => {

      //Returns our mock delete request
      console.log("deleting");
      if (url === "/api/appointments/1" || url === "/api/appointments/2") {
        return Promise.resolve({
          status: 204,
          statusText: "No Content"
        });
      }
    })
  }
