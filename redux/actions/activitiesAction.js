import axios from "axios" 

const activitiesActions = {
    getActivitiesPerIt: (link) => {
        return async () => {
            try {
                let response = await axios.get(`http://192.168.1.33:4000/api/activity/${link}`)
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