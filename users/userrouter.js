const router = require("express").Router();

const Users = require("./usermodule");
const restricted = require("../auth/restrictedmw");

router.get("/", restricted, checkRole(["department", "sales"]), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

function checkRole(department) {
  return function(req, res, next) {
    if (department.includes(req.decodedJwt.department)) {
      next();
    } else {
      res.status(403).json({ message: "Can't touch this!" });
    }
  };
}
