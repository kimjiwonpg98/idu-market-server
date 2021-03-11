`use strict`;

const express = require("express");
const router = express.Router();
const ctrl = require("./purchase-list.ctrl");

router.get("/", ctrl.output.read);
router.post("/", ctrl.process.update);

module.exports = router;
