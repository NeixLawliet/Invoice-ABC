import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from 'react-bootstrap'; 
import { useLanguage } from './LanguageContext';


const translations = {
  en : {
    helpCenter: 'Help Center',
    whatIsABCInvoice: 'What is ABC invoice?',
    abcInvoiceIs: 'ABC invoice is a platform that allows you to create and manage invoices.',
    howToCreate: 'How to create an account?',
    createAccount: 'Click the button Register on the main page, then fill in the requested data such as name, email, and password.',
    howToAddLogo: 'How to add logo?',
    addLogo: 'Click the button Add Logo on the main page, then upload the logo.',
    fillInInvoice: 'Fill in invoice details',
    fillInInvoiceDetails: 'Fill in the invoice details such as invoice number, invoice date, due date, and payment terms.',
    customerDetails: 'Customer details',
    customerDetailsBody: 'Column contents Bill To and Ship To for filling in the recipient\'s invoice information.',
    addItem: 'Add item',
    addItemBody: 'Click the button Add Item on the main page, then fill in the item details such as item name, item description, item price, and item quantity.',
    discountPayment: 'Discount & Payment',
    discountPaymentBody: 'Click the button Add Discount on the main page, then fill in the discount details such as discount name, discount description, discount price, and discount quantity.',
    currency: 'Currency',
    currencyBody: 'Select a currency from the dropdown list. Symbols will adjust automatically.',
    saveDownload: 'Save & Download',
    saveDownloadBody: 'Click the button <strong>Save default</strong> to save the invoice, then click the button <strong>Download</strong> to download the invoice.',
    contactHelp: 'Contact help',
    contactHelpBody: 'If you need further assistance, contact us via:',
    contactEmail: 'Email: ',
    contactWhatsapp: 'WhatsApp: '

  },
  id : {
    helpCenter: 'Pusat Bantuan',
    whatIsABCInvoice: 'Apa itu ABC Invoice?',
    abcInvoiceIs: 'ABC Invoice adalah platform yang memungkinkan Anda membuat dan mengelola faktur.',
    howToCreate: 'Bagaimana cara membuat akun?',
    createAccount: 'Klik tombol Daftar di halaman utama, lalu isi data yang diminta seperti nama, email, dan kata sandi.',
    howToAddLogo: 'Bagaimana cara menambahkan logo?',
    addLogo: 'Klik tombol Tambah Logo di halaman utama, lalu unggah logo Anda.',
    fillInInvoice: 'Isi detail faktur',
    fillInInvoiceDetails: 'Isi detail faktur seperti nomor faktur, tanggal faktur, tanggal jatuh tempo, dan syarat pembayaran.',
    customerDetails: 'Detail pelanggan',
    customerDetailsBody: 'Kolom Ditagih Kepada dan Dikirim Kepada diisi dengan informasi penerima faktur.',
    addItem: 'Tambah item',
    addItemBody: 'Klik tombol Tambah Item di halaman utama, lalu isi detail item seperti nama item, deskripsi, harga, dan jumlah.',
    discountPayment: 'Diskon & Pembayaran',
    discountPaymentBody: 'Klik tombol Tambah Diskon di halaman utama, lalu isi detail diskon seperti nama diskon, deskripsi, harga diskon, dan jumlah diskon.',
    currency: 'Mata Uang',
    currencyBody: 'Pilih mata uang dari daftar dropdown. Simbol akan menyesuaikan secara otomatis.',
    saveDownload: 'Simpan & Unduh',
    saveDownloadBody: 'Klik tombol Simpan Default untuk menyimpan faktur, lalu klik tombol <strong>Unduh</strong> untuk mengunduh faktur.',
    contactHelp: 'Hubungi Bantuan',
    contactHelpBody: 'Jika Anda memerlukan bantuan lebih lanjut, hubungi kami melalui:',
    contactEmail: 'Email: ',
    contactWhatsapp: 'WhatsApp: '
  }
}



const HelpPage = () => {

const {language} = useLanguage();
const t = translations[language];
  return (
    <div className="container mt-5">
      <h2 className="mb-4">{t.helpCenter}</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t.whatIsABCInvoice}</Accordion.Header>
          <Accordion.Body>
            {t.abcInvoiceIs}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>{t.howToCreate}</Accordion.Header>
          <Accordion.Body>
           {t.createAccount}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>{t.howToAddLogo}</Accordion.Header>
          <Accordion.Body>
          {t.addLogo}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>{t.fillInInvoice}</Accordion.Header>
          <Accordion.Body>
            {t.fillInInvoiceDetails}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>{t.customerDetails}</Accordion.Header>
          <Accordion.Body>
            {t.customerDetailsBody}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>{t.addItem}</Accordion.Header>
          <Accordion.Body>
            {t.addItemBody}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>{t.discountPayment}</Accordion.Header>
          <Accordion.Body>
            {t.discountPaymentBody}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header>{t.currency}</Accordion.Header>
          <Accordion.Body>
            {t.currencyBody}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
          <Accordion.Header>{t.saveDownload}</Accordion.Header>
          <Accordion.Body>
            {t.saveDownloadBody}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header>{t.contactHelp}</Accordion.Header>
          <Accordion.Body>
          {t.contactHelpBody}
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
