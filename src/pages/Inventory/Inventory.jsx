import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getInventoryData = async () => {
      try {
        const response = await axiosPrivate.get("/payment-khalti/status");
        setInventoryData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getInventoryData();
  }, []);

  useEffect(() => {
    console.log(inventoryData);
  }, [inventoryData]);

  const data = useMemo(() => {
    if (!inventoryData.length) return [];
    return inventoryData.map((item) => ({
      name: {
        fullName: item?.customerInfo?.name,
      },
      transactionId: item?.transactionId,
      productId: item?.productId,
      purchasedItem: item?.purchasedItem,
      address: item?.shippingAddress?.address,
      paymentMethod: item?.paymentGateway,
      statusOf: item?.status,
    }));
  }, [inventoryData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "productId", // access nested data with dot notation
        header: "Order Id",
        size: 150,
      },
      {
        accessorKey: "name.fullName", // access nested data with dot notation
        header: "Customer name",
        size: 150,
      },
      {
        accessorKey: "transactionId",
        header: "Transaction ID",
        size: 150,
      },
      {
        accessorKey: "purchasedItem",
        header: "Purchased Item",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
      {
        accessorKey: "paymentMethod",
        header: "Transaction method",
        size: 150,
      },
      {
        accessorKey: "statusOf",
        header: "Status",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return <MaterialReactTable table={table} />;
};

export default Inventory;
