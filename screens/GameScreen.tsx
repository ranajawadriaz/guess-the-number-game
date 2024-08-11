//full screen components
//in react-native, component name should start with capital letter

import GuessedNumber from "@/components/GuessedNumber";
import PrimaryButton from "@/components/PrimaryButton";
import TitleTxt from "@/components/TitleTxt";
import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, FlatList, useWindowDimensions /*to listen changes to window height or width*/ } from "react-native";
import Card from "@/components/Card";
import CardTxt from "@/components/CardTxt";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "@/components/GuessLogItem";


//utility function to generate random number between min and max and if the number equals the exclude number, simply generate the next random number else return
//this will fail when min and max will have no difference and rndNum will be equal to exclude num resulting in deep recursion and time taking
//Math.random() produces number between 0 and 1 with 1 excluded
function generateRandomBetween(min: number, max: number, exclude: number) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {

        return generateRandomBetween(min, max, exclude);

    }
    else {
        return rndNum;
    }

}


//we moved this outside the component as they should not be reset whenever the component render and during game, the component renders many time
let maxBoundary: number;
let minBoundary: number;
//reset this by using useEffect when next new game starts, see below

export default function GameScreen(props: { PlayerEnteredNumber: string; gameOver: (value: number) => void }) {
    //as the entered number is valid, so first time GameScreen Phone Guess is required
    //100 not included
    // const initialGuess=generateRandomBetween(minBoundary,maxBoundary,parseInt(props.PlayerEnteredNumber));
    const initialGuess = generateRandomBetween(1, 100, parseInt(props.PlayerEnteredNumber));
    //the reason i commented the upper code is whenever something(state) set, this whole function renders, redering the const initialGuess, which is used only once at the start but the function generateRandom executes with min===max thing situation before even the useEffect comes into action and giving error, so change it to 1 and 100 respectively

    // console.log(maxBoundary)

    const { width, height } = useWindowDimensions();//now this hook will listen to width and height change, of course you can write only height or only width


    //setting the current phone Guess state by the initial value
    //the datatype is number here
    const [phoneGuess, setPhoneGuess] = useState(initialGuess);


    //array storing the phone guesses
    const [rounds, setRounds] = useState([initialGuess]);

    function nextGuess(direction: string) {
        if ((direction === 'lower' && phoneGuess < parseInt(props.PlayerEnteredNumber)) || (direction === 'higher' && phoneGuess > parseInt(props.PlayerEnteredNumber))) {
            Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: 'Sorry!', style: 'cancel' }])



            return;

        }
        if (direction === 'lower')//go lower
        {
            maxBoundary = phoneGuess;


        }
        else if (direction === 'higher')//go higher
        {
            minBoundary = phoneGuess + 1;


        }


        // we changed the exclude number to current phone guess as now we want the phone to guess our Number, but we have to pass something so we passed the current guess so the phone donot make this guess next time 
        const rndNum = generateRandomBetween(minBoundary, maxBoundary, phoneGuess);

        setPhoneGuess(rndNum);

        // setRounds(prevRounds => [...prevRounds,rndNum])//latest guess always below 
        setRounds(prevRounds => [rndNum, ...prevRounds])//latest guess always on top 

    }


    //used to trace/check/perform_action a dependency change or state change
    //last line include dependencies, which is like, if any one of them changes, this useEffect come into action
    //useEffect runs after component is rendered
    useEffect(() => {
        if (phoneGuess === parseInt(props.PlayerEnteredNumber)) {

            props.gameOver(rounds.length);
            //after the game is over this useEffect will call gameOverHandler in index.tsx through props (and also will send the length of rounds array for GameOverScreen Display)

        }
    }, [phoneGuess, parseInt(props.PlayerEnteredNumber), props.gameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
        //this useEffect has 0 dependencies, so this will execute only when the GameScreen Component is rendered for the first time only (once in a game)

        //empty array of dependencies
    }, []);

    // console.log(maxBoundary)

    const getCurrentLogsLength = rounds.length


    //the below guessed number and card are enclosed inside the fragment tag as 2 root components are next to each other, the GuessedNumber and the Card
    let content = <>
        <GuessedNumber>{phoneGuess}</GuessedNumber>
        <Card>
            <CardTxt style={styles.cardTxt}>Higher or lower?</CardTxt>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton ifPressed={nextGuess.bind(null, 'lower')}>
                        <Ionicons name="remove" size={24} color="white" />
                    </PrimaryButton>
                </View>
                {/* even if the passed function has no parameters, we can use     .bind to add parameters, so preconfigure the function */}
                <View style={styles.buttonContainer}>
                    <PrimaryButton ifPressed={nextGuess.bind(null, 'higher')}>
                        <Ionicons name="add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>

    //the upper container will be there as long as the width is less than 500, otherwise the below container with different UI will be rendered

    if (width > 500) {

        content = <>


            {/* <CardTxt style={styles.cardTxt}>Higher or lower?</CardTxt> */}

            <View style={styles.landscapeCardStyle}>

                <View style={styles.buttonContainer}>
                    <PrimaryButton ifPressed={nextGuess.bind(null, 'lower')}>
                        <Ionicons name="remove" size={24} color="white" />
                    </PrimaryButton>
                </View>

                <GuessedNumber>{phoneGuess}</GuessedNumber>

                <View style={styles.buttonContainer}>
                    <PrimaryButton ifPressed={nextGuess.bind(null, 'higher')}>
                        <Ionicons name="add" size={24} color="white" />
                    </PrimaryButton>
                </View>

            </View>



        </>

    }

    return (
        <View style={styles.mainOuterScreen}>
            <TitleTxt>Opponent's Guess</TitleTxt>
            {/* GUESS */}
            {content}
            <View style={styles.logsContainer}>
                {/* LOG ROUNDS, use flat list for large lists */}
                {/* {rounds.map(singleGuess => <Text key={singleGuess}>{singleGuess}</Text>)} */}

                <FlatList data={rounds} renderItem={(singleGuessItem) => <GuessLogItem roundNumber={getCurrentLogsLength - singleGuessItem.index} phoneGuess={singleGuessItem.item} />} keyExtractor={(singleGuessItem) => singleGuessItem.toString()} />
                {/* rounds array is passed in data prop, renderItem renders each item of rounds array one by one like for each. inside renderitem Text we can write singleGuessItem.item.value or .key but there are not any properties defined in the state so use .item only without any hassle. Flatlist needs the key but there is not key property in the state above so we used Keyextractor and passed each guessNumber as key as it is unique, keyextractor needs string but items in rounds array are numbers so make it string using .toString(). we have to use keyextractor even if the properties inside the state have 'id' instead of 'key' property. In case of 'key' property in the state, we don't have to use the key extractor */}
                {/* the round number is manually calculated as the new guess number is appending at the start of the array, so every Log item will have 0 index value, to correct this: arraylength-index or simply arraylength */}


            </View>
        </View>
    );


};


const styles = StyleSheet.create({
    mainOuterScreen: {
        flex: 1,
        padding: 24,//inner spacing
        alignItems: 'center'
    },

    cardTxt: {
        marginBottom: 12

    },

    buttonsContainer: {
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'white',


    },

    buttonContainer: {
        flex: 1,//for main axis stretch, it also stretches the parent in the main axis to grandparent limit

    },
    logsContainer: {
        flex: 1,
        padding: 16,
    },

    landscapeCardStyle: {
        flexDirection: 'row',//default is column, to put the children in row
        alignItems:'center',//to center the items in cross axis, in this case vertically center
        // borderWidth: 1,
        // borderColor: 'white',


    }


});

//please check object destructuring in component passed paramreters


