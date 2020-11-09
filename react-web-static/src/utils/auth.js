const miInit = {
  method: "POST",
  crossDomain: true,
  headers: { "Content-Type": "application/json" },
  mode: "cors",
  cache: "default",
};
export const signUp = async (body) => {
  miInit.body = JSON.stringify(body);
  
  return await fetch(`https://m-julius-api.herokuapp.com/signup`, miInit)
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp["tokenId"]) {
        sessionStorage.setItem("tokenId", resp.tokenId);
        sessionStorage.setItem("email", resp.email);
        sessionStorage.setItem("userId", resp.userId);
      }
      return resp;
    })
    .catch((err) => console.err(err));
};

export const signIn = async (body) => {
  miInit.body = JSON.stringify(body);
  return await fetch(`https://m-julius-api.herokuapp.com/signin`, miInit)
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp["tokenId"]) {
        sessionStorage.setItem("tokenId", resp.tokenId);
        sessionStorage.setItem("email", resp.email);
        sessionStorage.setItem("userId", resp.userId);
      }
      return resp;
    })
    .catch((err) => console.err(err));
};
