import { motion } from "framer-motion";

const CorvidBSTable = () => {
    const BALANCE_SHEET_DATA = {
        assets: {
            current: [
                { name: 'Cash', value: 0 },
                { name: 'Accounts Receivable', value: 29709851 },
                { name: 'Unbilled Receivable', value: 17756792 },
                { name: 'Intercompany Receivable', value: 16593648 },
                { name: 'Inventory', value: 2633404 },
                { name: 'Prepaids', value: 3884371 },
                { name: 'Goodwill', value: 2236708 },
                { name: 'Other Current Assets', value: 4673 },
            ],
            fixed: [
                { name: 'Manufacturing', value: 17433916 },
                { name: 'Furniture and Fixtures', value: 1253532 },
                { name: 'Equipment', value: 5927192 },
                { name: 'Computer Equipment', value: 2012660 },
                { name: 'Vehicles', value: 77551 },
                { name: 'L/H Improvements', value: 2983792 },
                { name: 'Land', value: 9533901 },
                { name: 'Gas Gun', value: 234601 },
                { name: 'Accumulated Depreciation', value: -4949973 },
            ],
            deposits: 153914,
        },
        liabilities: {
            current: [
                { name: 'Accounts Payable', value: 27305692 },
                { name: 'Deferred Revenue', value: 61314738 },
                { name: 'Credit Card Payable', value: 316010 },
                { name: 'Payroll Liabilities', value: 7210869 },
                { name: 'Accrued Bonus', value: 3963435 },
                { name: 'Accrued Subs', value: 10631834 },
                { name: 'Other Current Liabilities', value: 98742 },
            ],
            longTerm: [
                { name: 'Line of Credit', value: 14707782 },
                { name: 'Term Loan', value: 7000000 },
                { name: 'Mortgage - Land', value: 4760745 },
            ],
        },
        equity: [
            { name: 'Retained Earnings', value: 34704732 },
            { name: 'Dividends', value: -64534047 },
        ],
    };

    const totalCurrentAssets = BALANCE_SHEET_DATA.assets.current.reduce((acc, item) => acc + item.value, 0);
    const totalFixedAssets = BALANCE_SHEET_DATA.assets.fixed.reduce((acc, item) => acc + item.value, 0);
    const totalAssets = totalCurrentAssets + totalFixedAssets + BALANCE_SHEET_DATA.assets.deposits;

    const totalCurrentLiabilities = BALANCE_SHEET_DATA.liabilities.current.reduce((acc, item) => acc + item.value, 0);
    const totalLongTermLiabilities = BALANCE_SHEET_DATA.liabilities.longTerm.reduce((acc, item) => acc + item.value, 0);
    const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

    const totalEquity = BALANCE_SHEET_DATA.equity.reduce((acc, item) => acc + item.value, 0);

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
                <h2 className='text-2xl font-bold text-gray-100 mb-6 text-center'>Corvid Technologies LLC</h2>
                <h3 className='text-lg text-gray-300 mb-8 text-center'>Balance Sheet – As of October 2024</h3>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <tbody className="divide-y divide-gray-700">
                            {/* Current Assets */}
                            <tr><td colSpan="3" className="py-4 font-semibold text-gray-300">Current Assets</td></tr>
                            {BALANCE_SHEET_DATA.assets.current.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 text-gray-400">{item.name}</td>
                                    <td className="py-2 text-right text-gray-300">${item.value.toLocaleString()}</td>
                                </tr>
                            ))}
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200">Total Current Assets</td>
                                <td className="py-4 text-right text-gray-200">${totalCurrentAssets.toLocaleString()}</td>
                            </tr>
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200"></td>
                                <td className="py-4 text-right text-gray-200"></td>
                            </tr>

                            {/* Fixed Assets */}
                            <tr><td colSpan="3" className="py-4 font-semibold text-gray-300">Fixed Assets</td></tr>
                            {BALANCE_SHEET_DATA.assets.fixed.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 text-gray-400">{item.name}</td>
                                    <td className="py-2 text-right text-gray-300">${item.value.toLocaleString()}</td>
                                </tr>
                            ))}
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200">Total Fixed Assets</td>
                                <td className="py-4 text-right text-gray-200">${totalFixedAssets.toLocaleString()}</td>
                            </tr>
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200"></td>
                                <td className="py-4 text-right text-gray-200"></td>
                            </tr>

                            {/* Deposits */}
                            <tr>
                                <td className="py-2 text-gray-400">Deposits</td>
                                <td className="py-2 text-right text-gray-300">${BALANCE_SHEET_DATA.assets.deposits.toLocaleString()}</td>
                            </tr>
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200"></td>
                                <td className="py-4 text-right text-gray-200"></td>
                            </tr>

                            {/* Total Assets */}
                            
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200">Total Assets</td>
                                <td className="py-4 text-right text-gray-200">${totalAssets.toLocaleString()}</td>
                            </tr>
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200"></td>
                                <td className="py-4 text-right text-gray-200"></td>
                            </tr>

                            {/* Liabilities */}
                            <tr><td colSpan="3" className="py-4 font-semibold text-gray-300">Current Liabilities</td></tr>
                            {BALANCE_SHEET_DATA.liabilities.current.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 text-gray-400">{item.name}</td>
                                    <td className="py-2 text-right text-gray-300">${item.value.toLocaleString()}</td>
                                </tr>
                            ))}
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200">Total Current Liabilities</td>
                                <td className="py-4 text-right text-gray-200">${totalCurrentLiabilities.toLocaleString()}</td>
                            </tr>
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200"></td>
                                <td className="py-4 text-right text-gray-200"></td>
                            </tr>

                            <tr><td colSpan="3" className="py-4 font-semibold text-gray-300">Long-Term Liabilities</td></tr>
                            {BALANCE_SHEET_DATA.liabilities.longTerm.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 text-gray-400">{item.name}</td>
                                    <td className="py-2 text-right text-gray-300">${item.value.toLocaleString()}</td>
                                </tr>
                            ))}
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200">Total Long-Term Liabilities</td>
                                <td className="py-4 text-right text-gray-200">${totalLongTermLiabilities.toLocaleString()}</td>
                            </tr>
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200"></td>
                                <td className="py-4 text-right text-gray-200"></td>
                            </tr>
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200">Total Liabilities</td>
                                <td className="py-4 text-right text-gray-200">${totalLiabilities.toLocaleString()}</td>
                            </tr>
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200"></td>
                                <td className="py-4 text-right text-gray-200"></td>
                            </tr>

                            {/* Equity Section */}
                            <tr><td colSpan="3" className="py-4 font-semibold text-gray-300">Equity</td></tr>
                            {BALANCE_SHEET_DATA.equity.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 text-gray-400">{item.name}</td>
                                    <td className="py-2 text-right text-gray-300">${item.value.toLocaleString()}</td>
                                </tr>
                            ))}
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200">Total Equity</td>
                                <td className="py-4 text-right text-gray-200">${totalEquity.toLocaleString()}</td>
                            </tr>
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200"></td>
                                <td className="py-4 text-right text-gray-200"></td>
                            </tr>
                            <tr className="font-bold">
                                <td className="py-4 text-gray-200">Total Liabilities & Equity</td>
                                <td className="py-4 text-right text-gray-200">${totalAssets.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default CorvidBSTable;
