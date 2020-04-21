import {Dimensions} from 'react-native'
const {height,width} = Dimensions.get('window');

export default styles = {
	container:{
		flex:1,
		height: height
	},
	imageFull:{
		width: width,
		height: height,
		position:'absolute',
		top:0
	},
	logo:{
		width: width/4,
		height: undefined,
		aspectRatio: 0.8
	},
	top:{
		flex: 0.30,
		alignItems:'center',
		justifyContent:'center'
	},
	middle:{
		flex: 0.2,
		width: width,
		alignItems:'center',
		// backgroundColor:'red'
	},
	bottom:{
		flex: 0.46,
		width: width,
		alignItems:'center',
		// backgroundColor:'green'
	},
	extraSpace:{
		flex: 0.04
	},
	rightViewInner:{
        width:'75%',
        height: '100%',
        alignSelf:'center',
        justifyContent:'center'
    },
    pinView:{
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-between',
    },
    pinContainer:{
        padding: width/20,
        paddingLeft:0,
        paddingRight:0,
        backgroundColor:'transparent',
        borderRadius: 5,
        borderBottomWidth: 3,
        borderColor:'rgba(255,255,255,0.3)',
        width: '15%',
        alignItems:'center'
    },
    pinText:{
        color:'white',
        fontSize:24,
        // backgroundColor:'rgba(255,255,255,0.3)'
    },
    pinIns:{
        fontSize: 18,
        color:'#EEC015'
    },
    rowView:{
        flexDirection:'row',
        width:'100%',
        flex:1,
        justifyContent:'space-between',
        marginBottom: height/40
    },
    digitCover:{
        width:'30%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:10,
    },
    digitView:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    digit:{
        fontSize: height/15
    },
}