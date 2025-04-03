import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: parseFloat(amount).toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          //   return actions.order.capture().then(function (details) {
          //     console.log(
          //       "Transaction completed by " + details.payer.name.given_name
          //     );
          //     // Call your server to save the transaction
          //     return fetch("/paypal-transaction-complete", {
          //       method: "post",
          //       headers: {
          //         "content-type": "application/json",
          //       },
          //       body: JSON.stringify({
          //         orderID: data.orderID,
          //       }),
          //     });
          //   });
          return actions.order.capture().then(onSuccess);
        }}
        // onError={(err) => {
        //   console.log(err);
        // }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
