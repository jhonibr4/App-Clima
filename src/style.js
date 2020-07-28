import { StyleSheet, Dimensions } from 'react-native';

const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

const style = StyleSheet.create({
    container:{
        width:widthScreen,
        height:heightScreen,
        flex:1,
        alignItems:'center',
        
    },
    titulo:{
        color:'#FFF',
        fontWeight:'bold',
        fontSize:20,
        marginVertical:20
    },
    
    textHeader:{
        color:"#FFF",
        fontWeight:'bold',
        fontSize:20,
        marginVertical:20
    },
    button:{
        marginVertical:150,
        width:150,
        height:50,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#99d6ff'
    },
    textButton:{
        color:"#FFF",
        fontWeight:'bold',
        fontSize:15,
        marginVertical:20
        
    },
    temp:{
        fontSize:70,
        color:'#FFF'
    },
    viewTemp:{
        backgroundColor:'#030414',
        opacity:0.8,
        borderRadius:15,
        width:widthScreen-100,
        alignItems:'center',
        justifyContent:'center',
        marginTop:100
       
    },
    lineTemp:{
        flexDirection:'row'
    },
    infoColumn:{
        marginLeft:15,
        alignItems:'center'
    },
    
    tempMaxMin:{
        color:'#FFF'
    },
    textTop:{
        fontSize:20,
        marginTop:10,
        color:'#FFF',
        fontWeight:'bold'
    },
    textBottom:{
        marginBottom:10,
        color:'#FFF'
    }
});
export default style;