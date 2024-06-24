import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const { paymentId, success } = location.state || {};
  return (
    <div className="result-container">
      <div className="result-card">
        <img
          src={
            success
              ? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Noun_Project_tick_icon_675776_cc.svg/768px-Noun_Project_tick_icon_675776_cc.svg.png"
              : "https://cdn.shopify.com/s/files/1/2301/4381/files/1024px-OOjs_UI_icon_alert_destructive.svg_dd7d0ac6-c8e7-4043-b3a1-ceb3a4fd0daf_480x480.png?v=1589826423"
          }
          alt=""
          style={{
            width: "5rem",
            height: "5rem"
            // marginBottom: "20px"
          }}
        />
        <h1 style={{}}>{success ? "Payment Successful" : "Payment Failed"}</h1>
        {success && (
          <div className="payment-details">
            <div>
              <p>Payment ID:</p>
            </div>
            <div>
              <p>{paymentId}</p>
            </div>
          </div>
        )}
        <p>
          {success
            ? "Thank you for your payment. You will be redirected to the main page."
            : "Please try again."}
        </p>
      </div>
    </div>
  );
};

export default Result;
