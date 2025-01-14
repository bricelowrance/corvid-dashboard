import Header from '../../components/common/Header'
import CorvidBSTable from '../../components/tables/CorvidBSTable'

const CorvidBSPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
        <Header title="Corvid Balance Sheet" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">

            {/* TABLE */}
            <div className="grid grid-cols-1 gap-8 mb-8">
                <CorvidBSTable />
            </div>

        </main>

    </div>
  )
}

export default CorvidBSPage