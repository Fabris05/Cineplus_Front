export const socioReducer = (state = [], action) => {
    switch(action.type){
        case 'AddSocio':
            return [...state,
                {
                    ...action.payload
                }
            ];
        case 'RemoveBocaditoLogic':
            return state.filter((movie => movie.id !== action.payload))
    }
}