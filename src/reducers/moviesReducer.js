export const moviesReducer = (state = [], action) => {
    switch(action.type){
        case 'AddMovie':
            return [...state,
                {
                    ...action.payload
                }
            ];
        case 'RemoveMovieLogic':
            return state.filter((movie => movie.id !== action.payload))
    }
}