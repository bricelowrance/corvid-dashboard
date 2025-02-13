import Header from "../components/common/Header"
import ConsolidatedCFTable from "../components/overview/ConsolidatedCFTable"

const CFPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
        <Header title="Dashboard" />

        <main className="mx-auto py-1 px-4 lg:px-1">

            {/* CHARTS */}

            <div className="grid grid-cols-1 gap-8 mb-8">
                <ConsolidatedCFTable />
            </div>
            
        </main>

    </div>
  )
}

export default CFPage;