import {Dimensions} from 'react-native'
const {height,width} = Dimensions.get('window');

export default styles = {
	container:{
		flex:1,
		height: height,
		width: width,
		backgroundColor:'white'
	},
	imageFull:{
		width: width,
		height: undefined,
		position:'absolute',
		top:0,
		aspectRatio: 2.3
	},
	header:{
		flex: 0.24,
		width: width,
		flexDirection:'row',
		alignItems:'flex-start',
		justifyContent:'space-between',
		paddingLeft: width/20,
		paddingRight: width/20,
		paddingTop: height/30,
		// backgroundColor:'white'
	},
	body:{
		flex: 0.76,
		width: width,
		// backgroundColor:'red'
	},
	menu:{
		width: height/20,
		height: height/20,
	},
	menu1:{
		width: height/25,
		height: height/25,
	},
	name:{
		width: '23%',
		height: undefined,
		aspectRatio: 3
	},
	nameText:{
		color:'white',
		fontSize: 20,
		fontWeight:'700'
	},
	innerBody:{
		marginTop: -(width/3/2),
		alignItems:'center',
		

	},
	profile_pic:{
		width: width/3,
		height: undefined,
		aspectRatio:1,
		// alignSelf:'center',
		backgroundColor:'white'
	},
	name:{
		fontSize: 17,
		fontWeight:'700',
		color:'#3F3F3F',
		marginTop:8
	},
	name1:{
		fontSize: 14,
		fontWeight:'700',
		color:'#3F3F3F',
		marginTop:8
	},
	distance:{
		color:'grey',
		// marginTop:2
	},
	indView:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		width:'100%',
		borderBottomWidth:0.3,
		borderColor:"#696969",
		paddingBottom: 5
	},
	infoView:{
		width:'85%',
		marginTop: height/20
	},
	buttonsView:{
		backgroundColor:'transparent',
		flexDirection:'row',
		alignSelf:'center',
		position:'absolute',
		bottom: height/20,
		width: (width/7)*3,
		justifyContent:'space-between',
		alignItems:'center'
	},
	button:{
		width: width/7,
		height: undefined,
		aspectRatio: 1
	},
}
