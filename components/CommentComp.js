
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView, Pressable, ToastAndroid } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"


const CommentComp = (props) => {
    const {commentCurrent} = props
    const [deleteConfirm, setDeleteConfirm] = useState(true)
    const userValid = commentCurrent.userId._id === props._id
    
    const showAlert = () => {
        Alert.alert("Are you sure?", "are you sure you want to delete this/your comment?",
        [{text: "Cancel"},
        {text: "OK", onPress: ()=> {props.delete(props.itineraryId, props.commentCurrent._id, props.token), ToastAndroid.showWithGravity("✔️ Comment has been deleted", ToastAndroid.SHORT, ToastAndroid.CENTER)}}]
        )
        
    }



    return (
        <View style={styles.containComment}>
            <Image style={styles.photoUser} source={{uri:`${props.commentCurrent.userId.photoUser}`}}/>
            <View style={styles.containProfile}>
                <Text>{commentCurrent.userId.name}</Text>
                <View style={styles.containMessage}>
                    <ScrollView >
                        <View style={styles.commentUser}>
                            <Text style={styles.message}>
                                {commentCurrent.comment}
                            </Text>
                            {userValid && 
                            <Pressable onPress={showAlert}>
                                <Icon name={"trash-o"} size={20} color="#000"/>
                            </Pressable>}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}



const mapStateToProps = (state) => {
    return {
       token: state.users.token,
       _id: state.users._id
    }
 }


export default connect(mapStateToProps)(CommentComp)

const styles = StyleSheet.create({
    containComment:{
        marginTop: 5,
        height: 50,
        width: "100%",
        flexDirection: "row"
    },

    message: {
        color: "black",
        maxWidth: "70%",
        minWidth: "70%",
        paddingLeft: 3,
    },

    photoUser: {
        height: 40,
        width: 40,
        borderRadius: 100,

    },

    commentUser:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        alignItems: "center",
    },

    containMessage: {
        backgroundColor: "rgba(128, 128, 128, 0.253)",
        marginLeft: 5,
        maxWidth: "100%",
        minWidth: "100%",
        maxHeight: "60%",
        minHeight: "60%",
    },

    containProfile: {
       
    },
})