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
	},
	menu:{
		width: width/12,
		height: width/12,
	},
	video:{
		width: 35,
		height: 20,
	},
	nameText:{
		color:'white',
		fontSize: 20,
		fontWeight:'700'
	},
	typeView:{
		width: '90%',
		height: height/10,
		flexDirection:'row',
		alignItems:'flex-end',
		alignSelf:'center',
		justifyContent:'space-between',
		paddingBottom: 15
	},
	attachment:{
		width: 18,
		height: 35
	},
	send:{
		width: width/5,
		height: undefined,
		aspectRatio: 2.5,
	},
	input:{
		borderBottomWidth: 0.6,
		borderColor:'#9CABAD',
		paddingBottom: 5,
		width: '65%',
		marginBottom: 10
	},
	leftMessageView:{
		flexDirection:'row',
		alignItems:'flex-end',
		marginBottom: 25
	},
	profile_pic:{
		width: width/7,
		height: width/7,
		borderRadius: width/7/2,
		marginRight: 5
	},
	leftMessage:{
		backgroundColor:'#58C4E0',
		padding: 25,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 20,
		width: '60%',
	},
	message:{
		color:'white',
		fontSize: 15,
		lineHeight: 22,
		fontWeight: 'normal'
	},
	chatView:{
		width: '95%',
		alignSelf:'center',
		paddingTop: 20,
	},
	rightMessageView:{
		flexDirection:'row',
		alignItems:'flex-end',
		// width: '60%',
		alignSelf:'flex-end',
		marginBottom: 25
	},
	rightMessage:{
		backgroundColor:'#687679',
		padding: 25,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 20,
		width:'60%',
		marginRight: 5
	},
	righticon:{
		position:'absolute',
		bottom: -6,
		right: -5,
		height: 20,
		width: 20,
	},
	lefticon:{
		position:'absolute',
		bottom: -7,
		left: -6,
		height: 20,
		width: 20,
	}
}
