export const bocaditoReducer = (state = [], action) => {
    switch(action.type){
        case 'AddBocadito':
            return [...state,
                {
                    ...action.payload
                }
            ];
        case 'RemoveBocaditoLogic':
            return state.filter((movie => movie.id !== action.payload))
    }
}