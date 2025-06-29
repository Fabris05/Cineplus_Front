import { useRouter } from "next/navigation";

export default function CardMovieCartelera({ movie, index, id }) {
    const { pelicula } = movie;
    const [horas, minutos] = pelicula.duracion.split(":");
    const router = useRouter();
    return (
        <div
            className="group bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-white/50 hover:border-cyan-200/50"
            key={index}
        >
            <figure className="relative pt-[150%] overflow-hidden">
                <img
                    src={pelicula.imagen}
                    alt="Movie poster"
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button
                        className="btn btn-sm bg-cyan-400/90 border-none text-white rounded-full shadow-sm mx-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        onClick={() => {
                            router.push(`/cartelera/pelicula/${id}`);
                        }}
                    >
                        Ver detalles
                    </button>
                </div>
            </figure>
            <div className="p-4">
                <h3 className="font-medium text-cyan-900">{pelicula.nombre}</h3>
                <div className="flex justify-between items-center mt-2 text-sm text-cyan-700/80">
                    <span>
                        {horas}h {minutos}min
                    </span>
                    <div className="flex items-center space-x-1">
                        <div className="rating rating-xs">
                            {/* <input
                                type="radio"
                                name="rating-5"
                                className="mask mask-star-2 bg-cyan-400"
                                checked
                            /> */}
                        </div>
                        <span>{pelicula.genero}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
