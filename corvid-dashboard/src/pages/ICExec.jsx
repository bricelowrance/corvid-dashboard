import Header from "../components/common/Header"
import ICExecTable from "../components/incentivecomp/ICExecTable";

const ICExec = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
        <Header title="Incentive Compensation" />

        <main className="max-w-7xl mx-auto py-1 px-4 lg:px-1">

            <div className="grid grid-cols-1 gap-8 mb-8">
              <ICExecTable />
            </div>
            
        </main>

    </div>
  )
}

export default ICExec;