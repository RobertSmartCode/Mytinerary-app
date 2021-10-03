import { connect } from "react-redux"
import citiesActions from "../redux/actions/citiesAction"
import itinerariesActions from "../redux/actions/itinerariesAction"
import ItineraryComp from "../components/ItineraryComp"
import { StyleSheet, Text, FlatList, View, Image, ImageBackground, Button, ScrollView, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from "react"

const City = (props) => {
    
    useEffect(()=> {
        props.city(props.route.params.id)
        props.getItineraries(props.route.params.id)
    }, [])

    return (
        
        <ScrollView style={styles.contain}>
            
            <View>
                <ImageBackground style={styles.coverPhoto} source={require("../assets/brasilia.jpg")}>
                    <View style={styles.cityContain}>
                        <Text style={styles.city}>
                            {props.cityOne.city}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.titleContain}>
                    <Text style={styles.title}>
                        Find your best itinerary
                    </Text>
                </View>
                <FlatList
                    data={props.itineraries}
                    keyExtractor={(item)=> item._id}
                    renderItem={({item})=>(
                        <ItineraryComp  itinerary = {item}/>
                    )}
                />
                
            </View>
        </ScrollView>

        
    )
}

const styles = StyleSheet.create({
    contain:{
        flex: 1,
    },

    titleContain: {
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    },

    title: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        width: "60%",
        backgroundColor: "orange",
        borderRadius: 15
    },

    cityContain: {
        width: "100%",
    },

    city: {
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        fontSize: 35,
        fontWeight: "bold",
        textAlign: "center",
        width: "70%",
        backgroundColor: "rgba(255, 255, 255, 0.401)"
    },

    coverPhoto: {
        width: "100%",
        height: 200,
        alignItems: "center",
        justifyContent: "center"
    },
})

const mapDispatchToProps = {
    getCities: citiesActions.recCities,
    getItineraries: itinerariesActions.getItinerariesCity,
    city: citiesActions.getCity
}

const mapStateToProps = (state) => {
    return {
        cities: state.cities.cityFiltered,
        itineraries: state.itineraries.allItineraries,
        cityOne: state.cities.city
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(City)