import React,{Component} from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Splash from './screen/Splash';
import Login from './screen/Login';
import Signup from './screen/Signup';
import Home from './screen/Home';
import Request from './screen/Request';
import Setting from './screen/Setting';
import Profile from './screen/Profile';
import Connections from './screen/Connections';
import Chat from './screen/Chat';
import Otp from './screen/Otp';
import VideoCall from './screen/VideoCall';
import Dashboard from './screen/Dashboard';

const AppNavigator = createStackNavigator({
	// Chat: {screen: Chat},
	Splash: {screen: Splash},
	Dashboard: {screen: Dashboard},
	Chat: {screen: Chat},
	Connections: {screen: Connections},
	Profile: {screen: Profile},
	Setting: {screen: Setting},
	Request: {screen: Request},
	Home: {screen: Home},
	Signup: {screen: Signup},
	Login: {screen: Login},	
	Otp: {screen: Otp},
	VideoCall: {screen: VideoCall}
});

class AppWithNavigationState extends Component{
	render(){
		return(
			<AppNavigator />
		);
	}
}

export default createAppContainer(AppNavigator);