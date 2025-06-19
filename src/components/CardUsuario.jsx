export default function CardUsuario({usuario}){

    const rol = usuario.rol.rol;

    return(
        <div className="card w-80 bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <figure className="flex w-80 h-50 overflow-hidden mt-2">
                <img
                    src="/images/others/userIcon.jpg"
                    alt="socio foto referencial"
                    className="object-fit w-auto h-40"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold text-gray-600">
                    {usuario.nombre} {usuario.apellido}
                </h2>
                <div className="flex justify-between items-center mt-2">
                    <span className = {`badge badge-${rol==='Gerente' ? 'info' : 'success'} text-white`}>
                        <span className="font-bold">Rol:</span>{rol}

                    </span>
                </div>
                <div className="card-actions justify-end mt-4">
                    <button
                        className="btn btn-sm btn-warning"
                        // onClick={() => onEdit(bocadito)}
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    )
}