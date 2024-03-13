import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backend = process.env.BACKEND_URL || 'http://localhost:3001'; // Adjust if using a different framework


function Avatar() {

    const navigate = useNavigate();

  return (
    <img
      className="avatar"
      src="https://cdn-icons-png.flaticon.com/128/10313/10313098.png"
      title="Logout"
      onClick={async () => {
        sessionStorage.removeItem("token");
        
        try {
          const response = await axios.post(`${backend}/logout`, {
            withCredentials: true,
          });
        } catch (e) {
          console.log("the error is " + e);
        }

        //redirect to the logging page after logout
        navigate("/");
      }}
    />
  );
}

export default Avatar;
