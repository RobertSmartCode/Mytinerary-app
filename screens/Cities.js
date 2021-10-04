import React, {useEffect, useState} from "react"
import { View, StyleSheet, Text, ImageBackground, TextInput, Image, FlatList, TouchableOpacity } from "react-native"
import  {connect} from "react-redux"
import citiesActions from "../redux/actions/citiesAction"


const Cities = (props) => {

const [cityFilt, setCityFilt] = useState([])

    useEffect(()=>{
       props.getCities()
       
    },[])

    const cityFilter = (e) => {
        props.filter(e.nativeEvent.text)
        }
    
    
    return (
        <View style={styles.container}>
            {/* <View style={styles.nav}>
                <Text style={styles.headerNav}>Home</Text>
                <Text style={styles.headerNav}>Cities</Text>
                <Text style={styles.headerNav}>Sign up</Text>
                <Text style={styles.headerNav}>Sign in</Text>
            </View> */}
            <ImageBackground source={{uri: "https://www.arquitecturaydiseno.es/medio/2020/05/27/mujer-mirando-la-ciudad_c7ffa0d5_1280x794.jpg"}} style={styles.hero}>
                <Text style={styles.title}>Cities</Text>
            </ImageBackground>
            
            <TextInput
                style={styles.input}
                placeholder="Search your favorite city"
                onChange={cityFilter}
            />

            <FlatList
                
                data={props.cityFiltrada}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    
                    <View style={styles.cities}>
                        <TouchableOpacity onPress={()=>props.navigation.navigate("City", {id: item._id})}>
                            <ImageBackground  source={{uri:`https://my-tinerary-goitia.herokuapp.com/${item.photo}`}}  style={styles.carouselPhoto} >
                                <Text  style={styles.textImage}>{item.city}</Text> 
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )}
                
            />


                {/* {props.cityFiltrada.length === 0 ? <Text>ERROR</Text>
                 : props.cityFiltrada.map((city, index) => {
                    {var photoCity = `require('..${city.photo}')`}
                        {console.log(photoCity)}
                        return <ImageBackground key={index} source={photoCity} style={styles.carouselPhoto} >
                            <Text style={styles.textImage}>{city.country}</Text> 
                        </ImageBackground> */}
                        
                    
                {/* })} */}
                
            

            {/* <View style={styles.navFooter}>
                <Text style={styles.footer}>Home</Text>
                <Text style={styles.footer}>Cities</Text>
                <Text style={styles.footer}>Sign up</Text>
                <Text style={styles.footer}>Sign in</Text>
            </View> */}

            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    cities: {
        borderWidth: 1.5,
        marginHorizontal: 15,
        marginTop: 20,
    },

    nav: {
        flexDirection: "row",
        width: "60%",
        justifyContent: "space-around",
    },

    headerNav: {
        fontSize: 18
    },
    
    title: {
        fontSize: 40,
        fontWeight: "bold",
        letterSpacing: 5
    },

    hero: {
        width: "100%",
        height: 250,
        justifyContent: "center",
        alignItems: "center"
    },

    input: {
        marginTop: 10,
        paddingHorizontal: 51,
        alignSelf: "center",
        borderWidth: 1,
    },

    navFooter: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
    },

    footer: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },

    carouselContain: {
        width: "100%",
    },

    carouselPhoto: {
        height: 180,
    },

    textImage: {
        fontSize: 25,
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.63)"
    },
})

const mapDispatchToProps = {
    getCities: citiesActions.recCities,
    filter: citiesActions.filterCity
}

const mapStateToProps = (state) => {
    return {
        cities: state.cities.allCities,
        cityFiltrada: state.cities.cityFiltered,
        token: state.users.token
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cities)