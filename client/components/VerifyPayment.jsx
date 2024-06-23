import React from "react";
import { Card } from "@fluentui/react-components";

const VerifyPayment = () => {
  return (
    <div>
      <Card>
        <Card.Section>
          <Card.Header>
            <h2>Payment Details</h2>
          </Card.Header>
          <Card.Body>
            <form>
              <label htmlFor="transactionId">Transaction ID:</label>
              <input type="text" id="transactionId" name="transactionId" />

              <label htmlFor="amount">Amount:</label>
              <input type="text" id="amount" name="amount" />

              <label htmlFor="status">Status:</label>
              <select id="status" name="status">
                <option value="success">Success</option>
                <option value="failure">Failure</option>
              </select>

              <button type="submit">Verify</button>
            </form>
          </Card.Body>
        </Card.Section>
      </Card>
    </div>
  );
};

export default VerifyPayment;
