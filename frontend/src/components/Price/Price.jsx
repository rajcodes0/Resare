
import React, { useState } from 'react';
import { CreditCard, Smartphone } from 'lucide-react';

function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    expiration: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    alert(`Processing payment via ${paymentMethod.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Method Selection & Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment</h2>
            
            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <CreditCard className="inline-block mr-2 w-5 h-5" />
                Card
              </button>
              <button
                onClick={() => setPaymentMethod('qr')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  paymentMethod === 'qr'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Smartphone className="inline-block mr-2 w-5 h-5" />
                Scan QR
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <button
                onClick={() => setPaymentMethod('razorpay')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  paymentMethod === 'razorpay'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Razorpay
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  paymentMethod === 'paypal'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                PayPal
              </button>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full name (as displayed on card)*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card number*
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card expiration*
                    </label>
                    <input
                      type="text"
                      name="expiration"
                      value={formData.expiration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV*
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="123"
                      maxLength="3"
                    />
                    <p className="text-xs text-gray-500 mt-1">The last 3 digits on back of card</p>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-lg transition-colors shadow-lg"
                >
                  Pay Now - $7,191.00
                </button>
              </div>
            )}

         
            {paymentMethod === 'qr' && (
              <div className="text-center py-8">
                <div className="bg-white p-6 rounded-xl inline-block shadow-lg border-2 border-gray-200">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=merchant@upi&pn=Flowbite%20LLC&am=7191.00&cu=USD" 
                    alt="QR Code"
                    className="w-64 h-64"
                  />
                </div>
                <p className="text-lg font-medium text-gray-700 mt-6">Scan to pay $7,191.00</p>
                <p className="text-sm text-gray-500 mt-2">Use any UPI app to scan and pay</p>
                <button
                  onClick={handleSubmit}
                  className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  I've Paid
                </button>
              </div>
            )}

            {/* Razorpay */}
            {paymentMethod === 'razorpay' && (
              <div className="text-center py-12">
                <div className="mb-6">
                  <svg className="w-32 h-32 mx-auto text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L22.436 0zM14.26 10.098L3.389 17.166 1.564 24l9.008-9.008 3.688-4.894z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Razorpay Payment</h3>
                <p className="text-gray-600 mb-6">You'll be redirected to Razorpay to complete your payment</p>
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-12 rounded-lg transition-colors shadow-lg"
                >
                  Continue to Razorpay
                </button>
              </div>
            )}

            {/* PayPal */}
            {paymentMethod === 'paypal' && (
              <div className="text-center py-12">
                <div className="mb-6">
                  <svg className="w-32 h-32 mx-auto" viewBox="0 0 24 24" fill="#003087">
                    <path d="M19.554 9.488c.084.056.084.056.112.168.14.616.14 1.288-.028 1.96-.42 1.68-1.736 2.8-3.304 2.8h-.336c-.252 0-.476.168-.532.42l-.56 3.528c-.028.168-.168.308-.336.308h-2.38c-.196 0-.336-.14-.308-.336l1.54-9.772c.028-.168.168-.308.336-.308h3.136c.616 0 1.176.112 1.68.364-.028-.056-.028-.084-.028-.14.028.056.028.056 0 0zm-3.416-2.772c.196 0 .336-.14.308-.336L15.89 3.5c-.028-.168-.168-.308-.336-.308H8.526c-.28 0-.532.196-.588.476L5.586 17.22c-.028.196.112.392.308.392h2.548c.28 0 .532-.196.588-.476l.728-4.648c.056-.28.308-.476.588-.476h1.26c3.08 0 5.068-1.456 5.544-4.312.308-1.932-.028-3.444-.924-4.48-.14-.168-.308-.308-.504-.448z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">PayPal Payment</h3>
                <p className="text-gray-600 mb-6">You'll be redirected to PayPal to complete your payment</p>
                <button
                  onClick={handleSubmit}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-12 rounded-lg transition-colors shadow-lg"
                >
                  Continue to PayPal
                </button>
              </div>
            )}

            <p className="text-sm text-gray-500 text-center mt-6">
              Payment processed by {paymentMethod === 'paypal' ? 'PayPal' : paymentMethod === 'razorpay' ? 'Razorpay' : 'Paddle'} for Flowbite LLC - United States Of America
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-8 h-fit sticky top-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-700">
                <span>Original price</span>
                <span className="font-semibold">$6,592.00</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Savings</span>
                <span className="font-semibold">-$299.00</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Store Pickup</span>
                <span className="font-semibold">$99.00</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span className="font-semibold">$799.00</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span className="text-indigo-600">$7,191.00</span>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-sm text-indigo-800">
                <span className="font-semibold">💡 Tip:</span> You saved $299 on this order!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default PaymentForm