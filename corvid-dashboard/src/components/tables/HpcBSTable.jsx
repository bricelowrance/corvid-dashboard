import { motion } from "framer-motion";

const HpcBSTable = () => {
    const HPC_BALANCE_SHEET_DATA = {
        assets: {
            current: [
                { name: 'Cash', value: 687739 },
                { name: 'Accounts Receivable', value: 1022604 },
                { name: 'Unbilled Receivable', value: 10000 },
                { name: 'Intercompany Receivable', value: 365 },
                { name: 'Prepaid Expenses', value: 2633404 },
            ],
            fixed: [
                { name: 'Fixed Assets', value: 29611293 },
                { name: 'Accumulated Depreciation', value: -4949973 },
            ],
            deposits: 66900,
        },
        liabilities: {
            current: [
                { name: 'Accounts Payable', value: 780504 },
                { name: 'Deferred Revenue', value: 20639 },
                { name: 'Accrued Expenses', value: 60 },
                { name: 'Accrued Bonus', value: 91717 },
                { name: 'Accrued PTO/Holiday', value: 35652 },
            ],
            longTerm: [
                { name: 'Debt - Equipment', value: 4573486 },
            ],
        },
        equity: [
            { name: 'Opening Balance Equity', value: 2028244 },
            { name: 'Net Income', value: 2100320 },
        ],
    };

    const totalCurrentAssets = HPC_BALANCE_SHEET_DATA.assets.current.reduce((acc, item) => acc + item.value, 0);
    const totalFixedAssets = HPC_BALANCE_SHEET_DATA.assets.fixed.reduce((acc, item) => acc + item.value, 0);
    const totalAssets = totalCurrentAssets + totalFixedAssets + HPC_BALANCE_SHEET_DATA.assets.deposits;

    const totalCurrentLiabilities = HPC_BALANCE_SHEET_DATA.liabilities.current.reduce((acc, item) => acc + item.value, 0);
    const totalLongTermLiabilities = HPC_BALANCE_SHEET_DATA.liabilities.longTerm.reduce((acc, item) => acc + item.value, 0);
    const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

    const totalEquity = HPC_BALANCE_SHEET_DATA.equity.reduce((acc, item) => acc + item.value, 0);

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
                <h2 className='text-2xl font-bold text-gray-100 mb-6 text-center'>HPC, LLC</h2>
                <h3 className='text-lg text-gray-300 mb-8 text-center'>Balance Sheet – As of November 2024</h3>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <tbody className="divide-y divide-gray-700">
                            {/* Current Assets */}
                            <tr><td colSpan="3" className="py-4 font-semibold text-gray-300">Current Assets</td></tr>
                            {HPC_BALANCE_SHEET_DATA.assets.current.map((item, index) => (
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
                            {HPC_BALANCE_SHEET_DATA.assets.fixed.map((item, index) => (
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
                                <td className="py-2 text-right text-gray-300">${HPC_BALANCE_SHEET_DATA.assets.deposits.toLocaleString()}</td>
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
                            {HPC_BALANCE_SHEET_DATA.liabilities.current.map((item, index) => (
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
                            {HPC_BALANCE_SHEET_DATA.liabilities.longTerm.map((item, index) => (
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
                            {HPC_BALANCE_SHEET_DATA.equity.map((item, index) => (
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

export default HpcBSTable