//makign reusable TitleTxt component which will be used in 2 screens(components)

import { Text,StyleSheet,Platform } from "react-native";
//platform api is used to render different things based on different platforms, this doesn't have to be dynamic as platform is one, so once applied, it remains lifetime, can also write platform specific components
import { Colors } from "@/constants/Colors";

export default function TitleTxt(props:{children:string})
{
    return(
        <Text style={styles.titleTxt}>{props.children}</Text>

    );

};

const styles=StyleSheet.create({
    titleTxt:{
        fontFamily:'open-sans-bold',//once useFonts active in index.tsx, now we can use it anywhere
        fontSize:24,
        //fontWeight:'bold',//this is overwriting the fontFamily Bold
        color:'white',
        
        textAlign:'center',//centers the text in the text component
        // borderWidth:Platform.OS==='android'?2:0,//if platform android then borderwidth 2 else 0 or below
        // borderWidth:Platform.select({ios:0,android:2}),// to set the values for a specific platforms (more than once)
        borderWidth:2,//this is android styling, for ios styling, goto Card.tsx
        // borderColor:Colors.accent500,
        borderColor:'white',
        padding:12,
        maxWidth:'80%',//we can use relative units like this, flexible width, upto 80% and can be less, 80% is upper boundary, which it can use of outer container or parent
        width:320,//cannot exceed this as 80% is set max width, this sets fixed width not less not more
        
        //minwidth:'20%',//the minimum width reduced will take 20% of parent width,flexible width, cannot go below 20%, can go above 20%, also have minheight and maxheight that will take defined height of the parent container
    },

});

//children prop is must if content of one's component is being imported