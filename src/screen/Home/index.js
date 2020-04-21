import React,{Component} from 'react'
import {
		View,
        Image,
        Dimensions,
        Text,
        TouchableOpacity,
        ScrollView,
        ActivityIndicator,
        Alert,
        Platform
	} from 'react-native'
import styles from './styles'
import { StackActions, NavigationActions } from 'react-navigation';
const {width,height} = Dimensions.get('window');
// import QB from 'quickblox-react-native-sdk'
import {connect} from 'react-redux';
import { fetchAll,fetchSendRequest } from '../../redux/actions';
import { usersSelector, QBInfoSelector,loginResponseSelector } from '../../redux/selector';
import SideMenuScene from '../SideMenuScene'
import SideMenu from 'react-native-side-menu'
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {AGORA_APPID} from '../../redux/config';

class Home extends Component{
	static navigationOptions = {
            title: '',
            header: null,
            gesturesEnabled: false
        };

        constructor(props){
        	super(props);
            this.state = {
                users: null,
                loading: false,
                requests: [],
                isOpen:false
            }
    	}

    componentDidMount(){
        if(Platform.OS == 'ios')
            this.checkPermissions();
        this.props.fetchAll();
    }

    checkPermissions(){
        requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.PHOTO_LIBRARY]).then(
            (statuses) => {
                console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
                console.log('FaceID', statuses[PERMISSIONS.IOS.MICROPHONE]);
            },
        );
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.users != prevState.users){
            return {loading: false, users: nextProps.users};
        }

        return null;
    }

    sendRequest(id){
        this.props.fetchSendRequest(id);

        var requests = this.state.requests;
        requests.push(id);
        this.setState({requests});
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

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

	render(){
        var arr = [0,1,2,3,4];
        const menu = <SideMenuScene 
                            activeScreen={1}
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
                            <Image source={require('../../assets/images/menu.png')} style={[styles.menu,{}]} />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: width/15,
                            color:'white',
                            fontWeight:'bold'
                        }}>YotHealth</Text>
                        <TouchableOpacity onPress={()=>{}}>
                            <Image source={require('../../assets/images/search.png')} style={styles.menu} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {this.state.users && this.props.loginResponse && this.state.users.map((item,index) => {
                                if(item.role != this.props.loginResponse.role && 
                                    !item.admin && item._id != this.props.loginResponse._id)
                                    return(
                                        <TouchableOpacity   onPress={() => this.props.navigation.navigate('Profile', {rec_user: item})} 
                                                            style={styles.indView} key={index}>
                                            <View>
                                                {
                                                    item.profile_pic
                                                    ?
                                                    <Image source={require('../../assets/images/girl.jpg')} style={styles.image} />
                                                    :
                                                    <View style={styles.image}>
                                                        <Image source={require('../../assets/images/nocamera.png')} style={styles.noimage} />    
                                                    </View>
                                                }
                                                <TouchableOpacity style={styles.plusButton} onPress={() => this.makeCall(item._id)}>
                                                    <Image source={require('../../assets/images/video_call_nav.png')} style={styles.plus} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.infoView}>
                                                <Text style={styles.nameProfile}>{item.firstName +" "+ item.lastName}</Text>
                                                <Text style={styles.time}>{item.username}</Text>
                                                <View style={styles.statusView}>
                                                    <Text style={styles.online}>Currently Online</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                            })}
                            <View style={{width: width,height: width/3.5}}></View>
                        </ScrollView>
                        {/*<View style={styles.buttonsView}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Setting')}>
                                <Image source={require('../../assets/images/setting.png')} style={styles.button} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Request')}>
                                <Image source={require('../../assets/images/distance.png')} style={styles.button} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{}}>
                                <Image source={require('../../assets/images/filter.png')} style={styles.button} />
                            </TouchableOpacity>
                        </View>*/}
                        {
                            this.state.users.length == 0 && !this.state.loading
                            ?
                            <Text style={{fontSize: 18,position:'absolute',top:'50%',alignSelf:'center'}}>{'Nothing found'}</Text>
                            : null
                        }
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
    			</View>
            </SideMenu>
		);
	}
}

const mapStateToProps = function mapStateToProps (state) {
    return {
        users: usersSelector(state),
        loginResponse: loginResponseSelector(state),
        qbInfo: QBInfoSelector(state)
    }
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        fetchAll: () => dispatch(fetchAll()),
        fetchSendRequest: (id) => dispatch(fetchSendRequest(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);