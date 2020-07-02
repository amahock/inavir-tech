const jwt = require("jsonwebtoken");

const userTokenGenerator = ({ email = "" } = {}) => {
  const token = jwt.sign(
    {
      sub: "user",
      email
    },
    process.env.JWT_KEY,
    {
      expiresIn: "3 hours"
    }
  );
  return token;
};

const userTokenValidator = (token = "") => {
  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    return data;
  } catch (e) {
    // console.error(e);
    return false;
  }
};

exports.userTokenGenerator = userTokenGenerator;
exports.userTokenValidator = userTokenValidator;
