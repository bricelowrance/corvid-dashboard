import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const revenueData = [
    { name: "Nov '23", revenue: 20400612 },
    { name: "Dec '23", revenue: 26041377 },
    { name: "Jan '24", revenue: 21275744 },
    { name: "Feb '24", revenue: 19419507 },
    { name: "Mar '24", revenue: 21507495 },
    { name: "Apr '24", revenue: 19844417 },
    { name: "May '24", revenue: 37935854 },
    { name: "Jun '24", revenue: 28323435 },
    { name: "Jul '24", revenue: 22875418 },
    { name: "Aug '24", revenue: 21842769 },
    { name: "Sep '24", revenue: 24896994 },
    { name: "Oct '24", revenue: 25087861 },
]

const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`;
};

const CorvidRevenueChart = () => {
  return (
    <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate = {{ opacity: 1, y: 0}}
        transition={{ delay: 0.2 }}
    >
        <h2 className="text-lg font-medium mb-4 text-gray-100">
            Corvid Technologies Revenue
        </h2>
        <div className="h-80">
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart data={revenueData}
                    margin={{ top:5, right: 20, left: 35, bottom: 5 }}>
                    <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
                    <XAxis dataKey={"name"} stroke="#9ca3af"/>
                    <YAxis stroke="#9ca3af" tickFormatter={formatCurrency} />
                    <Tooltip
                        formatter={(value) => formatCurrency(value)}
                        contentStyle={{
                            backgroundColor: "rgba(31, 41, 55, 0.8)",
                            borderColor: "#4B5563",
                        }}
                        itemStyle={{ color: "#E5E7EB"}}
                    />
                    <Line
						type='monotone'
						dataKey='revenue'
						stroke='#6366F1'
						strokeWidth={3}
						dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
						activeDot={{ r: 8, strokeWidth: 2 }}
					/>

                    
                    
                </LineChart>

            </ResponsiveContainer>

        </div>
    </motion.div>
  )
}

export default CorvidRevenueChart