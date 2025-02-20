import { BarChart2, Menu, LogOut, Vote, DollarSign, Scale, Landmark } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SIDEBAR_ITEMS = [
    { name: "Income Statement", icon: BarChart2, color: "#23356b", href: "/" },
    { name: "Balance Sheet", icon: Scale, color: "#23356b", href: "/bs" },
    { name: "Statement of Cash Flow", icon: DollarSign, color: "#23356b", href: "/cf" },
    /**{ name: "IC Vote", icon: Vote, color: "#23356b", href: "/vote" },
    { name: "IC Exec", icon: Landmark, color: "#23356b", href: "/exec" },**/
];

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState({ name: "", picture: "" });
    const navigate = useNavigate(); 

    useEffect(() => {
        const updateUser = () => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser) {
                setUser({ 
                    name: storedUser.name || "Guest", 
                    picture: storedUser.picture || "C:\Users\blowrance\Downloads\corvid-dashboard\corvid-dashboard\public\CorvidLogo_V_White.png"
                });
            }
        };

        updateUser();
        window.addEventListener("storage", updateUser);

        return () => window.removeEventListener("storage", updateUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login"); 
        window.location.reload(); 
    };

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0
                ${isSidebarOpen ? "w-64" : "w-20"}`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div className="h-screen bg-white bg-opacity-100 backdrop-blur-md flex flex-col border-r border-gray-700">

                {/* Sidebar Header */}
                <div className="flex justify-between items-center p-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-full hover:bg-gray-300 transition-colors"
                    >
                        <Menu size={24} color={"#23356b"} />
                    </motion.button>

                    {isSidebarOpen && (
                        <motion.button
                            onClick={handleLogout}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full hover:bg-red-500 transition-colors"
                        >
                            <LogOut size={24} color={"#23356b"} />
                        </motion.button>
                    )}
                </div>

                {/* User Profile Section */}
                <div className="p-4 flex items-center justify-center">
                    <img
                        src="/CorvidLogo_Blue.png"
                        alt="Logo"
                        className={`transition-all duration-300 ${isSidebarOpen ? "w-32" : "w-10"}`}
                    />
                </div>
                <div className="flex flex-col items-center py-6">
                    <img
                        src={user.picture}
                        alt="User Profile"
                        className={`rounded-full border-2 border-gray-600 object-cover transition-all duration-300 ${isSidebarOpen ? "w-20 h-20" : "w-10 h-10"}`}
                    />
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center mt-3"
                            >
                                <p className="text-corvid-blue text-lg font-semibold">
                                    {user.name}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-grow overflow-y-auto">
                    <nav className="mt-4">
                        {SIDEBAR_ITEMS.map((item) => (
                            <Link to={item.href} key={item.name}>
                                <div className={`flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"} p-4 text-sm text-corvid-blue font-medium rounded-lg hover:bg-gray-300 transition-colors cursor-pointer`}>
                                    <div className="flex items-center">
                                        <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                        <AnimatePresence>
                                            {isSidebarOpen && (
                                                <motion.span
                                                    className="ml-4 whitespace-nowrap"
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: "auto" }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Logout Button for Collapsed Sidebar */}
                {!isSidebarOpen && (
                    <motion.button
                        onClick={handleLogout}
                        className="p-2 rounded-full hover:bg-red-500 transition-colors absolute bottom-4 left-1/2 transform -translate-x-1/2"
                    >
                        <LogOut size={24} color={"#23356b"} />
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
};

export default Sidebar;



