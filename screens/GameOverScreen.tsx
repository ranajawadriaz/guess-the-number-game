//full screen components

import PrimaryButton from "@/components/PrimaryButton";
import TitleTxt from "@/components/TitleTxt";
import { Colors } from "@/constants/Colors";
import { View, Image, StyleSheet, Text, Dimensions, useWindowDimensions, ScrollView } from "react-native";

export default function GameOverScreen(props: { roundCount: any; userNumber: any; gameStartButton: any }) {

    const { width, height } = useWindowDimensions();//to get the height,width of screen each time the component is rendered

    let imageSize = 300;//default image size
    let summaryFont = 24;//default summary TXT fontsize

    if (width < 380)//when device width is less than 380, change imagesize to 150
    {
        imageSize = 150

    }

    if (height < 500)//when device height is less than 500 (landscape mode), the imagesize=80 and summaryTxt fontsize is 21
    {

        imageSize = 80;
        summaryFont = 21;

    }




    //this (dictionary like) code is used when multiple styles to be applied
    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,

    }




    return (
        // scrollview is used so that if space becomes low, the content become scrollable, like when orientation changed to landscape
        <ScrollView style={styles.scrollOuter}>
            <View style={styles.outerMostContainer}>
                <TitleTxt>GAME OVER!</TitleTxt>
                <View style={[styles.imageContainerView, imageStyle]/* array of styles used, merged  */}>
                    {/* so we will wrap this image around in a view and make the view circle and make it overflow hidden to make image circle  */}
                    <Image source={require('@/assets/images/success.png')} style={styles.img} />
                </View>
                {/* we can use nested components like text inside text but not like view inside text component */}
                {/* nested texts */}
                <Text style={[styles.summaryTxt, { fontSize: summaryFont }]}>Your phone needed <Text style={styles.highlightedWords}>{props.roundCount}</Text> rounds to guess the number <Text style={styles.highlightedWords}>{props.userNumber}</Text>.</Text>


                <PrimaryButton ifPressed={props.gameStartButton}>Start New Game</PrimaryButton>

            </View>
        </ScrollView>


    );
}

// const deviceWidth=Dimensions.get('window').width;//can also set other dependencies like height //commented, not used for making it dynamic inside the component

const styles = StyleSheet.create({

    scrollOuter:{
        flex:1,

    },
    outerMostContainer: {
        //the most outer view is necessary having flex:1
        flex: 1,
        padding: 24,//inside spacing from all sides
        alignItems: 'center',//cross axis(horizontal center)
        justifyContent: 'center',//main axis (vertical center)

    },
    imageContainerView: {
        //commented, not used for making it dynamic inside the component
        // width:deviceWidth<380?150:300,//if devicewidth is less than 380 then this width 150 else 300
        // height:deviceWidth<380?150:300,//making the squARE, cannot use '50%' on both height and width to make the equal height and width as they are respective of their containers
        // borderRadius:deviceWidth<380?75:150,//HALF THE above to make it circle
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',//important as the image will be overflowing outside otherwise
        margin: 36,//pushing from all sides


    },

    img: {
        height: '100%',//of the parent
        width: '100%',//the image will shrink itself to be wholly viewable inside the container(view), 100% view of image inside the container, no zoom, will fit with view width/height
    },

    summaryTxt: {
        fontFamily: 'open-sans',
        // fontSize:24,//the texts inside will also have font:24, if fontsize of view set, text inside donot cascade that font
        textAlign: 'center',//centers text in text component rectangle
        // marginVertical:24,
        marginBottom: 24
    },

    highlightedWords: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }



})