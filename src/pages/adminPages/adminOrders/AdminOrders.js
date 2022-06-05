import axios from "axios";
import React, { useEffect, useState } from "react";
import BackBtn from "../../../components/backBtn/BackBtn";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const Posts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}admin/orders`,
          {
            headers: { sanctum: `${localStorage.getItem("token")}` },
          }
        );

        setOrders(response.data.data);
      } catch (e) {
        console.log(`Error from useEffect: ${e}`);
      }
    };

    Posts();
  }, [callback]);

	console.log(orders)
  return (
    <div>
			<BackBtn/>
      {orders.map((order) => (
        <div className="">{<div className="">{order.receiver.name}</div>}</div>
      ))}
    </div>
  );
};

export default AdminOrders;
