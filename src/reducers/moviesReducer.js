export const moviesReducer = (state = [], action) => {
    switch(action.type){
        case 'AddMovie':
            return [...state,
                {
                    ...action.payload
                }
            ];
        
    }
}