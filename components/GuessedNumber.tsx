//the computer guessed number styling component

import { View,Text,StyleSheet,Dimensions } from "react-native";
//Dimensions API are javascript object, works like mediaqueires, different styling on different devices, can be used wherever in javascript code or styling code to get the information out of it
import { Colors } from "@/constants/Colors";

export default function GuessedNumber(props:{children:number/*as a number is being sent from GameScreen.tsx*/})
{
    return(
        <View style={styles.guessedNumberContainer}>
            <Text style={styles.numberTxt}>{props.children}</Text>
        </View>
        
    );
}

//the children prop is sent by entering something between the opening and closing tags of this component in another component

const deviceWidth=Dimensions.get('window').width;//now this variable can be used to adjust the width where needed (using formula or condition base). window means without the status bar and screen means including the status bar


const styles=StyleSheet.create({
    guessedNumberContainer:{
        borderWidth:4,
        borderColor:Colors.accent500,
        // padding:deviceWidth/24,//formula for dimension api use
        padding:deviceWidth<380?12:24,//if device width less than 380 then padding is 12 else 24
        margin:deviceWidth<380?12:24,//if device width less than 380 then margin is 12 else 24
        borderRadius:8,//the border radius on text component is not available in IOS so we applied it to View wrapper
        alignItems:'center',
        justifyContent:'center',



    },
    numberTxt:{
        color:Colors.accent500,
        fontSize:deviceWidth<380?28:36,//if device width less than 380 then fontsize is 28 else 36
        // fontWeight:'bold',//this will overwrite fontfamily irrespective of the sequencially put in the stylesheet
        fontFamily:'open-sans-bold'


    },
})