'use strict';
const express = require("express");
const stripe = require("stripe")("sk_live_fIKXwqtbpIzeGU94lyir42UX");
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
