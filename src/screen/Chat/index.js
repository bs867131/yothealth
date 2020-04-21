import React,{Component} from 'react'
import {
		View,
        Image,
        Dimensions,
        Text,
        TouchableOpacity,
        ScrollView,
        TextInput,
        Platform
	} from 'react-native'
import styles from './styles'
import { StackActions, NavigationActions } from 'react-navigation';
const {width,height} = Dimensions.get('window');
import requestCameraAndAudioPermission from '../VideoCall/permission';
import {AGORA_APPID} from '../../redux/config';
import {connect} from 'react-redux';
import { fetchMessages, fetchSendMessage, makeCall } from '../../redux/actions';
import { messagesSelector, loginResponseSelector } from '../../redux/selector';

class Chat extends Component{
	static navigationOptions = {
        title: '',
        header: null,
        gesturesEnabled: false
    };

    constructor(props){
    	super(props);
        this.state = {
            rec_user: this.props.navigation.state.params.rec_user,
            message:"",
            messages: null,
            intervalId: null,
            AppID: AGORA_APPID,                    //Set your APPID here
            ChannelastName: 'firstchannel',                                  //Set a default channel or leave blank
        }

        if (Platform.OS === 'android') {                    //Request required permissions from Android
            requestCameraAndAudioPermission().then(_ => {
                console.log('requested!');
            });
        }
	}

    makeVideoCall(){
        // var params = this.props.navigation.state.params;
        // var call = {
        //     sid: this.props.loginResponse._id,
        //     rid: this.state.rec_user._id
        // };

        // this.props.makeCall(call);
        var ChannelastName = [this.props.loginResponse._id, this.state.rec_user._id];
        ChannelastName = ChannelastName.sort();
        ChannelastName = ChannelastName.join().replace(",","");

        this.props.navigation.navigate('VideoCall',{
            AppID: this.state.AppID,
            ChannelastName: ChannelastName
        });
    }

    componentDidMount(){
        this.props.fetchMessages(this.state.rec_user._id);
        
        let intervalId = setInterval(() => {
            this.props.fetchMessages(this.state.rec_user._id);
        }, 5000)
        
        this.setState({ intervalId: intervalId })        
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId)
    }

    sendMessage(){
        var message = this.state.message.trim();

        if(message){
            message = {
                sid: this.props.loginResponse._id,
                rid: this.state.rec_user._id,
                message: message
            };

            this.props.fetchSendMessage(message);

            var messages = this.state.messages;
            messages.push(message);
            this.setState({message: "", messages});
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.messages != prevState.messages){
            return {messages: nextProps.messages};
        }

        return null;
    }

	render(){
        var arr = [0,1,2,3,4,5,6,7,8,9];
		return(
			<View style={styles.container}>
                <Image  source={require('../../assets/images/profile_bg.png')} 
                        style={styles.imageFull} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image source={require('../../assets/images/back.png')} style={styles.menu} />
                    </TouchableOpacity>
                    <Text style={styles.nameText}>{this.state.rec_user.firstName +" "+ this.state.rec_user.lastName}</Text>
                    <TouchableOpacity onPress={() => this.makeVideoCall()}>
                        <Image source={require('../../assets/images/video.png')} style={styles.video} />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <ScrollView showsVerticalScrollIndicator={false} 
                                ref={ref => {this.scrollView = ref}}
                                onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                                style={styles.chatView}>
                        
                        {this.state.messages.map((item,index) => {
                            if(item.sid == this.props.loginResponse._id)
                                return(
                                    <View style={styles.rightMessageView} key={index}>
                                        <View style={styles.rightMessage}>
                                            <Text style={styles.message}>
                                                {item.message}
                                            </Text>
                                            <Image source={require('../../assets/images/righticon.png')} style={styles.righticon} />
                                        </View>
                                        {
                                            this.props.loginResponse.profile_pic
                                            ? <Image source={require('../../assets/images/chat_profile_img_1.png')} style={styles.profile_pic} />
                                            : <Image source={require('../../assets/images/nocamera1.png')} style={styles.profile_pic} /> 
                                        }

                                    </View>
                                )
                            else
                                return(
                                    <View style={styles.leftMessageView} key={index}>
                                        {
                                            this.state.rec_user.profile_pic
                                            ? <Image source={require('../../assets/images/profile_pic.png')} style={styles.profile_pic} />
                                            : <Image source={require('../../assets/images/nocamera1.png')} style={styles.profile_pic} /> 
                                        }
                                        <View style={styles.leftMessage}>
                                            <Text style={styles.message}>
                                                {item.message}
                                            </Text>
                                            <Image source={require('../../assets/images/lefticon.png')} style={styles.lefticon} />
                                        </View>
                                    </View>
                                )
                        })}
                        <View style={{width: width,height: height/10}}></View>
                    </ScrollView>
                </View>
                <View style={styles.typeView}>
                    <TouchableOpacity onPress={()=>{}}>
                        <Image source={require('../../assets/images/attachment.png')} style={styles.attachment} />
                    </TouchableOpacity>
                    <TextInput  style={styles.input}
                                value={this.state.message}
                                onChangeText={(text) => this.setState({message: text})}
                                placeholder="Type here..."
                                placeholderTextColor="#A2B0B3" />
                    <TouchableOpacity onPress={() => this.sendMessage()}>
                        <Image source={require('../../assets/images/send.png')} style={styles.send} />
                    </TouchableOpacity>
                </View>
			</View>
		);
	}
}

const mapStateToProps = function mapStateToProps (state) {
    return {
        messages: messagesSelector(state),
        loginResponse: loginResponseSelector(state)
    }
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        fetchSendMessage: (message) => dispatch(fetchSendMessage(message)),
        fetchMessages: (rec_id) => dispatch(fetchMessages(rec_id)),
        makeCall: (call) => dispatch(makeCall(call))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);