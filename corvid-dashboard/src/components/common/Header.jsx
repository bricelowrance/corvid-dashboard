const Header = ({ title }) => {
  return (
    <header className="bg-gray-900 bg-opacity-30 backdrop-blur-md shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8 flex items-center">
            <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
            <img
                src="/CorvidLogo_White.png"
                alt="Logo"
                className="h-10 w-auto ml-auto"
            />
        </div>

    </header>
  )
}

export default Header