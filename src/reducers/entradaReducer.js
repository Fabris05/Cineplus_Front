export const entradaReducer = (state = [], action) => {
    switch(action.type){
        case 'AddEntrada':
            return [...state,
                {
                    ...action.payload
                }
            ];
        case 'RemoveBocaditoLogic':
            return state.filter((movie => movie.id !== action.payload))
    }
}