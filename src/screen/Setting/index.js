import React,{Component} from 'react'
import {
		View,
        Image,
        Dimensions,
        Text,
        TouchableOpacity,
        ScrollView,
        TextInput,
        ActivityIndicator,
	} from 'react-native'
import styles from './styles'
import { StackActions, NavigationActions } from 'react-navigation';
const {width,height} = Dimensions.get('window');
import {AsyncStorage,Alert} from 'react-native';
import SideMenuScene from '../SideMenuScene'
import SideMenu from 'react-native-side-menu'
import ImagePicker from 'react-native-image-picker';
import nocamera from '../../assets/images/nocamera1.png';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: false,
    path: 'images',
  },
};

import {connect} from 'react-redux';
import { fetchUpdate, setLogin } from '../../redux/actions';
import { loginResponseSelector, updateResponseSelector } from '../../redux/selector';

class Setting extends Component{
	static navigationOptions = {
            title: '',
            header: null,
            gesturesEnabled: false
        };

        constructor(props){
        	super(props);
            this.state = {
                username: this.props.loginResponse.username,
                password: "",
                firstName: this.props.loginResponse.firstName,
                lastName: this.props.loginResponse.lastName,
                loading: false,
                errors:[],
                updateResponse: null,
                isOpen: false,
                file: null,
                avatarSource: this.props.loginResponse.profile_pic ? {uri: this.props.loginResponse.profile_pic} : nocamera
            }
    	}

    componentDidMount(){
    }

    submitForm(){
        Alert.alert('Update  Work pending');
        return;

        var user = this.state;
        user.password = user.password.trim();

        var errors = [];

        if(user.password.length < 5 && user.password != "")
            errors.push("password");
        if(user.firstName.length == 0)
            errors.push("firstName");
        if(user.lastName.length == 0)
            errors.push("lastName");

        this.setState({errors: errors});

        if(errors.length == 0){

            user = {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                file: this.state.file  ? this.state.file : null
            };

            if(user.password)
                user['password'] = user.password;

            this.setState({loading: true});
            this.props.fetchUpdate(user);
        }
    }

    pickImage(){
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
 
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };

                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                    file: response
                });
            }
        });
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.updateResponse != prevState.updateResponse){
            if(nextProps.updateResponse.message){
                Alert.alert(nextProps.updateResponse.message);
            }else if(prevState.updateResponse != null){
                var user = nextProps.loginResponse;

                user.firstName = prevState.firstName;
                user.lastName = prevState.lastName;

                nextProps.setLogin(user);
                AsyncStorage.setItem('@user', JSON.stringify(user));

                Alert.alert("Profile Updated Successfully.");
            }
            return {loading: false, updateResponse: nextProps.updateResponse};
        }

        return null;
    }

    async logout() {
        try {
            this.setState({loading: true});
            await AsyncStorage.removeItem('@user');
            this.props.setLogin(null);
            setTimeout(() => {
                this.props.navigation.dispatch(resetAction);
            },2000);
        }
        catch(exception) {}
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }



	render(){
        var arr = [0,1,2,3,4];
		const menu = <SideMenuScene 
                            activeScreen={4}
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
                            <Image source={require('../../assets/images/menu.png')} style={[styles.menu1,{}]} />
                        </TouchableOpacity>
                        <Text style={styles.nameText}>Setting</Text>
                        <TouchableOpacity onPress={() => this.logout()}>
                            <Image source={require('../../assets/images/logout.png')} style={styles.menu} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <TouchableOpacity onPress={() => this.pickImage()} style={{alignSelf:'center'}}>
                            <Image  source={this.state.avatarSource} 
                                    style={[styles.profile_pic,{backgroundColor:'white', borderRadius: 100}]} />
                        </TouchableOpacity>
                        <TextInput  style={[styles.input,{borderColor: this.state.errors.includes("firstName") ? 'red' : '#696969'}]}
                                    value={this.state.firstName}
                                    onChangeText={(text) => this.setState({firstName: text})}
                                    placeholder="First Name"
                                    placeholderTextColor='#696969' />
                        
                        <TextInput  style={[styles.input,{borderColor: this.state.errors.includes("lastName") ? 'red' : '#696969'}]}
                                    value={this.state.lastName}
                                    onChangeText={(text) => this.setState({lastName: text})}
                                    placeholder="Last Name"
                                    placeholderTextColor='#696969' />
                        
                        <TextInput  style={styles.input}
                                    value={this.state.username}
                                    onChangeText={(text) => this.setState({username: text})}
                                    placeholder="username Address"
                                    editable={false}
                                    placeholderTextColor='#696969' />
                        
                        <TextInput style={[styles.input,{borderColor: this.state.errors.includes("password") ? 'red' : '#696969'}]}
                                    value={this.state.username}
                                    value={this.state.password}
                                    onChangeText={(text) => this.setState({password: text})}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    placeholderTextColor='#696969' />
                        <TouchableOpacity onPress={() => this.submitForm()}>
                            <Image source={require('../../assets/images/save.png')} style={styles.save} />
                        </TouchableOpacity>
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
        updateResponse: updateResponseSelector(state),
        loginResponse: loginResponseSelector(state)
    }
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        fetchUpdate: (user) => dispatch(fetchUpdate(user)),
        setLogin: (user) => dispatch(setLogin(user)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Setting);