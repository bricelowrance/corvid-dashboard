import React, { useState, useEffect } from "react";
import axios from "axios";

const ConsolidatedCFTable = () => {
    const [selectedCompany, setSelectedCompany] = useState("Consolidated");
    const [selectedMonth, setSelectedMonth] = useState(0); // Default to the first month (index-based)
    const [balanceSheetData, setBalanceSheetData] = useState({});
    const [loading, setLoading] = useState(true);

    const months = [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
        "Jul 2024",
        "Aug 2024",
        "Sep 2024",
        "Oct 2024",
        "Nov 2024",
        "Dec 2024",
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/balance", {
                    params: { entity: selectedCompany === "Consolidated" ? undefined : selectedCompany },
                });

                const transformedData = response.data.reduce((acc, { category, period, amount }) => {
                    if (!acc[category]) acc[category] = Array(12).fill(0);
                    acc[category][period - 1] = amount;
                    return acc;
                }, {});

                setBalanceSheetData(transformedData);
            } catch (error) {
                console.error("Error fetching balance sheet data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCompany]);

    const calculateCashFlow = (category) => {
        if (!balanceSheetData[category]) return "-";
        const currentMonthValue = balanceSheetData[category][selectedMonth] || 0;
        const previousMonthValue = selectedMonth > 0 ? balanceSheetData[category][selectedMonth - 1] || 0 : 0;
        return (currentMonthValue - previousMonthValue).toLocaleString();
    };

    return (
        <div className="flex flex-col justify-center pt-6 min-h-screen">
            <div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-10 border border-gray-700 w-full max-w-7xl">
                <h2 className="text-xl font-bold text-gray-100 mb-6 text-center">
                    {selectedCompany} Statement of Cash Flows
                </h2>
                <div className="mb-6">
                    <label htmlFor="companySelect" className="block text-gray-300 mb-2 text-sm">
                        Select a Company:
                    </label>
                    <select
                        id="companySelect"
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        className="bg-gray-700 text-gray-300 px-4 py-2 rounded w-full text-sm"
                    >
                        <option>Consolidated</option>
                        <option value="CORVID">Corvid</option>
                        <option value="ATEA">Atea</option>
                        <option value="CYBER">Cyber</option>
                        <option value="HPC">HPC</option>
                        <option value="LYN">Lyn</option>
                        <option value="TALON">Talon</option>
                        <option value="TRDP">TRDP</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="monthSelect" className="block text-gray-300 mb-2 text-sm">
                        Select a Month:
                    </label>
                    <select
                        id="monthSelect"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                        className="bg-gray-700 text-gray-300 px-4 py-2 rounded w-full text-sm"
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <p className="text-center text-gray-300 text-sm">Loading...</p>
                ) : (
                    <table className="w-full table-fixed divide-y divide-gray-700 text-xs">
                        <thead>
                            <tr>
                                <th
                                    className="px-6 py-2 text-right font-medium text-gray-400 uppercase border-r border-gray-700"
                                    style={{ width: "50%" }}
                                >
                                    Category
                                </th>
                                <th
                                    className="px-6 py-2 text-left font-medium text-gray-400 uppercase border-r border-gray-700"
                                    style={{ width: "50%" }}
                                >
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {Object.keys(balanceSheetData).map((category, index) => (
                                <tr
                                    key={index}
                                    className={
                                        ["Net Income", "Operating Activities", "Investing Activities", "Financing Activities", "Net Increase in Cash"].includes(category)
                                            ? "bg-gray-400 text-gray-900 font-extrabold"
                                            : "font-semibold text-gray-300"
                                    }
                                >
                                    <td className="py-4 px-6 text-right">
                                        {category}
                                    </td>
                                    <td className="py-4 px-6 text-left">
                                        {calculateCashFlow(category)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ConsolidatedCFTable;