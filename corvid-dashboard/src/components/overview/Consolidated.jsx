import React, { useState, useEffect } from "react";
import axios from "axios";

const Consolidated = () => {
    const [selectedEntity, setSelectedEntity] = useState("Consolidated");
    const [data, setData] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubcategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/subcategories", {
                    params: { entity: selectedEntity },
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching subcategories data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubcategories();
    }, [selectedEntity]);
    

    const groupDataByCategory = () => {
        const grouped = {};
        data.forEach((row) => {
            if (!grouped[row.category]) {
                grouped[row.category] = {};
            }
            if (!grouped[row.category][row.subcategory]) {
                grouped[row.category][row.subcategory] = Array(12).fill(0);
            }
            grouped[row.category][row.subcategory][row.period - 1] = row.amount;
        });
        return grouped;
    };

    const calculateCategoryTotals = (categoryData) => {
        return Object.values(categoryData).reduce((totals, subcategoryData) => {
            subcategoryData.forEach((amount, index) => {
                totals[index] += amount;
            });
            return totals;
        }, Array(12).fill(0));
    };

    const groupedData = groupDataByCategory();

    return (
        <div className="flex flex-col justify-center pt-6 min-h-screen">
            <div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-10 border border-gray-700 w-full max-w-7xl">
                <h2 className="text-xl font-bold text-gray-100 mb-6 text-center">
                    {selectedEntity} Balance Sheet
                </h2>
                <div className="mb-6">
                    <label htmlFor="entitySelect" className="block text-gray-300 mb-2 text-sm">
                        Select an Entity:
                    </label>
                    <select
                        id="entitySelect"
                        value={selectedEntity}
                        onChange={(e) => setSelectedEntity(e.target.value)}
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
                    <p className="text-center text-gray-300">Loading...</p>
                ) : (
                    <table className="w-full table-fixed divide-y divide-gray-700 text-xs">
                        <thead>
                            <tr>
                                <th className="px-2 py-2 text-left text-gray-400 uppercase">Category</th>
                                {[...Array(12)].map((_, i) => (
                                    <th key={i} className="px-2 py-2 text-center text-gray-400">
                                        Month {i + 1}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(groupedData).map((category) => {
                                const categoryTotals = calculateCategoryTotals(groupedData[category]);
                                return (
                                    <React.Fragment key={category}>
                                        <tr onClick={() => toggleCategory(category)}>
                                            <td className="px-2 py-2 font-bold text-gray-200 cursor-pointer">
                                                {category} {expandedCategories[category] ? "▲" : "▼"}
                                            </td>
                                            {categoryTotals.map((total, i) => (
                                                <td key={i} className="px-2 py-2 text-right text-gray-300">
                                                    ${total.toLocaleString()}
                                                </td>
                                            ))}
                                        </tr>
                                        {expandedCategories[category] &&
                                            Object.keys(groupedData[category]).map((subcategory) => (
                                                <tr key={subcategory} className="bg-gray-700">
                                                    <td className="px-4 py-2 text-gray-300">
                                                        {subcategory}
                                                    </td>
                                                    {groupedData[category][subcategory].map((amount, i) => (
                                                        <td
                                                            key={i}
                                                            className="px-2 py-2 text-right text-gray-300"
                                                        >
                                                            ${amount.toLocaleString()}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Consolidated;