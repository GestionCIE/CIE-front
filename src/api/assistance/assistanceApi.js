class AssistanceApi {
  getAllEvents() {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3005/tracing/getEvents")
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        });
    });
  }

  getAttendanceByEvent(id) {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3005/tracing/getAttendance", {
        method: "POST",
        body: JSON.stringify(id),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        });
    });
  }

  updateAttendance(data) {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3005/tracing/updateAttended", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        });
    });
  }
}

export default AssistanceApi;
