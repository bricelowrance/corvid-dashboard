import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";

const IncomeComparisonChart = () => {
    const [chartData, setChartData] = useState([]);
    const [year1, setYear1] = useState("2024");
    const [year2, setYear2] = useState("2024");
    const [entity1, setEntity1] = useState("CORVID");
    const [entity2, setEntity2] = useState("CYBER");
    const [category, setCategory] = useState("REVENUE"); // Default category selection
    const [availableCategories, setAvailableCategories] = useState([]);

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response1, response2] = await Promise.all([
                    axios.get("http://localhost:5000/income-summary", { params: { year: year1, entity: entity1 } }),
                    axios.get("http://localhost:5000/income-summary", { params: { year: year2, entity: entity2 } }),
                ]);

                const processData = (data) =>
                    data.reduce((acc, { category: cat, total_amount, period }) => {
                        if (cat !== category) return acc; // Only include selected category
                        const monthName = months[period - 1]; // Convert period (1-12) to month name
                        if (!acc[monthName]) acc[monthName] = { name: monthName, total1: 0, total2: 0 };
                        acc[monthName].total1 += Number(total_amount) || 0;
                        return acc;
                    }, {});

                // Process and merge both datasets
                const data1 = processData(response1.data);
                const data2 = processData(response2.data);

                // Combine both datasets into an array for Recharts
                const combinedData = months.map((month) => ({
                    name: month,
                    [`${entity1} ${category}`]: data1[month]?.total1 || 0,
                    [`${entity2} ${category}`]: data2[month]?.total1 || 0,
                }));

                setChartData(combinedData);
            } catch (error) {
                console.error("Error fetching comparison chart data:", error);
            }
        };

        fetchData();
    }, [year1, year2, entity1, entity2, category]);

    // Fetch available categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/income-summary", { params: { year: year1, entity: entity1 } });
                const categories = [...new Set(response.data.map((item) => item.category))];
                setAvailableCategories(categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [year1, entity1]);

    const formatCurrency = (value) => `$${value.toLocaleString()}`;

    return (
        <div className="bg-white shadow-lg p-6 border border-gray-700">
            <h2 className="text-xl font-medium mb-4 text-corvid-blue">Compare {category} Across Entities</h2>

            {/* Selectors for Entities, Years, and Category */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                {/* First Entity Selection */}
                <div>
                    <h3 className="font-bold text-corvid-blue">First Entity</h3>
                    <select className="bg-gray-200 p-2 rounded" value={year1} onChange={(e) => setYear1(e.target.value)}>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                    <select className="bg-gray-200 p-2 rounded ml-2" value={entity1} onChange={(e) => setEntity1(e.target.value)}>
                        <option value="CORVID">Corvid</option>
                        <option value="CYBER">Cyber</option>
                        <option value="ATEA">ATEA</option>
                        <option value="HPC">HPC</option>
                        <option value="LYN">LYN</option>
                        <option value="TALON">Talon</option>
                        <option value="TRDP">TRDP</option>
                    </select>
                </div>

                {/* Second Entity Selection */}
                <div>
                    <h3 className="font-bold text-corvid-blue">Second Entity</h3>
                    <select className="bg-gray-200 p-2 rounded" value={year2} onChange={(e) => setYear2(e.target.value)}>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                    <select className="bg-gray-200 p-2 rounded ml-2" value={entity2} onChange={(e) => setEntity2(e.target.value)}>
                        <option value="CORVID">Corvid</option>
                        <option value="CYBER">Cyber</option>
                        <option value="ATEA">ATEA</option>
                        <option value="HPC">HPC</option>
                        <option value="LYN">LYN</option>
                        <option value="TALON">Talon</option>
                        <option value="TRDP">TRDP</option>
                    </select>
                </div>

                {/* Category Selection */}
                <div>
                    <h3 className="font-bold text-corvid-blue">Category</h3>
                    <select className="bg-gray-200 p-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {availableCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 20, left: 40, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#23356b" />
                        <XAxis dataKey="name" stroke="#23356b" />
                        <YAxis stroke="#23356b" tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]} contentStyle={{ backgroundColor: "#23356b", borderColor: "#23356b" }} itemStyle={{ color: "white" }} />
                        <Legend />
                        <Line type="monotone" dataKey={`${entity1} ${category}`} stroke="#1f77b4" strokeWidth={3} dot={{ fill: "#1f77b4", strokeWidth: 2, r: 6 }} activeDot={{ r: 8, strokeWidth: 2 }} />
                        <Line type="monotone" dataKey={`${entity2} ${category}`} stroke="#ff7f0e" strokeWidth={3} dot={{ fill: "#ff7f0e", strokeWidth: 2, r: 6 }} activeDot={{ r: 8, strokeWidth: 2 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default IncomeComparisonChart;
