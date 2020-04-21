import React,{Component} from 'react'
import {
		View,
        Image,
        Dimensions,
        Text,
        Alert,
        Platform
	} from 'react-native'
import styles from './styles'
import { StackActions, NavigationActions } from 'react-navigation';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import { setLogin, setQBInfo } from '../../redux/actions';
import { API } from '../../redux/config';
import requestCameraAndAudioPermission from '../VideoCall/permission';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

const resetActionHome = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
});

let that;

class Splash extends Component{
	static navigationOptions = {
            title: '',
            header: null,
            gesturesEnabled: false
        };

        constructor(props){
        	super(props);
            that = this;

            if (Platform.OS === 'android') {                    //Request required permissions from Android
                requestCameraAndAudioPermission().then(_ => {
                    console.log('requested!');
                });
            }
    	}

    componentDidMount(){
        this.checkLogin();
    }

    async checkLogin(){
        let user = JSON.parse(await AsyncStorage.getItem('@user'));

        if (user) {
            this.props.setLogin(user);
            Splash.navigateHome(null);
        } else {
            this.props.navigation.dispatch(resetAction);
        }
    }

    static navigateLogin(){
        that.props.setLogin(null);
        that.props.navigation.dispatch(resetAction);
    }

    static navigateHome(info){
        that.props.navigation.dispatch(resetActionHome);
    }

	render(){
		return(
			<View style={styles.container}>
                <Image  source={require('../../assets/images/saplash_bg.png')} 
                        style={styles.imageFull} />
                <Image  source={require('../../assets/images/login_logo.png')} 
                        style={styles.logo} />
			</View>
		);
	}
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        setLogin: (user) => dispatch(setLogin(user)),
        setQBInfo: (info) => dispatch(setQBInfo(info))
    }
}

export default connect(null,mapDispatchToProps)(Splash);