'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {Order} = require('./orders');

const router = express.Router();

const jsonParser = bodyParser.json();

router.use(jsonParser);

const jwtAuth = passport.authenticate('jwt', {session: false});

router.post('/', jwtAuth,(req,res) => {
	const requiredFields = ['deliveryDate','deliveryPlace','gift','giftFrom',
	'giftTo','instructions','superhero','phoneNumber'];

	Order.create({
		orderedByUser: req.user.username,
		deliveryDate: req.body.deliveryDate,
		deliveryPlace: req.body.deliveryPlace,
		gift: req.body.gift,
		giftFrom: req.body.giftFrom,
		giftTo: req.body.giftTo, 
		instructions: req.body.instructions,
		superhero: req.body.superhero,
		phoneNumber: req.body.phoneNumber, 
		orderDate: new Date()
	})
	.then(order => {
		return res.status(201).json({msg: 'success'}).send();
	})
	.catch( err => {
		return res.status(500).json(err).send();
	});
});

router.get('/allorders', jwtAuth, function(req,res,next) {
	const userID = req.user.username;
	
	const querystring = {orderedByUser:userID};
	
	Order.find(querystring)
	.then(orders =>{
		 res.json(orders).end();
	}).catch( err=> {
		res.status(500).json({error: 'Something went wrong!'});
	});
});


router.delete('/:id', jwtAuth,(req,res) =>{
	Order
	.findByIdAndRemove(req.params.id)
	.then(() => {
		res.status(204).end();
	})
	.catch(err => {
		res.status(500);
	});
});

module.exports = {router};