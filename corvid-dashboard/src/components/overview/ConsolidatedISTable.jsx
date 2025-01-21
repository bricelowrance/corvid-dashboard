import React, { useState, useEffect } from "react";
import axios from "axios";

const ConsolidatedISTable = () => {
    const [selectedCompany, setSelectedCompany] = useState("CORVID");
    const [incomeData, setIncomeData] = useState({});
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

    const categories = [
        "REVENUE",
        "EXPENSE",
        "NET INCOME",
        "DEPRECIATION",
        "TAXES",
        "AMORTIZATION",
        "INTEREST EXPENSE",
        "EBITDA",
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/income", {
                    params: { entity: selectedCompany === "All" ? undefined : selectedCompany },
                });
    
                const transformedData = categories.reduce((acc, category) => {
                    acc[category] = Array(12).fill(0);
                    response.data.forEach(({ category: cat, period, amount }) => {
                        if (cat === category) {
                            acc[category][period - 1] = amount;
                        }
                    });
                    return acc;
                }, {});
    
                setIncomeData(transformedData);
            } catch (error) {
                console.error("Error fetching income statement data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [selectedCompany]);
    

    return (
        <div className="flex flex-col justify-center p-0 min-h-screen">
            <div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-10 border border-gray-700 w-full max-w-7xl">
                <h2 className="text-xl font-bold text-gray-100 mb-6 text-center">
                    {selectedCompany} Income Statement
                </h2>
                <h3 className="text-lg text-gray-300 mb-8 text-center">For the Year 2024</h3>

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
                        <option>All</option>
                        <option value="CORVID">Corvid</option>
                        <option value="ATEA">Atea</option>
                        <option value="CYBER">Cyber</option>
                        <option value="HPC">HPC</option>
                        <option value="LYN">Lyn</option>
                        <option value="TALON">Talon</option>
                        <option value="TRDP">TRDP</option>
                    </select>
                </div>

                {loading ? (
                    <p className="text-center text-gray-300 text-sm">Loading...</p>
                ) : (
                    <table className="w-full table-fixed divide-y divide-gray-700 text-xs">
                        <thead>
                            <tr>
                                <th
                                    className="px-2 py-2 text-left font-medium text-gray-400 uppercase border-r border-gray-700"
                                    style={{ width: "15%" }} // Set a fixed width for the "Category" column
                                >
                                    Category
                                </th>
                                {months.map((month, index) => (
                                    <th
                                        key={index}
                                        className="px-2 py-3 text-center font-medium text-gray-400 uppercase border-r border-gray-700"
                                    >
                                        {month}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {categories.map((category) => (
                                <tr key={category}>
                                    <td
                                        className="py-4 px-2 text-left font-semibold text-gray-300 border-r border-gray-700"
                                        style={{
                                            wordWrap: "break-word", // Ensure text wraps if it overflows
                                            whiteSpace: "normal", // Allow text to wrap
                                            width: "15%", // Match the fixed width
                                        }}
                                    >
                                        {category}
                                    </td>
                                    {incomeData[category]?.map((amount, index) => (
                                        <td
                                            key={index}
                                            className="px-2 py-2 text-left text-gray-300 border-r border-gray-700"
                                        >
                                            ${amount.toLocaleString() || "0"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                )}
            </div>


        </div>
    );
};

export default ConsolidatedISTable;


