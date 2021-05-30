const axios = require("axios");
const { URL } = require("../constants.js");
const shortid = require("shortid");

const id = shortid.generate();
const email = `${id}@gmail.com`;
const name = `${id}@gmail.com`;
const password = id;
let token;

describe("auth resolvers", () => {
  test("signup", async () => {
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

    token = data.data.signup.token;

    expect(data.data.signup.id).not.toBe(null);
  });

  test("login", async () => {
    const response = await axios.post(URL, {
      query: `
            mutation{
                login(data: {
                  email:"${email}",
                  password:"${password}"
                }) {
                  user{
                    id
                  }
                  token
                }
              }
              `,
    });
    const { data } = response;

    expect(data.data.login.user.id).not.toBe(null);
  });

  test("update", async () => {
    const response = await axios.post(
      URL,
      {
        query: `
            mutation{
              updateUser(data:{
                name:"user"
              })
               {
               id,
               name
              } 
            }
              `,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;

    expect(data.data.updateUser.id).not.toBe(null);
  });

  test("delete", async () => {
    const response = await axios.post(
      URL,
      {
        query: `
            mutation{
              deleteUser{
                id,
                name
              }
            }
            `,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;

    expect(data.data.deleteUser.id).not.toBe(null);
  });
});
