import { BarChart2, Menu, ChevronDown, HomeIcon } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"

const SIDEBAR_ITEMS = [
    { name:"Home", icon:HomeIcon, color:"white", href:"/",
     },
    { name:"Corvid Technologies", icon:BarChart2, color:"white", href:"",
        children: [
            { name: "Balance Sheet", href: "/corvidbs" },
            { name: "Income Statement", href: "/corvidis" },
            { name: "Consolidated IS", href: "/corvidt" },
          ],
     },
    { name:"HPC", icon:BarChart2, color:"white", href:"",
        children: [
            { name: "Balance Sheet", href: "/hpcbs" },
            { name: "Income Statement", href: "/hpsis" },
            { name: "Trailing 12", href: "/hpct" },
          ],
     },
    { name:"ATEA", icon:BarChart2, color:"white", href:"",
        children: [
            { name: "Balance Sheet", href: "/ateabs" },
            { name: "Income Statement", href: "/ateais" },
            { name: "Trailing 12", href: "/ateat" },
          ],
     },
    { name:"Talon", icon:BarChart2, color:"white", href:"",
        children: [
            { name: "Balance Sheet", href: "/talonbs" },
            { name: "Income Statement", href: "/talonis" },
            { name: "Trailing 12", href: "/talont" },
          ],
     },
    { name:"TRDP", icon:BarChart2, color:"white", href:"",
        children: [
            { name: "Balance Sheet", href: "/trdpbs" },
            { name: "Income Statement", href: "/trdpis" },
            { name: "Trailing 12", href: "/trdpt" },
          ],
     },
    { name:"Lyn Aerospace", icon:BarChart2, color:"white", href:"",
        children: [
            { name: "Balance Sheet", href: "/lynbs" },
            { name: "Income Statement", href: "/lynis" },
            { name: "Trailing 12", href: "/lynt" },         
          ],
     },
    { name:"Corvid Cyberdefense", icon:BarChart2, color:"white", href:"",
        children: [
            { name: "Balance Sheet", href: "/cyberbs" },
            { name: "Income Statement", href: "/cyberis" },
            { name: "Trailing 12", href: "/cybert" },
          ],
     },
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
                className="h-screen bg-corvi bg-opacity-50 backdrop-blur-md flex flex-col border-r border-gray-700"
            >

<               motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit m-4"
                >
                    <Menu size={24} />
                </motion.button>
                
                {/* Logo Section */}
                <div className="p-4 flex items-center justify-center">
                    <img
                        src="/CorvidLogo_White.png"
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
                            <p className="text-white text-lg font-semibold">David Robinson</p>
                            <p className="text-gray-400 text-sm">Admin</p>
                        </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Scrollable Area */}
                <div className="flex-grow overflow-y-auto">
                    <nav className="mt-4">
                        {SIDEBAR_ITEMS.map((item, index) => (
                            <div key={item.name}>
                                {item.name === "Home" ? (
                                    <Link to={item.href}>
                                        <div
                                            className={`flex items-center ${
                                                isSidebarOpen ? "justify-between" : "justify-center"
                                            } p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors cursor-pointer`}
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
                                        } p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors cursor-pointer`}
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