import axios from "axios";

const API_URL = "http://localhost:9000/user/";

const register = (nom ,prenom, email, password) => {
  return axios.post(API_URL + "register", {
    nom,
    prenom,
    email,
    password,
  } ,{ withCredentials: true  });
};

const login = async (email, password) => {
  const response = await axios
    .post(API_URL + "login", {
       email,
      password,
    } , { withCredentials: true } );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data.user;
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
