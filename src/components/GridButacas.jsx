export default function GridButacas({
    butacas = [],
    editable = false,
    onSelect,
    seleccionadas = [],
}) {
    // Agrupar por letra
    const filas = {};
    butacas.forEach((b) => {
        const letra = b.butaca.codigo[0];
        if (!filas[letra]) filas[letra] = [];
        filas[letra].push(b);
    });

    return (
        <div className="flex flex-col items-center w-full">
            {/* Pantalla */}
            <div className="w-full max-w-3xl h-10 bg-gray-300 rounded-b-2xl text-center text-black font-semibold mb-6 shadow-inner mt-6">
                <span className="block pt-2">Pantalla</span>
            </div>


            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl space-y-3 content-center">
                {Object.keys(filas).sort().map((letra) => (
                    <div key={letra} className="flex items-center gap-2">
                        <span className="w-6 text-black font-bold">{letra}</span>
                        {/* butacas */}
                        <div className="grid grid-cols-8 gap-3">
                            {filas[letra]
                                .sort((a, b) =>
                                    parseInt(a.butaca.codigo.slice(1)) -
                                    parseInt(b.butaca.codigo.slice(1))
                                )
                                .map((b) => {
                                    const codigo = b.butaca.codigo;
                                    const esSeleccionada = seleccionadas?.some(
                                        (sel) => sel.idButacaSala === b.idButacaSala
                                    );

                                    return (
                                        <button
                                            key={b.idButacaSala}
                                            disabled={!editable && b.estado !== "Listado"}
                                            onClick={() =>
                                                editable && onSelect?.(b)
                                            }
                                            className={`w-12 h-12 rounded-lg font-semibold text-xs shadow-md flex items-center justify-center transition-all duration-300 border border-gray-400
                                            ${
                                                b.estado === "No listado"
                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    : esSeleccionada
                                                    ? "bg-blue-600 text-white border-blue-700 scale-105"
                                                    : "bg-green-500 hover:bg-green-600 text-white"
                                            }
                                            ${
                                                editable
                                                    ? "cursor-pointer"
                                                    : "cursor-default"
                                            }`}
                                        >
                                            {codigo}
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}