import axios from "axios";
import { useNavigate } from "react-router-dom";

const RazorpayButton = () => {
  const navigate = useNavigate();
  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = displayRazorpay;
    document.body.appendChild(script);
  };

  const displayRazorpay = async () => {
    try {
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
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc4NWViOGY0MzYzNGQ2MTZjODM2YTUiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTE2NDYwMCwiZXhwIjoxNzIxNzU2NjAwfQ._daNNbPC-rP6_CTPg8_KITpa-iJhvehQpq5zqc0ursA"
          }
        }
      );
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
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc4NWViOGY0MzYzNGQ2MTZjODM2YTUiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTE2NDYwMCwiZXhwIjoxNzIxNzU2NjAwfQ._daNNbPC-rP6_CTPg8_KITpa-iJhvehQpq5zqc0ursA"
                }
              }
            )
            .then((res) => {
              console.log(res.data);

              if (res.data.success) {
                navigate("/result", {
                  state: {
                    paymentId: response.razorpay_payment_id,
                    success: true
                  }
                });
              } else {
                navigate("/result", {
                  state: {
                    paymentId: null,
                    success: false
                  }
                });
              }
            })
            .catch((err) => {
              if (err.response.status === 409) {
                alert("Payment failed: Conflict");
              } else if (err.response.status === 401) {
                alert("Payment failed: Unauthorized");
              } else {
                alert("Payment failed");
              }
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
    } catch (err) {
      if (err.response.status === 409) {
        alert("Payment failed: Conflict");
      } else if (err.response.status === 401) {
        alert("Payment failed: Unauthorized");
      } else {
        alert("Payment failed");
      }
      console.log(err);
    }

    // console.log(orderData.data);
  };

  return (
    <button onClick={loadRazorpay} className="razorpay-payment-button">
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;
