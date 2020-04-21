import {Dimensions} from 'react-native'
const {height,width} = Dimensions.get('window');

export default styles = {
	container:{
		flex:1,
		height: height,
		width: width
	},
	imageFull:{
		width: width,
		height: undefined,
		position:'absolute',
		top:0,
		aspectRatio: 2.3
	},
	header:{
		flex: 0.13,
		width: width,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		paddingLeft: width/20,
		paddingRight: width/20
	},
	profile_pic:{
		width: width/3,
		height: undefined,
		aspectRatio:1,
		alignSelf:'center',
		marginTop: height/50
	},
	body:{
		flex: 0.87,
		backgroundColor:'#F3F3F3',
		width: width
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
	input:{
		color:'#696969',
		fontSize: 13,
		fontWeight:'100',
		width: '90%',
		borderRadius: 50,
		alignSelf:'center',
		padding: 13,
		paddingLeft: 35,
		borderWidth: 0.3,
		borderColor:'#696969',
		marginTop: height/40,
		height: height/15
	},
	input1:{
		color:'#696969',
		fontSize: 13,
		fontWeight:'100',
		width: '70%',
		borderRadius: 50,
		padding: 13,
		paddingLeft: 35,
	},
	inputView:{
		flexDirection:'row',
		alignItems:'center',
		width: '90%',
		backgroundColor:'rgba(255,255,255,0.2)',
		borderRadius: 50,
		borderWidth: 0.3,
		borderColor:'#696969',
		alignSelf:'center',
		marginTop: height/45
	},
	icon2:{
		width:'100%',
		height: undefined,
		aspectRatio: 3,
		// marginLeft: '4%'
	},
	change:{
		marginLeft:'4%',
		width:'22%'
	},
	save:{
		width: '90%',
		height: undefined,
		aspectRatio: 6,
		alignSelf:'center',
		marginTop: height/15
	}
}
