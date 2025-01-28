import React from 'react';

const FooterContact = () => {
  return (
    <div className="footer-column about-widget">
      <div className="logo mb-4">
        <a href="#">
          <img
            src="/images/logo.png"
            style={{ height: "50px" }}
            alt="brand"
            className="img-fluid"
          />
        </a>
      </div>
      
      <div className="contact-info">
        {/* Phone Numbers */}
        <div className="d-flex align-items-start mb-3">
          <i className="fas fa-phone mt-1 me-2"></i>
          <div>
            <p className="fw-bold mb-1">Call us</p>
            <p className="mb-0">8928235501 / 9870122286</p>
          </div>
        </div>

        {/* Address */}
        <div className="d-flex align-items-start mb-3">
          <i className="fas fa-map-marker-alt mt-1 me-2"></i>
          <div className="address-block">
            <address className="mb-0">
              Shubham Avenue<br />
              C wing, Office Number: 1008<br />
              Building No. 19, 21<br />
              Shree Gurudatta Mandir Marg<br />
              Sai Baba Nagar, Pant Nagar<br />
              Ghatkopar East, Mumbai<br />
              Maharashtra - 400077
            </address>
          </div>
        </div>

        {/* Email Addresses */}
        <div className="d-flex align-items-start">
          <i className="fas fa-envelope mt-1 me-2"></i>
          <div className="email-block">
            <a href="mailto:recruit@chempharmajobs.com" className="text-decoration-none">
              recruit@chempharmajobs.com
            </a>
            <span className="mx-2">/</span>
            <a href="mailto:info@chempharmajobs.com" className="text-decoration-none">
              info@chempharmajobs.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;