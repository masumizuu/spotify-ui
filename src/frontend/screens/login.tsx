import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet-async";

const Login: React.FC = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // Login logic here
        navigate("/home");
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#191414] to-[#000000] text-white">
            {/* Helmet */}
            <Helmet>
                <title>Spotify - Log In</title>
            </Helmet>

            {/* Spotify Logo */}
            <div className="mt-8">
                <img
                    src="/sp-white.svg" // Replace with your Spotify logo path
                    alt="Spotify Logo"
                    className="h-12"
                />
            </div>

            {/* Login Container */}
            <div className="mt-8 bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Log in to Spotify</h1>

                <div className="border-t border-gray-600 my-4"></div>

                {/* Email or Username Input */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-gray-400">
                        Email or username
                    </label>
                    <input
                        type="text"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        placeholder="Email or username"
                        className="input input-bordered w-full bg-[#2b2b2b] text-white border-gray-600"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6 relative">
                    <label className="block text-sm font-bold mb-2 text-gray-400">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input input-bordered w-full bg-[#2b2b2b] text-white border-gray-600"
                    />
                </div>

                {/* Log In Button */}
                <button
                    onClick={handleLogin}
                    className={`w-full py-2 rounded-full font-bold ${
                        usernameOrEmail && password
                            ? "bg-[#1DB954] hover:bg-[#148F43] text-black"
                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!usernameOrEmail || !password}
                >
                    Log In
                </button>

                {/* Forgot Password */}
                <div className="text-center mt-4">
                    <a href="#" className="text-sm text-gray-400 hover:underline">
                        Forgot your password?
                    </a>
                </div>

                {/* Sign Up */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-400">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-white hover:underline">
                            Sign up for Spotify
                        </a>
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 w-full text-center text-xs text-gray-500 pb-4">
                <p>
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a href="#" className="underline hover:text-white">
                        Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline hover:text-white">
                        Terms of Service
                    </a>{" "}
                    apply.
                </p>
            </div>
        </div>
    );
};

export default Login;
