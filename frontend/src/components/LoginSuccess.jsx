import React, { useEffect } from "react";

export function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return <h2>Thanks for logging in!</h2>;
}

export default LoginSuccess;