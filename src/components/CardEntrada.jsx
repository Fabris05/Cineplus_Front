export default function CardEntrada({ entrada }) {
    return (
        <div className="card w-80 bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <figure className="flex w-80 h-50 overflow-hidden mt-2">
                <img
                    src="/images/others/entrada.png"
                    alt="entrada foto"
                    className="object-fit w-auto h-40"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold text-gray-600">
                    {entrada.tipo}
                </h2>
                <p className="text-sm text-gray-600">{entrada.descripcion}</p>
                <div className="flex justify-between items-center mt-2">
                    <span className="badge badge-info text-white">
                        {entrada.estado}
                    </span>
                    <span className="text-lg font-semibold text-green-600">
                        S/ {entrada.precio}
                    </span>
                </div>
                <div className="card-actions justify-end mt-4">
                    <button
                        className="btn btn-sm btn-warning"
                        // onClick={() => onEdit(bocadito)}
                    >
                        Editar
                    </button>
                    <button
                        className="btn btn-sm btn-error"
                        // onClick={() => onDelete(bocadito.id)}
                    >
                        Estado
                    </button>
                </div>
            </div>
        </div>
    );
}
