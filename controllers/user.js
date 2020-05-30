const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
//const loginuser = require("../models")

process.env.SECRET_KEY = "secret";
exports.Register = (req, res, next) => {
  console.log(req.body.first_name);
  console.log(req.body.last_name);
  console.log(req.body.email);
  console.log(req.body.password);
  const UserData = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    cart: { items: [] },
  });

  User.findOne({ email: req.body.email }, function (err, user) {
    //if a user was found, that means the user's email matches the entered email
    if (user) {
      return res.send(
        "A user with that email has already registered. Please use a different email.."
      );
    } else {
      //code if no user with entered email was found
      UserData.save()
        .then((result) => {
          console.log("created success");
          res.status(200).send("success");
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  });
};

exports.Login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          };
          // req.session.isLoggedIn = true;
          // req.session.user = user;
          // req.session.save((err) => {
          //   console.log(err);
          // });

          let token = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
              expiresIn: 1440,
            },
            (err, token) => {
              res.json({
                success: true,
              });
            }
          );
          return res.send(token);
        } else {
          console.log("erroe");
          res.send("Invalid email or password,please try again");
        }
      } else {
        console.log("erroe");
        res.send("Invalid email or password,please try again");
      }
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
};
