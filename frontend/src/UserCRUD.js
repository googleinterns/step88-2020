export const createUser = (email) => {
  fetch(`/api/v1/createUser?email=${email}`)
    .then((response) => {
      if (response.status !== 200) {
        return {};
      }
      response.json().then((response) => {
        return response;
      });
    })
    .catch((err) => {
      return {};
    });
};

export const readUser = (email) => {
  fetch(`/api/v1/readUser?email=${email}`)
    .then((response) => {
      if (response.status !== 200) {
        return {};
      }
      response.json().then((response) => {
        return response;
      });
    })
    .catch((err) => {
      return {};
    });
};

export const updateUser = (email, trips) => {
  fetch(`/api/v1/updateUser?email=${email}&trips=${trips}`)
    .then((response) => {
      if (response.status !== 200) {
        return {};
      }
      response.json().then((response) => {
        return response;
      });
    })
    .catch((err) => {
      return {};
    });
};
