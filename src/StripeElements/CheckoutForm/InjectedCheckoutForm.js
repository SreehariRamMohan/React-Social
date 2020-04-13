import React from 'react';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";

function InjectedCheckoutForm() {

    return (
        <ElementsConsumer>
            {({ stripe, elements }) => (
                <CheckoutForm stripe={stripe} elements={elements}/>
            )}
        </ElementsConsumer>
    );
}


export default InjectedCheckoutForm;