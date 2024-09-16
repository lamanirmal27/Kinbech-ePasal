import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MenuItem, Select } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";

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

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Make API call to update status in the backend
      await axiosPrivate.put(`/payment-khalti/${id}`, {
        status: newStatus,
      });

      // Update the local state with the new status
      setInventoryData((prevData) =>
        prevData.map((item) =>
          item.productId === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      toast.error(err.response.data.message);
      console.error("Error updating status", err);
    }
  };

  const data = useMemo(() => {
    if (!inventoryData.length) return [];
    return inventoryData.map((item) => ({
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
        size: 50,
        Cell: ({ cell }) => {
          const { productId, statusOf } = cell.row.original;
          return (
            <Select
              value={statusOf}
              onChange={(e) => handleStatusChange(productId, e.target.value)}
              variant="outlined"
              size="small"
            >
              <MenuItem value="pending">pending</MenuItem>
              <MenuItem value="success">success</MenuItem>
              <MenuItem value="failed">failed</MenuItem>
            </Select>
          );
        },
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
