import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./frontend/screens/login.tsx";
import SignUp from "./frontend/screens/signup.tsx";
import Home from "./frontend/screens/home.tsx";
import App from "./frontend/App.tsx";

const AppRouter: React.FC = () => {
    return (
        <div className="w-screen h-screen">
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<App />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

                {/* Home Route */}
                <Route path="/home" element={<Home />} />
                {/*<Route path="/profile" element={<Profile />} />*/}
            </Routes>
        </Router>
        </div>
    );
};

export default AppRouter;
