const itinerariesReducer = (state = {allItineraries: []}, action) =>{

    switch (action.type) {
        case "GET_ITINERARIES_CITY":
            return {
                ...state,
                allItineraries: action.payload
            }
            default:
                return state
    }
}

export default itinerariesReducer