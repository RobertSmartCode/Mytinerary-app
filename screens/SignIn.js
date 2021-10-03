import React, {useState} from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, ToastAndroid, ImageBackground, Image, Pressable } from 'react-native';
import usersActions from "../redux/actions/usersActions"
import { connect } from 'react-redux';
import * as Facebook from 'expo-facebook';
import axios from "axios"
import Icon from "react-native-vector-icons/FontAwesome"





const SignIn = (props) => {
    let eyeClose = require("../assets/EyeClose.png")
    let eyeOpen = require("../assets/eyeOpen.png")
    
    const [viewPass, setViewPass] = useState(true)
    const [userLog, setUserLog] = useState ({
        email: "", 
        password: "", 
    })

    const logIn = async () => {
        try {
          await Facebook.initializeAsync({
            appId: '906072137002511',
          });
          const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await axios(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture.height(500)`);
            let newUserWithFacebook = {
                email: `${response.data.id}@gmail.com`, 
                password: response.data.id, 
            }
            let disconect = true
            props.logIn(newUserWithFacebook)
            .then((res) => {
                if (!res.respuesta.data.success){
                    ToastAndroid.showWithGravity("❌ Email or password incorrect", ToastAndroid.SHORT, ToastAndroid.CENTER)
                    
                }else{
                    ToastAndroid.showWithGravity("✔️ Signed in successfully. Welcome", ToastAndroid.SHORT, ToastAndroid.CENTER)
                }
            }).catch((e) => console.log(e))
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

    const submitInput = () =>{
        props.logIn(userLog)
        .then((res) => {for (var i in userLog){
            if(!userLog[i].length){
                ToastAndroid.showWithGravity("❌ The field to complete is "+[i], ToastAndroid.LONG, ToastAndroid.CENTER)
                break
            }
            if (res.respuesta.data.success){
                ToastAndroid.showWithGravity("✔️ Signed in successfully. Welcome", ToastAndroid.SHORT, ToastAndroid.CENTER)
            
                
        }else if (!res.respuesta.data.success) {
            ToastAndroid.showWithGravity("❌ Password or email incorrect", ToastAndroid.LONG, ToastAndroid.CENTER)
            
        }else throw new Error()
    }
    }).catch(e => ToastAndroid.showWithGravity("❌ Oops, something went wrong", ToastAndroid.LONG, ToastAndroid.CENTER))}


    return (
        <ImageBackground source={{uri:"https://p4.wallpaperbetter.com/wallpaper/632/306/503/photography-rock-formation-landscape-sky-wallpaper-preview.jpg"}} style={styles.contain}>
            <TextInput underlineColorAndroid='transparent' style={styles.inputAlone} placeholder="Email"  onChange={(e)=> setUserLog({...userLog, email: e.nativeEvent.text})} defaultValue={userLog.email}/>
            <ImageBackground style={styles.input} >
                <TextInput underlineColorAndroid='transparent' style={styles.inputEnter} secureTextEntry={viewPass ? true : false} placeholder="Password" defaultValue={userLog.password} onChange={(e)=> setUserLog({...userLog, password: e.nativeEvent.text})}/>
                <Pressable style={styles.eye} onPress={()=>setViewPass(!viewPass)}>
                    <Image style={styles.eye} source={viewPass ? eyeClose : eyeOpen} />
                </Pressable>
            </ImageBackground>
            <TouchableOpacity onPress={submitInput}>
                <Text style={styles.sign}>Enviar</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.account} >
                <Text style={styles.accountSign} onPress={props.navigation.navigate("Signup")}>
                    Don't have an account? Sign up
                </Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.facebookContain}  onPress={logIn}>
                <Icon name={"facebook-official"} size={50} color="#3b5998"/>
                <Text style={styles.facebook} > Sign with facebook</Text>
            </TouchableOpacity>
        </ImageBackground>


    )
}

const mapDispatchToProps = {
    logIn: usersActions.logIn
}

export default connect(null, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
    account: {
        marginTop: 15.
    },

    accountSign:{
        fontSize: 17,
        fontWeight: "bold"
    },

    eye: {
        width: 40,
        height: 19,
        alignSelf: "center"
    },

    contain:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    sign: {
        backgroundColor: "#dfe1ee",
        fontSize: 18,
        letterSpacing: 1,
        fontWeight: "bold",
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginTop: 15,
    },

    facebook: {
        alignSelf: "center",
        backgroundColor: "#3b5998",
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        paddingVertical: 7,
        paddingHorizontal: 7,
    },

    facebookContain: {
        flexDirection: "row",
        marginTop: 15,
    },

    inputAlone: {
        borderRadius: 4,
        width: "50%",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 4, 
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },

    input :{
        borderRadius: 4,
        width: "50%",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 4, 
        flexDirection: "row",
        justifyContent: "space-between"
    },

    inputEnter: {
        color: "black",
        width: "60%",
        fontSize: 20,
        fontWeight: "bold"
    },
})