import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    const [step, setStep] = useState(1); // Manage screen states
    const [email, setEmail] = useState(""); // Email state
    const [username, setUsername] = useState(""); // Username state
    const [password, setPassword] = useState(""); // Password state
    const navigate = useNavigate();

    // Redirect to /login after 5 seconds when on Step 3
    useEffect(() => {
        if (step === 3) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 5000);

            // Cleanup the timeout to avoid memory leaks
            return () => clearTimeout(timer);
        }
    }, [step, navigate]);

    const handleNextStep1 = () => {
        if (email) setStep(2);
    };

    const handleNextStep2 = () => {
        if (username && password) setStep(3);
    };

    return (
        <div className="flex flex-col min-h-screen items-center text-white bg-[#131313]">
            {/* Helmet */}
            <Helmet>
                <title>Spotify - Sign Up</title>
            </Helmet>

            {/* Logo */}
            <div className="mb-6 text-center">
                <img
                    src="/sp-white.svg"
                    alt="Spotify Logo"
                    className="pt-4 h-14 mx-auto"
                />
            </div>

            {/* Step 1: Email Address */}
            {step === 1 && (
                <>
                    {/* Container */}
                    <div className="flex-grow w-full max-w-md p-8 bg-[#131313]">
                        {/* Title */}
                        <h1 className="text-5xl font-bold text-center mb-6">
                            Sign up to start listening
                        </h1>

                        {/* Email Input */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-gray-400 font-bold">
                                  Email address
                                </span>
                            </label>
                            <input
                                type="email"
                                placeholder="name@domain.com"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={handleNextStep1}
                            disabled={!email}
                            className={`btn btn-primary w-full mb-4 rounded-full font-bold ${
                                email
                                    ? "bg-[#22d45e] border-[#22d45e] hover:bg-[#131313] hover:border-[#22d45e] hover:text-white"
                                    : "bg-gray-600 border-gray-600 cursor-not-allowed"
                            }`}
                        >
                            Next
                        </button>

                        {/* Divider */}
                        <div className="divider text-gray-400">or</div>

                        {/* Already Have an Account */}
                        <p className="text-center mt-6 text-sm text-gray-400">
                            Already have an account?{" "}
                            <a href="/login" className="link link-primary text-white">
                                Log in here
                            </a>
                        </p>
                    </div>
                </>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
                <div className="flex-grow w-full max-w-md p-8 bg-[#131313]">
                    {/* Title with Back Button */}
                    <div className="flex items-center mb-4">
                        {/* Back Button */}
                        <button
                            onClick={() => setStep(1)} // Go back to Step 1
                            className="text-white hover:text-white mr-4 font-bold text-2xl"
                        >
                            &lt;
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-bold">Step 2 of 3</h2>
                    </div>

                    {/* Subtitle */}
                    <h3 className="text-xl mb-6">Create a username and password</h3>

                    {/* Username Input */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-gray-400 font-bold">
                              Username
                            </span>
                        </label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="input input-bordered w-full bg-[#2b2b2b] border-gray-600 text-white"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                    </div>

                    {/* Password Input */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-gray-400 font-bold">Password</span>
                        </label>
                        <div className="relative mb-4">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full bg-[#2b2b2b] border-gray-600 text-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNextStep2}
                        disabled={!username || !password}
                        className={`btn btn-primary w-full mb-4 rounded-full font-bold ${
                            username && password
                                ? "bg-[#22d45e] border-[#22d45e] hover:bg-[#131313] hover:border-[#22d45e] hover:text-white"
                                : "bg-gray-600 border-gray-600 cursor-not-allowed"
                        }`}
                    >
                        Next
                    </button>

                </div>
            )}

            {/* Step 3: You're All Set! */}
            {step === 3 && (
                <div className="flex-grow w-full max-w-md p-8 bg-[#131313] text-center">
                    <h2 className="text-3xl font-bold mb-6">You're all set!</h2>
                    <p className="text-lg">You will be redirected to Spotify shortly...</p>
                </div>
            )}

            {/* Footer */}
            <p className="text-center mt-4 text-xs text-gray-500 pb-4">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="#" className="link link-secondary text-gray-500">
                    Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="link link-secondary text-gray-500">
                    Terms of Service
                </a>{" "}
                apply.
            </p>

        </div>
    );
};

export default SignUp;
