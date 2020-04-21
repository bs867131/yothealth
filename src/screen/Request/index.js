import React,{Component} from 'react'
import {
		View,
        Image,
        Dimensions,
        Text,
        TouchableOpacity,
        ScrollView
	} from 'react-native'
import styles from './styles'
import { StackActions, NavigationActions } from 'react-navigation';
const {width,height} = Dimensions.get('window');

import {connect} from 'react-redux';
import { fetchRequests,fetchActRequests } from '../../redux/actions';
import { requestsSelector } from '../../redux/selector';
import SideMenuScene from '../SideMenuScene'
import SideMenu from 'react-native-side-menu'

class Request extends Component{
	static navigationOptions = {
            title: '',
            header: null,
            gesturesEnabled: false
        };

        constructor(props){
        	super(props);

            this.state = {
                loading: true,
                requests: null,
                accepted: [],
                isOpen: false
            }
    	}

    componentDidMount(){
        this.props.fetchRequests();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.requests != prevState.requests){
            return {loading: false, requests: nextProps.requests};
        }

        return null;
    }

    deleteRequest(id){ 
        this.props.fetchActRequests(id,false); 

        var requests = this.state.requests;
        requests = requests.map(item => item.request_id != id);
        this.setState({requests});
    }
    acceptRequest(id){ 
        this.props.fetchActRequests(id,true); 

        var accepted = this.state.accepted;
        accepted.push(id);
        this.setState({accepted});
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

	render(){
        var arr = [0,1,2,3,4];
		const menu = <SideMenuScene 
                            activeScreen={3}
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
                        <Text style={styles.nameText}>Request</Text>
                        <TouchableOpacity onPress={()=>{}}>
                            <Image source={require('../../assets/images/search.png')} style={styles.menu} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {this.state.requests.map((item,index) => {
                                return(
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={styles.indView} key={index}>
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
                                        </View>
                                        <View style={styles.infoView}>
                                            <Text style={styles.nameProfile}>{item.firstName +" "+ item.lastName}</Text>
                                            <Text style={styles.time}>{item.username}</Text>
                                            <View style={styles.statusView}>
                                                <Text style={styles.online}>Currently Online</Text>
                                                <TouchableOpacity onPress={()=>{}}>
                                                    <Image source={require('../../assets/images/ellipse.png')} style={styles.ellipse} />
                                                </TouchableOpacity>
                                            </View>
                                            {
                                                this.state.accepted.includes(item.request_id)
                                                ?
                                                <View style={[styles.buttonsViewIn,{width:'100%',justifyContent:'center'}]}>
                                                    <Text style={{
                                                        fontSize: 18,
                                                        color:'green',
                                                        fontWeight:'bold',
                                                    }}>Accepted</Text>
                                                </View>
                                                :
                                                <View style={styles.buttonsViewIn}>
                                                    <TouchableOpacity onPress={() => this.deleteRequest(item.request_id)}>
                                                        <Image source={require('../../assets/images/reject.png')} style={styles.reject} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.acceptRequest(item.request_id)}>
                                                        <Image source={require('../../assets/images/accept.png')} style={styles.reject} />
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                            <View style={{width: width,height: width/3.5}}></View>
                        </ScrollView>
                        {
                            this.state.requests.length == 0 && !this.state.loading
                            ?
                            <Text style={{fontSize: 18,position:'absolute',top:'50%',alignSelf:'center'}}>{'No Request(s) found'}</Text>
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
        requests: requestsSelector(state)
    }
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        fetchRequests: () => dispatch(fetchRequests()),
        fetchActRequests: (id,accept) => dispatch(fetchActRequests(id,accept))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Request);