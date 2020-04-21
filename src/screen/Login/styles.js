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
		aspectRatio: 1
	},
	top:{
		flex: 0.35,
		alignItems:'center',
		justifyContent:'center'
	},
	middle:{
		flex: 0.38,
		width: width,
		alignItems:'center',
		justifyContent:'space-between',
		paddingTop: height/20,
		paddingBottom: height/20,
	},
	bottom:{
		flex: 0.23,
		width: width,
		alignItems:'center',
		justifyContent:'space-between'
	},
	extraSpace:{
		flex: 0.04
	},
	input:{
		flexGrow:1,
		color:'white',
		fontSize: 14,
		marginLeft: 5,
		height: height/15
	},
	inputView:{
		flexDirection:'row',
		alignItems:'center',
		width: '85%',
		backgroundColor:'rgba(255,255,255,0.2)',
		padding: 5,
		paddingLeft: 30,
		borderRadius: 50
	},
	inputViewError:{
		flexDirection:'row',
		alignItems:'center',
		width: '85%',
		backgroundColor:'rgba(255,255,255,0.2)',
		padding: 5,
		paddingLeft: 30,
		borderRadius: 50,
		borderWidth:1,
		borderColor:'red'
	},
	icon1:{
		width: 23,
		height: 16
	},
	icon2:{
		width: 21,
		height: 24
	},
	login:{
		width: '85%',
		height: undefined,
		aspectRatio: 6
	},
	rowView:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	noAccount:{
		color:'rgba(255,255,255,0.6)',
		fontWeight:'100'
	},
	signup:{
		color:'rgba(255,255,255,1)',
		fontWeight:'600'
	},
}