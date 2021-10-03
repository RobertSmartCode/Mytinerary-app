import axios from "axios"

const citiesActions = {
    recCities: () => {
        
        return async (dispatch, getState) => {
            let respuesta = await axios.get("http://192.168.1.33:4000/api/cities")
            if (respuesta.data.success){
                let data = respuesta.data.response
                dispatch({type: "GET_ALL_CITIES", payload: data}) 
                
            }else throw new Error()
        }
    },

    filterCity: (value) => {
        return (dispatch, getState) => {
           dispatch({type: "GET_CITY", payload: value})       
        }
    },

    getCity: (id) => {
        return (dispatch, getState) => {
            dispatch({type: "GET_ONE_CITY", payload: id})
        }
    },

    deleteCities: () => {
        return (dispatch) => {
            dispatch({type: "BORRAR", payload: null})
        }
    }
}
export default citiesActions