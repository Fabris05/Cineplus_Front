export default function CardSocio({ socio }) {
    return (
        <div className="card w-80 bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <figure className="flex w-80 h-50 overflow-hidden mt-2">
                <img
                    src="/images/others/socio.jpg"
                    alt="socio foto referencial"
                    className="object-fit w-auto h-40"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold text-gray-600">
                    {socio.nombre} {socio.apellido}
                </h2>
                <div className="flex justify-between items-center mt-2">
                    <span className="badge badge-success text-white">
                        <span className="font-bold">Desde</span>: {socio.fechaInscripcion}

                    </span>
                </div>
                <div className="card-actions justify-end mt-4">
                    <button
                        className="btn btn-sm btn-warning"
                        // onClick={() => onEdit(bocadito)}
                    >
                        Ver Puntos
                    </button>
                </div>
            </div>
        </div>
    );
}
