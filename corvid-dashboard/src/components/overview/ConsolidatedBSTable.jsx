import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const ConsolidatedBSTable = () => {
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const months = [
        "JAN 2024", "FEB 2024", "MAR 2024", "APR 2024",
        "MAY 2024", "JUN 2024", "JUL 2024", "AUG 2024",
        "SEP 2024", "OCT 2024", "NOV 2024", "DEC 2024",
    ];

    const data = [
        {
            category: "Current Assets",
            values: [105223, 110000, 120000, 130000, 125000, 135000, 140000, 150000, 145000, 155000, 160000, 165000],
            subcategories: [
                { name: "Cash", values: [6100, 6200, 6300, 6400, 6500, 6600, 6700, 6800, 6900, 7000, 7100, 7200] },
                { name: "Accounts Receivable", values: [38400, 39000, 40000, 41000, 42000, 43000, 44000, 45000, 46000, 47000, 48000, 49000] },
                { name: "Unbilled Receivable", values: [37296, 37300, 37400, 37500, 37600, 37700, 37800, 37900, 38000, 38100, 38200, 38300] },
                { name: "Other Current Assets", values: [28904, 29000, 29100, 29200, 29300, 29400, 29500, 29600, 29700, 29800, 29900, 30000] },
            ],
        },
        {
            category: "Net Fixed Assets",
            values: [20748, 20800, 20900, 21000, 21100, 21200, 21300, 21400, 21500, 21600, 21700, 21800],
            subcategories: [],
        },
        {
            category: "Deposits",
            values: [20748, 20800, 20900, 21000, 21100, 21200, 21300, 21400, 21500, 21600, 21700, 21800],
            subcategories: [],
        },
        {
            category: "Total Assets",
            values: [20748, 20800, 20900, 21000, 21100, 21200, 21300, 21400, 21500, 21600, 21700, 21800],
            subcategories: [],
        },
        {
            category: "Current Liabilities",
            values: [102815, 103000, 104000, 105000, 106000, 107000, 108000, 109000, 110000, 111000, 112000, 113000],
            subcategories: [
                { name: "Accounts Payable", values: [21804, 21900, 22000, 22100, 22200, 22300, 22400, 22500, 22600, 22700, 22800, 22900] },
                { name: "Payroll Liabilities", values: [8056, 8100, 8150, 8200, 8250, 8300, 8350, 8400, 8450, 8500, 8550, 8600] },
                { name: "Accrued Expenses", values: [13156, 13200, 13300, 13400, 13500, 13600, 13700, 13800, 13900, 14000, 14100, 14200] },
                { name: "Deferred Revenue", values: [47716, 47800, 47900, 48000, 48100, 48200, 48300, 48400, 48500, 48600, 48700, 48800] },
                { name: "Other Current Liabilities", values: [12081, 12100, 12200, 12300, 12400, 12500, 12600, 12700, 12800, 12900, 13000, 13100] },
            ],
        },
        {
            category: "Long-Term Liabilities",
            values: [102815, 103000, 104000, 105000, 106000, 107000, 108000, 109000, 110000, 111000, 112000, 113000],
            subcategories: [
                { name: "Line of Credit", values: [21804, 21900, 22000, 22100, 22200, 22300, 22400, 22500, 22600, 22700, 22800, 22900] },
                { name: "Term Loan", values: [8056, 8100, 8150, 8200, 8250, 8300, 8350, 8400, 8450, 8500, 8550, 8600] },
                { name: "Equipment Loan", values: [13156, 13200, 13300, 13400, 13500, 13600, 13700, 13800, 13900, 14000, 14100, 14200] },
                { name: "Land Loan", values: [47716, 47800, 47900, 48000, 48100, 48200, 48300, 48400, 48500, 48600, 48700, 48800] },
            ],
        },
        {
            category: "Total Liabilities",
            values: [20748, 20800, 20900, 21000, 21100, 21200, 21300, 21400, 21500, 21600, 21700, 21800],
            subcategories: [],
        },
        {
            category: "Equity",
            values: [102815, 103000, 104000, 105000, 106000, 107000, 108000, 109000, 110000, 111000, 112000, 113000],
            subcategories: [
                { name: "Retained Earnings", values: [21804, 21900, 22000, 22100, 22200, 22300, 22400, 22500, 22600, 22700, 22800, 22900] },
                { name: "Dividends", values: [8056, 8100, 8150, 8200, 8250, 8300, 8350, 8400, 8450, 8500, 8550, 8600] },
            ],
        },
        {
            category: "Total Liabilities and Equity",
            values: [20748, 20800, 20900, 21000, 21100, 21200, 21300, 21400, 21500, 21600, 21700, 21800],
            subcategories: [],
        },
    ];

    return (
        <div className="flex flex-col justify-center p-10 min-h-screen">
            <div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-10 border border-gray-700 w-full h-full">
                <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
                    Balance Sheet
                </h2>
                <h3 className="text-lg text-gray-300 mb-8 text-center">For the Year 2024</h3>

                <table className="table-fixed w-full border-collapse divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="w-1/6 px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase border-r border-gray-700">
                                Category
                            </th>
                            {months.map((month, index) => (
                                <th
                                    key={index}
                                    className="w-1/12 px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase border-r border-gray-700"
                                >
                                    {month}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {data.map((section, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className="cursor-pointer bg-gray-700 hover:bg-gray-600"
                                    onClick={() => toggleSection(section.category)}
                                >
                                    <td className="px-6 py-4 font-bold text-gray-100 flex items-center">
                                        <span>{section.category}</span>
                                        {section.subcategories.length > 0 && (
                                            <ChevronDown className="ml-2 text-gray-300" />
                                        )}
                                    </td>
                                    {section.values.map((value, monthIndex) => (
                                        <td
                                            key={monthIndex}
                                            className="px-2 py-4 text-right font-bold text-gray-100"
                                        >
                                            ${value.toLocaleString()}
                                        </td>
                                    ))}
                                </tr>
                                {expandedSections[section.category] &&
                                    section.subcategories.map((sub, subIndex) => (
                                        <tr key={subIndex} className="bg-gray-800">
                                            <td className="px-4 py-3 text-gray-300">
                                                {sub.name}
                                            </td>
                                            {sub.values.map((value, monthIndex) => (
                                                <td
                                                    key={monthIndex}
                                                    className="px-2 py-3 text-left text-gray-300"
                                                >
                                                    ${value.toLocaleString()}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ConsolidatedBSTable;


