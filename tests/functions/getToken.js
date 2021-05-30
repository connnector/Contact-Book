const axios = require("axios");
const { URL } = require("../../constants");
const shortid = require("shortid");
const id = shortid.generate();
const email = `${id}@gmail.com`;
const name = `${id}@gmail.com`;
const password = id;

// sets token before every test
const getToken = async () => {
  const response = await axios.post(URL, {
    query: `
    mutation{
      signup(data:
      {
        name:"${name}"
        email:"${email}"
        password:"${password}"
      })
      {
        user{
          id
        }
        token,
        expirationTime
      }
    }
            `,
  });

  const { data } = response;
  return data.data.signup.token;
};

module.exports = {
  getToken,
};
