const { HttpError } = require("../healpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      const errorName = error.details.map((item) => item.message);
      const errorWorld = errorName[0].split(" ");
      throw HttpError(400, `${errorWorld[0]} is required!`);
    }
    next();
  };

  return func;
};

module.exports = {
  validateBody,
};
