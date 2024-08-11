import StartGameScreen from '@/screens/StartGameScreen';
import { StatusBar } from 'expo-status-bar';
import GameScreen from '@/screens/GameScreen';
import { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import GameOverScreen from '@/screens/GameOverScreen';
import { useFonts } from 'expo-font';
//useFonts hook exposed by react native, and it must be loaded
// import AppLoading from 'expo-app-loading';//deprecated
//while fonts are loading, loading screen/splash screen until fonts are loaded. Splash screen until some condition is met, thankfully useFonts return an array, where first element is boolean telling the font has been loaded or not
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();
//by default loading screen hides after some time, but if you are loading fonts, you need more time so this code permanently shows the loading screen



export default function HomeScreen() {



    // property names: to identify fonts, and value of propertynames: to points to files to be loaded
    //'open sans', invalid JS property format
    //thankfully useFonts return an array, where first element is boolean telling the font has been loaded or not
    const [fontsLoaded] = useFonts({
        'open-sans': require("@/assets/fonts/OpenSans-Regular.ttf"),
        'open-sans-bold': require("@/assets/fonts/OpenSans-Bold.ttf"),
        //now use open-sans and open-sans-bold in whole project using fontFamily property inside stylesheet object


    });






    // from screen1 to screen2 state 
    const [validValue, setValidValue] = useState('');

    // from screen2 to screen3 state, true because game isn't started so it's somewhat over
    const [gameIsOver, setGameIsOver] = useState(true);

    const [roundCounter, setRoundCounter] = useState(0);

    // if (!fontsLoaded) {
    //     return <AppLoading />;
    //     //loading screen till the fonts are loaded

    // }//deprecated

    useEffect(() => {

        if (!fontsLoaded) {
            SplashScreen.hideAsync();
            //loading screen till the fonts are loaded

        }

    }, [fontsLoaded]);
    //when the fonts are loaded, fontsLoaded will return true and this useEffect will hide the loading screen


    function startNewGameButton() {
        setValidValue('');
        //or setValidValue(null);
        setRoundCounter(0);
        // setGameIsOver(true);//already doing it below in game over handler
        //now the valid value is null and game over is true, the only screen will be rendering is StartNewGameScreen, see below functions

    }







    let screen = <StartGameScreen validValueArrived={setScreen} />;

    if (!fontsLoaded) {
        return null;
        //while fonts are loading return null, so nothing other will be rendered while loading the fonts


    }

    function gameOverHandler(phoneTries: number) {
        setGameIsOver(true);
        setRoundCounter(phoneTries);//when the game is over, the useEffect hook from the GameScreen.tsx will pass the rounds array length (numeric) here and this will set the roundCounter state variable for GameOverScreen Display requirement

    }
    //move all functions before rendering screens/above rendering screens code


    if (validValue) {
        screen = <GameScreen PlayerEnteredNumber={validValue} gameOver={gameOverHandler} />;
        //takes 2 props

    }





    // console.log("g")

    //called once
    function setScreen(arrivedvalue: string) {
        setValidValue(arrivedvalue);
        setGameIsOver(false);
        //valid value set, gameover false
        //now only screen that will render is GameScreen


    }





    if (gameIsOver && validValue) {

        screen = <GameOverScreen roundCount={roundCounter} userNumber={validValue} gameStartButton={startNewGameButton} />

    }
    //remember to maintain the sequence of the code

    // if (!fontsLoaded) {
    //     return <AppLoading />;
    //     //loading screen till the fonts are loaded

    // }//deprecated



    return (

        <>
            {/* wrapped into fragment braces, because 2 root components are there, side by side */}

            <StatusBar /*by default backgroundColor='white'*/ backgroundColor='black' /*by default style="light"*/ />

            <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
                {/* {view replaced by linear gradient for color mix,below image will be above the linear gradient so make it transparent, and other components are above background image, colors should be >=2 } */}

                <ImageBackground source={require('@/assets/images/background.png')} resizeMode="cover"
                    //cover:all available space and zoom in or out where necessary and not doing much here as flex:1 is handling everything, imagebackground: view and image component mixture, also require function
                    style={styles.rootScreen}
                    imageStyle={styles.backgroundImage}
                //this another important prop, the style prop handles the view inside image component and the imagestyle handles the very image
                >

                    <SafeAreaView style={styles.rootScreen}
                    //this thing is inside the background image component as it will appear on top of the background image
                    >
                        {screen}
                    </SafeAreaView>

                </ImageBackground>

            </LinearGradient>
        </>

    );
}

const styles = StyleSheet.create({

    rootScreen: {
        // backgroundColor:'#ddb52f',
        flex: 1,
    },

    backgroundImage: {
        opacity: 0.15,// 85% transparent

    },


});

//unsplash image
//npx expo install expo-linear-gradient

//safeareaview component, notch detect spacing

//use flex:1 in each child of a parent if you want the child to take whole screen

//npx expo install expo-font
//npx expo install expo-app-loading
//expo google fonts package also