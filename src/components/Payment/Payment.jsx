const PaymentForm = () => {
  // Handle input masking for card number, expiry date, and CVV
  const handleInput = (e, type) => {
    let value = e.target.value.replace(/\D/g, "");
    if (type === "cardNumber") {
      if (value.length > 16) value = value.slice(0, 16);
      let parts = value.match(/.{1,4}/g) || [];
      e.target.value = parts.join(" ");
    } else if (type === "expiry") {
      if (value.length > 4) value = value.slice(0, 4);
      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
      e.target.value = value;
    } else if (type === "cvv") {
      if (value.length > 3) value = value.slice(0, 3);
      e.target.value = value;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[repeating-linear-gradient(45deg,rgba(118,118,118,0.05)0px,rgba(118,118,118,0.05)19px,rgba(59,59,59,0.05)19px,rgba(59,59,59,0.05)67px,rgba(195,195,195,0.05)67px,rgba(195,195,195,0.05)87px,rgba(121,121,121,0.05)87px,rgba(121,121,121,0.05)133px,rgba(250,250,250,0.05)133px,rgba(250,250,250,0.05)172px,rgba(106,106,106,0.05)172px,rgba(106,106,106,0.05)197px,rgba(151,151,151,0.05)197px,rgba(151,151,151,0.05)226px,rgba(219,219,219,0.05)226px,rgba(219,219,219,0.05)260px),repeating-linear-gradient(45deg,rgba(70,70,70,0.05)0px,rgba(70,70,70,0.05)40px,rgba(220,220,220,0.05)40px,rgba(220,220,220,0.05)79px,rgba(95,95,95,0.05)79px,rgba(95,95,95,0.05)103px,rgba(15,15,15,0.05)103px,rgba(15,15,15,0.05)148px,rgba(51,51,51,0.05)148px,rgba(51,51,51,0.05)186px,rgba(225,225,225,0.05)186px,rgba(225,225,225,0.05)202px,rgba(60,60,60,0.05)202px,rgba(60,60,60,0.05)239px,rgba(67,67,67,0.05)239px,rgba(67,67,67,0.05)259px),repeating-linear-gradient(45deg,rgba(146,146,146,0.05)0px,rgba(146,146,146,0.05)40px,rgba(166,166,166,0.05)40px,rgba(166,166,166,0.05)54px,rgba(156,156,156,0.05)54px,rgba(156,156,156,0.05)71px,rgba(134,134,134,0.05)71px,rgba(134,134,134,0.05)95px,rgba(77,77,77,0.05)95px,rgba(77,77,77,0.05)111px,rgba(26,26,26,0.05)111px,rgba(26,26,26,0.05)153px,rgba(46,46,46,0.05)153px,rgba(46,46,46,0.05)202px,rgba(197,197,197,0.05)202px,rgba(197,197,197,0.05)216px),linear-gradient(90deg,rgb(30,178,248),rgb(46,36,197))]" >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Details</h2>
          <p className="text-gray-500">Complete your purchase securely</p>
        </div>

        {/* Card Preview */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white float-animation">
          <div className="absolute top-4 right-4">
            <svg className="h-8" viewBox="0 0 48 48" fill="none">
              <path
                d="M45 35c0 2.209-1.791 4-4 4H7c-2.209 0-4-1.791-4-4V13c0-2.209 1.791-4 4-4h34c2.209 0 4 1.791 4 4v22z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div className="mt-16">
            <div className="text-xl tracking-widest mb-2" id="cardNumberPreview">
              •••• •••• •••• •••• 
            </div>
            <div className="flex justify-between">
              <div>
                <div className="text-xs opacity-75">Card Holder</div>
                <div className="text-sm" id="cardHolderPreview">
                  YOUR NAME
                </div>
              </div>
              <div>
                <div className="text-xs opacity-75">Expires</div>
                <div className="text-sm" id="expiryPreview">
                  MM/YY
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form className="mt-8 space-y-6">
          <div className="relative">
            <input
              type="text"
              id="cardHolder"
              className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none placeholder-transparent"
              placeholder="Card Holder Name"
              required
              onInput={(e) => {
                document.getElementById("cardHolderPreview").textContent =
                  e.target.value || "YOUR NAME";
              }}
            />
            <label
              htmlFor="cardHolder"
              className="card-label absolute left-4 top-3 text-gray-500 transition-all duration-200"
            >
              Card Holder Name
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none placeholder-transparent"
              placeholder="Card Number"
              maxLength="19"
              required
              onInput={(e) => handleInput(e, "cardNumber")}
            />
            <label
              htmlFor="cardNumber"
              className="card-label absolute left-4 top-3 text-gray-500 transition-all duration-200"
            >
              Card Number
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                id="expiry"
                className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none placeholder-transparent"
                placeholder="MM/YY"
                maxLength="5"
                required
                onInput={(e) => handleInput(e, "expiry")}
              />
              <label
                htmlFor="expiry"
                className="card-label absolute left-4 top-3 text-gray-500 transition-all duration-200"
              >
                Expiry Date
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                id="cvv"
                className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none placeholder-transparent"
                placeholder="CVV"
                maxLength="3"
                required
                onInput={(e) => handleInput(e, "cvv")}
              />
              <label
                htmlFor="cvv"
                className="card-label absolute left-4 top-3 text-gray-500 transition-all duration-200"
              >
                CVV
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-blue-300 group-hover:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
