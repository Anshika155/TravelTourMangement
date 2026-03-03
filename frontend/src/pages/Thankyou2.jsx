// import React from 'react'
// import { Container, Row, Col } from "reactstrap";
// import {Link} from "react-router-dom";
// import '../styles/thank-you.css';
// const Thankyou = () => {
//   return (<>
//     <section>
//         <Container>
//             <Row>
//                 <Col lg='12' className="pt-5 text-center">
//                         <div className="thank__you">
//                             <span><i class="ri-checkbox-circle-line"></i></span>
//                             <h1 className='mb-3 fw-semibold'>Thank You</h1>
//                             <h3 className='mb-4'>your tour is booked.</h3>
//                             <Link to="/home" className="btn primary__btn w-25">Back to Home</Link>
//                         </div>
//                 </Col>
//             </Row>
//         </Container>
//     </section>
    
//     </>
//   )
// }

// export default Thankyou;




import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/thank-you.css';

const Thankyou = () => {
  // Function to handle Razorpay payment
  const handleRazorpayPayment = () => {
    if (window.Razorpay) {
      const options = {
        key: 'rzp_test_GFDuCQAYS65RbS', // Your Razorpay API Key (Test Mode)
        amount: 50000, // Amount in paise (50000 paise = 500 INR)
        currency: 'INR',
        name: 'TravelEase', // Your company name or brand
        description: 'Tour Booking Payment',
        image: 'https://example.com/logo.png', // Optional: Your company logo
        handler: function (response) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '1234567890',
        },
        notes: {
          address: 'Customer Address',
        },
        theme: {
          color: '#F37254',
        },
      };

      // Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      alert('Razorpay script not loaded');
    }
  };

  // Effect hook to load Razorpay script if not already available
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay script loaded');
      };
      document.body.appendChild(script);
    }
  }, []);

  // Subscription Form Logic
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Normally, here you would send the email to your backend for processing the subscription
    setIsSubscribed(true);  // Set to true to show the "Thank you" message
    setEmail('');  // Clear the email input after successful subscription
  };

  return (
    <>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="pt-5 text-center">
              <div className="thank__you">
                <span>
                  <i className="ri-checkbox-circle-line"></i>
                </span>
                <h1 className="mb-3 fw-semibold">Thank You</h1>
                {/* <h3 className="mb-4">Please Proceed..</h3> */}
                {/* <Link to="/home" className="btn primary__btn w-25">
                  
                </Link> */}
                <button
                  className="btn primary__btn w-25"
                  onClick={handleRazorpayPayment} // Trigger Razorpay payment
                >
                  Pay Now
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Subscription Section */}
      <section className="subscription mt-5">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="mb-3">Subscribe to Our Newsletter</h2>
              <p className="mb-4">Stay updated with our latest offers and news.</p>
              {isSubscribed ? (
                <p className="text-success">Thank you for subscribing!</p>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <div className="mail">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn primary__btn w-25">Subscribe</button>
                </form>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Thankyou;