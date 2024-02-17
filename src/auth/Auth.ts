const userDataString = localStorage.getItem("access_token");
const userData = userDataString ? userDataString : null;
export const loginInProcess = userData ? userData : null;
