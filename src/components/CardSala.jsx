export default function CardSala({sala}){
    return(
        <div className="card w-80 bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <figure className="flex w-80 h-50 overflow-hidden mt-2">
                <img
                    src="/images/others/sala.jpg"
                    alt="sala foto"
                    className="object-fit w-auto h-40"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold text-gray-600">
                    Sala N° {sala.numero}
                </h2>
                <div className="flex justify-between items-center mt-2">
                    <span className="badge badge-info text-white">
                        {sala.estado}
                    </span>
                </div>
                <div className="card-actions justify-end mt-4">
                    <button
                        className="btn btn-sm btn-warning"
                        // onClick={() => onEdit(bocadito)}
                    >
                        Ver Butacas
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
    )
}