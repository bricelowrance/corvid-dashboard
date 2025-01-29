import React, { useState, useEffect } from "react";
import axios from "axios";

const ConsolidatedCFTable = () => {
    const [selectedCompany, setSelectedCompany] = useState("Consolidated");
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [balanceSheetData, setBalanceSheetData] = useState({});
    const [loading, setLoading] = useState(true);
    const [netIncome, setNetIncome] = useState("-");

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

    const categoryOrder = [
        "NET INCOME",
        "OPERATING ACTIVITIES",
        "ACCOUNTS RECEIVABLE",
        "UNBILLED RECEIVABLE",
        "OTHER CURRENT ASSETS",
        "ACCOUNTS PAYABLE",
        "PAYROLL LIABILITIES",
        "ACCRUED EXPENSES",
        "DEFERRED REVENUE",
        "OTHER CURRENT LIABILITIES",
        "DEPOSITS",
        "INVESTING ACTIVITIES",
        "NET FIXED ASSETS",
        "FINANCING ACTIVITIES",
        "LONG TERM LIABILITIES",
        "DIVIDENDS",
        "CASH",
    ];

    const categoryDisplayNames = {
        "NET FIXED ASSETS": "PURCHASES OF FIXED ASSETS",
        "LONG TERM LIABILITIES": "PRINCIPLE PAYMENTS ON LOANS",
        "DIVIDENDS": "DISTRIBUTIONS",
        "CASH": "INCREASE IN CASH",
    };

    useEffect(() => {
        const fetchBalanceSheetData = async () => {
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

        const fetchNetIncome = async () => {
            try {
                console.log("Fetching Net Income for:", selectedCompany, "Month:", selectedMonth + 1);
        
                const response = await axios.get("http://localhost:5000/net_income", {
                    params: {
                        entity: selectedCompany === "Consolidated" ? undefined : selectedCompany,
                        period: selectedMonth + 1,
                    },
                });
        
                console.log("Net Income Response:", response.data);
        
                setNetIncome(response.data.length > 0 ? response.data[0].amount.toLocaleString() : "No data available");
            } catch (error) {
                console.error("Error fetching Net Income:", error.response ? error.response.data : error.message);
                setNetIncome("Error");
            }
        };

        setLoading(true);
        fetchBalanceSheetData();
        fetchNetIncome();
    }, [selectedCompany, selectedMonth]);

    const calculateCashFlow = (category) => {
        if (!balanceSheetData[category]) return "-";
        const currentMonthValue = balanceSheetData[category][selectedMonth] || 0;
        const previousMonthValue = selectedMonth > 0 ? balanceSheetData[category][selectedMonth - 1] || 0 : 0;
        return (currentMonthValue - previousMonthValue).toLocaleString();
    };

    const filteredAndOrderedData = categoryOrder.map((category) => {
        const displayName = categoryDisplayNames[category] || category; // Use mapped name if it exists
        if (category === "NET INCOME") {
            return { name: displayName, amount: netIncome, isHeader: false };
        }
        if (["OPERATING ACTIVITIES", "INVESTING ACTIVITIES", "FINANCING ACTIVITIES"].includes(category)) {
            return { name: displayName, amount: "", isHeader: true };
        }
        return {
            name: displayName,
            amount: calculateCashFlow(category),
            isHeader: false,
        };
    });

    return (
        <div className="flex flex-col justify-center pt-6 min-h-screen">
            <div className="bg-white bg-opacity-100 shadow-lg rounded-xl p-10 border border-gray-700 w-full max-w-7xl">
                <h2 className="text-xl font-bold text-corvid-blue mb-6 text-center">
                    {selectedCompany} Statement of Cash Flows
                </h2>
                <div className="mb-6">
                    <label htmlFor="companySelect" className="block text-corvid-blue mb-2 text-sm">
                        Select a Company:
                    </label>
                    <select
                        id="companySelect"
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        className="bg-gray-200 text-corvid-blue px-4 py-2 rounded w-full text-sm"
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
                    <label htmlFor="monthSelect" className="block text-corvid-blue mb-2 text-sm">
                        Select a Month:
                    </label>
                    <select
                        id="monthSelect"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                        className="bg-gray-200 text-corvid-blue px-4 py-2 rounded w-full text-sm"
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <p className="text-center text-corvid-blue text-sm">Loading...</p>
                ) : (
                    <table className="w-full table-fixed divide-y divide-gray-700 text-xs">
                        <thead>
                            <tr>
                                <th
                                    className="px-6 py-2 text-right font-bold text-corvid-blue uppercase border-gray-700"
                                    style={{ width: "50%" }}
                                >
                                    Category
                                </th>
                                <th
                                    className="px-6 py-2 text-left font-bold text-corvid-blue uppercase border-gray-700"
                                    style={{ width: "50%" }}
                                >
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-gray-700">
                            {filteredAndOrderedData.map(({ name, amount, isHeader }, index) => (
                                <tr
                                    key={index}
                                    className={isHeader ? "text-corvid-blue font-extrabold" : "font-semibold text-corvid-blue"}
                                >
                                    <td className="py-4 px-6 text-right">{name}</td>
                                    <td className="py-4 px-6 text-left">{amount}</td>
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

