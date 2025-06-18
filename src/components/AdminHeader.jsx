import Link from "next/link";

export default function AdminHeader() {
    return (
        <>
            <div className="flex p-5 flex-row justify-between bg-black items-center">
                <h1 className="text-2xl text-left items-center text-white font-bold">
                    <Link href="/admin">Admin Page</Link>
                </h1>
                <nav>
                    <ul className="flex flex-row gap-10 text-white text-7x1 font-semibold items-center">
                        <li className="hover:text-yellow-300 duration-300 ease-in">
                            <Link href="/admin/pelicula">Peliculas</Link>
                        </li>
                        <li className="hover:text-yellow-300 duration-300 ease-in">
                            <Link href="/admin/bocadito">Bocaditos</Link>
                        </li>
                        <li className="hover:text-yellow-300 duration-300 ease-in">
                            <Link href="/admin/entrada">Entradas</Link>
                        </li>
                        <li className="hover:text-yellow-300 duration-300 ease-in">
                            <Link href="/admin/sala">Sala</Link>
                        </li>
                        <li className="hover:text-yellow-300 duration-300 ease-in">
                            <Link href="/admin/sala">Clientes</Link>
                        </li>
                        <li className="hover:text-yellow-300 duration-300 ease-in">
                            <Link href="/admin/usuario">Usuarios</Link>
                        </li>

                        <button className="justify-center font-semibold bg-red-800 px-2 py-2 rounded-md flex items-center hover:bg-red-700 transition-all ease-in-out hover:-translate-y-1 hover:scale-105 duration-200 hover:text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="size-5"
                            >
                                <path d="M8.543 2.232a.75.75 0 0 0-1.085 0l-5.25 5.5A.75.75 0 0 0 2.75 9H4v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h1.25a.75.75 0 0 0 .543-1.268l-5.25-5.5Z" />
                            </svg>
                            <span className="pl-1">Salir</span>
                        </button>
                    </ul>
                </nav>
            </div>
        </>
    );
}
