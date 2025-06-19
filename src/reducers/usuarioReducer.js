export const usuarioReducer = (state = [], action) => {
    switch(action.type){
        case 'AddUsuario':
            return [...state,
                {
                    ...action.payload
                }
            ];
        case 'RemoveBocaditoLogic':
            return state.filter((usuario => usuario.id !== action.payload))
    }
}