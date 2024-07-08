const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center mx-auto px-4 lg:mx-auto md:mx-auto sm:mx-auto">
      <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
        <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          Unauthorized
        </h4>
        <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          You don't have authorize to access the page
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
