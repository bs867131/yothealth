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
const {width,height} = Dimensions.get('window');
import {connect} from 'react-redux';
import { fetchAll } from '../../redux/actions';
import { loginResponseSelector } from '../../redux/selector';
import SideMenuScene from '../SideMenuScene'
import SideMenu from 'react-native-side-menu'
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

class Dashboard extends Component{
	static navigationOptions = {
            title: '',
            header: null,
            gesturesEnabled: false
        };

        constructor(props){
        	super(props);
            this.state = {
                loading: false
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

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

	render(){
        var arr = [0,1,2,3,4];
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
                        <TouchableOpacity style={[styles.buttonCover,styles.topButton]}
                                          onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={styles.text}>
                                Show 
                                {this.props.loginResponse 
                                    && this.props.loginResponse.role == "Doctor" 
                                    ? "Patient" : "Doctor"
                                }(s)</Text>
                        </TouchableOpacity>
                        {arr.map((item,index) => {
                            return(
                                <TouchableOpacity style={styles.buttonCover} key={index}
                                                  onPress={()=>{}}>
                                    <Text style={styles.text}>Coming Soon...</Text>
                                </TouchableOpacity>
                            )
                        })}
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

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        fetchAll: () => dispatch(fetchAll()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);