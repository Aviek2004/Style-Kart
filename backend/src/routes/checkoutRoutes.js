const express = require("express");

const authenticate = require("../middleware/authMiddleware");

const {
  checkout,
} = require("../controllers/checkoutController");

const router = express.Router();

router.use(authenticate);

router.post("/", checkout);

module.exports = router;