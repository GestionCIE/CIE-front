class eventStatisticsApi {
  updateStatistics(data) {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3005/event/updateEventStatistics", {
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

  createEventStatistics(data) {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3005/event/createEventStatistics", {
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

  getEventStatistics() {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3005/event/getEventStatistics")
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        });
    });
  }
}

export default eventStatisticsApi;
