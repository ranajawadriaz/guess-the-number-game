//full screen components

import { useState } from "react";

import PrimaryButton from "@/components/PrimaryButton";
import { TextInput, View, StyleSheet, Alert, Dimensions, useWindowDimensions, /*not using Dimension as it is not dynamic and on screen orientation change the styling remains same so we use useWindowDimensions hook which dynamically sees the height and we can use it inside the component in a way to change styling when height changes by orientation*/KeyboardAvoidingView/*this will move the input area up, when keyboard is opened*/, ScrollView/*this will make the screen scrollable when something doesn't fit into the screen, like when keyboard is opened and the space become low for content and it will squeeze without scrollvew or flatlist, flatlist not used because its not going to be infinity long list*/ } from "react-native";
import { Colors } from "@/constants/Colors";
import TitleTxt from "@/components/TitleTxt";
import Card from "@/components/Card";
import CardTxt from "@/components/CardTxt";

export default function StartGameScreen(props: { validValueArrived: (value: string) => void }) {

    const [enteredNumber, setEnteredNumberValue] = useState('');
    //usestate for number is string as textInput component always have string even if the number is entered by num-pad

    const { width, height } = useWindowDimensions();//width not used
    //Dynamic Dimensions
    //this hook will internally watch the height and width of device, on component render
    //this hook exposes height,width of screen each time when this component is rendered


    //state value setting function
    function inputHandler(fetchedvalue: string) {
        setEnteredNumberValue(fetchedvalue);
        // console.log(fetchedvalue);

    }

    //to reset enteredNumber state
    function resetStateValue() {
        setEnteredNumberValue('');
    }


    //this function is passed to PrimaryButton.tsx, and this function will work on onPress Pressable prop in that file
    function onPressConfirm() {
        // console.log(enteredNumber);
        const actualNumber = parseInt(enteredNumber);//converting string to number, error if can't be converted to number

        if (isNaN(actualNumber) || actualNumber <= 0 || actualNumber > 99) {
            //native alertapi from react-native, its an object that holds methods
            //methods Alert.propmt, Alert.alert
            //Alert.alert has title,message and button configure properties
            Alert.alert('Invalid number!', 'Number has to be between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetStateValue }]);
            // setEnteredNumberValue('');
            return;//so that no further execution of this function

        }

        // console.log("valid num");
        // props.validValueArrived.bind(null,enteredNumber);//this only applies when
        props.validValueArrived(enteredNumber);



    }

    const marginToDistance = height < 500 ? 30 : 100;//this variable is int, storing 30 or 100 based on current height less than 500 or greater than 500





    return (
        <ScrollView style={styles.mostOuter}>
            <KeyboardAvoidingView style={styles.mostOuter}>
                <View style={[styles.outerMostContainer, { marginTop: marginToDistance }]/*styles used in array*/}>
                    <TitleTxt>Guess My Number</TitleTxt>
                    <Card>
                        <CardTxt style={styles.cardTxt}>Enter a Number</CardTxt>
                        <TextInput style={styles.inputArea} maxLength={2} keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false} onChangeText={inputHandler}
                            //onchangetext is executed on every keystroke
                            value={enteredNumber}
                        //textInput value is binded with the state value so if the value of state is altered, textinput value also changes
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton ifPressed={resetStateValue}>Reset</PrimaryButton>
                            </View>

                            <View style={styles.buttonContainer}>
                                <PrimaryButton ifPressed={onPressConfirm}>Confirm</PrimaryButton>
                                {/* the ifPressed prop is a passed prop to PrimaryButton.tsx button component and there it will be used in onPress which will invoke onPressConfirm function here (as we can't use onPress here directly) */}
                            </View>
                        </View>


                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>


    );

}

// const deviceHeight=Dimensions.get('window').height;
// only component is loaded more than one time, the styles only load once, when the orientation changes the styles remain the same so use windowsdimension hook and use it inside the component and render style inside the component in the styles array, so commenting this

//every view contructs new flexbox container

const styles = StyleSheet.create({

    mostOuter: {
        flex: 1,

    },

    outerMostContainer: {
        flex: 1,
        // marginTop:deviceHeight<500?30:100,//this styling is applied above inside component to make it dynamic
        alignItems: 'center',//default is stretch

    },

    cardTxt: {

    },





    inputArea: {
        //if individual childs in parent have individual height,width, it will work for childs (as childs are also someone parents and parents stretch wherever they are stretched)
        height: 50,//child height
        width: 50,//child width
        fontSize: 32,//child fontsize
        borderBottomColor: Colors.accent500,//somewhat inside the actual border,if height/width set
        borderBottomWidth: 2,
        color: Colors.accent500,//text color
        marginVertical: 8,//outer space
        fontWeight: 'bold',
        // borderWidth:1,
        // borderColor:'red',
        textAlign: 'center',//text center

    },

    buttonsContainer: {
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'white',


    },

    buttonContainer: {
        flex: 1,//for main axis stretch, it also stretches the parent in the main axis to grandparent limit

    },


});
