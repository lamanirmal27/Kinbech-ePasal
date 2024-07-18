import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";
import ProductContext from "../../context/ProductProvider";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Checkout = () => {
  const { cartItem, handleRemoveCartItem, subTotal, setCartItem } =
    useContext(ProductContext);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [name, setName] = useState(`${auth.fullName}`);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("khalti");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRemove = (productId) => {
    handleRemoveCartItem(productId);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    if (!name || !email || !phone || !address || !district) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }
    if (
      (subTotal < 1000 || subTotal > 100000) &&
      selectedPayment === "khalti"
    ) {
      setError(
        "Total amount must be between 1000 and 10000 for Online payment"
      );
      setLoading(false);
      return;
    }
    const pid = shortid.generate();

    const payload = {
      return_url: "http://localhost:5173/success",
      website_url: "http://localhost:5173/",
      amount: parseInt(subTotal),
      purchase_order_id: pid,
      purchase_order_name:
        cartItem?.length === 1
          ? cartItem?.[0]?.name
          : cartItem?.map((item) => item.name).join(", "),
      customer_info: { name, email, phone },
      shipping_address: { address, district },
      payment_method: selectedPayment,
    };

    if (selectedPayment === "delivery") {
      const response = await axios.post("/payment-khalti/delivery", payload);
      setCartItem([]);
      navigate("/delivery-success");
      return;
    }

    try {
      const response = await axios.post("/payment-khalti", payload);

      const paymentUrl = response?.data?.data?.payment_url;

      if (paymentUrl) {
        window.location.href = paymentUrl;
        setCartItem([]);
      } else {
        setError("Failed to get payment URL.");
      }
    } catch (error) {
      setError("An error occurred while processing payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="font-[sans-serif] bg-white flex flex-row gap-10"
      style={{ marginTop: 100 }}
    >
      <div
        className="flex flex-col w-96 overflow-y-scroll bg-white shadow-xl mt-5"
        style={{ height: "600px" }}
      >
        <p className="mt-0.5 text-lg text-gray-900 text-center">
          Order Summary
        </p>
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {cartItem.length <= 0 ? (
            <p className="mt-8">Cart is empty</p>
          ) : (
            <div className="mt-8">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItem.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product?.title}
                        src={product?.images?.[0]?.src}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.title}</a>
                        </h3>
                        <p className="ml-4">{`$${product.price}`}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product?.color}
                      </p>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        {product?.quantity && (
                          <p className="text-gray-500">
                            Qty {product.quantity}
                          </p>
                        )}
                        <button
                          onClick={() => handleRemove(product.id)}
                          className="font-medium text-orange-600 hover:text-orange-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
        <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
          <div>
            <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Name"
                value={name}
                readOnly
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              <input
                type="number"
                placeholder="Phone No."
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              <input
                type="text"
                placeholder="District"
                value={district}
                required
                onChange={(e) => setDistrict(e.target.value)}
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
            </div>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <input
                    id="khalti-payment"
                    type="radio"
                    name="payment-method"
                    value="khalti"
                    checked={selectedPayment === "khalti"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                  />
                  <div className="ml-4 text-sm">
                    <label
                      htmlFor="khalti-payment"
                      className="font-medium text-gray-900"
                    >
                      Khalti
                    </label>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Payment using Khalti
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <input
                    id="pay-on-delivery"
                    aria-describedby="pay-on-delivery-text"
                    type="radio"
                    name="payment-method"
                    value="delivery"
                    checked={selectedPayment === "delivery"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                  />
                  <div className="ml-4 text-sm">
                    <label
                      htmlFor="pay-on-delivery"
                      className="font-medium text-gray-900"
                    >
                      Payment on delivery
                    </label>
                    <p
                      id="pay-on-delivery-text"
                      className="mt-1 text-xs text-gray-500 dark:text-gray-400"
                    >
                      +$15 payment processing fee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-md px-6 py-3 w-full text-sm bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (cartItem.length >= 1) {
                  handlePayment();
                } else {
                  toast.error("Your Cart is empty");
                }
              }}
              className="rounded-md px-6 py-3 w-full text-sm bg-orange-600 hover:bg-orange-700 text-white"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : selectedPayment === "delivery"
                ? "Place Order"
                : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
