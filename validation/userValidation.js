const AJV = require("ajv");
const ajv = new AJV();

class userValidation {
  async add(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        firstname: {
          type: "string",
        },
        lastname: {
          type: "string",
        },
        age: {
          type: "number",
        },
        gender: {
          type: "string",
        },
        username: {
          type: "string",
        },
        password: {
          type: "string",
        },
        email: {
          type: "string",
        },
        phone: {
          type: "string",
        },
        address: {
          type: "string",
        },
        role: {
          type: "string",
        },
      },
      required: [
        "firstname",
        "lastname",
        "age",
        "gender",
        "username",
        "password",
        "email",
        "phone",
        "address",
        "role",
      ],
      additionalProperties: false,
    };
    const result = await add(schema, req.body);
    if (!result) return next();
    await res.status(400).send(result);
  }
}

async function add(schema, data) {
  const result = ajv.validate(schema, data);
  if (result) return null;
  return ajv.errorsText();
}

module.exports = new userValidation();
