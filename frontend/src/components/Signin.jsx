import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const backend = process.env.BACKEND_URL || 'http://localhost:3001'; // Adjust if using a different framework


function Signin() {

  const navigate = useNavigate();

  
  //to get the authenticated user
  const fetchAuthUser = async function () {
   

    try {
      const response = await axios.get(`${backend}/auth/user`, {
        withCredentials: true,
      });

   
      console.log(response.data);
      sessionStorage.setItem("token", response.data.githubAccessToken);

      navigate('/issues');


    } catch (e) {
      console.log("the error is " + e);
    }
  };
  
  const handleSubmit = async function () {

  let timer = null; 
   const newWindow = window.open(`${backend}/signin`, '_blank', 'width=600,height=600');


   if (newWindow) {
    timer = setInterval(() => {
      if (newWindow.closed) {
        fetchAuthUser();
        if (timer) clearInterval(timer);
      }
    }, 500);
  }
    
  }

  return (
    <>
    <div className="login">
      <h1>Welcome to Github Issue Renderer.</h1>
      <p>Login to start viewing Issues.</p>
      <button onClick={handleSubmit} type="submit">
        <img src="https://cdn-icons-png.flaticon.com/128/25/25231.png" alt="github logo"/>
        Continue With GITHUB
      </button>
      </div>
    </>
  );
}

export default Signin;
