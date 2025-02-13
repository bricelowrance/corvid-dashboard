import Header from "../components/common/Header"
import ConsolidatedISTable from "../components/overview/ConsolidatedISTable"
import IncomeCharts from "../components/overview/IncomeCharts"
import IncomeComparisonChart from "../components/overview/IncomeComparisonChart"
import IncomeStatements from "../components/overview/IncomeStatements"
import IncomeStatements2 from "../components/overview/IncomeStatements2"

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
        <Header title="Dashboard" />

        <main className="max-w-7xl mx-auto py-1 px-4 lg:px-1">
            <div className="grid grid-cols-2 gap-0 mb-8">
              <IncomeStatements />
              <IncomeStatements2 />
            </div>
            <div classname="grid grid-cols-1 gap-0 mb-8">
              <ConsolidatedISTable />
              <IncomeCharts />
              <IncomeComparisonChart />
            </div>
        </main>

    </div>
  )
}

export default OverviewPage