import React, { useState } from 'react';
import './Footer.css';




const Footer = () => {
  const faqs = [
    { id: 1, question: 'How do I create an account?', answer: 'To create an account, click on the Sign Up button and follow the instructions.' },
    { id: 2, question: 'What payment methods do you accept?', answer: 'We accept Visa, MasterCard, PayPal, and direct bank transfers.' },
    { id: 3, question: 'How can I contact support?', answer: 'You can contact our support team via email at support@example.com or by phone at +123456789.' },
  ];

  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (faqId) => {
    setActiveFaq(activeFaq === faqId ? null : faqId);
  };






  return (
    <footer className="footer">
      




      <div className="faq-section">
            <h3>FAQs</h3>
            <ul className="faq-list">
              {faqs.map((faq) => (
                <li key={faq.id}>
                  <button className="faq-question" onClick={() => toggleFaq(faq.id)}>
                    {faq.question}
                  </button>
                  {activeFaq === faq.id && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          

      <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </li>
      </ul>

      <ul className="menu">
        <li className="menu__item"><a className="menu__link" href="#">Home</a></li>
        <li className="menu__item"><a className="menu__link" href="#">About</a></li>
        <li className="menu__item"><a className="menu__link" href="#">Services</a></li>
        <li className="menu__item"><a className="menu__link" href="#">Team</a></li>
        <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>
      </ul>

      <p>&copy;2024 Aditya Gupta | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
