import { Text,StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function CardTxt(props:{children:string;style:any})
{
    return(
        <Text style={[styles.aboveInputTxt,props.style]/*for merging/overwriting default styles from the component where this component is imported, also if the props.style is written after the default style, it will overwrite the default styles. Also if the props.style is written before the default style, the default style will overwrite the props.style. Also the overwrite will be incase of clash/same styles properties, incase of other style, it will merge into existing styles*/}>{props.children}</Text>

    );
}

const styles=StyleSheet.create({
    aboveInputTxt:{
        fontFamily:'open-sans',
        color:Colors.accent500,
        fontSize:24,

    },
})



// if View converted to Component, then for usage of this view, component name will be used and children for inner element/string/text  