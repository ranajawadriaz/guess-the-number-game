import { Colors } from "@/constants/Colors";
import { View,StyleSheet,Text } from "react-native";

export default function GuessLogItem(props:{roundNumber:any;phoneGuess:any})
{
    return(
        <View style={styles.singleLog}>
            <Text style={styles.logTxt}>#{props.roundNumber}</Text>
            <Text style={styles.logTxt}>Opponent's Guess: {props.phoneGuess}</Text>
        </View>
    );

}

const styles=StyleSheet.create({

    singleLog:{
        borderColor:Colors.primary800,
        borderWidth:1,
        borderRadius:40,
        padding:12,
        marginVertical:8,
        backgroundColor:Colors.accent500,
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        elevation:4,
        shadowColor:'black',
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.25,
        shadowRadius:3,
        paddingHorizontal:16
    },

    logTxt:{
        fontFamily:'open-sans'
    }

})