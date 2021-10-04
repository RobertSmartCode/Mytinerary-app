import axios from "axios" 

const activitiesActions = {
    getActivitiesPerIt: (link) => {
        return async () => {
            try {
                let response = await axios.get(`https://my-tinerary-goitia.herokuapp.com/api/activity/${link}`)
                if(response.data.success){
                    return response.data.response
                }
            }catch(e){
            return {success: false, response: e}
        }
        }
    }
}

export default activitiesActions