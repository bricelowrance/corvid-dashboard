import { BarChart2, Menu, ChevronDown, HomeIcon, BarChart } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"

const SIDEBAR_ITEMS = [
    { name:"Income Statement", icon:BarChart2, color:"#23356b", href:"/",
     },
    { name:"Balance Sheet", icon:BarChart2, color:"#23356b", href:"/bs",
     },
     { name:"Statement of Cash Flow", icon:BarChart2, color:"#23356b", href:"/cf",
     }
]
const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [openDropdowns, setOpenDropdowns] = useState({});

    const toggleDropdown = (index) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [index]: !prev[index],
         }));
    };

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0
                ${isSidebarOpen ? "w-64" : "w-20"}`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div
                className="h-screen bg-white bg-opacity-100 backdrop-blur-md flex flex-col border-r border-gray-700"
            >

<               motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-full hover:bg-gray-300 transition-colors max-w-fit m-4"
                >
                    <Menu size={24} color={"#23356b"} />
                </motion.button>
                
                {/* Logo Section */}
                <div className="p-4 flex items-center justify-center">
                    <img
                        src="/CorvidLogo_Blue.png"
                        alt="Logo"
                        className={`transition-all duration-300 ${
                        isSidebarOpen ? "w-32" : "w-10"
                        }`}
                    />
                </div>

                {/* User Info Section */}
                <div className="flex flex-col items-center py-6">
                    <img
                        src="/CorvidLogo_V_White.png"
                        alt="User"
                        className={`rounded-full border-2 border-gray-600 object-cover transition-all duration-300 ${
                        isSidebarOpen ? "w-20 h-20" : "w-10 h-10"
                        }`}
                    />
                    <AnimatePresence>
                        {isSidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center mt-3"
                        >
                            <p className="text-corvid-blue text-lg font-semibold">David Robinson</p>
                            <p className="text-corvid-blue opacity-60 text-sm">Admin</p>
                        </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Scrollable Area */}
                <div className="flex-grow overflow-y-auto">
                    <nav className="mt-4">
                        {SIDEBAR_ITEMS.map((item, index) => (
                            <div key={item.name}>
                                {item.name === "Balance Sheet" || "Income Statement" ? (
                                    <Link to={item.href}>
                                        <div
                                            className={`flex items-center ${
                                                isSidebarOpen ? "justify-between" : "justify-center"
                                            } p-4 text-sm text-corvid-blue font-medium rounded-lg hover:bg-gray-300 transition-colors cursor-pointer`}
                                        >
                                            <div className="flex items-center">
                                                <item.icon
                                                    size={20}
                                                    style={{ color: item.color, minWidth: "20px" }}
                                                />
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
                                ) : (
                                    <div
                                        className={`flex items-center ${
                                            isSidebarOpen ? "justify-between" : "justify-center"
                                        } p-4 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors cursor-pointer`}
                                        onClick={() => item.children && toggleDropdown(index)}
                                    >
                                        <div className="flex items-center">
                                            <item.icon
                                                size={20}
                                                style={{ color: item.color, minWidth: "20px" }}
                                            />
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
                                        {item.children && isSidebarOpen && (
                                            <ChevronDown
                                                className={`transition-transform ${
                                                    openDropdowns[index] ? "rotate-180" : ""
                                                }`}
                                            />
                                        )}
                                    </div>
                                )}
                                <AnimatePresence>
                                    {item.children && openDropdowns[index] && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="ml-8"
                                        >
                                            {item.children.map((child) => (
                                                <Link key={child.href} to={child.href}>
                                                    <motion.div
                                                        className="p-2 text-xs rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {child.name}
                                                    </motion.div>
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </motion.div>
    )
}

export default Sidebar