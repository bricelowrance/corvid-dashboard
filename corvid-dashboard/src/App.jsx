import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import BPage from "./pages/BPage";
import BSPage from "./pages/BSPage";
import CFPage from "./pages/CFPage";
import LoginPage from "./pages/LoginPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const navigate = useNavigate();
    
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        navigate("/"); 
    };

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* BG */}
            <div className="fixed inset-0 -z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#23356b] via-[#2d447c] to-[#23356b] opacity-50" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>

            {/* Show Sidebar only when logged in */}
            {isLoggedIn && <Sidebar />}

            <Routes>
                {/* Protected routes */}
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<OverviewPage />} />
                        <Route path="/b" element={<BPage />} />
                        <Route path="/bs" element={<BSPage />} />
                        <Route path="/cf" element={<CFPage />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}

                {/* Login route */}
                <Route
                    path="/login"
                    element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
                />
            </Routes>
        </div>
    );
}

export default App;

