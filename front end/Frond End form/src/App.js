import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./signup";
import CustomTable from "./Table.jsx";
import Login from "./login.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" Component={<>hello</>} />
          <Route path="/Signup" Component={SignUp} />
          <Route path="/Show" Component={CustomTable} />
          <Route path="login" Component={Login} />
          <Route path="/signupform" Component={SignUp} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
