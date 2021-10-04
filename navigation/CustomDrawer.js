import {DrawerContentScrollView, DrawerItemList, DrawerItem} from "@react-navigation/drawer"
import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text, ImageBackground } from "react-native";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";

const CustomDrawerContent = (props) => {
    const {logOut, navigation, name, photoUser} = props
    return (
        <ImageBackground source={{uri:("https://www.blogartesvisuales.net/wp-content/uploads/2008/07/fotografia-paisaje-01.jpg")}} style={styles.contain}>
            <View style={styles.containProfile}>
                {props.valid ? 
                    <>
                        <Image style={styles.photoUser} source={{uri:(`${photoUser}`)}}/>
                        <Text style={styles.user}>
                            Welcome {name}
                        </Text>
                    </> :
                    <Image style={styles.photoGeneric} source={require("../assets/sesion.png")}/>}
            </View>
            <DrawerContentScrollView {...props} activeBackgroundColor="red">
                <DrawerItemList {...props} />

                {props.valid && <DrawerItem 
                    label="Sign out"
                    labelStyle={{fontSize: 20, letterSpacing: 1, fontWeight: "bold", color: "white"}}
                    style={styles.drawerItem}
                    onPress={()=> {logOut(); navigation.navigate("Home")}}/>}
            </DrawerContentScrollView>
        </ImageBackground>
      );
    }

    const mapStateToProps = (state) => {
        return {
            valid: state.users.token,
            photoUser: state.users.photoUser,
            name: state.users.name
        }
    }
    
    const mapDispatchToProps = {
        logOut: usersActions.logOut,
     }
    
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)
    

    const styles = StyleSheet.create({
        contain: {
            flex: 1,
            
        },

        user: {
            fontSize: 22,
            width: "80%",
            textAlign: "center",
        },

        containProfile: {
            height: 150,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "18%"
        },

        photoUser: {
            width: 100,
            height: 100,
            borderRadius: 100
        },

        photoGeneric: {
            width: 80,
            height: 80,
        },
        
        drawerItem: {

        },
    })