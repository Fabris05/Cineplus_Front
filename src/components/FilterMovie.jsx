export default function FilterMovie() {
    return (
        <div className="flex flex-wrap justify-center gap-4 p-6 mt-6 backdrop-blur-sm bg-white/20 rounded-lg mx-auto max-w-4xl border border-white/30">
            <div className="relative">
                <select className="select bg-white/70 backdrop-blur-sm text-cyan-900 border-white/30 pl-10 pr-4 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent">
                    <option disabled selected>
                        <span className="flex items-center">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                ></path>
                            </svg>
                            Género
                        </span>
                    </option>
                    <option>Acción</option>
                    <option>Comedia</option>
                    <option>Drama</option>
                </select>
                <div className="absolute left-3 top-3 text-cyan-600">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="relative">
                <select className="select bg-white/70 backdrop-blur-sm text-cyan-900 border-white/30 pl-10 pr-4 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent">
                    <option disabled selected>
                        <span className="flex items-center">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                            </svg>
                            Fecha
                        </span>
                    </option>
                    <option>Estrenos</option>
                    <option>Próximamente</option>
                </select>
                <div className="absolute left-3 top-3 text-cyan-600">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                    </svg>
                </div>
            </div>

            <button className="btn bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none rounded-xl shadow-sm hover:shadow-md transition-all">
                <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
                Buscar
            </button>
        </div>
    );
}
