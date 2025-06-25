export default function CardBocadito({ bocadito, onEdit, onEditState }) {
    return (
        <div className="card w-80 bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <figure className="h-50 overflow-hidden">
                <img
                    src={bocadito.imagen}
                    alt={bocadito.nombre}
                    className="object-fit "
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold text-gray-600">
                    {bocadito.nombre}
                </h2>
                <p className="text-sm text-gray-600">{bocadito.descripcion}</p>
                <div className="flex justify-between items-center mt-2">
                    <span className="badge badge-info text-white">
                        {bocadito.estado}
                    </span>
                    <span className="text-lg font-semibold text-green-600">
                        S/ {bocadito.precio}
                    </span>
                </div>
                <div className="card-actions justify-end mt-4">
                    <button
                        className="btn btn-sm btn-warning"
                        onClick={onEdit}
                    >
                        Editar
                    </button>
                    <button
                        className="btn btn-sm btn-error"
                        onClick={onEditState}
                    >
                        Estado
                    </button>
                </div>
            </div>
        </div>
    );
}
