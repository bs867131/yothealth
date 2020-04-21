import React,{Component} from 'react'
import {
		View,
        Image,
        Dimensions,
        Text,
        TextInput,
        TouchableOpacity,
        Alert
	} from 'react-native'
import styles from './styles'
const {height,width} = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { StackActions, NavigationActions } from 'react-navigation';


import {connect} from 'react-redux';
import { fetchActivate } from '../../redux/actions';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

class Otp extends Component{
	static navigationOptions = {
            title: '',
            header: null,
            gesturesEnabled: false
        };

        constructor(props){
        	super(props);
            this.state = {
                password: ""
            }
    	}

    componentDidMount(){
        // Alert.alert(this.props.navigation.state.params.otp);
    }

    fillPassword(val){
        var pass = this.state.password;

        if(pass.length == 4)
            return;

        if(val == -1){
            pass = pass.substring(0,pass.length-1);
        }else{
            pass += val;
        }

        if(pass.length == 4){
            if(pass == this.props.navigation.state.params.otp){
                this.props.fetchActivate(this.props.navigation.state.params.userid);
                Alert.alert(
                  'Account Activation Successful',
                  'Please login with your input credentials.',
                [
                    {text: 'OK', onPress: () => this.props.navigation.dispatch(resetAction)},
                ],
                { cancelable: false });
            }else{
                Alert.alert("Invalid OTP entered.");
                pass = "";
            }
        }

        this.setState({password: pass});
    }

	render(){
		return(
            <KeyboardAwareScrollView    showsVerticalScrollIndicator={false} 
                                        scrollEnabled={false}>
        		<View style={styles.container}>
                    <Image  source={require('../../assets/images/saplash_bg.png')} 
                            style={styles.imageFull} />
                    <View style={styles.top}>
                        <Image  source={require('../../assets/images/login_logo.png')} 
                                style={styles.logo} />
                    </View>
                    <View style={styles.middle}>
                        <View style={styles.pinView}>
                            <View style={styles.pinContainer}>
                                <Text style={styles.pinText}>
                                    {this.state.password.length >= 1 ? "*" : ""}
                                </Text>
                            </View>
                            <View style={styles.pinContainer}>
                                <Text style={styles.pinText}>
                                    {this.state.password.length >= 2 ? "*" : ""}
                                </Text>
                            </View>
                            <View style={styles.pinContainer}>
                                <Text style={styles.pinText}>
                                    {this.state.password.length >= 3 ? "*" : ""}
                                </Text>
                            </View>
                            <View style={styles.pinContainer}>
                                <Text style={styles.pinText}>
                                    {this.state.password.length >= 4 ? "*" : ""}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.rightViewInner}>
                            <View style={styles.rowView}>
                                <View elevation={10} style={styles.digitCover}>
                                    <TouchableOpacity   style={styles.digitView}  
                                                        onPress={() => this.fillPassword(1)}>
                                        <Text style={styles.digit}>1</Text>
                                    </TouchableOpacity>
                                </View>
                                <View elevation={10} style={styles.digitCover}>
                                    <TouchableOpacity   style={styles.digitView}  
                                                        onPress={() => this.fillPassword(2)}>
                                        <Text style={styles.digit}>2</Text>
                                    </TouchableOpacity>
                                </View>
                                <View elevation={10} style={styles.digitCover}>
                                    <TouchableOpacity   style={styles.digitView}  
                                                        onPress={() => this.fillPassword(3)}>
                                        <Text style={styles.digit}>3</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.rowView}>
                                <View elevation={10} style={styles.digitCover}>
                                    <TouchableOpacity   style={styles.digitView} 
                                                        onPress={() => this.fillPassword(4)}>
                                        <Text style={styles.digit}>4</Text>
                                    </TouchableOpacity>
                                </View>
                                <View elevation={10} style={styles.digitCover}>
                                    <TouchableOpacity   style={styles.digitView} 
                                                        onPress={() => this.fillPassword(5)}>
                                        <Text style={styles.digit}>5</Text>
                                    </TouchableOpacity>
                                </View>
                                <View elevation={10} style={styles.digitCover}>
                                    <TouchableOpacity   style={styles.digitView} 
                                                        onPress={() => this.fillPassword(6)}>
                                        <Text style={styles.digit}>6</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.rowView}>
                                <View elevation={10} style={styles.digitCover}>
                                    <TouchableOpacity   style={styles.digitView} 
                                                        onPress={() => this.fillPassword(7)}>
                                        <Text style={styles.digit}>7</Text>
                                    </TouchableOpacity>
                                </View>
                                <View elevation={10} style={styles.digitCover}>
                                    <TouchableOpacity   style={styles.digitView} 
                                                        onPress={() => this.fillPassword(8)}>
                                        <Text style={styles.digit}>8</Text>
                                    </TouchableOpacity>
                                </View>
                                <View elevation={10} style={styles.digitCover}>
                                    <TouchableOpacity   style={styles.digitView} 
                                                        onPress={() => this.fillPassword(9)}>
                                        <Text style={styles.digit}>9</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.rowView}>
                                <View elevation={10} style={styles.digitCover}>
                                    <TouchableOpacity   style={styles.digitView} 
                                                        onPress={() => this.fillPassword(0)}>
                                        <Text style={styles.digit}>0</Text>
                                    </TouchableOpacity>
                                </View>
                                    <View elevation={10} style={styles.digitCover}>
                                    <TouchableOpacity   style={styles.digitView} 
                                                        onPress={() => this.fillPassword(-1)}>
                                        <Text style={styles.digit}>{"<"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.extraSpace}></View>
        		</View>
            </KeyboardAwareScrollView>
		);
	}
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        fetchActivate: (username) => dispatch(fetchActivate(username))
    }
}

export default connect(null,mapDispatchToProps)(Otp);