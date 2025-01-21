import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import BSPage from "./pages/BSPage";
import AteaBSPage from "./pages/atea/AteaBSPage";
import AteaISPage from "./pages/atea/AteaISPage";
import AteaTPage from "./pages/atea/AteaTPage";
import CorvidBSPage from "./pages/corvidtec/CorvidBSPage";
import CorvidISPage from "./pages/corvidtec/CorvidISPage";
import CorvidTPage from "./pages/corvidtec/CorvidTPage";
import CyberBSPage from "./pages/cyber/CyberBSPage";
import CyberISPage from "./pages/cyber/CyberISPage";
import CyberTPage from "./pages/cyber/CyberTPage";
import HpcBSPage from "./pages/hpc/HpcBSPage";
import HpcISPage from "./pages/hpc/HpcISPage";
import HpcTPage from "./pages/hpc/HpcTPage";
import LynBSPage from "./pages/lyn/LynBSPage";
import LynISPage from "./pages/lyn/LynISPage";
import LynTPage from "./pages/lyn/LynTPage";
import TalonBSPage from "./pages/talon/TalonBSPage";
import TalonISPage from "./pages/talon/TalonISPage";
import TalonTPage from "./pages/talon/TalonTPage";
import TrdpBSPage from "./pages/trdp/TrdpBSPage";
import TrdpISPage from "./pages/trdp/TrdpIsPage";
import TrdpTPage from "./pages/trdp/TrdpTPage";
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
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>

            {/* Show Sidebar only when logged in */}
            {isLoggedIn && <Sidebar />}

            <Routes>
                {/* Protected routes */}
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<OverviewPage />} />
                        <Route path="/bs" element={<BSPage />} />
                        <Route path="/ateabs" element={<AteaBSPage />} />
                        <Route path="/ateais" element={<AteaISPage />} />
                        <Route path="/ateat" element={<AteaTPage />} />
                        <Route path="/corvidbs" element={<CorvidBSPage />} />
                        <Route path="/corvidis" element={<CorvidISPage />} />
                        <Route path="/corvidt" element={<CorvidTPage />} />
                        <Route path="/cyberbs" element={<CyberBSPage />} />
                        <Route path="/cyberis" element={<CyberISPage />} />
                        <Route path="/cybert" element={<CyberTPage />} />
                        <Route path="/hpcbs" element={<HpcBSPage />} />
                        <Route path="/hpcis" element={<HpcISPage />} />
                        <Route path="/hpct" element={<HpcTPage />} />
                        <Route path="/lynbs" element={<LynBSPage />} />
                        <Route path="/lynis" element={<LynISPage />} />
                        <Route path="/lynt" element={<LynTPage />} />
                        <Route path="/talonbs" element={<TalonBSPage />} />
                        <Route path="/talonis" element={<TalonISPage />} />
                        <Route path="/talont" element={<TalonTPage />} />
                        <Route path="/trdpbs" element={<TrdpBSPage />} />
                        <Route path="/trdpis" element={<TrdpISPage />} />
                        <Route path="/trdpt" element={<TrdpTPage />} />
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

