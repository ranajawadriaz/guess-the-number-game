//any component even Button itself is made up of other core components like text or view, check github react native Button.js in components
//button should be in view as text do not provide much styles  functionality

import { View, Text, Pressable, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

export default function PrimaryButton(props: { children: any;/*object structuring: donot have to use props.children below by this, children name is must for pressableTitle*/ ifPressed:()=>void /*this is a function passed from StartGameScreen.tsx*/ }) {
    // function buttonPressed() {
    //     console.log("Pressed")
    // }
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable onPress={props.ifPressed/*this press will invoke the function in StartGameScreen.tsx*/} style={({ pressed }) => pressed ? [styles.isPressed, styles.buttonInnerContainer] : styles.buttonInnerContainer} android_ripple={{ color: Colors.primary600 }}

            // the reason that pressable styling not working when android ripple is removed is because pressable has text element taking all over pressable space but after android ripple is applied, it is applied onto whole pressable and that when the pressable styling also applies as whole

            /*the styleprop of pressable can take two value either a stylesheet object or arrow function, for arrow function it will be rendered only when the pressable is pressed,the arrow function takes data about pressed event, which is object with one property, or object destructuring to pull out that one property, pressed boolean property */
            >
                <Text style={styles.buttonText}>{props.children}</Text>
            </Pressable>
        </View>


    );

}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',//hides the inner element CSS flowing out
        // borderWidth:1,
        // borderColor:'red',

    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,

        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,

    },

    buttonText: {
        color: 'white',
        textAlign: 'center',//centers the text in text area
        // borderWidth:1,
        // borderColor:'red',
    },

    isPressed: {
        opacity: 0.75
    }


})