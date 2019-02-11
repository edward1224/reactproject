import React, {Component} from 'react';
import{
    Alert,
    StyleSheet,
    ScrollView,
    View,
    Text,
}from 'react-native';

type Props ={};
export default class ProjectDetailPanel extends Component<Props> {
    static navigationOptions ={
        title:'Project Detail',
    };

    constructor(props){
        super(props)

        this.state={
            
        };
    }

    render(){
        return (
            <ScrollView style={styles.container}>
            <Text style={styles.title}>Smart Entreprenenur Tools</Text>
            <Text style={styles.subtitle}>Description</Text>
            <Text style={styles.displaytext}>This is a tool can bring a lot of benefits to entrepreneur</Text>
            <Text style={styles.subtitle}>Framework</Text>
            <Text style={styles.displaytext}>React Native</Text>
            <Text style={styles.subtitle}>Tools</Text>
            <Text style={styles.displaytext}>GitHub</Text>
            <Text style={styles.subtitle}>Prerequisite</Text>
            <Text style={styles.displaytext}>Cloud Computing, Data Mining</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:'#fff',
    },
    center:{
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        fontSize:50,
        marginBottom:30,
    },
    subtitle:{
        fontSize:40,
        marginBottom:15,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    displaytext:{
        fontSize:30,
        marginBottom:30,
    },
});