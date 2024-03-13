import React, { useEffect } from "react";
import Header from "./Header";
import Input from "./Input";
import Footer from "./Footer";
import IssueList from "./IssueList";
import axios from "axios";

function Home() {
 
  return (
    <div className="holder">
      <Header />
      <Input />
      <Footer />
    </div>
  );
}

export default Home;
