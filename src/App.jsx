import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import ForgotPassword from "./component/ForgotPassword";
import Layout from "./component/Layout";
import Profile from "./component/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
