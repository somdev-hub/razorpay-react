import axios from "axios";

const RazorpayButton = () => {
  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = displayRazorpay;
    document.body.appendChild(script);
  };

  const displayRazorpay = async () => {
    const orderData = await axios.post(
      "https://api.testbuddy.live/v1/order/create",
      {
        packageId: "6613d6fbbf1afca9aa1b519e",
        pricingId: "662caa2d50bf43b5cef75232",
        finalAmount: "441",
        couponCode: "NEET25"
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc4Mjg4NmY0MzYzNGQ2MTZjODM2NDIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTE1MDcyNiwiZXhwIjoxNzIxNzQyNzI2fQ.TI3XXmOngwG8jDTU_0nz8CZTSgeVtjGK4WaFDETFarQ"
        }
      }
    );

    // console.log(orderData.data);

    const options = {
      key: "rzp_test_zyr1Gcf0ChNi6x",
      amount: orderData.data.amount,
      currency: "INR",
      name: "Your Company Name",

      order_id: orderData.data.transactionOrderId,

      handler: (response) => {
        console.log(response);
        axios
          .post(
            "https://api.testbuddy.live/v1/order/verify",
            {
              transactionId: orderData.data._id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            },
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc4Mjg4NmY0MzYzNGQ2MTZjODM2NDIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTE1MDcyNiwiZXhwIjoxNzIxNzQyNzI2fQ.TI3XXmOngwG8jDTU_0nz8CZTSgeVtjGK4WaFDETFarQ"
              }
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999"
      },

      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button onClick={loadRazorpay} className="razorpay-payment-button">
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;
