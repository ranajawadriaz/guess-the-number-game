import StartGameScreen from '@/screens/StartGameScreen';
import { StyleSheet,View } from 'react-native';



export default function HomeScreen() {
  return (
    <View style={styles.rootScreen}>

        <StartGameScreen />
    </View>
    
  );
}

const styles = StyleSheet.create({

    rootScreen:{
        backgroundColor:'#ddb52f',
        flex:1,
    }
  
});
