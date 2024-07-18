import React from "react";

const Orders = () => {
  const tableData = [
    {
      sn: 1,
      txnId: "TX12345",
      user: "John Doe",
      date: "2023-07-14",
      product: "Product A",
      state: "Completed",
      type: "Online",
    },
    {
      sn: 2,
      txnId: "TX67890",
      user: "Jane Smith",
      date: "2023-07-15",
      product: "Product B",
      state: "Pending",
      type: "In-store",
    },
    // Add more rows as needed
  ];

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-lg overflow-hidden max-w-7xl w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th
                  className="w-1/12 px-4 py-2 text-center border border-gray-300"
                  style={{ maxWidth: "6%" }}
                >
                  #
                </th>
                <th className="px-4 py-2 border border-gray-300">Txn Id</th>
                <th className="px-4 py-2 border border-gray-300">User</th>
                <th className="px-4 py-2 border border-gray-300">
                  Date
                  <i aria-hidden="true" className="ml-2 sort icon"></i>
                </th>
                <th className="px-4 py-2 border border-gray-300">Product</th>
                <th className="px-4 py-2 border border-gray-300">State</th>
                <th className="px-4 py-2 border border-gray-300">Type</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-4 py-2 text-center border border-gray-300">{row.sn}</td>
                  <td className="px-4 py-2 border border-gray-300">{row.txnId}</td>
                  <td className="px-4 py-2 border border-gray-300">{row.user}</td>
                  <td className="px-4 py-2 border border-gray-300">{row.date}</td>
                  <td className="px-4 py-2 border border-gray-300">{row.product}</td>
                  <td className="px-4 py-2 border border-gray-300">{row.state}</td>
                  <td className="px-4 py-2 border border-gray-300">{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
