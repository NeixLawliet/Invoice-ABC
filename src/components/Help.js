import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const HelpPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Help Center</h2>
      <div className="accordion" id="helpAccordion">


        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              What is ABC invoice?
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#helpAccordion">
            <div className="accordion-body">
              ABC invoice is a platform that allows you to create and manage invoices.
            </div>
          </div>
        </div>

        {/* 2. How to create an account */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              How to create an account?
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#helpAccordion">
            <div className="accordion-body">
              Click the button <strong>Register</strong> on the main page, then fill in the requested data such as name, email, and password.
            </div>
          </div>
        </div>

        {/* 3. How to add a logo */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              How to add a logo?
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#helpAccordion">
            <div className="accordion-body">
              Click the button <strong>Add Logo</strong> on the main page, then upload the logo.
            </div>
          </div>
        </div>

        {/* 4. Fill in invoice details */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Fill in invoice details
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#helpAccordion">
            <div className="accordion-body">
              Fill in the invoice details such as invoice number, invoice date, due date, and payment terms.
            </div>
          </div>
        </div>

        {/* 5. Customer details */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
              Customer details
            </button>
          </h2>
          <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#helpAccordion">
            <div className="accordion-body">
              Column contents <strong>Bill To</strong> and <strong>Ship To</strong> for filling in the recipient's invoice information.
            </div>
          </div>
        </div>

        {/* 6. Add item */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSix">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
              Add item
            </button>
          </h2>
          <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#helpAccordion">
            <div className="accordion-body">
              Click the button <strong>Add Item</strong> on the main page, then fill in the item details such as item name, item description, item price, and item quantity.
            </div>
          </div>
        </div>

        {/* 7. Discount and Payment */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSeven">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
              Discount and Payment
            </button>
          </h2>
          <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#helpAccordion">
            <div className="accordion-body">
              Click the button <strong>Add Discount</strong> on the main page, then fill in the discount details such as discount name, discount description, discount price, and discount quantity.
            </div>
          </div>
        </div>

        {/* 8. Currency */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingEight">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
              Currency
            </button>
          </h2>
          <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#helpAccordion">
            <div className="accordion-body">
              Select a currency from the dropdown list. Symbols will adjust automatically.
            </div>
          </div>
        </div>

        {/* 9. Save and Download */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingNine">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
              Save and Download
            </button>
          </h2>
          <div id="collapseNine" className="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#helpAccordion">
            <div className="accordion-body">
              Click the button <strong>Save default</strong> to save the invoice, then click the button <strong>Download</strong> to download the invoice.
            </div>
          </div>
        </div>

        {/* 10. Contact help */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTen">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
              Contact help
            </button>
          </h2>
          <div id="collapseTen" className="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#helpAccordion">
            <div className="accordion-body">
              If you need further assistance, contact us via:
              <ul>
                <li>Email: <a href="mailto:hello@fanatech.net">hello@fanatech.net</a></li>
                <li>WhatsApp: <a href="https://wa.me/6282138685500">+62-8213-8685-500</a></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpPage;
