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
		width: width
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
		width:'100%',
		borderBottomWidth: 0.3,
		borderColor:'#696969'
	},
	innerView:{
		width:'95%',
		flexDirection:'row',
		alignItems:'center',
		alignSelf:'center',
		padding: 15,
		paddingLeft: 10
	},
	pic:{
		width: width/4.5,
		height: width/4.5,
		borderRadius: width/5/2
	},
	descView:{
		marginLeft: 5,
	},
	nameDown:{
		fontSize: 17,
		fontWeight: '700',
		color:'#383938'
	},
	desc:{
		fontWeight:'100',
		color:'grey',
		fontSize: 13,
		marginTop: 3,
		// width: '80%',
		flexWrap: 'wrap'
	},
	iconSent:{
		position:'absolute',
		width: width/15,
		height: width/15,
		bottom: 0,
		right: 0
	}
}
