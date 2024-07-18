import Inventory from "../pages/Inventory/Inventory.jsx";

const Admin = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
          <h4 className="block font-sans text-2xl text-center font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Inventory
          </h4>
          {/* Additional content here */}
        </div>
      </div>
      <Inventory />
    </div>
  );
};

export default Admin;
