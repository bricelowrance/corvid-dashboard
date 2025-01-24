import React, { useState, useEffect } from "react";
import axios from "axios";

const ConsolidatedBSTable = () => {
    const [selectedCompany, setSelectedCompany] = useState("Consolidated");
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
        "CASH",
        "ACCOUNTS RECEIVABLE",
        "UNBILLED RECEIVABLE",
        "OTHER CURRENT ASSETS",
        "CURRENT ASSETS",
        "NET FIXED ASSETS",
        "DEPOSITS",
        "TOTAL ASSETS",
        "ACCOUNTS PAYABLE",
        "PAYROLL LIABILITIES",
        "ACCRUED EXPENSES",
        "DEFERRED REVENUE",
        "OTHER CURRENT LIABILITIES",
        "CURRENT LIABILITIES",
        "LINE OF CREDIT",
        "TERM LOAN",
        "EQUIPMENT LOAN",
        "LAND LOAN",
        "LONG TERM LIABILITIES",
        "TOTAL LIABILITIES",
        "RETAINED EARNINGS",
        "DIVIDENDS",
        "EQUITY",
        "TOTAL LIABILITIES AND EQUITY"
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/balance", {
                    params: { entity: selectedCompany === "Consolidated" ? undefined : selectedCompany },
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
        <div className="flex flex-col justify-center pt-6 min-h-screen">
            <div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-10 border border-gray-700 w-full max-w-7xl">
                <h2 className="text-xl font-bold text-gray-100 mb-6 text-center">
                    {selectedCompany} Balance Statement
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
                                <>
                                    {/* Add a bold line above specific categories */}
                                    {["CURRENT ASSETS", "CURRENT LIABILITIES", "LONG TERM LIABILITIES", "EQUITY"].includes(category) && (
                                        <tr key={`${category}-bold-line`}>
                                            <td colSpan={months.length + 1} style={{ borderBottom: "4px solid white", height: "1px" }}></td>
                                        </tr>
                                    )}
                                    <tr
                                        key={category}
                                        className={
                                            ["TOTAL ASSETS", "TOTAL LIABILITIES", "EQUITY", "TOTAL LIABILITIES AND EQUITY"].includes(category)
                                                ? "bg-gray-400 text-gray-900 font-extrabold" // Highlighted row styling
                                                : ["CURRENT ASSETS", "NET FIXED ASSETS", "DEPOSITS", "CURRENT LIABILITIES", "LONG TERM LIABILITIES"].includes(category)
                                                ? "font-extrabold text-gray-100"
                                                : "font-semibold text-gray-300"
                                        }
                                    >
                                        <td
                                            className="py-4 px-2 text-left"
                                            style={{
                                                wordWrap: "break-word",
                                                whiteSpace: "normal",
                                                width: "15%",
                                                border: "none",
                                            }}
                                        >
                                            {category}
                                        </td>
                                        {incomeData[category]?.map((amount, index) => (
                                            <td
                                                key={index}
                                                className="px-2 py-2 text-left"
                                                style={{
                                                    border: "none",
                                                    fontWeight: ["TOTAL ASSETS", "TOTAL LIABILITIES", "EQUITY", "TOTAL LIABILITIES AND EQUITY"].includes(category)
                                                        ? "800"
                                                        : "normal",
                                                }}
                                            >
                                                ${amount.toLocaleString() || "0"}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Add a blank row after specific categories */}
                                    {[
                                        "CURRENT ASSETS",
                                        "NET FIXED ASSETS",
                                        "DEPOSITS",
                                        "TOTAL ASSETS",
                                        "CURRENT LIABILITIES",
                                        "LONG TERM LIABILITIES",
                                        "TOTAL LIABILITIES",
                                        "EQUITY",
                                    ].includes(category) && (
                                        <tr key={`${category}-blank`}>
                                            <td colSpan={months.length + 1} style={{ height: "40px", border: "none" }}></td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>


                    </table>
                )}
            </div>
        </div>
    );
};

export default ConsolidatedBSTable;