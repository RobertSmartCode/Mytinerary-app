import React from "react"
import { StyleSheet, Text, View, Image, ImageBackground, Button, ScrollView, TouchableOpacity } from 'react-native';
import Carousel from "react-native-snap-carousel"
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions"



const items = [
    [{src: require('../assets/santiagodechile.jpg'), pais: "Santiago"},
        {src: require('../assets/montevideo.jpg'), pais: "Montevideo"},
        {src: require('../assets/buenoaires.jpg'), pais: "Cordoba"},
        {src: require('../assets/brasilia.jpg'), pais: 'Rio de Janeiro'}],
    [{src: require('../assets/bogota.jpg'), pais: "Bogota"},
        {src: require('../assets/lapaz.jpg'), pais: "La Paz"},
        {src: require('../assets/asuncion.jpg'), pais: "Ikita"},
        {src: require('../assets/lima.jpg'), pais: "Lima"}],
    [{src: require('../assets/caracas.jpg'), pais: "Caracas"},
        {src: require('../assets/paramaribo.jpg'), pais: "Paramaribo"},
        {src: require('../assets/cayena.jpg'), pais: "Cayena"},
        {src: require('../assets/quito.jpg'), pais: "Quito"}],
];

const Home = (props) => {


   const renderItem = ({ item }) => {
        return (
            <View >
                {item.map((info, index) => 
                    <View key={index} style={styles.carouselContain} >
                        <ImageBackground style={styles.carouselPhoto} source={info.src} >
                            <Text style={styles.textImage}>{info.pais}</Text> 
                        </ImageBackground>
                    </View>
                )}
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.nav}>
                
            </View>
            
            <ImageBackground style={styles.carouselPhoto} source={{uri: "https://www.10wallpaper.com/wallpaper/1366x768/1604/Thailand_Travel_Vacation_Nature_Scenery_HD_Wallpaper_10_1366x768.jpg"}} style={styles.hero}>
                <Image  source={require("../assets/LOGO2.png")} style={styles.logo} />
                <Text style={styles.callAction} >Choose your destination!</Text>
                <TouchableOpacity>
                    <Text style={styles.callActionButton} onPress={()=>{props.navigation.navigate("Cities")}}>Press here!</Text>
                </TouchableOpacity>
            </ImageBackground>

            
                
                <ImageBackground source={{uri: "https://i1.wp.com/www.viviendoencasa.mx/wp-content/uploads/2021/02/por-que-ahora-solo-buscamos-la-tranquilidad-paz.jpg?fit=1200%2C720&ssl=1"}} style={styles.mainCover }>
                    <View style={styles.carouselContainer}>
                        <Carousel
                            layout={"default"}
                            data={items}
                            sliderWidth={900}
                            itemWidth={450}
                            renderItem={renderItem}
                            autoplay={true}
                            loop={true}
                        />
                    </View>

                    <View style={styles.navFooter}>
                        <Text style={styles.footer}>Home</Text>
                        <Text style={styles.footer}>Cities</Text>
                        <Text style={styles.footer}>Sign up</Text>
                        <Text style={styles.footer}>Sign in</Text>
                    </View>
                    
                </ImageBackground>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
  return {
     valid: state.users.token,
  }
}

const mapDispatchToProps = {
  logLs: usersActions.logOnLs,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


const styles = StyleSheet.create({
    headerNav: {
        fontSize: 20
    },

    logo: {
        alignSelf: "flex-end",
        marginEnd: 15,
        width: 130,
        height: 100
    },
    
    nav: {
        flexDirection: "row",
        width: "60%",
        justifyContent: "space-around",

    },

    callAction: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center"
    },

    callActionButton: {
        color: "#252440",
        alignSelf: "center",
        backgroundColor: "orange",
        paddingVertical: 12,
        paddingHorizontal: 29,
    },

    hero: {
        width: "100%",
        height: 300
    },

    mainCover: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    carouselContain: {
        width: "100%",
    },

    carouselContainer: {
        marginTop: 100,
    },

    carouselPhoto: {
        marginBottom: 10,
        marginRight: 10,
        height: 180,
        width: "100%",
    },

    textImage: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
        backgroundColor: "rgba(21, 21, 73, 0.35)",
        textAlign: "center",
        
    },

    navFooter: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
        marginBottom: 150,
    },

    footer: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    }
})
