import React, {useState} from 'react';
import { connect } from 'react-redux';
import usersActions from "../redux/actions/usersActions"
import { TextInput, View, Image, Text, StyleSheet, TouchableOpacity, ToastAndroid, ImageBackground, Pressable } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import * as Facebook from 'expo-facebook';
import axios from "axios"
import Icon from "react-native-vector-icons/FontAwesome"
// 669454847763-ns22q79hlqpj87t5pqnes8ujvt63uga7.apps.googleusercontent.com


const SignUp = (props) => {
    let eyeClose = require("../assets/EyeClose.png")
    let eyeOpen = require("../assets/eyeOpen.png")

    const [viewPass, setViewPass] = useState(true)
    const countries = ["Egypt", "Canada", "Australia", "Ireland", "Argentina", "Colombia", "Peru","United States", "Chile", "China", "Japan", "Pakistan", "Colombia", "Uruguay", "Cuba"]
    const [newUser, setNewUser] = useState ({
        name: "", 
        lastName: "", 
        email: "", 
        password: "", 
        photoUser: "",
        country: "",
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
                name: response.data.name, 
                lastName: response.data.name, 
                email: `${response.data.id}@gmail.com`, 
                password: response.data.id, 
                photoUser: response.data.picture.data.url,
                country: "Brazil",
            }
            console.log(newUserWithFacebook)
            let disconect = true
            props.signUp(newUserWithFacebook)
            .then((res) => {console.log(res)
            if (res === undefined){
                ToastAndroid.showWithGravity("❌ Email is already in use" , ToastAndroid.LONG, ToastAndroid.CENTER)
                
            } else if (disconect) {
                ToastAndroid.showWithGravity("✔️ Your registration has been completed" , ToastAndroid.LONG, ToastAndroid.CENTER)
                
            }
            }).catch((e) => console.log(e))
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }


    const submitInput = () => {
        let disconect = true
        for (var i in newUser){
            if(!newUser[i].length){
                ToastAndroid.showWithGravity("❌ The field to complete is "+[i], ToastAndroid.LONG, ToastAndroid.CENTER)
                
                disconect = false
                break
            }
        }
        if (disconect){
            props.signUp(newUser)
            .then((res) => {if (!res.includes("response")){
                
                res.map((respuesta) => {
                    ToastAndroid.showWithGravity(`❌ ${respuesta.message}`, ToastAndroid.LONG, ToastAndroid.CENTER)
                })
            }
            if (!res.response.email & disconect){
                ToastAndroid.showWithGravity("❌ Email is already in use", ToastAndroid.LONG, ToastAndroid.CENTER)
            } else if (disconect) {
                ToastAndroid.showWithGravity("✔️ Your registration has been completed", ToastAndroid.LONG, ToastAndroid.CENTER)
                
              } else {
                throw new Error()
                }
        }).catch(e =>  console.log(e))
        }
    }

    return (
        <ImageBackground source={{uri:"https://p4.wallpaperbetter.com/wallpaper/632/306/503/photography-rock-formation-landscape-sky-wallpaper-preview.jpg"}} style={styles.contain}>
            
            <TextInput underlineColorAndroid='transparent' style={styles.input} placeholderTextColor={"rgb(83, 82, 82)"} placeholder="Name"  onChange={(e)=> setNewUser({...newUser, name: e.nativeEvent.text})} defaultValue={newUser.name}/>
            <TextInput underlineColorAndroid='transparent' style={styles.input} placeholderTextColor={"rgb(83, 82, 82)"} placeholder="Last name" defaultValue={newUser.lastName} onChange={(e)=> setNewUser({...newUser, lastName: e.nativeEvent.text})}/>
            <ImageBackground style={[styles.input, styles.inputContain]} >
                <TextInput underlineColorAndroid='transparent' style={styles.inputEnter} placeholderTextColor={"rgb(83, 82, 82)"} placeholder="Password" secureTextEntry={viewPass ? true : false} defaultValue={newUser.password} onChange={(e)=> setNewUser({...newUser, password: e.nativeEvent.text})}/>
                <Pressable style={styles.eye} onPress={()=>setViewPass(!viewPass)}>
                    <Image style={styles.eye} source={viewPass ? eyeClose : eyeOpen} />
                </Pressable>
            </ImageBackground>
            <TextInput underlineColorAndroid='transparent' style={styles.input} placeholderTextColor={"rgb(83, 82, 82)"} placeholder="Email" defaultValue={newUser.email} onChange={(e)=> setNewUser({...newUser, email: e.nativeEvent.text})}/>
            <TextInput underlineColorAndroid='transparent' style={styles.input} placeholderTextColor={"rgb(83, 82, 82)"} placeholder="Photo" defaultValue={newUser.photoUser} onChange={(e)=> setNewUser({...newUser, photoUser: e.nativeEvent.text})}/>
            <SelectDropdown style={styles.inputSelect} 
                data={countries}
                onSelect={(selectedItem, index) => setNewUser({...newUser, country: selectedItem})}
                buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}} 
                rowTextForSelection={(item, index) => {return item}}  />
            <TouchableOpacity onPress={submitInput}>
                <Text style={styles.sign}>Sign up</Text>
            </TouchableOpacity>
            
            {/* <TouchableOpacity style={styles.account} >
                <Text style={styles.accountSign} onPress={props.navigation.navigate("Signin")}>
                    Have an account? Sign in
                </Text>
            </TouchableOpacity> */}
            
            <TouchableOpacity style={styles.facebookContain}  onPress={logIn}>
                <Icon name={"facebook-official"} size={50} color="#3b5998"/>
                <Text style={styles.facebook} > Sign up with facebook</Text>
            </TouchableOpacity>
            

        </ImageBackground>
        
    )
}
const styles = StyleSheet.create({
    account: {
        marginTop: 15.
    },

    accountSign:{
        fontSize: 20,
        fontWeight: "bold"
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

    contain:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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

    input :{
        color: "black",
        borderRadius: 4,
        width: "50%",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 4, 
        fontSize: 20,
        fontWeight: "bold",
    },

    inputContain: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    eye: {
        width: 40,
        height: 19,
        alignSelf: "center"
    },

    inputEnter: {
        color: "black",
        width: "60%",
        fontSize: 20,
        fontWeight: "bold"
    },
})

const mapDispatchToProps = {
    signUp: usersActions.signUp
}

export default connect(null, mapDispatchToProps)(SignUp)
