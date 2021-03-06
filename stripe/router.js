'use strict';
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//plug in key for stripe here don't commit
const bodyParser = require('body-parser').text();

const router = express.Router();

router.post("/charge", bodyParser,async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 17500,
      currency: "usd",
      description: "Superhero Deliver",
      source: req.body
    });
    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = {router};
