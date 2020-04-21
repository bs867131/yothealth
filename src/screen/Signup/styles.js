import {Dimensions} from 'react-native'
const {height,width} = Dimensions.get('window');

export default styles = {
	container:{
		flex:1,
		// height: height
	},
	imageFull:{
		width: width,
		// height: height,
		position:'absolute',
		top:0
	},
	logo:{
		width: width/4,
		height: undefined,
		aspectRatio: 1
	},
	roleView:{
		width:'85%',
		height: height/13,
		backgroundColor:'white',
		borderRadius: 10,
		flexDirection:'row',
		marginBottom: height/25
	},
	roleCover:{
		width:'50%',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'transparent'
	},
	roleText:{
		fontSize: 18
	},
	changer:{
		position:'absolute',
		backgroundColor:'#00A5CB',
		width:'50%',
		height: '100%',
		borderRadius: 10
	},
	top:{
		// flex: 0.3,
		alignItems:'center',
		justifyContent:'center',
		marginTop: height/20
	},
	middle:{
		// flex: 0.66,
		width: width,
		alignItems:'center',
		// justifyContent:'space-between',
		paddingTop: height/20,
		// paddingBottom: height/20,

	},
	bottom:{
		// flex: 0.04,
		// width: width,
		// height: height/20,
		// backgroundColor:'red'
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
		borderRadius: 50,
		marginBottom: height/40
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
		borderColor:'red',
		marginBottom: height/40
	},
	icon0:{
		width: 22,
		height: 22,
		marginRight: 5
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
	selectorView:{
		width: width,
		marginBottom: height/20
		// height: 100,
	},
	option:{
		color:'white',
		width:'90%',
		backgroundColor:'#00A5CB',
		alignSelf:'center',
		textAlign:'center',
		color:'white',
		fontSize: 22,
		marginBottom: height/25,
		padding: 15,
		borderRadius: 10
	}
}