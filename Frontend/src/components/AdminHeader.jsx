import { Package } from "lucide-react";
import React from "react";
import AdminDropDown from "./AdminDropDown";

const AdminHeader = () => {
  return (
    <div
      style={{        
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              background: "linear-gradient(135deg, #f97316, #dc2626)",
              borderRadius: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
            <Package color="white" size={20} />
          </div>
          <h1
            style={{
              color: "white",
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: "700"
            }}>
            Sneakhead Admin
          </h1>
        </div>
        <AdminDropDown />
      </div>
    </div>
  );
};
export default AdminHeader;
