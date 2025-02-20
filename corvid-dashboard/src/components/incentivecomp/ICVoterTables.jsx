import React, { useState, useEffect } from "react";

const ICVoterTables = () => {
    const [charges] = useState([
        { mod: "25.1_1", chargeCode: "1528-010", amount: "100,000.00", info: "EXTEND POP", description: "MOVING DISCONTINUOUS GALERKIN SOLVER FOR HYPERSONIC AEROTHERMODYNAMICS", customer: "NSSC" },
        { mod: "25.1_2", chargeCode: "1326-060", amount: "155,182.00", info: "NEW CONTRACT", description: "PREDICTIVE PHYSICS-BASED MODEL FOR PROJECTILE", customer: "NAVY SBIR" },
        { mod: "25.1_3", chargeCode: "1483-330", amount: "500,000.00", info: "FUNDING INCREASE", description: "BMD 6 FY 24", customer: "MDA" },
        { mod: "25.1_4A", chargeCode: "1590-220", amount: "600,000.00", info: "EXTEND POP", description: "WEAPONS PERFORMANCE AND MODELING (DTD RANGE SAFETY)", customer: "ATI" },
        { mod: "25.1_4B", chargeCode: "1326-090", amount: "167,182.00", info: "NEW CONTRACT", description: "WEAPONS PERFORMANCE AND MODELING (DTD RANGE SAFETY)", customer: "ATI" },
        { mod: "25.1_5", chargeCode: "1483-330", amount: "570,000.00", info: "FUNDING INCREASE", description: "MEDIUM AND HEAVY COMBAT VEHICLE TECHNOLOGY PROTOTYPING", customer: "LOCKHEED MARTIN MISSILE AND FIRE CONTROL" },
        { mod: "25.1_6", chargeCode: "1526-030", amount: "130,000.00", info: "EXTEND POP", description: "TARGET MOTION RESOLUTIONS ANALYSIS (TMRA) SUPPORT", customer: "LYN AEROSPACE, LLC" },
        { mod: "25.1_7", chargeCode: "1378-050", amount: "N/A", info: "ADMIN", description: "GWS", customer: "NORTHROP GRUMMAN CORPORATION" },
        { mod: "25.1_8A", chargeCode: "1446-330", amount: "500,000.00", info: "FUNDING INCREASE", description: "WEAPON EFFECTIVENESS ANALYSIS", customer: "ANDURIL" },
        { mod: "25.1_8B", chargeCode: "1528-010", amount: "100,054.00", info: "EXTEND POP", description: "WEAPON EFFECTIVENESS ANALYSIS", customer: "ANDURIL" },
        { mod: "25.1_8C", chargeCode: "1640-210", amount: "155,182.00", info: "NEW CONTRACT", description: "STRIKE/TOMCAT HPC", customer: "NG" },
        { mod: "25.1_8D", chargeCode: "1445-330", amount: "500,000.00", info: "FUNDING INCREASE", description: "ENERGETICS INITIATION AND DEMONSTRATION HARDWARE", customer: "QDIV" },
    ]);

    const [allocationsMap, setAllocationsMap] = useState({});
    const [allocations, setAllocations] = useState([]);
    const [totalAllocation, setTotalAllocation] = useState(0);
    const [selectedCharge, setSelectedCharge] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (charges.length > 0) {
            handleRowClick(charges[0]); // Automatically select the first row
        }
    }, []);

    const handleRowClick = (charge) => {
        setSelectedCharge(charge);
        const savedAllocations = allocationsMap[charge.chargeCode] || [];
        setAllocations(savedAllocations);
        setTotalAllocation(savedAllocations.reduce((sum, item) => sum + (Number(item.allocation) || 0), 0));
        setIsSubmitted(savedAllocations.length > 0);
    };

    const handleAddAllocation = () => {
        if (totalAllocation < 100) {
            setAllocations([...allocations, { name: "", allocation: "" }]);
        }
    };

    const handleAllocationChange = (index, field, value) => {
        if (!isSubmitted) {
            const updatedAllocations = [...allocations];
            updatedAllocations[index][field] = value;
            setAllocations(updatedAllocations);

            const newTotal = updatedAllocations.reduce((sum, item) => sum + (Number(item.allocation) || 0), 0);
            setTotalAllocation(newTotal);
        }
    };

    const handleRemoveAllocation = (index) => {
        if (!isSubmitted) {
            const updatedAllocations = allocations.filter((_, i) => i !== index);
            setAllocations(updatedAllocations);

            const newTotal = updatedAllocations.reduce((sum, item) => sum + (Number(item.allocation) || 0), 0);
            setTotalAllocation(newTotal);
        }
    };

    const handleClear = () => {
        if (!isSubmitted) {
            setAllocations([]);
            setTotalAllocation(0);
        }
    };

    const handleSubmit = () => {
        if (totalAllocation === 100) {
            setAllocationsMap({ ...allocationsMap, [selectedCharge.chargeCode]: allocations });
            setIsSubmitted(true);
        } else {
            alert("Total allocation must be exactly 100%.");
        }
    };

    return (
        <div className="flex flex-col items-center pt-6">
            <div className="bg-white shadow-lg p-10 border border-gray-700 w-full max-w-7xl">
                <h2 className="text-xl font-extrabold text-corvid-blue mb-6 text-center">
                    Incentive Compensation Allocation
                </h2>

                {/* LARGER TABLE */}

                <div className="flex">
                    <div className="w-2/3 pr-4">
                        <table className="w-full table-fixed divide-y divide-gray-700 text-xs">
                            <thead>
                                <tr>
                                    <th className="px-2 py-2 text-left font-bold text-corvid-blue uppercase">Mod</th>
                                    <th className="px-2 py-2 text-left font-bold text-corvid-blue uppercase">Charge Code</th>
                                    <th className="px-2 py-2 text-left font-bold text-corvid-blue uppercase">Amount</th>
                                    <th className="px-2 py-2 text-left font-bold text-corvid-blue uppercase">Mod Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {charges.map((charge, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b border-gray-200 cursor-pointer ${
                                            selectedCharge?.chargeCode === charge.chargeCode &&
                                            selectedCharge?.amount === charge.amount &&
                                            selectedCharge?.info === charge.info
                                                ? "bg-gray-200 text-corvid-blue"
                                                : "text-corvid-blue"
                                        }`}
                                        onClick={() => handleRowClick(charge)}
                                    >
                                        <td className="px-4 py-2 font-bold">{charge.mod}</td>
                                        <td className="px-4 py-2 font-bold">{charge.chargeCode}</td>
                                        <td className="px-4 py-2 font-bold">{charge.amount}</td>
                                        <td className="px-4 py-2 font-bold">{charge.info}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="w-px bg-gray-700"></div>

                    {/* SMALLER TABLE */}

                    <div className="w-1/3 pl-4">
                        <div>
                            {selectedCharge && (
                                <div className="mb-4 p-4 bg-gray-200 border-gray-300 rounded">
                                    <h3 className="pb-2 text-center underline text-md font-bold text-corvid-blue">Selected Mod</h3>
                                    <p className="text-sm text-corvid-blue"><strong>Charge Code:</strong> {selectedCharge.chargeCode}</p>
                                    <p className="text-sm text-corvid-blue"><strong>Customer:</strong> {selectedCharge.customer}</p>
                                    <p className="text-sm text-corvid-blue"><strong>Amount:</strong> {selectedCharge.amount}</p>
                                    <p className="text-sm text-corvid-blue"><strong>Type:</strong> {selectedCharge.info}</p>
                                    <p className="text-sm text-corvid-blue"><strong>Description:</strong> {selectedCharge.description}</p>
                                </div>
                            )}
                        </div>
                        <table className="w-full table-fixed divide-y divide-gray-700 text-xs">
                            <thead>
                                <tr>
                                    <th className="px-2 py-2 text-center font-bold text-corvid-blue uppercase">Name</th>
                                    <th className="px-2 py-2 text-center font-bold text-corvid-blue uppercase">Allocation %</th>
                                </tr>
                            </thead>
                            <tbody>
                            {allocationsMap[selectedCharge?.chargeCode] ? (
                                    allocationsMap[selectedCharge.chargeCode].map((alloc, index) => (
                                        <tr key={index}>
                                            <td className="px-3 py-2 text-corvid-blue">{alloc.name}</td>
                                            <td className="px-3 py-2 text-right text-corvid-blue">{alloc.allocation}%</td>
                                        </tr>
                                    ))
                                ) : (
                                    allocations.map((alloc, index) => (
                                        <tr key={index}>
                                            <td className="px-3 py-2">
                                                <select className="w-full border px-2 py-1 text-corvid-blue" onChange={(e) => handleAllocationChange(index, "name", e.target.value)}>
                                                    <option value="">Select Name</option>
                                                    <option value="Chase Speicher">Chase Speicher</option>
                                                    <option value="Brice Lowrance">Brice Lowrance</option>
                                                    <option value="Wesley Sweatt">Wesley Sweatt</option>
                                                </select>
                                            </td>
                                            <td className="flex px-3 py-2 text-right text-corvid-blue">
                                                <input
                                                    type="number"
                                                    className="w-full border px-2 py-1 text-right"
                                                    value={alloc.allocation}
                                                    onChange={(e) => handleAllocationChange(index, "allocation", e.target.value)}
                                                />
                                                <button className="ml-2 px-2 py-1 bg-gray-200 font-bold text-corvid-blue rounded" onClick={() => handleRemoveAllocation(index)}>X</button>
                                            </td>
                                        </tr>
                                        
                                    ))
                                )}
                                {!allocationsMap[selectedCharge?.chargeCode] && (
                                <button className="mt-2 px-2 py-1 bg-gray-200 font-bold text-corvid-blue rounded" onClick={handleAddAllocation} disabled={totalAllocation >= 100}>
                                    +
                                </button>
                                )}
                            </tbody>
                        </table>
                        <p className="text-right mt-2 font-bold text-corvid-blue">Total: {totalAllocation}%</p>

                        {!allocationsMap[selectedCharge?.chargeCode] && (
                            <div className="mt-6 flex justify-between">
                                <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={handleClear}>
                                    Clear
                                </button>
                                <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={handleSubmit} disabled={isSubmitted}>
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ICVoterTables;

