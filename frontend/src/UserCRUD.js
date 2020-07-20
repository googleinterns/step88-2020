export const createUser = async (email) => {
  const response = await fetch(`/api/v1/createUser?email=${email}`);
  const json = await response.json();
  console.log(json);
  return json;
});

export const readUser = async (email) => {
  const response = await fetch(`/api/v1/readUser?email=${email}`);
  const json = await response.json();
  console.log(json);
  return json;
});

export const updateUser = async (email, trips) => {
  const response = await fetch(`/api/v1/updateUser?email=${email}&trips=${trips}`);
  const json = await response.json();
  console.log(json);
  return json;
});


// export const createUser = (email) => {
//   fetch(`/api/v1/createUser?email=${email}`)
//     .then((response) => {
//       if (response.status !== 200) {
//         return {};
//       }
//       response.json().then((response) => {
//         return response;
//       });
//     })
//     .catch((err) => {
//       return {};
//     });
// };
//
// export const readUser = (email) => {
//   fetch(`/api/v1/readUser?email=${email}`)
//     .then((response) => {
//       if (response.status !== 200) {
//         return {};
//       }
//       response.json().then((response) => {
//         return response;
//       });
//     })
//     .catch((err) => {
//       return {};
//     });
// };
//
// export const updateUser = (email, trips) => {
//   fetch(`/api/v1/updateUser?email=${email}&trips=${trips}`)
//     .then((response) => {
//       if (response.status !== 200) {
//         return {};
//       }
//       response.json().then((response) => {
//         return response;
//       });
//     })
//     .catch((err) => {
//       return {};
//     });
// };
