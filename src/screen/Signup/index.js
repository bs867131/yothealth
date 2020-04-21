import React,{Component} from 'react'
import {
		View,
        Image,
        Dimensions,
        Text,
        TextInput,
        TouchableOpacity,
        ActivityIndicator,
        Alert,
        ScrollView
	} from 'react-native'; 
import {connect} from 'react-redux';
import styles from './styles'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
const {height,width} = Dimensions.get('window');
import GetLocation from 'react-native-get-location'
// import QB from 'quickblox-react-native-sdk'
import { fetchRegister, setRegister } from '../../redux/actions';
import { registerResponseSelector } from '../../redux/selector';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

var leftMargin = 0;

class Signup extends Component{
	static navigationOptions = {
            title: '',
            header: null,
            gesturesEnabled: false
        };

        constructor(props){
        	super(props);
            
            this.state = {
                user: {
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    role: "Doctor",
                    speciality:'Internal Medicine',
                    phone:'',
                    license:'',
                    insurancename:'',
                    insurancenumber:''
                },
                loading: false,
                errors:[],
                registerResponse: null,
                selectSpeciality: false
            }
    	}

    componentDidMount(){
        this.checkPermission();
    }

    submitForm(){
        var user = this.state.user;
        var errors = [];
        var usernameregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var phoneregex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if(user.password.length < 5)
            errors.push("password");
        if(!usernameregex.test(user.username))
            errors.push("username");
        if(!phoneregex.test(user.phone))
            errors.push("phone");
        if(user.firstName.length == 0)
            errors.push("firstName");
        if(user.lastName.length == 0)
            errors.push("lastName");

        if(user.role == "Doctor"){
            if(user.license.length == 0)
                errors.push("license");
        }else{
            if(user.insurancenumber.length == 0)
                errors.push("insurancenumber");
            if(user.insurancename.length == 0)
                errors.push("insurancename");
        }

        this.setState({errors: errors});

        if(errors.length == 0){
            this.setState({loading: true});
            this.props.fetchRegister(user);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.registerResponse != prevState.registerResponse && nextProps.registerResponse){
            if(nextProps.registerResponse.message){
                Alert.alert(nextProps.registerResponse.message);
            }else{
                Alert.alert(
                  'Account Creation Successful',
                  'Please login with your input credentials.',
                [
                    {text: 'OK', onPress: () => {
                        nextProps.setRegister(null);
                        nextProps.navigation.goBack();
                    }},
                ],
                { cancelable: false });
            }
            return {loading: nextProps.registerResponse.message ? false: true, registerResponse: nextProps.registerResponse};
        }

        return null;
    }

    checkPermission(){
        request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
            console.log(result)
            switch (result) {
                case RESULTS.GRANTED:
                    this.getLocation();
                    break;
            }
        });
    }

    getLocation(){
        try{
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
            .then(location => {
                var user = this.state.user;

                user.lat = location.latitude;
                user.lon = location.longitude;
                
                this.setState({user});
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            });
        }catch(er){console.log(er)}
    }

    static registerForQB(nextProps, prevState){
        Alert.alert(
          'Signup Successful',
          'Please input the OTP sent to your mail on the next screen.',
        [
            {text: 'OK', onPress: () => {
                nextProps.navigation.navigate('Otp', {
                    otp: nextProps.registerResponse.user.otp.toString(),
                    userid: nextProps.registerResponse.user._id
                });
            }},
        ],
        { cancelable: false });
    }

    componentWillUnmount(){
        this.props.setRegister(null);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async handleRoleChange(){
        var user = this.state.user;

        if(user.role == "Doctor"){
            leftMargin = "50%";
            user.role = "Patient";
        }else{
            leftMargin = 0;
            user.role = "Doctor";
        }

        this.setState({user: user});
    }

	render(){
		return(
            <View style={styles.container}>
                <KeyboardAwareScrollView    showsVerticalScrollIndicator={false} 
                                            scrollEnabled={true}>
        			<ScrollView style={styles.container}>
                        <Image  source={require('../../assets/images/saplash_bg.png')} 
                                style={styles.imageFull} />
                        <View style={styles.top}>
                            <Image  source={require('../../assets/images/login_logo.png')} 
                                    style={styles.logo} />
                        </View>
                        <View style={styles.middle}>
                            <View style={styles.roleView}>
                                <View style={[styles.changer,{left: leftMargin}]}></View>
                                <TouchableOpacity   style={styles.roleCover} 
                                                    onPress={() => this.handleRoleChange()}>
                                    <Text style={[styles.roleText,{
                                                    color: this.state.user.role == "Doctor"
                                                    ? 'white' : '#0090B0'
                                                }]}>Doctor Signup</Text>
                                </TouchableOpacity>
                                <TouchableOpacity   style={styles.roleCover} 
                                                    onPress={() => this.handleRoleChange()}>
                                    <Text style={[styles.roleText,{
                                                    color: this.state.user.role == "Patient"
                                                    ? 'white' : '#0090B0'
                                                }]}>Patient Signup</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={ this.state.errors.includes("firstName") ? styles.inputViewError : styles.inputView}>
                                <Image source={require('../../assets/images/user.png')} style={styles.icon0} />
                                <TextInput style={styles.input}
                                            value={this.state.firstName}
                                            onChangeText={(text) => {
                                                var user = this.state.user;
                                                user.firstName = text;
                                                this.setState({user});
                                            }} value={this.state.user.firstName}
                                            placeholder="First Name"
                                            placeholderTextColor='rgba(255,255,255,0.4)' />
                            </View>
                            <View style={ this.state.errors.includes("lastName") ? styles.inputViewError : styles.inputView}>
                                <Image source={require('../../assets/images/user.png')} style={styles.icon0} />
                                <TextInput style={styles.input}
                                            value={this.state.lastName}
                                            onChangeText={(text) => {
                                                var user = this.state.user;
                                                user.lastName = text;
                                                this.setState({user});
                                            }} value={this.state.user.lastName}
                                            placeholder="Last Name"
                                            placeholderTextColor='rgba(255,255,255,0.4)' />
                            </View>
                            <View style={ this.state.errors.includes("username") ? styles.inputViewError : styles.inputView}>
                                <Image source={require('../../assets/images/email.png')} style={styles.icon1} />
                                <TextInput style={styles.input}
                                            value={this.state.username}
                                            onChangeText={(text) => {
                                                var user = this.state.user;
                                                user.username = text;
                                                this.setState({user});
                                            }} value={this.state.user.username}
                                            placeholder="Username/Email"
                                            placeholderTextColor='rgba(255,255,255,0.4)' />
                            </View>
                            <View style={ this.state.errors.includes("phone") ? styles.inputViewError : styles.inputView}>
                                <Image source={require('../../assets/images/email.png')} style={styles.icon1} />
                                <TextInput style={styles.input}
                                            value={this.state.phone}
                                            onChangeText={(text) => {
                                                var user = this.state.user;
                                                user.phone = text;
                                                this.setState({user});
                                            }} value={this.state.user.phone}
                                            placeholder="Phone"
                                            keyboardType="numeric"
                                            placeholderTextColor='rgba(255,255,255,0.4)' />
                            </View>
                            <View style={ this.state.errors.includes("password") ? styles.inputViewError : styles.inputView}>
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
                            {
                                this.state.user.role == "Doctor"
                                ?
                                <TouchableOpacity   style={ this.state.errors.includes("speciality") 
                                                            ? styles.inputViewError : styles.inputView}
                                                    onPress={() => this.setState({selectSpeciality: true})}>
                                    <Image source={require('../../assets/images/password.png')} style={styles.icon2} />
                                    <TextInput style={styles.input}
                                                value={this.state.user.speciality}
                                                placeholder="Speciality"
                                                editable={false}
                                                placeholderTextColor='rgba(255,255,255,0.4)' />
                                </TouchableOpacity> : null
                            }
                            {
                                this.state.user.role == "Doctor"
                                ?
                                <View style={ this.state.errors.includes("license") ? styles.inputViewError : styles.inputView}>
                                    <Image source={require('../../assets/images/password.png')} style={styles.icon2} />
                                    <TextInput style={styles.input}
                                                onChangeText={(text) => {
                                                    var user = this.state.user;
                                                    user.license = text;
                                                    this.setState({user});
                                                }} value={this.state.user.license}
                                                placeholder="License"
                                                placeholderTextColor='rgba(255,255,255,0.4)' />
                                </View> : null
                            }
                            {
                                this.state.user.role == "Patient"
                                ?
                                <View style={ this.state.errors.includes("insurancename") ? styles.inputViewError : styles.inputView}>
                                    <Image source={require('../../assets/images/password.png')} style={styles.icon2} />
                                    <TextInput style={styles.input}
                                                onChangeText={(text) => {
                                                    var user = this.state.user;
                                                    user.insurancename = text;
                                                    this.setState({user});
                                                }} value={this.state.user.insurancename}
                                                placeholder="Insurance Name"
                                                placeholderTextColor='rgba(255,255,255,0.4)' />
                                </View> : null
                            }
                            {
                                this.state.user.role == "Patient"
                                ?
                                <View style={ this.state.errors.includes("insurancenumber") ? styles.inputViewError : styles.inputView}>
                                    <Image source={require('../../assets/images/password.png')} style={styles.icon2} />
                                    <TextInput style={styles.input}
                                                onChangeText={(text) => {
                                                    var user = this.state.user;
                                                    user.insurancenumber = text;
                                                    this.setState({user});
                                                }} value={this.state.user.insurancenumber}
                                                placeholder="Insurance Number"
                                                placeholderTextColor='rgba(255,255,255,0.4)' />
                                </View> : null
                            }
                            <TouchableOpacity onPress={() => this.submitForm()}>
                                <Image source={require('../../assets/images/sign_up.png')} style={styles.login} /> 
                            </TouchableOpacity>
                            <View style={[styles.rowView,{marginBottom: height/30, marginTop: height/20}]}>
                                <Text style={styles.noAccount}>Have an account? </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Text style={styles.signup}>Login Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bottom}></View>
        			</ScrollView>
                </KeyboardAwareScrollView>
                {
                    this.state.loading
                    ?
                    <View style={{position:'absolute',height: height,justifyContent:'center', width: width,backgroundColor:'rgba(0,0,0,0.6)'}}>
                        <ActivityIndicator size="large" color="#875AEB" />
                    </View>
                    :
                    null
                }
                {
                    this.state.selectSpeciality
                    ?
                    <View style={{
                        position:'absolute', height: height,
                        justifyContent:'flex-end', 
                        width: width,
                        backgroundColor:'rgba(0,0,0,0.6)'
                    }}>
                        <View style={styles.selectorView}>
                            <TouchableOpacity onPress={() => {
                                var user = this.state.user;
                                user.speciality = "Internal Medicine";
                                this.setState({ user: user, selectSpeciality: false});
                            }}>
                                <Text style={styles.option}>Internal Medicine</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                var user = this.state.user;
                                user.speciality = "OBYGN";
                                this.setState({ user: user, selectSpeciality: false});
                            }}>
                                <Text style={styles.option}>OBYGN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                var user = this.state.user;
                                user.speciality = "Pediatrician";
                                this.setState({ user: user, selectSpeciality: false});
                            }}>
                                <Text style={styles.option}>Pediatrician</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    null
                }
            </View>
		);
	}
}

const mapStateToProps = function mapStateToProps (state) {
    return {
        registerResponse: registerResponseSelector(state)
    }
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        fetchRegister: (user) => dispatch(fetchRegister(user)),
        setRegister: (res) => dispatch(setRegister(res))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);