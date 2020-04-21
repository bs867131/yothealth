import React,{Component} from 'react'
import {
		View,
        Image,
        Dimensions,
        Text,
        TextInput,
        TouchableOpacity,
        ActivityIndicator,
        Alert
	} from 'react-native'
import styles from './styles'
const {height,width} = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { StackActions, NavigationActions } from 'react-navigation';
// import QB from 'quickblox-react-native-sdk'
import {connect} from 'react-redux';
import { fetchLogin, setQBInfo, setLogin, resetPassword } from '../../redux/actions';
import { loginResponseSelector } from '../../redux/selector';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
});

class Login extends Component{
	static navigationOptions = {
            title: '',
            header: null,
            gesturesEnabled: false
        };

        constructor(props){
        	super(props);
            this.state = {
                user:{
                    username: "",
                    password: ""
                },
                errors:[],
                loading: false,
                loginResponse: null,
                forgotPassword: false
            }
    	}

    componentDidMount(){
    }

    submitForm(){
        var user = this.state.user;
        var errors = [];

        if(user.password.length < 5)
            errors.push("password");
        if(user.username.length < 8 || !user.username.includes("@") || !user.username.includes("."))
            errors.push("username");

        this.setState({errors: errors});

        if(errors.length == 0){
            this.setState({loading: true});
            this.props.fetchLogin(user);
        }
    }

    static setQBLogin(nextProps, prevState){
        // nextProps.setQBInfo(info);
        nextProps.navigation.dispatch(resetAction);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.loginResponse != prevState.loginResponse){
            if(nextProps.loginResponse.message){
                Alert.alert("Error: "+ nextProps.loginResponse.message);
            }else{
                if(nextProps.loginResponse._id){
                    Login.setQBLogin(nextProps, prevState);                    
                }
            }
            return {loading: false, loginResponse: nextProps.loginResponse};
        }

        return null;
    }

    componentWillUnmount(){
        if(this.props.loginResponse)
            if(this.props.loginResponse.message)
                this.props.setLogin(null);
    }

    resetPassword(){        
        var user = this.state.user;
        var errors = [];

        if(user.username.length < 8 || !user.username.includes("@") || !user.username.includes("."))
            errors.push("username");

        this.setState({errors: errors});

        if(errors.length == 0){
            this.setState({loading: true});
            // this.resetPassword(user.username);

            setTimeout(() => {
                this.setState({
                    user:{
                        username: "",
                        password: ""
                    },
                    loading: false,
                    forgotPassword: false
                });

                Alert.alert('Successfully generated a new password and sent to your mail.');

            },3000);
        }
    }

	render(){
		return(
            <KeyboardAwareScrollView    showsVerticalScrollIndicator={false} 
                                        scrollEnabled={true}>
        		<View style={styles.container}>
                    <Image  source={require('../../assets/images/saplash_bg.png')} 
                            style={styles.imageFull} />
                    <View style={styles.top}>
                        <Image  source={require('../../assets/images/login_logo.png')} 
                                style={styles.logo} />
                    </View>
                    {
                        this.state.forgotPassword
                        ?
                        <View style={[styles.middle,{justifyContent:'flex-start'}]}>
                            <View style={this.state.errors.includes("username") ? styles.inputViewError : styles.inputView}>
                                <Image source={require('../../assets/images/email.png')} style={styles.icon1} />
                                <TextInput style={styles.input}
                                            value={this.state.username}
                                            onChangeText={(text) => {
                                                var user = this.state.user;
                                                user.username = text;
                                                this.setState({user});
                                            }} value={this.state.user.username}
                                            placeholder="Username"
                                            placeholderTextColor='rgba(255,255,255,0.4)' />
                            </View>
                            <TouchableOpacity   onPress={() => {
                                                    this.resetPassword();
                                                }}
                                                style={{
                                                    backgroundColor:'white',
                                                    width: '85%',
                                                    height: undefined,
                                                    aspectRatio: 6,
                                                    borderRadius: 40,
                                                    justifyContent:'center',
                                                    alignItems:'center',
                                                    marginTop: height/25,
                                                    marginBottom: height/35
                                                }}>
                                <Text style={{
                                    color:'#F51D7C',
                                    fontSize: 20
                                }}>Reset Password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({forgotPassword: false})}>
                                <Text style={styles.signup}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.middle}>
                            <View style={this.state.errors.includes("username") ? styles.inputViewError : styles.inputView}>
                                <Image source={require('../../assets/images/email.png')} style={styles.icon1} />
                                <TextInput style={styles.input}
                                            value={this.state.username}
                                            onChangeText={(text) => {
                                                var user = this.state.user;
                                                user.username = text;
                                                this.setState({user});
                                            }} value={this.state.user.username}
                                            placeholder="Username"
                                            placeholderTextColor='rgba(255,255,255,0.4)' />
                            </View>
                            <View style={this.state.errors.includes("password") ? styles.inputViewError : styles.inputView}>
                                <Image source={require('../../assets/images/password.png')} style={styles.icon2} />
                                <TextInput style={styles.input}
                                            value={this.state.password}
                                            onChangeText={(text) => {
                                                var user = this.state.user;
                                                user.password = text;
                                                this.setState({user});
                                            }} value={this.state.user.password}
                                            placeholder="Password"
                                            secureTextEntry={true}
                                            placeholderTextColor='rgba(255,255,255,0.4)' />
                            </View>
                            <TouchableOpacity   onPress={() => {
                                                    this.submitForm();
                                                }}>
                                <Image source={require('../../assets/images/login.png')} style={styles.login} /> 
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        this.state.forgotPassword
                        ? <View style={styles.bottom}></View>
                        :
                        <View style={styles.bottom}>
                            <View style={styles.rowView}>
                                <Text style={styles.noAccount}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                                    <Text style={styles.signup}>Sign Up Now</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({forgotPassword: true})} 
                                            style={{marginBottom: height/25}}>
                                <Text style={styles.signup}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={styles.extraSpace}></View>
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
            </KeyboardAwareScrollView>
		);
	}
}

const mapStateToProps = function mapStateToProps (state) {
    return {
        loginResponse: loginResponseSelector(state)
    }
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        fetchLogin: (user) => dispatch(fetchLogin(user)),
        setQBInfo: (info) => dispatch(setQBInfo(info)),
        setLogin: (res) => dispatch(setLogin(res)),
        resetPassword: (username) => dispatch(resetPassword(username))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);