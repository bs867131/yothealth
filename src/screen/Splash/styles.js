import {Dimensions} from 'react-native'
const {height,width} = Dimensions.get('window');

export default styles = {
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	imageFull:{
		width: width,
		height: height,
		position:'absolute',
		top:0
	},
	logo:{
		width: width/3,
		height: undefined,
		aspectRatio: 1
	}
}