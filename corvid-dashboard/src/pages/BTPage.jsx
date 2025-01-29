import Header from "../components/common/Header"
import Consolidated from "../components/overview/Consolidated"

const BTPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
        <Header title="Dashboard" />

        <main className="max-w-7xl mx-auto py-1 px-4 lg:px-1">

            {/* CHARTS */}

            <div className="grid grid-cols-1 gap-8 mb-8">
                <Consolidated />
            </div>
            
        </main>

    </div>
  )
}

export default BTPage;