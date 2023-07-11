import axios from "axios";

// todo 跨域问题,业务移动到后端
const username = "DBeidachazi";
const password = "a123456789";

const getToken = async() => {
  let token = null;
  await axios
    .post("https://sm.ms/api/v2/token", {
      username: username,
      password: password,
    })
    .then(function (response) {
      console.log(response.data.token);
      token = response.data.token;
    })
    .catch(function (error) {
      console.log(error);
    });
    return token;
};

export default getToken;
