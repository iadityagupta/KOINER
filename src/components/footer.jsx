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
    if (activeFaq === faqId) {
      setActiveFaq(null);
    } else {
      setActiveFaq(faqId);
    }
  };

  return (
    <footer className="footer">
      <div className="container">

        <p>&copy; 2024 All Rights Reserved.</p>
        
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
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/aditya453gupta/" target="_blank" rel="noopener noreferrer">Connect with developer</a>
        
        </div>
      
      </div>
    </footer>
  );
};

export default Footer;
