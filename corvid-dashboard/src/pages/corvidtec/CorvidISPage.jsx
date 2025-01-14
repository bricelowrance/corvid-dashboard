import Header from '../../components/common/Header'
import CorvidISTable from '../../components/tables/CorvidISTable'

const CorvidISPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
        <Header title="Corvid Income Statement" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">

            {/* TABLE */}
            <div className="grid grid-cols-1 gap-8 mb-8">
               <CorvidISTable />
            </div>

        </main>

    </div>
  )
}

export default CorvidISPage