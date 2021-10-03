
const citiesReducer = (state = {allCities: [], cityFiltered: [], city: {}}, action) => {
    switch (action.type) {
        case "GET_ALL_CITIES":
            return {
                ...state,
                allCities : action.payload,
                cityFiltered: action.payload
            }
        case "GET_CITY":
            return {
                ...state,
                cityFiltered : state.allCities.filter((item) => (item.city.toLowerCase().startsWith(action.payload.trim().toLowerCase()))),
            } 
        case "GET_ONE_CITY":
            return {
                ...state,
                city : state.allCities.find(city => (city._id === action.payload))
            }  
        case "BORRAR":
            return {
                ...state, 
                allCities: action.payload
            }
        default:
            return state
    }
}

export default citiesReducer