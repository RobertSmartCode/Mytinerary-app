import Carousel from "react-native-snap-carousel"
import React, { useEffect, useState } from "react"
import {ActivityIndicator, View, ImageBackground, Text, StyleSheet, LogBox} from "react-native"
import CommentsComp from "./CommentsComp"
LogBox.ignoreAllLogs(true)

const ActivitiesComp = (props) => {
    const {activities} = props
    const [verifyComment, setVerifyComment] = useState(props.verifyComment)

    const renderItem = ({ item }) => {
        return (
            <View >
                    <View  style={styles.carouselContain} >
                        <ImageBackground style={styles.carouselPhoto} source={{uri:`${item.picAct}`}} >
                            <Text style={styles.textImage}>{item.title}</Text> 
                        </ImageBackground>
                    </View>
                
            </View>
        )
    }

    return(
        <View style={styles.containActivity}>
            <View style={styles.carouselContainer}>
                <Carousel
                    layout={"tinder"}
                    data={activities}
                    sliderWidth={250}
                    itemWidth={450}
                    renderItem={renderItem}
                    autoplay={true}
                    loop={true}
                />
            </View>
            <View style={styles.containComment}>
                <CommentsComp itineraryId = {props.itineraryId} currentsComments = {props.comments} verifyComment={props.verifyComment}/>
            </View>
        </View>
    )
}

export default ActivitiesComp

const styles = StyleSheet.create({
    containActivity: {
        marginTop: 10,
        flexDirection: "row",
        width: "100%"
    },

    containComment: {
        width: "45%",
        maxHeight: 200,
        alignItems: "center",
    },

    carouselContain: {
        width: "55%",
        marginBottom: 22,
        marginLeft: 10,
        
    },

    carouselContainer: {
        marginBottom: 12,
    },

    carouselPhoto: {
        height: 180,
        width: "100%",
    },

    textImage: {
        width: "100%",
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        letterSpacing: 1,
        backgroundColor: "rgba(210, 105, 30, 0.45)",
        color: "rgb(51, 50, 50)"
    },
})