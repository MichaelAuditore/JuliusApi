const API_URL = "https://m-julius-api.herokuapp.com/api/";

const init = {
  method: "",
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem("tokenId")}`,
  },
  mode: "cors",
  cache: "default",
};

export const createOne = async (body) => {
  init.method = "POST";
  init.body = JSON.stringify(body);
  return await fetch(`${API_URL}post`, init)
    .then((resp) => resp.json())
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err));
};

export const getMany = async () => {
  const miInit = {
    method: "GET",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionStorage.getItem("tokenId")}`,
    },
    mode: "cors",
    cache: "default",
  };

  return await fetch(`${API_URL}post`, miInit)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};

export const getByMatch = async (match) => {
  const miInit = {
    method: "GET",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionStorage.getItem("tokenId")}`,
    },
    mode: "cors",
    cache: "default",
  };
  return await fetch(`${API_URL}post/match/${match}`, miInit)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};

export const updateOne = async (body, id) => {
  init.method = "PUT";
  init.body = JSON.stringify(body);
  return await fetch(`${API_URL}post/${id}`, init)
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));
};

export const deleteOne = async (id) => {
  init.method = "DELETE";
  if (init["body"]) delete init["body"];
  return await fetch(`${API_URL}post/${id}`, init)
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));
};
