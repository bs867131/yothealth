import React,{Component} from 'react'
import {
		View,
        Image,
        Dimensions,
        Text,
        TouchableOpacity,
        ActivityIndicator,
        ScrollView,
        Alert
	} from 'react-native'
import styles from './styles'
import { StackActions, NavigationActions } from 'react-navigation';
const {width,height} = Dimensions.get('window');
// import QB from 'quickblox-react-native-sdk'
import {connect} from 'react-redux';
import { fetchFriends } from '../../redux/actions';
import { friendsSelector, loginResponseSelector } from '../../redux/selector';
import SideMenuScene from '../SideMenuScene'
import SideMenu from 'react-native-side-menu'

let that;

class Connections extends Component{
	static navigationOptions = {
            title: '',
            header: null,
            gesturesEnabled: false
        };

        constructor(props){
        	super(props);
            this.state = {
                loading: true,
                friends: null,
                QBUsers: [],
                isOpen: false
            }
            that = this;
    	}

    componentDidMount(){
        // this.getQBUsers();
        that.props.fetchFriends();
    }

    handleQBSelect(item){
        this.props.navigation.navigate('Chat',{rec_user: item, loggedInQB: {}, opponentQB: {}});
    }

    componentWillUnmount(){this.setState({isOpen: false});}

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.friends != prevState.friends){

            if(prevState.friends != null)
                return {loading: false, friends: nextProps.friends};
            else
                return {loading: true, friends: nextProps.friends};
        }

        return null;
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

	render(){
        const menu = <SideMenuScene 
                            activeScreen={2}
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
                            {this.state.friends.map((item,index) => {
                                return(
                                    <TouchableOpacity key={index} style={styles.indView}
                                                      onPress={() => this.handleQBSelect(item)}>
                                        <View style={styles.innerView}>
                                            <View>
                                                {
                                                    item.profile_pic
                                                    ?
                                                    <Image source={require('../../assets/images/profile_pic.png')} style={styles.pic} />
                                                    :
                                                    <Image source={require('../../assets/images/nocamera1.png')} style={styles.pic} />
                                                }
                                                <Image source={require('../../assets/images/sent_request.png')} style={styles.iconSent} />
                                            </View>
                                            <View style={styles.descView}>
                                                <Text style={styles.nameDown}>{item.firstName +" "+ item.lastName}</Text>
                                                <Text style={styles.desc}>{item.username}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}

                            <View style={{width: width,height: height/20}}></View>
                        </ScrollView>
                        {
                            this.state.friends.length == 0 && !this.state.loading
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
        friends: friendsSelector(state),
        loginResponse: loginResponseSelector(state)
    }
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        fetchFriends: () => dispatch(fetchFriends()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Connections);