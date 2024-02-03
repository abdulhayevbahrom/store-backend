const AJV = require("ajv");
const ajv = new AJV();

async function add(schema, data) {
  const result = ajv.validate(schema, data);
  if (result) return null;
  return ajv.errorsText();
}

class productValidation {
  async add(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        orgPrice: {
          type: "number",
        },
        price: {
          type: "number",
        },
        quantity: {
          type: "number",
        },
        size: {
          type: "string",
        },
        category: {
          type: "string",
        },
        color: {
          type: "string",
        },
        subcategory: {
          type: "string",
        },
        brand: {
          type: "string",
        },
        barcode: {
          type: "string",
        },
      },
      required: ["title", "orgPrice", "price", "quantity", "category"],
      additionalProperties: false,
    };

    const result = await add(schema, req.body);
    if (!result) return next();
    await res.status(400).send(result);
  }
}

module.exports = new productValidation();
