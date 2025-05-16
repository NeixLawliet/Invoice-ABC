import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from 'react-bootstrap'; 



const HelpPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Help Center</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is ABC invoice?</Accordion.Header>
          <Accordion.Body>
            ABC invoice is a platform that allows you to create and manage invoices.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>How to create an account?</Accordion.Header>
          <Accordion.Body>
            Click the button <strong>Register</strong> on the main page, then fill in the requested data such as name, email, and password.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>How to add logo?</Accordion.Header>
          <Accordion.Body>
          Click the button <strong>Add Logo</strong> on the main page, then upload the logo.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Fill in invoice details</Accordion.Header>
          <Accordion.Body>
          Fill in the invoice details such as invoice number, invoice date, due date, and payment terms.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Customer details</Accordion.Header>
          <Accordion.Body>
          Column contents <strong>Bill To</strong> and <strong>Ship To</strong> for filling in the recipient's invoice information.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Add item</Accordion.Header>
          <Accordion.Body>
          Click the button <strong>Add Item</strong> on the main page, then fill in the item details such as item name, item description, item price, and item quantity.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>Discount & Payment</Accordion.Header>
          <Accordion.Body>
          Click the button <strong>Add Discount</strong> on the main page, then fill in the discount details such as discount name, discount description, discount price, and discount quantity.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header>Currency</Accordion.Header>
          <Accordion.Body>
          Select a currency from the dropdown list. Symbols will adjust automatically.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
          <Accordion.Header>Save & Download</Accordion.Header>
          <Accordion.Body>
          Click the button <strong>Save default</strong> to save the invoice, then click the button <strong>Download</strong> to download the invoice.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header>SContact help</Accordion.Header>
          <Accordion.Body>
          If you need further assistance, contact us via:
              <ul>
                <li>Email: <a href="mailto:hello@fanatech.net">hello@fanatech.net</a></li>
                <li>WhatsApp: <a href="https://wa.me/6282138685500">+62-8213-8685-500</a></li>
              </ul>
          </Accordion.Body>
        </Accordion.Item>

        

      </Accordion>
    </div>
  );
};

export default HelpPage;
