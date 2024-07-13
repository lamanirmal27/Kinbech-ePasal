import { useContext } from "react";
import ProductContext from "../../context/ProductProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Checkout = () => {
  const { cartItem, handleRemoveCartItem, subTotal } =
    useContext(ProductContext);
  const handleRemove = (productId) => {
    handleRemoveCartItem(productId);
  };
  const navigate = useNavigate();
  const handlePayment = async () => {
    // console.log("complete", cartItem);/
    const payload = {
      return_url: "http://localhost:5173/success",
      website_url: "http://localhost:5173/",
      amount: parseInt(subTotal),
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: "Khalti Bahadur",
        email: "example@gmail.com",
        phone: "9800000123",
      },
      // product_details: JSON.stringify(cartItem),
    };

    const response = await axios.post("/payment-khalti", payload);
    if (response) {
      const paymentUrl = response?.data?.data?.payment_url; // redirect to payment url
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    }
  };
  return (
    <div
      className="font-[sans-serif] bg-white flex flex-row gap-10"
      style={{ marginTop: 100 }}
    >
      <div
        className="flex flex-col  w-96  overflow-y-scroll bg-white shadow-xl mt-5"
        style={{ height: "600px" }}
      >
        <p className="mt-0.5 text-lg text-gray-900 text-center border-">
          Order Summary
        </p>
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {cartItem.length <= 0 && <p className="mt-8">Cart is empty</p>}
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItem.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product?.title}
                        src={product.images[0]}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.title}</a>
                          </h3>
                          <p className="ml-4">{`$${product.price}`}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product?.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        {product?.quantity && (
                          <p className="text-gray-500">
                            Qty {product.quantity}
                          </p>
                        )}

                        <div className="flex">
                          <button
                            onClick={() => handleRemove(product.id)}
                            className="font-medium text-orange-600 hover:text-orange-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p className="text-gray-600">Total</p>
            <p>{`$${subTotal}`}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
        <h2 className="text-2xl font-bold text-gray-800">
          Complete your order
        </h2>
        <form className="mt-8">
          <div>
            <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Phone No."
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Address Line"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="State"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Payment
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="credit-card"
                        aria-describedby="credit-card-text"
                        type="radio"
                        name="payment-method"
                        defaultValue=""
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        defaultChecked=""
                      />
                    </div>
                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="credit-card"
                        className="font-medium leading-none text-gray-900 dark:text-white"
                      >
                        {" "}
                        Khalti{" "}
                      </label>
                      <p
                        id="credit-card-text"
                        className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        Payment using Khalti
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="pay-on-delivery"
                        aria-describedby="pay-on-delivery-text"
                        type="radio"
                        name="payment-method"
                        defaultValue=""
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      />
                    </div>
                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="pay-on-delivery"
                        className="font-medium leading-none text-gray-900 dark:text-white"
                      >
                        {" "}
                        Payment on delivery{" "}
                      </label>
                      <p
                        id="pay-on-delivery-text"
                        className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                      >
                        +$15 payment processing fee
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 max-md:flex-col mt-8">
              <button
                type="button"
                className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePayment}
                className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-orange-600 hover:bg-orange-700 text-white"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
