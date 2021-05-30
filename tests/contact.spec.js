const axios = require("axios");
const { URL } = require("../constants.js");
const { getToken } = require("./functions/getToken.js");
const { deleteUser } = require("./functions/deleteUser.js");

let token;

beforeAll(async () => {
  token = await getToken();
});

afterAll(async () => {
  await deleteUser(token);
});

let contact_id;

describe("contact resolvers", () => {
  test("new contact", async () => {
    const response = await axios.post(
      URL,
      {
        query: `
                mutation{
                  newContact(data:{
                    name:"test",
                    email:"test@gmail.com"
                  })
                {
                    name,
                    id,
                    creator{
                      id
                    }
                }
            }`,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;

    contact_id = data.data.newContact.id;

    expect(data.data.newContact.id).not.toBe(null);
  });

  test("update contact", async () => {
    const response = await axios.post(
      URL,
      {
        query: `
                  mutation{
                    updateContact(
                      data:{
                        name:"new_name",
                      },
                      contact_id:"${contact_id}"
                    ){
                      id,  
                      email,
                      name
                      }
                  }`,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;

    console.log(data);

    expect(data).not.toBe(null);
  });

  test("delete contact", async () => {
    const response = await axios.post(
      URL,
      {
        query: `
              mutation{
                deleteContact(contact_id:"${contact_id}"){
                    id
                    name
                }
              }`,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;

    expect(data.data.deleteContact.id).not.toBe(null);
  });
});
