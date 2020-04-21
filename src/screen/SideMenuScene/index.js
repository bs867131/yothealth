import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';
import styles from './styles'
import {connect} from 'react-redux';
import { setLogin } from '../../redux/actions';
import { loginResponseSelector } from '../../redux/selector';
import { StackActions, NavigationActions } from 'react-navigation';
const window = Dimensions.get('window');

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

class SideMenuScene extends React.Component {
    state = {
        
    }

    async logoutMenu() {
        try {
            await AsyncStorage.removeItem('@user');
            setTimeout(() => {
                this.props.setLogin(null);
                this.props.navigation.dispatch(resetAction);
            },2000);
        }
        catch(exception) {}
    }

    render() {
        const {
            navigation,
            activeScreen,
            logout,
            navigate
        } = this.props;

        var loginResponse = this.props.loginResponse ? this.props.loginResponse : {};
        return (
            <ScrollView style={styles.menu}>
                <View style={styles.avatarContainer}>
                    {
                        loginResponse.profile_pic
                        ? <Image source={require('../../assets/images/chat_profile_img_1.png')} style={styles.profile_pic} />
                        : <Image source={require('../../assets/images/nocamera1.png')} style={styles.profile_pic} /> 
                    }
                    <View style={styles.descView}>
                        <Text style={styles.nameDown}>{loginResponse.firstName +" "+ loginResponse.lastName}</Text>
                        <Text style={styles.desc}>{loginResponse.username}</Text>
                    </View>
                </View>
                <View style={styles.line}></View>
                <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => {
                        navigate();
                        navigation.navigate('Dashboard')}
                    }>
                        <Text style={ activeScreen == 0 ? styles.menuItemActive : styles.menuItem}>Home</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity onPress={() => {
                        navigate();
                        navigation.navigate('Home')}
                    }>
                        <Text style={ activeScreen == 1 
                                        ? styles.menuItemActive 
                                        : styles.menuItem}>Browse {
                                            loginResponse.role == "Doctor" ? "Patient(s)" : "Doctor(s)"
                                        }</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    {/*<TouchableOpacity onPress={() => {
                        navigate();
                        navigation.navigate('Connections')}
                    }>
                        <Text style={ activeScreen == 2 ? styles.menuItemActive : styles.menuItem}>Connections</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity onPress={() => {
                        navigate();
                        navigation.navigate('Request')}
                    }>
                        <Text style={ activeScreen == 3 ? styles.menuItemActive : styles.menuItem}>Requests</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>*/}
                    <TouchableOpacity onPress={() => {
                        navigate();
                        navigation.navigate('Setting')}
                    }>
                        <Text style={ activeScreen == 4 ? styles.menuItemActive : styles.menuItem}>Settings</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity onPress={() => {
                        this.logoutMenu();
                        logout();
                    }}>
                        <Text style={ activeScreen == 5 ? styles.menuItemActive : styles.menuItem}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = function mapStateToProps(state){
    return{
        loginResponse: loginResponseSelector(state),
    };
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        setLogin: (user) => dispatch(setLogin(user)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SideMenuScene);
