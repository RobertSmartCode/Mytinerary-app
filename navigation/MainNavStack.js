import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Cities from "../screens/Cities"
import City from "../screens/City"
import Home from "../screens/Home"
import SignIn from "../screens/SignIn"
import SignUp from "../screens/SignUp"
import React from "react"



const Stack = createNativeStackNavigator()

export const HomeStack = () => {
    return( 
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Index' component={Home}/>
        </Stack.Navigator>
    )
}

export const CitiesStack = () => {
    return( 
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Towns' component={Cities}/>
            <Stack.Screen name='City' component={City}/>
        </Stack.Navigator>
    )
}

export const SignUpStack = () => {
    return( 
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Log On' component={SignUp}/>
        </Stack.Navigator>
    )
}

export const SignInStack = () => {
    return( 
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Log In' component={SignIn}/>
        </Stack.Navigator>
    )
}







