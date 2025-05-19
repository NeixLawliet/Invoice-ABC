import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLanguage } from './LanguageContext';


const InformationPage = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: 'Information',
      description:
        'This application is designed to simplify the process of creating and managing digital invoices. Suitable for small business owners, freelancers, and companies that want to manage billing quickly and efficiently.',
      featuresTitle: '✨ Main Features:',
      features: [
        '✅ Create invoices easily and quickly',
        '✅ Add and manage customer data',
        '✅ Save invoice history',
        '✅ Download invoice in PDF format',
        '✅ Calculate the automatic total including taxes and discounts',
      ],
      howToUseTitle: '📋 How to use:',
      howToUse: [
        'Login or register your account',
        'Enter customer and product data',
        'Fill in invoice details (quantity, price, tax, discount)',
        'Save or download invoices in PDF',
      ],
      footerNote:
        'The app is built using React JS and Bootstrap for a modern and responsive user experience.',
    },
    id: {
      title: 'Informasi',
      description:
        'Aplikasi ini dirancang untuk menyederhanakan proses pembuatan dan pengelolaan faktur digital. Cocok untuk pemilik usaha kecil, pekerja lepas, dan perusahaan yang ingin mengelola penagihan dengan cepat dan efisien.',
      featuresTitle: '✨ Fitur Utama:',
      features: [
        '✅ Buat faktur dengan mudah dan cepat',
        '✅ Tambah dan kelola data pelanggan',
        '✅ Simpan riwayat faktur',
        '✅ Unduh faktur dalam format PDF',
        '✅ Hitung total secara otomatis termasuk pajak dan diskon',
      ],
      howToUseTitle: '📋 Cara Penggunaan:',
      howToUse: [
        'Login atau daftar akun Anda',
        'Masukkan data pelanggan dan produk',
        'Isi detail faktur (jumlah, harga, pajak, diskon)',
        'Simpan atau unduh faktur dalam format PDF',
      ],
      footerNote:
        'Aplikasi ini dibangun menggunakan React JS dan Bootstrap untuk pengalaman pengguna yang modern dan responsif.',
    },
  };

  const t = translations[language];

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">{t.title}</h1>
          <p className="card-text">{t.description}</p>

          <h4 className="mt-4">{t.featuresTitle}</h4>
          <ul className="list-group list-group-flush mb-3">
            {t.features.map((feature, index) => (
              <li key={index} className="list-group-item">
                {feature}
              </li>
            ))}
          </ul>

          <h4 className="mt-4">{t.howToUseTitle}</h4>
          <ol className="list-group list-group-numbered mb-3">
            {t.howToUse.map((step, index) => (
              <li key={index} className="list-group-item">
                {step}
              </li>
            ))}
          </ol>

          <p className="text-muted mt-3">{t.footerNote}</p>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
