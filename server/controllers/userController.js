const query = require("../database/model.js");
const queryTypes = require("../database/queryTypes.js");
const userController = {};

userController.signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  // (role, given_name, family_name, username, password)
  query(queryTypes.INSERT_USERS, [
    "user",
    name,
    "Abdukhamidov",
    email,
    password,
  ])
    .then((data) => {
      data = data.rows[0];
      res.locals.user = { name: data.given_name, email: data.username };
      return next();
    })
    .catch((error) => {
      return next({
        log: `userController.signUp:  Error posting tasks data from data base:${error.status}`,
        message: {
          err:
            "Error occurred in userController.signUp. Check server logs for details.",
        },
      });
    });
};

userController.login = (req, res, next) => {
  const username = req.body.email;
  const password = req.body.password;

  query(queryTypes.CHECK_USER, [username, password]) // (username, password)
    .then((data) => {
      res.locals.data = data.rows;
      return next();
    })
    .catch((error) => {
      return next({
        log: `userController.login:  Error posting tasks data from data base:${error.status}`,
        message: {
          err:
            "Error occurred in userController.login. Check server logs for details.",
        },
      });
    });
};

userController.postMessage = (req, res, next) => {
  console.log("inside userController.login");
  const { message } = req.body;
  console.log("message: ", message);

  query(queryTypes.INSERT_MESSAGE, [message]) // (message)
    .then((data) => {
      return next();
    })
    .catch((error) => {
      return next({
        log: `userController.postMessage:  Error posting tasks data from data base:${error.status}`,
        message: {
          err:
            "Error occurred in userController.postMessage. Check server logs for details.",
        },
      });
    });
};

module.exports = userController;
