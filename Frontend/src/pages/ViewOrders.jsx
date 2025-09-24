import React, { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import { CartState } from "../context/CartProvider";
import "../styles/ViewOrders.css";
import AOS from "aos";
import "aos/dist/aos.css";

const ViewOrders = () => {

  useEffect(() => {
      AOS.init({ once: true }); // 'once' animates only once per element
    }, []);
  

  const { user, isLoggedIn } = CartState();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchOrders = async () => {
      try {
        console.log(user);
        const data = await getMyOrders(user.id);
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
  };
  fetchOrders();
}, [user]);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="orders-container">
      <h2 className="orders-title">All Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr className="table-header">
                <th className="table-th">Order ID</th>
                <th className="table-th">Date</th>
                <th className="table-th">Total</th>
                <th className="table-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id || order._id} className="table-row">
                  <td className="table-td order-id">{order.id || order._id}</td>                  
                  <td className="table-td">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="table-td price">${order.totalPrice?.toFixed(2) || "0.00"}</td>
                  <td className="table-td">
                    <span className={`status-badge ${(order.status || "Pending").toLowerCase()}`}>
                      {order.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )
      }
    </div>
  );
};

export default ViewOrders;