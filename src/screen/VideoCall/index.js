import React,{Component} from 'react'
import {View,Dimensions,Text,Alert,SafeAreaView,StatusBar, Platform,NativeModules,TouchableOpacity} from 'react-native';
const {height,width} = Dimensions.get('window');
import styles from './styles';
// import InCallManager from 'react-native-incall-manager'
import {connect} from 'react-redux';
import { QBInfoSelector } from '../../redux/selector';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RtcEngine, AgoraView } from 'react-native-agora';
const { Agora } = NativeModules;  

const {
    FPS30,
    AudioProfileDefault,
    AudioScenarioDefault,
    Adaptative,
} = Agora;

class VideoCall extends Component{
  	constructor(props){
  		super(props);

  		var params = this.props.navigation.state.params;

  		this.state = {
  			peerIds: [],                                //Array for storing connected peers
            uid: Math.floor(Math.random() * 100),       //Generate a UID for local user
            appid: params.AppID,                    //Enter the App ID generated from the Agora Website
            channelastName: params.ChannelastName,        //Channel Name for the current session
            vidMute: false,                             //State variable for Video Mute
            audMute: false,                             //State variable for Audio Mute
            joinSucceed: false,                         //State variable for storing success
  		}

        if (Platform.OS === 'android' || Platform.OS == 'ios') {
          const config = {                            //Setting config of the app
            appid: this.state.appid,                  //App ID
            channelProfile: 0,                        //Set channel profile as 0 for RTC
            videoEncoderConfig: {                     //Set Video feed encoder settings
              width: 720,
              height: 1080,
              bitrate: 1,
              frameRate: FPS30,
              orientationMode: Adaptative,
            },
            audioProfile: AudioProfileDefault,
            audioScenario: AudioScenarioDefault,
          };
          RtcEngine.init(config);                     //Initialize the RTC engine
        }
  	}

	componentDidMount() {
        RtcEngine.on('userJoined', (data) => {
            const { peerIds } = this.state;             //Get currrent peer IDs
            if (peerIds.indexOf(data.uid) === -1) {     //If new user has joined
                this.setState({
                    peerIds: [...peerIds, data.uid],        //add peer ID to state array
                });
            }
        });
        RtcEngine.on('userOffline', (data) => {       //If user leaves
            this.setState({
                peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
            });
        });
        RtcEngine.on('joinChannelSuccess', (data) => {                   //If Local user joins RTC channel
            RtcEngine.startPreview();                                      //Start RTC preview
            this.setState({
                joinSucceed: true,                                           //Set state variable to true
            });
        });
        RtcEngine.joinChannel(this.state.channelastName, this.state.uid);  //Join Channel
        RtcEngine.enableAudio();                                        //Enable the audio
    }

    toggleAudio = () => {
        let mute = this.state.audMute;
        console.log('Audio toggle', mute);
        RtcEngine.muteLocalAudioStream(!mute);
        this.setState({
            audMute: !mute,
        });
    }
  
    toggleVideo = () => {
        let mute = this.state.vidMute;
        console.log('Video toggle', mute);
        this.setState({
            vidMute: !mute,
        });
        RtcEngine.muteLocalVideoStream(!this.state.vidMute);
    }

    componentWillUnmount(){
        RtcEngine.destroy();
    }

    endCall = () => {
        RtcEngine.destroy();
        this.props.navigation.goBack();
    }

	render(){
		return(
			<View style={{ flex: 1 }}>
            {
                this.state.peerIds.length > 3                                     //view for four videostreams
                ? <View style={{ flex: 1 }}>
                    <View   style={{ flex: 1 / 2, flexDirection: 'row' }}><AgoraView style={{ flex: 1 / 2 }}
                            remoteUid={this.state.peerIds[0]}
                            mode={1} />
                        <AgoraView  style={{ flex: 1 / 2 }}
                                    remoteUid={this.state.peerIds[1]}
                                    mode={1} />
                    </View>
                    <View   style={{ flex: 1 / 2, flexDirection: 'row' }}><AgoraView style={{ flex: 1 / 2 }}
                            remoteUid={this.state.peerIds[2]}
                            mode={1} />
                        <AgoraView  style={{ flex: 1 / 2 }}
                                    remoteUid={this.state.peerIds[3]}
                                    mode={1} />
                    </View>
                </View>
                :   this.state.peerIds.length > 2                                 //view for three videostreams
                    ?   <View style={{ flex: 1 }}>
                            <View   style={{ flex: 1 / 2 }}><AgoraView style={{ flex: 1 }}
                                    remoteUid={this.state.peerIds[0]}
                                    mode={1} />
                            </View>
                            <View   style={{ flex: 1 / 2, flexDirection: 'row' }}>
                                <AgoraView  style={{ flex: 1 / 2 }}
                                            remoteUid={this.state.peerIds[1]}
                                            mode={1} />
                                <AgoraView  style={{ flex: 1 / 2 }}
                                            remoteUid={this.state.peerIds[2]}
                                            mode={1} />
                            </View>
                        </View>
                    :   
                    this.state.peerIds.length > 1                              //view for two videostreams
                    ?   <View   style={{ flex: 1 }}><AgoraView style={{ flex: 1 }}
                                remoteUid={this.state.peerIds[0]}
                                mode={1} />
                            <AgoraView  style={{ flex: 1 }}
                                        remoteUid={this.state.peerIds[1]}
                                        mode={1} />
                        </View>
                    : this.state.peerIds.length > 0                             //view for videostream
                    ?   <AgoraView  style={{ flex: 1 }}
                                    remoteUid={this.state.peerIds[0]}
                                    mode={1} />
                    :   <View />
                    }
                    {
                        !this.state.vidMute                                              //view for local video
                        ? 
                        <AgoraView  style={styles.localVideoStyle} 
                                    zOrderMediaOverlay={true} showLocalVideo={true} mode={1} />
                        : 
                        <View />
                    }
                    {
                        Platform.OS == 'ios' || Platform.OS == 'android'
                        ?
                        <View style={styles.buttonBarView}>
                            <TouchableOpacity onPress={()=>this.toggleAudio()} style={styles.cover}>
                                <Text style={styles.iconText}>
                                {this.state.audMute ? 'Audio-OFF' : 'Audio-ON'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.endCall()} style={styles.cover}>
                                <Text style={styles.iconText}>
                                Hang-UP
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.toggleVideo()} style={styles.cover}>
                                <Text style={styles.iconText}>
                                {this.state.vidMute ? 'Video-OFF' : 'Video-ON'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.buttonBar}>
                            <Icon.Button    style={styles.iconStyle}
                                            backgroundColor="#0093E9"
                                            name={this.state.audMute ? 'mic-off' : 'mic'}
                                            onPress={() => this.toggleAudio()}
                            />
                            <Icon.Button    style={styles.iconStyle}
                                            backgroundColor="#0093E9"
                                            name="call-end"
                                            onPress={() => this.endCall()}
                            />
                            <Icon.Button    style={styles.iconStyle}
                                            backgroundColor="#0093E9"
                                            name={this.state.vidMute ? 'videocam-off' : 'videocam'}
                                            onPress={() => this.toggleVideo()}
                            />
                        </View>                        
                    }
                </View>
            )
	   }
    }

const mapStateToProps = function mapStateToProps (state) {
    return {
        qbInfo: QBInfoSelector(state)
    }
}

export default connect(mapStateToProps,null)(VideoCall);