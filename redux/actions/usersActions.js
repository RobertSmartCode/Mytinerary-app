import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'

const usersActions = {
    signUp: (newUser) => {
        
        return async (dispatch, getState) => {
            try {
                let respuesta = await axios.post("https://my-tinerary-goitia.herokuapp.com/api/signup", newUser)
                if (respuesta.data.success){
                    
                    await AsyncStorage.setItem("token",  respuesta.data.response.token)
                dispatch({type: "SIGN", payload: respuesta.data.response})
                    return {
                        response: respuesta.data.response
                    }
            } else return respuesta.data.errors
        }catch(e) {
            return {success: false, response: e}
        }
    }},

    logIn: (userLog) => {
        return async (dispatch) => {
            try {
                let respuesta = await axios.post("https://my-tinerary-goitia.herokuapp.com/api/login", userLog)
                if (respuesta.data.success) {
                    await AsyncStorage.setItem("token",  respuesta.data.response.token)
                    dispatch({type: "SIGN", payload: respuesta.data.response})
                } 
                return {respuesta}
        }catch(e) {
            return {success: false, response: e}
        }
        }
    },

    logOnLs: (token) => {
        
        return async (dispatch) => {
           try {
                let response = await axios.get("https://my-tinerary-goitia.herokuapp.com/api/verifyToken", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            dispatch({type: "SIGN", payload: {name: response.data.name, email: response.data.email, photoUser: response.data.photoUser, _id: response.data._id, token}})
        }catch(e) {
            return dispatch({type: "LOG_OUT"})
        }}
    },

    logOut: (event) => {
        return (dispatch) => {
            
            dispatch({type: "LOG_OUT"})
        }
    }
}

export default usersActions