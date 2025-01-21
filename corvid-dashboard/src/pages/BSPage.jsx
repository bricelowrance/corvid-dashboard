import Header from "../components/common/Header"
import ConsolidatedBSTable from "../components/overview/ConsolidatedBSTable"

const BSPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
        <Header title="Dashboard" />

        <main className="max-w-7xl mx-auto py-1 px-4 lg:px-1">

            {/* CHARTS */}

            <div className="grid grid-cols-1 gap-8 mb-8">
                <ConsolidatedBSTable />
            </div>
            
        </main>

    </div>
  )
}

export default BSPage;