export const POST_UPLOAD_FILE_PROFILE =
  "http://localhost:3005/users/uploadProfile";

class ProfileApi {
  getProfile(id) {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3005/users/getUserById?id=${id}`)
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        });
    });
  }

  writeIdProfile(data) {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3005/users/writeIdProfile", {
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

  editProfile(data) {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3005/users/editUser", {
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

export default ProfileApi;
