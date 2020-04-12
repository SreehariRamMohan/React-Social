const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.route('/').post((req, res) => {
    const amount = req.body.amount;

    const paymentIntent = stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
      })
    
    paymentIntent.then(result => {
        res.json(result.client_secret)
    })
    .catch(error => {
        res.json(error);
    })

  });

  module.exports = router