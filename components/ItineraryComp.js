import {ActivityIndicator, View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ToastAndroid } from "react-native"
import React, {useState, useEffect} from "react"
import itinerariesActions from "../redux/actions/itinerariesAction"
import activitiesActions from "../redux/actions/activitiesAction"
import { connect } from "react-redux"
import ActivitiesComp from "./ActivitiesComp"
import Icon from "react-native-vector-icons/FontAwesome"


const ItineraryComp = (props) => {
    const {price, hashtag, description, author, photo, duration, itinerary, likes, _id, comments} = props.itinerary
    console.log(hashtag)
    const [itinerariesLike, setItinerariesLike] = useState(likes)
    const [likeIcon, setLikeIcon] = useState(true)
    const [activities, setActivities] = useState([])
    const [verifyComment, setVerifyComment] = useState(true)
    const [button, setButton] = useState(true)

    const pressLike = async () => {
        setLikeIcon(false)
        if(!props.token){
            ToastAndroid.showWithGravity("❌ You need log for tap heart", ToastAndroid.LONG, ToastAndroid.CENTER)
        }else {
            let response = await props.likeItinerary(_id, props.token)
            setItinerariesLike(response.data.response)
        }
        setLikeIcon(true)
    }
    
    
    const viewHandler = () => {
        setButton(!button)
        setVerifyComment(!verifyComment)
        
        if (button){
        async function getActivities(){
            try {
               let respuesta = await props.getActivities(_id)
               setActivities(respuesta)
               
            }catch (e) {
                console.log(e)
            }
        }
            getActivities()
            
        }
    }
    
    return (
        <View style={styles.contain}>
            
            <View style={styles.card}>
                <Image style={styles.photo} source={require("../assets/quito.jpg")}/>
                <View style={styles.cardIn}>
                    <View style={styles.containAuthor}>
                        <Image style={styles.authorPhoto} source={require("../assets/quito.jpg")}/>
                        <Text style={styles.authorName} >{author.name}</Text>
                    </View>
                    <Text style={styles.itinerary} >{itinerary}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.interaction}>
                        <View style={styles.hashContain}>
                            {hashtag.map((hash, index)=> {
                              return  <Text style={styles.hash} key={index}>{hash}</Text>
                            })}
                        </View>
                        <View >
                            <TouchableOpacity style={styles.like} onPress={(likeIcon ? pressLike : null)}>
                                <Text  style={styles.likeButton}>  <Icon name={itinerariesLike.includes(props._id) ? "heart" : "heart-o"} size={20} color="#900"/> </Text>
                                <Text>{itinerariesLike.length}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.duration}>
                        <Text style={styles.price}>{"Price: "}{"💲".repeat(price)}</Text>
                        <Text style={styles.hourDuration}>Duration: {duration}hs</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={viewHandler}>
                            <Text style={styles.buttonCenter}>{button ? "View more" : "View less"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {<View style={{display: button ? "none" : "flex"}}>
                {activities.length > 0 ? <ActivitiesComp  activities={activities} itineraryId={_id} comments={comments} /> : <Image style={styles.loader} source={require("../assets/loader.gif")}/>}
            </View>}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
       token: state.users.token,
       _id: state.users._id
    }
 }

const mapDispatchToProps = {
    getActivities: activitiesActions.getActivitiesPerIt,
    likeItinerary: itinerariesActions.likeItinerary

}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryComp)

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        margin: 15,
        borderWidth: 2,
        borderColor: "orange",
        borderRadius: 10,
    },

    loader: {
        height: 50,
        width: 50,
    },

    photo: {
        marginTop: 3,
        height: 200,
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
    },

    cardIn:{
        marginLeft: 10,
    },

    containAuthor: {
        flexDirection: "row",
    },

    


    authorName: {
        alignSelf: "center",
        marginLeft: 15,
        fontSize: 25,
        fontWeight: "bold",
    },

    authorPhoto: {
        height: 80,
        width: 80,
        borderRadius: 100,
        marginTop: 10,
    },

    itinerary: {
        width: "90%",
        textAlign: "center",
        marginTop: -3,
        marginBottom: 7,
        fontSize: 17,
        fontWeight: "bold",
    },

    interaction: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-around"
    },

    like: {
        flexDirection: "row"
    },

    hashContain: {
        flexDirection: "row"

    },

    hash: {
        fontWeight: "bold",
        letterSpacing: 1,
        color: "red",
        marginRight: 5,
    },

    duration: {
        width: "40%",
    },

    button: {
        alignItems: "center",
        marginBottom: 3,
    },

    buttonCenter: {
        borderRadius: 3,
        backgroundColor: "gray",
        width: "20%",
        textAlign: "center",
        fontSize: 18,
        padding: 5
    },
})

