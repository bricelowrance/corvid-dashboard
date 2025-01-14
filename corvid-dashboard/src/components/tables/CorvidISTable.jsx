import { motion } from "framer-motion";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';  

const CorvidISTable = () => {
    const [openDropdowns, setOpenDropdowns] = useState({});

    const INCOME_STATEMENT_DATA = [
        {
            category: "Revenue",
            data: [25087861, 243009494, 289451484, 208918251, 158006284]
        },
        {
            category: "Direct Cost",
            subcategories: [
                { name: "Direct Labor", data: [2999338, 28850632, 35042091, 28749588, 18855496] },
                { name: "Travel", data: [163108, 2469605, 2922582, 2560620, 1591190] },
                { name: "Subcontractor Costs", data: [10411867, 115277702, 133328446, 82300671, 77853909] },
                { name: "Materials", data: [4672383, 30532441, 37137847, 29530903, 14564399] },
                { name: "Direct CPU", data: [286784, 3532674, 4316938, 4074179, 4079260] }
            ],
            totals: [18533481, 180663054, 212747905, 147215960, 116944254]
        },
        {
            category: "Indirect Cost",
            subcategories: [
                {
                    name: "Fringe",
                    isDropdown: true,
                    subItems: [
                        { name: "FICA", data: [438487, 3443924, 4073912, 3512921, 2024926] },
                        { name: "PTO", data: [341076, 2862722, 3337573, 2709694, 1945789] },
                        { name: "Health Insurance", data: [309727, 2856935, 3376443, 2670233, 1891209] },
                        { name: "401k Match", data: [215000, 2001016, 2371506, 2163136, 1586696] },
                        { name: "Holiday", data: [145170, 1788101, 2321641, 1412884, 930925] },
                        { name: "Other Fringe", data: [59010, 477428, 572175, 505418, 391605] }
                    ]
                },
                {
                    name: "Overhead",
                    isDropdown: true,
                    subItems: [
                        { name: "Bonus", data: [394036, 4081818, 3794117, 2923220, 1795039] },
                        { name: "Labor", data: [472268, 4378401, 4555361, 2787323, 1632748] },
                        { name: "Rent", data: [195857, 2258361, 2825631, 1989638, 1561001] },
                        { name: "Depreciation", data: [140531, 1148930, 1320692, 703072, 468797] },
                        { name: "Software", data: [83522, 779169, 927490, 657685, 341100] }
                    ]
                },
                {
                    name: "General & Administrative",
                    isDropdown: true,
                    subItems: [
                        { name: "Bonus", data: [380755, 3729334, 6105392, 5408409, 3295044] },
                        { name: "Labor", data: [267904, 2692054, 2816548, 1789080, 2287492] },
                        { name: "Professional Services", data: [113614, 899607, 824574, 598596, 343999] },
                        { name: "Supplies", data: [31647, 247189, 338833, 566778, 323107] },
                        { name: "Software Development IRAD", data: [155824, 1385076, 1541945, 608582, 306415] }
                    ]
                }
            ],
            totals: [4392754, 40097447, 46703325, 35525593, 25077654]
        }
    ];

    const periods = ["Current Period", "YTD 2024", "Trailing 12", "2023", "2022"];

    const toggleDropdown = (categoryIndex, subcategoryIndex) => {
        setOpenDropdowns((prev) => {
            const updated = { ...prev };
            const key = `${categoryIndex}-${subcategoryIndex}`;
            updated[key] = !updated[key];
            return updated;
        });
    };

    return (
        <div className="flex justify-center p-6 min-h-screen">
      
            <motion.div
                className='bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-10 border border-gray-700 w-full max-w-7xl overflow-x-auto'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                    <div className="flex justify-center items-center">
                        <img
                            src="/CorvidLogo_White.png"
                            alt="Logo"
                            className="h-20 w-auto mb-6"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Corvid Technologies LLC</h2>
                    <h3 className="text-lg text-gray-300 mb-8 text-center">Income Statement – October 2024</h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Category
                                    </th>
                                    {periods.map((period, index) => (
                                        <th
                                            key={index}
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase"
                                        >
                                            {period}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {INCOME_STATEMENT_DATA.map((section, categoryIndex) => (
                                    <React.Fragment key={categoryIndex}>
                                        <tr>
                                            <td className="py-4 font-semibold text-gray-300">{section.category}</td>
                                            {section.data && section.data.map((value, i) => (
                                                <td key={i} className="py-4 text-right text-gray-300">
                                                    ${value.toLocaleString()}
                                                </td>
                                            ))}
                                        </tr>
                                        
                                        {section.subcategories &&
                                            section.subcategories.map((sub, subcategoryIndex) => (
                                                <React.Fragment key={subcategoryIndex}>
                                                    <tr
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            sub.isDropdown &&
                                                            toggleDropdown(categoryIndex, subcategoryIndex)
                                                        }
                                                    >
                                                        <td className="py-2 pl-8 text-gray-400 flex items-center">
                                                            {sub.name}
                                                            {sub.isDropdown && (
                                                                <ChevronDown
                                                                    className={`ml-2 transition-transform ${
                                                                        openDropdowns[`${categoryIndex}-${subcategoryIndex}`]
                                                                            ? "rotate-180"
                                                                            : ""
                                                                    }`}
                                                                />
                                                            )}
                                                        </td>
                                                        <td colSpan={periods.length} />
                                                    </tr>
                                                    {( openDropdowns[`${categoryIndex}-${subcategoryIndex}`]) && 
                                                        sub.subItems &&
                                                        sub.subItems.map((item, subItemIndex) => (
                                                            <tr key={subItemIndex}>
                                                                <td className="py-2 pl-16 text-gray-500">
                                                                    {item.name}
                                                                </td>
                                                                {item.data.map((value, i) => (
                                                                    <td
                                                                        key={i}
                                                                        className="py-2 text-right text-gray-300"
                                                                    >
                                                                        ${value.toLocaleString()}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                </React.Fragment>
                                            ))}
                                        {section.totals && (
                                            <tr className="font-bold">
                                                <td className="py-4 text-gray-200">Total {section.category}</td>
                                                {section.totals.map((value, i) => (
                                                    <td key={i} className="py-4 text-right text-gray-200">
                                                        ${value.toLocaleString()}
                                                    </td>
                                                ))}
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </motion.div>
        </div>  
    );
};

export default CorvidISTable;


