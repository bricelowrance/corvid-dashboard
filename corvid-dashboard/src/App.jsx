import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import BPage from "./pages/BPage";
import BSPage from "./pages/BSPage";
import CFPage from "./pages/CFPage";
import Test from "./pages/Test";
import LoginPage from "./pages/LoginPage"; // Import LoginPage
import { googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Fix import

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check for stored user session
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Handle Google Login Success
    const handleLoginSuccess = (credentialResponse) => {
        if (credentialResponse?.credential) {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("User Info:", decoded);
            setUser(decoded);
            localStorage.setItem("user", JSON.stringify(decoded)); // Store user in local storage

            // Force a refresh after login
            setTimeout(() => {
                navigate("/", { replace: true });
                window.location.reload(); // Ensure a full reload to reflect auth state
            }, 500);
        }
    };

    // Logout function
    const handleLogout = () => {
        googleLogout();
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Background Overlay */}
            <div className="fixed inset-0 -z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#23356b] via-[#2d447c] to-[#23356b] opacity-50" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>

            <Routes>
                {/* Show LoginPage ONLY when the user is NOT logged in */}
                <Route
                    path="/login"
                    element={
                        !user ? (
                            <LoginPage onLoginSuccess={handleLoginSuccess} />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />

                {/* Protected Routes (Only accessible if logged in) */}
                {user ? (
                    <Route
                        path="/*"
                        element={
                            <div className="flex h-screen">
                                <Sidebar />
                                    <Routes>
                                        <Route path="/" element={<OverviewPage />} />
                                        <Route path="/b" element={<BPage />} />
                                        <Route path="/bs" element={<BSPage />} />
                                        <Route path="/cf" element={<CFPage />} />
                                        <Route path="/test" element={<Test />} />
                                        <Route path="*" element={<Navigate to="/" />} />
                                    </Routes>
                                </div>
                        }
                    />
                ) : (
                    // Redirect any unknown routes to login if not authenticated
                    <Route path="*" element={<Navigate to="/login" replace />} />
                )}
            </Routes>
        </div>
    );
}

export default App;



