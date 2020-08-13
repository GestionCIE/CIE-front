class ConfigurationApi {
  getAllSystemModules() {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3005/config/getSystemModules")
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        });
    });
  }

  updateVisibleModule(data) {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3005/config/updateVisible", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        });
    });
  }
}

export default ConfigurationApi;
