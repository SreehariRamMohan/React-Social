const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
var helmet = require('helmet');
app.use(helmet());


//stripe

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentIntent = stripe.paymentIntents.create({
  amount: 1099,
  currency: 'usd',
  // Verify your integration in this guide by including this parameter
  metadata: {integration_check: 'accept_a_payment'},
})
.then(result => {
  console.log(result)
})




const uri = process.env.ATLAS_URI;

console.log(uri);

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`\n*Server is running on port: ${port} \n`);
});