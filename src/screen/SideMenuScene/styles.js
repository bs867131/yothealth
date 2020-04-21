import {Platform,Dimensions} from 'react-native'
const {width,height} = Dimensions.get('window');

const styles = {
    menu: {
      flex: 1,
      width: width*2/3,
      height: height*2/3,
      // backgroundColor: 'rgba(158, 124, 238,1)',
    },
    avatarContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      // marginTop: 6,
      paddingTop: Platform.OS == 'ios' ? 35 : 15,
      paddingBottom: 12,
      flexDirection:'row',
      width: '100%',
      alignSelf:'flex-end',
      // marginBottom: 12,
      backgroundColor: 'rgba(158, 124, 238, 1)',
      borderRightWidth:10,
      borderColor:'white'
    },
    line: {
        height: 2,
        width: '100%',
        backgroundColor: '#ddd',
    },
    profile_pic:{
      width: width/7,
      height: width/7,
      borderRadius: width/7/2,
      marginRight: 5,
      backgroundColor:'white',
      marginLeft: width/40
    },
    descView:{
      // marginLeft: 2,
    },
    nameDown:{
      fontSize: 17,
      fontWeight: '700',
      color:'white',
    },
    desc:{
      fontWeight:'100',
      color:'white',
      fontSize: 13,
      marginTop: 3,
      // width: '80%',
      flexWrap: 'wrap',
    },
    menuItem:{
      color: '#696969',
      fontSize: width/25,
      marginTop: height/50,
      marginBottom: height/50,
    },
    menuItemActive:{
      color: '#875AEB',
      fontSize: width/25,
      marginTop: height/50,
      marginBottom: height/50,
    },
    menuView:{
      width:'85%',
      alignSelf:'center'
    }
  };
  
  export default styles