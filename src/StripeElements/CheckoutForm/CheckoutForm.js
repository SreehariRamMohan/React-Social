import React from 'react';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import CardSection from '../CardSection/CardSection';
import { Button } from 'antd';

import "./CheckoutForm.css"

const axios = require('axios');

class CheckoutForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            paymentMade: false
        }
    }

    handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        const { stripe, elements } = this.props

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make  sure to disable form submission until Stripe.js has loaded.
            return;
        }

        this.setState({
            loading: true
        })

        let stripe_payment_payload = {
            "amount": 2099
        }

        //get the CLIENT_SECRET key asynchronously 
        axios.post("http://localhost:1080/payment", stripe_payment_payload)
            .then((response) => {
                console.log("response from stripe on pay", response.data);

                const client_secret = response.data;

                (async () => {
                    const result = await stripe.confirmCardPayment(client_secret, {
                        payment_method: {
                            card: elements.getElement(CardElement),
                            billing_details: {
                                name: 'Jenny Rosen',
                            },
                        }
                    });
                    return result;
                })()
                    .then(result => {
                        if (result.error) {
                            // Show error to your customer (e.g., insufficient funds)
                            console.log(result.error.message);
                        } else {
                            // The payment has been processed!
                            if (result.paymentIntent.status === 'succeeded') {
                                // Show a success message to your customer
                                // There's a risk of the customer closing the window before callback
                                // execution. Set up a webhook or plugin to listen for the
                                // payment_intent.succeeded event that handles any business critical
                                // post-payment actions.
                                console.log("payment suceeded yay :)")
                                this.setState({
                                    loading: false,
                                    paymentMade: true
                                })
                            }
                        }
                    })
            })
            .catch(function (error) {
                console.log("error from stripe on pay", error);

            })
    };

    render() {
        return (
            <div>
                <CardSection />
                <div className="buttonPayContainer">
                    <Button onClick={this.handleSubmit} disabled={!this.props.stripe} loading={this.state.loading}>{!this.state.paymentMade ? "Confirm order" : "Payment Made"}</Button>
                </div>

            </div>
        );
    }
}

export default function InjectedCheckoutForm() {
    return (
        <ElementsConsumer>
            {({ stripe, elements }) => (
                <CheckoutForm stripe={stripe} elements={elements} />
            )}
        </ElementsConsumer>
    );
}