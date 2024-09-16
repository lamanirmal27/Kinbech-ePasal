import React, { useEffect, useMemo, useState } from "react";
import axios from "../../api/axios";
import {
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import { Checkbox } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";

// Define the roles with their corresponding codes
const ROLES = {
  User: 2001,
  Admin: 5150,
};

const Customers = () => {
  const [usersData, setUsersData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("/users");
        setUsersData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, [usersData]);

  const deleteUser = async (id) => {
    try {
      await axios.delete("/users", { data: { id } });
    } catch (error) {
      console.log(error);
    }
  };

  // Function to update roles in the backend
  const updateRoles = async (id, updatedRoles) => {
    try {
      await axiosPrivate.put(`/users/${id}`, { roles: updatedRoles });
      toast.success("Roles updated successfully");
      console.log("Roles updated successfully");
    } catch (error) {
      console.error("Error updating roles:", error);
      toast.error(error.response.data.message);
    }
  };

  // RoleDisplay component to handle role editing with ROLES object
  const RoleDisplay = ({ userRoles, userId }) => {
    const [rolesState, setRolesState] = useState(userRoles || {});

    const handleRoleChange = (roleKey, checked) => {
      const roleValue = ROLES[roleKey]; // Get role code from ROLES object
      let updatedRoles;

      // If checked, add the role, otherwise remove it
      if (checked) {
        updatedRoles = { ...rolesState, [roleKey]: roleValue };
      } else {
        updatedRoles = { ...rolesState };
        delete updatedRoles[roleKey]; // Remove the unchecked role
      }

      setRolesState(updatedRoles);
      updateRoles(userId, updatedRoles); // Send updated roles to the server
    };

    return (
      <div>
        {Object.keys(ROLES).map((roleKey) => (
          <div key={roleKey}>
            <Checkbox
              checked={rolesState[roleKey] === ROLES[roleKey]} // Check if the role is assigned
              onChange={(e) => handleRoleChange(roleKey, e.target.checked)}
            />
            <span>{roleKey}</span>
          </div>
        ))}
      </div>
    );
  };

  const data = useMemo(() => {
    if (!usersData.length) return [];
    return usersData.map((item) => ({
      fullName: item?.fullName,
      roles: <RoleDisplay userRoles={item.roles} userId={item._id} />, // Pass userId and user roles
      email: item?.email,
      address: item?.shipping_detail?.address,
      edit: (
        <TrashIcon
          className="h-5"
          onClick={() => deleteUser(item._id)} // Pass the deleteUser function with the user ID
        />
      ),
    }));
  }, [usersData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "fullName", // access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "roles",
        header: "Roles",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
      {
        accessorKey: "edit",
        header: "Edit",
        size: 50,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <div className="sticky">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Customers;
