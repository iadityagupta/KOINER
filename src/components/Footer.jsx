import React, { useState } from 'react';
import './Footer.css';




const Footer = () => {
  const faqs = [
    { id: 1, question: 'What does Koiner do?', answer: 'Koiner offers real-time updates on cryptocurrency prices, market analysis, and news with sentiment analysis.' },
    { id: 2, question: 'How often is the cryptocurrency data updated?', answer: 'The data is updated in real-time every few minutes.' },
    { id: 3, question: 'Where can I find news and their sentiment analysis?', answer: 'You can find the latest news and their sentiment analysis in our News section ' },
  ];

  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (faqId) => {
    setActiveFaq(activeFaq === faqId ? null : faqId);
  };


  return (
    <footer className="footer">
      
      
      
      <div className="line"></div>





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

      

      <p>&copy;2024                        Aditya Gupta                 |                  All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
