const axios = require("axios");

const deleteUser = async (token) => {
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
};

module.exports = { deleteUser };
