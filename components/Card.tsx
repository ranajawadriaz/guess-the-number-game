//wrapper view 

import { View,StyleSheet,Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";

export default function Card(props:{children:any})
{
    return(
        <View style={styles.mainOuterContainer}>
            {props.children}
            </View>
    );


}

const deviceWidth=Dimensions.get('window').width;//can do things based on device width change


const styles=StyleSheet.create({

    mainOuterContainer: {
        // flex:1,//if commented, take as much space as required
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 36,
        marginHorizontal: 24,
        // borderWidth:1,
        // borderColor:'red',
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        // boxshadow
        elevation: 8,//android shadow
        shadowColor: 'black',//android/IOS
        shadowOffset: { width: 0, height: 2 },//IOS,object, to expand the shadow
        shadowRadius: 6,//IOS,like borderradius
        shadowOpacity: 0.25,//IOS
        //below things:only if parents have childs and childs height/width not set
        // height:90 will have no effect on childs, parent height will change
        // width:90 will change parent and child will stretch along (in cross axis),(height if height in cross axis)


    },

})