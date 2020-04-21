import React,{Component} from 'react'
import {
		View,
        Image,
        Dimensions,
        Text,
        TouchableOpacity,
        ScrollView,
        TextInput,
        ActivityIndicator
	} from 'react-native'
import styles from './styles'
import { StackActions, NavigationActions } from 'react-navigation';
const {width,height} = Dimensions.get('window');
import SideMenuScene from '../SideMenuScene'
import SideMenu from 'react-native-side-menu'
import { loginResponseSelector } from '../../redux/selector';
import {connect} from 'react-redux';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {AGORA_APPID} from '../../redux/config';

class Profile extends Component{
	static navigationOptions = {
            title: '',
            header: null,
            gesturesEnabled: false
        };

        constructor(props){
        	super(props);
            console.log(this.props);
            var user = this.props.navigation.state.params ? this.props.navigation.state.params.rec_user : this.props.loginResponse;
            this.state = {
                rec_user: user,
                isOpen: false,
                loading: false
            }
    	}

    componentDidMount(){
        if(Platform.OS == 'ios')
            this.checkPermissions();
    }

    checkPermissions(){
        requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.PHOTO_LIBRARY]).then(
            (statuses) => {
                console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
                console.log('FaceID', statuses[PERMISSIONS.IOS.MICROPHONE]);
            },
        );
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    makeCall(id){
        var ChannelastName = [this.props.loginResponse._id, id];
        ChannelastName = ChannelastName.sort();
        ChannelastName = ChannelastName.join().replace(",","");

        this.props.navigation.navigate('VideoCall',{
            AppID: AGORA_APPID,
            ChannelastName: ChannelastName
        });
    }

	render(){
        const {rec_user} = this.state;
        const menu = <SideMenuScene 
                            activeScreen={0}
                            navigate={() => this.setState({isOpen: false})}
                            logout={() => this.setState({loading: true, isOpen: false})}
                            navigation = {this.props.navigation}/>;
		return(
            <SideMenu   menu={menu}
                        isOpen={this.state.isOpen}
                        onChange={isOpen => this.updateMenuState(isOpen)}>
    			<View style={styles.container}>
                    <Image  source={require('../../assets/images/profile_bg.png')} 
                            style={styles.imageFull} />
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.setState({isOpen: true})}>
                            <Image source={require('../../assets/images/menu.png')} style={styles.menu1} />
                        </TouchableOpacity>
                        <Text style={styles.nameText}>Profile</Text>
                        <TouchableOpacity onPress={()=>{}}>
                            <Image source={require('../../assets/images/edit_profile.png')} style={styles.menu1} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.innerBody}>
                            {
                                rec_user.profile_pic
                                ? <Image source={require('../../assets/images/profile_pic.png')} style={styles.profile_pic} />
                                : <Image source={require('../../assets/images/nocamera1.png')} 
                                         style={[styles.profile_pic,{backgroundColor:'white', borderRadius: 100}]} />

                            }
                            
                            <Text style={styles.name}>{rec_user.firstName +" "+ rec_user.lastName}</Text>
                            <Text style={styles.distance}>({rec_user.role})</Text>
                            
                            {
                                rec_user.role == "Doctor"
                                ?
                                <View style={styles.infoView}>
                                    <View style={styles.indView}>
                                        <Text style={styles.distance}>Speciality</Text>
                                        <Text style={styles.name1}>{rec_user.speciality}</Text>
                                    </View>
                                    <View style={styles.indView}>
                                        <Text style={styles.distance}>License</Text>
                                        <Text style={styles.name1}>{rec_user.license}</Text>
                                    </View>
                                </View>
                                :
                                <View style={styles.infoView}>
                                    <View style={styles.indView}>
                                        <Text style={styles.distance}>Insurance Name</Text>
                                        <Text style={styles.name1}>{rec_user.insurancename}</Text>
                                    </View>
                                    <View style={styles.indView}>
                                        <Text style={styles.distance}>Insurance Number</Text>
                                        <Text style={styles.name1}>{rec_user.insurancenumber}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={styles.buttonsView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat',{rec_user: rec_user, loggedInQB: {}, opponentQB: {}})}>
                            <Image source={require('../../assets/images/chat.png')} style={styles.button} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.makeCall(rec_user._id)}>
                            <Image source={require('../../assets/images/video_call_nav.png')} style={styles.button} />
                        </TouchableOpacity>
                    </View>
    			</View>
                {
                    this.state.loading
                    ?
                    <View style={{position:'absolute',height: height,justifyContent:'center', width: width,backgroundColor:'rgba(0,0,0,0.6)'}}>
                        <ActivityIndicator size="large" color="#875AEB" />
                    </View>
                    :
                    null
                }
            </SideMenu>
		);
	}
}

const mapStateToProps = function mapStateToProps (state) {
    return {
        loginResponse: loginResponseSelector(state),
    }
}

export default connect(mapStateToProps,null)(Profile);