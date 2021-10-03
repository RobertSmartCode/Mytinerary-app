import AsyncStorage from '@react-native-async-storage/async-storage'

const usersReducer = (state = {name: null, token: null, email: null, photoUser: null, validation: false, _id: false}, action) =>{
    switch (action.type) {
        case "SIGN":
           
            return {
                email: action.payload.email,
                name: action.payload.name,
                photoUser: action.payload.photoUser,
                token: action.payload.token,
                _id: action.payload._id,
                validation: false
            }
        case "LOG_OUT":
            const remove = async () => {
              return  await AsyncStorage.removeItem("token")
            }
            remove()
            return {
                name: null,
                email: null,
                photoUser: null,
                token: null,
                validation: true
            }
        default:
            return state
     }
}

export default usersReducer