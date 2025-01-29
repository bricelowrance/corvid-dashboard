import React, { useState, useEffect } from "react";
import axios from "axios";

const Consolidated = () => {
    const [year, setYear] = useState("2024");
    const [period, setPeriod] = useState("1");
    const [entity, setEntity] = useState("CORVID");
    const [financialData, setFinancialData] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/financial-summary", {
                    params: { year, period, entity },
                });
                setFinancialData(response.data);
            } catch (error) {
                console.error("Error fetching financial data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [year, period, entity]);

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <div className="flex flex-col justify-center pt-6 min-h-screen">
            <div className="bg-white shadow-lg rounded-xl p-10 border border-gray-700 w-full max-w-7xl">
                <h2 className="text-xl font-extrabold text-corvid-blue mb-6 text-center">
                    {entity} Balance Sheets
                </h2>

                <div className="flex justify-between mb-6">
                    <div>
                        <label className="block text-corvid-blue font-semibold mb-2 text-sm">Select Year:</label>
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="bg-gray-200 text-corvid-blue px-4 py-2 rounded text-sm"
                        >
                            <option>2023</option>
                            <option>2024</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-corvid-blue font-semibold mb-2 text-sm">Select Month:</label>
                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="bg-gray-200 text-corvid-blue px-4 py-2 rounded text-sm"
                        >
                            {[...Array(12).keys()].map((i) => (
                                <option key={i + 1} value={i + 1}>
                                    {`Period ${i + 1}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-corvid-blue font-semibold mb-2 text-sm">Select Company:</label>
                        <select
                            value={entity}
                            onChange={(e) => setEntity(e.target.value)}
                            className="bg-gray-200 text-corvid-blue px-4 py-2 rounded text-sm"
                        >
                            <option value="CORVID">Corvid</option>
                            <option value="ATEA">Atea</option>
                            <option value="CYBER">Cyber</option>
                            <option value="HPC">HPC</option>
                            <option value="LYN">Lyn</option>
                            <option value="TALON">Talon</option>
                            <option value="TRDP">TRDP</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-corvid-blue text-sm">Loading...</p>
                ) : (
                    <table className="w-full table-fixed divide-y divide-gray-700 text-xs">
                        <thead>
                            <tr>
                                <th className="px-2 py-2 text-left font-bold text-corvid-blue uppercase">Category</th>
                                <th className="px-2 py-2 text-right font-bold text-corvid-blue uppercase">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {financialData.reduce((acc, { category, subcategory, total_amount }) => {
                                const formattedAmount = total_amount.toLocaleString();

                                if (!acc.categories.includes(category)) {
                                    acc.categories.push(category);
                                    acc.rows.push(
                                        <tr key={category} className="bg-gray-200 text-corvid-blue font-bold">
                                            <td
                                                className="px-4 py-2 cursor-pointer"
                                                onClick={() => toggleCategory(category)}
                                            >
                                                {expandedCategories[category] ? "▼" : "▶"} {category}
                                            </td>
                                            <td className="px-4 py-2 text-right">{formattedAmount}</td>
                                        </tr>
                                    );
                                }

                                if (expandedCategories[category]) {
                                    acc.rows.push(
                                        <tr key={subcategory} className="text-sm text-corvid-blue text-gray-600">
                                            <td className="px-6 py-1">{subcategory}</td>
                                            <td className="px-4 py-1 text-right">{formattedAmount}</td>
                                        </tr>
                                    );
                                }

                                return acc;
                            }, { categories: [], rows: [] }).rows}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Consolidated;
