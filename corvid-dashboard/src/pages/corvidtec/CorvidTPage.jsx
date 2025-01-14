import Header from '../../components/common/Header'
import CorvidTTable from '../../components/tables/CorvidTTable'

const CorvidTPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
        <Header title="Consolidated Statement" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">

            {/* TABLE */}
            <div className="grid grid-cols-1 gap-8 mb-8">
               <CorvidTTable />
            </div>

        </main>

    </div>
  )
}

export default CorvidTPage