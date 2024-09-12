import { useContext, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import {
  XMarkIcon,
  ArrowRightIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import ProductContext from "../../context/ProductProvider";
import UserContext from "../../context/UserProvider";
import Cart from "./Cart";
import UserSideBar from "../../component/sidePanel/UserSideBar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const {
    focusItem,
    setFocusItem,
    loading,
    newItem,
    fashionRef,
    electoRef,
    handleAddtoCart,
    updateQuantity,
    quantity,
    setQuantity,
  } = useContext(ProductContext);
  const { isLoggedIn } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [all, setAll] = useState(false);
  const [all1, setAll1] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
        <div>
          <h1 className="text-xl md:text-7xl font-bold flex items-center">
            L
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              className="animate-spin"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
            </svg>{" "}
            ading . . .
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={fashionRef} className="bg-white mx-auto mt-9">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
          <h2 className="sr-only">Products</h2>
          <span className="flex justify-between ">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Fashion Items You may like
            </h2>
            {!all ? (
              <span
                className="flex cursor-pointer"
                onClick={() => setAll(!all)}
              >
                <h2 className="text-md my-auto text-orange-600">
                  See everything
                </h2>
                <ArrowRightIcon className="h-4 w-auto my-auto text-orange-600" />
              </span>
            ) : (
              <span
                className="flex cursor-pointer"
                onClick={() => setAll(!all)}
              >
                <h2 className="text-md my-auto text-orange-600">Hide</h2>
                <ArrowDownIcon className="h-4 w-auto my-auto text-orange-600" />
              </span>
            )}
          </span>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {newItem.slice(0, all ? newItem.length : 8).map(
              (product) =>
                product.category === "fashion" && (
                  <a
                    onClick={() => {
                      setFocusItem(product);
                      setOpen(true);
                    }}
                    key={product.id}
                    className="group"
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={product.images[0].src}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </a>
                )
            )}
          </div>
        </div>
      </div>
      <div ref={electoRef} className="bg-white mx-auto mt-0">
        <div className="mx-auto mt-0 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <span className="flex justify-between ">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Electronics Items You may like
            </h2>
            {!all1 ? (
              <span
                className="flex cursor-pointer"
                onClick={() => setAll1(!all1)}
              >
                <h2 className="text-md my-auto text-orange-600">
                  See everything
                </h2>
                <ArrowRightIcon className="h-4 w-auto my-auto text-orange-600" />
              </span>
            ) : (
              <span
                className="flex cursor-pointer"
                onClick={() => setAll1(!all1)}
              >
                <h2 className="text-md my-auto text-orange-600">Hide</h2>
                <ArrowDownIcon className="h-4 w-auto my-auto text-orange-600" />
              </span>
            )}
          </span>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {newItem.slice(0, all1 ? newItem.length : 28).map(
              (product) =>
                product.category === "Electronics" && (
                  <a
                    onClick={() => {
                      setFocusItem(product);
                      setOpen(true);
                    }}
                    key={newItem.id}
                    className="group"
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={product.images[0].src}
                        // alt={product.imageAlt}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </a>
                )
            )}
          </div>
        </div>
      </div>
      <Dialog className="relative z-10" open={open} onClose={setOpen}>
        <DialogBackdrop
          transition
          className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <DialogPanel
              transition
              className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
            >
              <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  onClick={() => setOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                    <img
                      src={
                        focusItem?.images?.[1].src || focusItem?.images?.[0].src
                      }
                      alt={focusItem?.images?.[0].alt}
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                      {focusItem?.name}
                    </h2>

                    <section
                      aria-labelledby="information-heading"
                      className="mt-2"
                    >
                      <h3 id="information-heading" className="sr-only">
                        Product information
                      </h3>

                      <p className="text-2xl text-gray-900">
                        {`${focusItem?.price}`}
                      </p>

                      {/* Reviews */}
                      {focusItem?.rating && (
                        <div className="mt-6">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <p className="px-2">{focusItem?.rating}</p>
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    focusItem.rating > rating
                                      ? "text-gray-900"
                                      : "text-gray-200",
                                    "h-5 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">
                              {focusItem.rating} out of 5 stars
                            </p>
                          </div>
                        </div>
                      )}
                    </section>

                    <section
                      aria-labelledby="options-heading"
                      className="mt-10"
                    >
                      <h3 id="options-heading" className="sr-only">
                        Product options
                      </h3>

                      <form>
                        Quantity:
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          min={1}
                          className="w-12 text-center ml-5"
                        />
                        <button
                          onClick={(e) => {
                            isLoggedIn
                              ? (e.preventDefault(),
                                setOpen(false),
                                handleAddtoCart(focusItem),
                                updateQuantity(focusItem.id, quantity))
                              : (e.preventDefault(),
                                toast.error("Your need to login first"));
                          }}
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                          Add to cart
                        </button>
                        <button
                          onClick={(e) => {
                            isLoggedIn
                              ? (e.preventDefault(),
                                setOpen(false),
                                handleAddtoCart(focusItem),
                                updateQuantity(focusItem.id, quantity),
                                navigate("/checkout"))
                              : (e.preventDefault(),
                                toast.error("Your need to login first"));
                          }}
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                          Buy now!!
                        </button>
                        <button
                          type="submit"
                          onClick={() => navigate("/details")}
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-orange-600 "
                        >
                          See full Details
                        </button>
                      </form>
                    </section>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Cart />
      <UserSideBar />
    </>
  );
}
