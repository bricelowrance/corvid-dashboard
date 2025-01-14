import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CorvidTTable = () => {
    const [openDropdowns, setOpenDropdowns] = useState({});

    const INCOME_STATEMENT_DATA = [
        {
            category: "Revenue",
            total: [29463672, 0, 0, 0, 0, 0, 0, 0],
            subcategories: [
                { name: "Corvid", data: [25087861] },
                { name: "Lyn", data: [899696] },
                { name: "Cyber", data: [418186] },
                { name: "Talon", data: [2169600] },
                { name: "HPC", data: [367222] },
                { name: "TRDP", data: [240598] },
                { name: "Atea", data: [280508] },
            ]
        },
        {
            category: "Expense",
            total: [27084071, 0, 0, 0, 0, 0, 0, 0],
            subcategories: [
                { name: "Corvid", data: [23080790] },
                { name: "Lyn", data: [772570] },
                { name: "Cyber", data: [597933] },
                { name: "Talon", data: [1698837] },
                { name: "HPC", data: [513304] },
                { name: "TRDP", data: [173583] },
                { name: "Atea", data: [247054] },
            ]
        },
        {
            category: "Net Income",
            total: [2379601, 0, 0, 0, 0, 0, 0, 0],
            subcategories: [
                { name: "Corvid", data: [2007072] },
                { name: "Lyn", data: [127126] },
                { name: "Cyber", data: [-179747] },
                { name: "Talon", data: [470763] },
                { name: "HPC", data: [-146082] },
                { name: "TRDP", data: [67015] },
                { name: "Atea", data: [33454] },
            ]
        },
        {
            category: "Depreciation",
            total: [399178, 0, 0, 0, 0, 0, 0, 0],
            subcategories: [
                { name: "Corvid", data: [175663] },
                { name: "Lyn", data: [5334] },
                { name: "Cyber", data: [4022] },
                { name: "Talon", data: [1566] },
                { name: "HPC", data: [210598] },
                { name: "TRDP", data: [0] },
                { name: "Atea", data: [1995] },
            ]
        },
        {
            category: "Taxes",
            total: [33975, 0, 0, 0, 0, 0, 0, 0],
            subcategories: [
                { name: "Corvid", data: [832] },
                { name: "Lyn", data: [0] },
                { name: "Cyber", data: [21463] },
                { name: "Talon", data: [0] },
                { name: "HPC", data: [0] },
                { name: "TRDP", data: [11680] },
                { name: "Atea", data: [0] },
            ]
        },
        {
            category: "Interest Expense",
            total: [26689, 0, 0, 0, 0, 0, 0, 0],
            subcategories: [
                { name: "Corvid", data: [0] },
                { name: "Lyn", data: [0] },
                { name: "Cyber", data: [0] },
                { name: "Talon", data: [0] },
                { name: "HPC", data: [26689] },
                { name: "TRDP", data: [0] },
                { name: "Atea", data: [0] },
            ]
        },
        {
            category: "EBITDA",
            total: [2839443, 0, 0, 0, 0, 0, 0, 0],
            subcategories: [
                { name: "Corvid", data: [2183567] },
                { name: "Lyn", data: [132460] },
                { name: "Cyber", data: [-154262] },
                { name: "Talon", data: [472329] },
                { name: "HPC", data: [91205] },
                { name: "TRDP", data: [78695] },
                { name: "Atea", data: [35449] },
            ]
        }
    ];

    const months = [
        "Nov 2023", "Dec 2023", "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024"
    ];

    const toggleDropdown = (categoryIndex) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [categoryIndex]: !prev[categoryIndex]
        }));
    };

    return (
        <div className="flex justify-center p-6 min-h-screen">
            <div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-10 border border-gray-700 w-full max-w-6xl overflow-x-auto">
                <div className="flex justify-center items-center">
                    <img
                        src="/CorvidLogo_White.png"
                        alt="Logo"
                        className="h-20 w-auto mb-6"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Consolidated Companies</h2>
                <h3 className="text-lg text-gray-300 mb-8 text-center">Income Statement - Nov 2023 to Jun 2024</h3>

                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                Category
                            </th>
                            {months.map((month, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase"
                                >
                                    {month}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {INCOME_STATEMENT_DATA.map((section, categoryIndex) => (
                            <React.Fragment key={categoryIndex}>
                                <tr
                                    className="cursor-pointer"
                                    onClick={() => toggleDropdown(categoryIndex)}
                                >
                                    <td className="py-4 font-semibold text-gray-300 flex items-center">
                                        {section.category}
                                        <ChevronDown
                                            className={`ml-2 transition-transform ${
                                                openDropdowns[categoryIndex] ? "rotate-180" : ""
                                            }`}
                                        />
                                    </td>
                                    {section.total.map((value, i) => (
                                        <td key={i} className="py-4 text-right font-bold text-gray-300">
                                            ${value.toLocaleString()}
                                        </td>
                                    ))}
                                </tr>

                                {openDropdowns[categoryIndex] &&
                                    section.subcategories.map((sub, subIndex) => (
                                        <tr key={subIndex}>
                                            <td className="py-2 pl-8 text-gray-400">
                                                {sub.name}
                                            </td>
                                            {sub.data.map((value, i) => (
                                                <td key={i} className="py-2 text-right text-gray-300">
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

export default CorvidTTable;
