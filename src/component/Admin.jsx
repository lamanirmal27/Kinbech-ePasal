import Inventory from "../pages/Inventory/Inventory.jsx";
import Customers from "../pages/Customers/Customers.jsx"; // New component
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const categories = [
  {
    name: "Inventory",
    component: <Inventory />,
  },
  {
    name: "Users",
    component: <Customers />,
  },
];

export default function Admin() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
          <TabGroup>
            <TabList className="flex gap-4 fixed top-20 left-px right-0 z-40">
              {categories.map(({ name }) => (
                <Tab
                  key={name}
                  className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-orange-600 data-[hover]:bg-orange-600/5 data-[selected]:data-[hover]:bg-orange-600 data-[focus]:outline-1 data-[focus]:outline-black"
                >
                  {name}
                </Tab>
              ))}
            </TabList>
            <TabPanels className="mt-3">
              {categories.map(({ name, component }) => (
                <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                  {component}
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
