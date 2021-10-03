import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList, ToastAndroid } from "react-native"
import {connect} from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesAction"
import React, {  useState } from "react"
import CommentComp from "./CommentComp"
import Icon from "react-native-vector-icons/FontAwesome"
import { ScrollView } from "react-native-gesture-handler"

const CommentsComp = (props) => {
    
    const [allComments, setAllComment] = useState(props.currentsComments)
    const [comment, setComment] = useState("")
    const [verify, setVerify] = useState(false)
    
    const deleteCom=(idItinerary, commentId, token)=>{
        props.deleteComment(idItinerary, commentId, token)
        .then(res=>{
            if(res.success) setAllComment(allComments.filter(comment => comment._id !== commentId))
            else throw new Error()
        })
        .catch((e)=> console.log(e))
    }

    const warning = () => {
        ToastAndroid.showWithGravity("❌ You need log for comment", ToastAndroid.LONG, ToastAndroid.CENTER)
    }
    

    const sendHandler = () =>{
        setVerify(true)
        props.addComment(props.itineraryId, comment, props.token)
        .then(res=> setAllComment(res.response.data.response), setComment(""), setVerify(false))
        .catch(e=> console.log(e))
    }

    return (
        <View style={styles.containComments}>
            <Text style={styles.title}>
                Comments
            </Text>
            <View style={styles.scrollOn}>
                <ScrollView>
                    {allComments.map((comment, index)=> <CommentComp key={index} commentCurrent={comment} itineraryId={props.itineraryId} delete={deleteCom}/>)}
                </ScrollView>
            </View>
            <View style={styles.message}>
                <TextInput
                    style={styles.input}
                    editable={props.token ? true : false}
                    value={!verify ? comment : ""}
                    onChange={(e)=>setComment(e.nativeEvent.text)}
                    placeholder={props.token ? "Enter your comment" : "You need log for comment"} />
                    
                <TouchableOpacity style={styles.sendMessage} onPress={props.token ? sendHandler : warning}>
                    <Text >
                        <Icon name={"send"} size={20} color="#000"/>
                    </Text>
                </TouchableOpacity>   
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
       token: state.users.token,
    }
 }

const mapDispatchToProps = {
    changeComment: itinerariesActions.modifyComment,
    deleteComment: itinerariesActions.deleteComment,
    addComment: itinerariesActions.addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsComp)

const styles = StyleSheet.create({
    sendMessage: {
        justifyContent: "center"
        
    },

    containComments: {
        width: "90%",
        height: "100%"
    },

    title: {
        textAlign: "center",
        fontSize: 18,
    },

    message: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
    },

    input: {
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 5,
        maxWidth: "75%",
    },

    scrollOn: {
        width: "100%",
        maxHeight: 150,
        minHeight: 150,
        marginBottom: 10
    },

    scrollOn2: {
        maxHeight: 150,
    },
    
})