'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const OrderSchema = mongoose.Schema({
	orderedByUser : {
		type: String,
        required: true,
    },
	giftTo: {
		type: String,
		required: true,
	},
	giftFrom: {
		type: String,
		required: true,
	},
	phoneNumber:{
		type: String,
		required: true
	},
	deliveryPlace: {
		type: String,
		required: true
	},
	deliveryDate: {
		type: String,
		required: true
	},
	instructions: {
		type: String,
		required: true
	},
	gift: {
		type: String,
		required: true
	},
	superhero: {
		type: String,
		required: true
	},
	orderDate:{
		type: Date,
		required: true
	}
});

const Order = mongoose.model('Order',OrderSchema);

module.exports = {Order};