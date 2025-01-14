import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

const REVENUE_DATA = [
    { id: 1, name: "Nov '23", revenue: 20400612 },
    { id: 2, name: "Dec '23", revenue: 26041377 },
    { id: 3, name: "Jan '24", revenue: 21275744 },
    { id: 4, name: "Feb '24", revenue: 19419507 },
    { id: 5, name: "Mar '24", revenue: 21507495 },
    { id: 6, name: "Apr '24", revenue: 19844417 },
    { id: 7, name: "May '24", revenue: 37935854 },
    { id: 8, name: "Jun '24", revenue: 28323435 },
    { id: 9, name: "Jul '24", revenue: 22875418 },
    { id: 10, name: "Aug '24", revenue: 21842769 },
    { id: 11, name: "Sep '24", revenue: 24896994 },
    { id: 12, name: "Oct '24", revenue: 25087861 },
];

const CorvidRevenueTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(REVENUE_DATA);
  return (
    <motion.div
    className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    >
        <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-semibold text-gray-100'>Corvid Technologies Revenue</h2>
            <div className='relative'>
                <input
                    type='text'
                    placeholder='Search...'
                    className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Month
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Revenue
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    
                </tbody>
            </table>
        </div>
    </motion.div>
  );
}

export default CorvidRevenueTable