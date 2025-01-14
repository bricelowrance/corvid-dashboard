import React, { useState } from "react";
import { motion } from "framer-motion";

const LoginPage = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); 
        setErrorMessage(""); 
        setIsLoading(true); 

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                
                setErrorMessage(data.error || "Login failed");
            } else {
                console.log("Login successful", data);
                localStorage.setItem("token", data.token); 
                onLoginSuccess(); 
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage("An error occurred during login. Please try again.");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <motion.div
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-8 border border-gray-700 w-[600px]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex justify-center items-center">
                        <img
                            src="/CorvidLogo_White.png"
                            alt="Logo"
                            className="h-20 w-auto mb-6"
                        />
                    </div>
                    <h2 className="text-3xl font-medium text-gray-100 mb-6 text-center">
                        Login
                    </h2>
                    {errorMessage && (
                        <p className="text-red-500 text-center mb-4">
                            {errorMessage}
                        </p>
                    )}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-gray-300 text-sm font-medium mb-1"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                className="w-full bg-gray-700 text-gray-300 rounded p-3 border border-gray-600 focus:ring-2 focus:ring-purple-500"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-300 text-sm font-medium mb-1"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full bg-gray-700 text-gray-300 rounded p-3 border border-gray-600 focus:ring-2 focus:ring-purple-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-700 text-white font-medium rounded p-3 hover:bg-gray-400 transition duration-150"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;


