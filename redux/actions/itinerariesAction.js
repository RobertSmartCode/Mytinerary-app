import axios from "axios"

const itinerariesActions = {
    getItinerariesCity: (link) => {
        return async (dispatch, getState) => {
            try {
                let response = await axios.get(`https://my-tinerary-goitia.herokuapp.com/api/itineraries/${link}`)
                if (response.data.success){
                    let data = response.data.response
                    dispatch({type: "GET_ITINERARIES_CITY", payload: data}) 
                }else throw new Error("Oops, something went wrong")
        }catch(e){
            return {success: false, response: e.message}
        }
        }
    },

    addComment: (id, comment, token) => {
        return async ()=> {
            try {
                let response = await axios.put(`https://my-tinerary-goitia.herokuapp.com/api/itineraries/comments/${id}`, {comment, type:"addComment"}, 
                {headers: {
                    Authorization: "Bearer " + token
                    }
                })
                if (response.data.success) return {success: true, response: response}
                else throw new Error()
            }catch(e){
                return {success: false, response: e.message}
            }
        }
    },

    modifyComment: (id, comment, token) => {
        return async ()=> {
            try {
                let response = await axios.put(`https://my-tinerary-goitia.herokuapp.com/api/itineraries/comments/${id}`, {comment, type:"modifyComment"}, 
                {headers: {
                    Authorization: "Bearer " + token
                    }
                })
                if (response.data.success) return {success: true, response: response}
                else throw new Error()
            }catch(e){
                return {success: false, response: e.message}
            }
        }
    },
    
    deleteComment: (id, idComment, token) => {
        return async ()=> {
            try {
                let response = await axios.put(`https://my-tinerary-goitia.herokuapp.com/api/itineraries/comments/${id}`, {idComment, type:"deleteComment"}, 
                {headers: {
                    Authorization: "Bearer " + token
                    }
                })
                
                if (response.data.success) return {success: true}
                else throw new Error()
            }catch(e){
                return {success: false, response: e.message}
            }
        }
    },

    likeItinerary: (id, token) =>{
        return async () => {
                try{
                    let response = await axios.put(`https://my-tinerary-goitia.herokuapp.com/api/itinerary/like/${id}`, {},{
                    headers:{
                        Authorization: 'Bearer '+token
                    }
                })
                return response
            
                }catch (error){
                    console.log(error)
                }
        }
    }

}

export default itinerariesActions