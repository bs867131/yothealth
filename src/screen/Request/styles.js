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
	body:{
		flex: 0.87,
		backgroundColor:'#F3F3F3',
		width: width,
		backgroundColor:'white'
	},
	menu:{
		width: 25,
		height: 25,
	},
	name:{
		width: '23%',
		height: undefined,
		aspectRatio: 3
	},
	indView:{
		width: '92%',
		alignSelf:'center',
		marginTop: height/40,
		borderRadius: 5,
		backgroundColor:'white'
	},
	image:{
		width: '100%',
		height: undefined,
		aspectRatio: 1.7,
		borderRadius: 5,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#ddd'
	},
	noimage:{
		width: '30%',
		height: undefined,
		aspectRatio: 1,
	},
	infoView:{
		padding: 15
	},
	nameProfile:{
		fontSize: 16,
		fontWeight: '700',
		marginBottom: 3
	},
	time:{
		fontSize: 13,
		color:'grey',
		marginBottom: 3
	},
	statusView:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between'
	},
	online:{
		color:'#4BB371',
		fontSize: 12,
		fontWeight: '700'
	},
	ellipse:{
		width: 35,
		height: 8
	},
	plus:{
		height: 40,
		width: 40,
	},
	plusButton:{
		right: 20,
		position:'absolute',
		bottom: -20,
	},
	buttonsView:{
		backgroundColor:'transparent',
		flexDirection:'row',
		alignSelf:'center',
		position:'absolute',
		bottom: height/20,
		width: (width/7)*3.3,
		justifyContent:'space-between',
		alignItems:'center'
	},
	button:{
		width: width/7,
		height: undefined,
		aspectRatio: 1
	},
	nameText:{
		color:'white',
		fontSize: 20,
		fontWeight:'700'
	},
	buttonsViewIn:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		width: (width/4)*2.1,
		alignSelf:'center',
		marginTop: height/30
	},
	reject:{
		width: width/4,
		height: undefined,
		aspectRatio: 3
	},
}
