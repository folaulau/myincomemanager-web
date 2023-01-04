import React from "react";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import Auth from "./components/auth/auth";
import Home from "./App";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import SignUpProfile from "./pages/signup_flow/profile/profile";
import SignUpGoals from "./pages/signup_flow/goals/goals";
import SignUpIncome from "./pages/signup_flow/income/income";
import SignUpExpenses from "./pages/signup_flow/expenses/expenses";
import Dashboard from "./pages/dashboard/dashboard";
function AppRoutes() {

  // const [auth, setAuth] = useState({})

  useEffect(() => {
    // setAuth(Auth.getAuth());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="signup">
            <Route path="" element={<SignUp />} />
            <Route path="profile" element={<SignUpProfile />} />
            <Route path="goals" element={<SignUpGoals />} />
            <Route path="income" element={<SignUpIncome />} />
            <Route path="expenses" element={<SignUpExpenses />} />
          </Route>
          <Route path="*" element={<p>Page not found: 404!</p>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;