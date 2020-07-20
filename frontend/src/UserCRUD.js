export const createUser = async (email) => {
  const response = await fetch(`/api/v1/createUser?email=${email}`);
  const json = await response.json();
  return json;
};

export const readUser = async (email) => {
  const response = await fetch(`/api/v1/readUser?email=${email}`);
  const json = await response.json();
  return json;
};

export const updateUser = async (email, trips) => {
  const response = await fetch(`/api/v1/updateUser?email=${email}&trips=${trips}`);
  const json = await response.json();
  return json;
};
