import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer"
import {CitiesStack, HomeStack, SignInStack, SignUpStack} from './MainNavStack'
import React, { useEffect } from "react"
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import AsyncStorage from '@react-native-async-storage/async-storage'
import DrawerComponent from "./CustomDrawer"

const Drawer = createDrawerNavigator()
    

const Navigator = (props) => {
    useEffect(()=> {
        const storage = async () => {
            let storeEntry = await AsyncStorage.getItem("token")
            if (storeEntry){
                const store = await AsyncStorage.getItem("token")
                
            return await props.logLs(store)
            }
        }
        storage()
    }, [])
    
    return (
        
            <Drawer.Navigator
            drawerContent={(props)=> <DrawerComponent {...props} />}
             screenOptions={
                 {drawerLabelStyle:{fontSize: 20, letterSpacing: 1, fontWeight: "bold", color: "white"}, drawerActiveBackgroundColor:"rgba(0, 0, 255, 0.13)"} 
                 }>
                <Drawer.Screen name="Home" component={HomeStack}/>
                <Drawer.Screen name="Cities" component={CitiesStack}/>
                {!props.valid && <Drawer.Screen name="Signup" component={SignUpStack}/>}
                {!props.valid && <Drawer.Screen name="Signin" component={SignInStack}/>}
                
            </Drawer.Navigator>
        )
    }

const mapStateToProps = (state) => {
    return {
       valid: state.users.token,
    }
 }

 const mapDispatchToProps = {
    logLs: usersActions.logOnLs,
    logOut: usersActions.logOut
  }

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)

const styles = StyleSheet.create({
    css:{
        display: "none"
    }
})