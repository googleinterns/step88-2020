export const createUser = (email) => {
  fetch('/api/v1/createUser', {
    method: 'post',
    body: JSON.stringify(email)
  }).then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data.userKey);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
};

export const readUser = (userKey) => {
  fetch('/api/v1/readUser', {
    method: 'post',
    body: JSON.stringify(userKey)
  })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
};

export const deleteUser = (email) => {
  fetch('/api/v1/deleteUser')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
};

export const updateUser = (email,tripID,tripObject) => {
  fetch('/api/v1/updateUser')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
};
