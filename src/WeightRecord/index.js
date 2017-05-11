import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ListView,
    AsyncStorage
} from 'react-native'

const windowWidth = Dimensions.get('window').width

import moment from 'moment'
export default class WeightRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            record: [],
            weigth: ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('record', (e, v)=>{
            this.setState({record: JSON.parse(v) || []})
        })
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text>
                    Record is comming
                </Text>

                <View style={styles.input}>
                    <TextInput style={styles.textInput} value={this.state.weigth} onChangeText={weigth => this.setState({ weigth })} />
                    <TouchableOpacity style={styles.add} onPress={e => {
                        let { record, weigth } = this.state

                        record.push({
                            date: moment().format('YYYY-MM-DD hh:mm:ss'),
                            weigth
                        })

                        this.setState({ weigth: '', record })

                        AsyncStorage.setItem('record', JSON.stringify(record))
                    }}>
                        <Text>
                            添加
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.result}>
                    {this.state.record.map((item, i) => {
                        return (
                            <View style={styles.row} key={i}>
                                <Text>
                                    <Text style={styles.date}>{item.date}</Text> {item.weigth} KG
                                </Text>
                            </View>
                        )
                    })}
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 60,
        marginHorizontal: 20
    },

    input: {
        flexDirection: 'row'
    },

    textInput: {
        width: windowWidth - 80,
        height: 30,
        borderColor: 'pink',
        borderWidth: 1,
        paddingHorizontal: 5
    },

    add: {
        width: 40,
        paddingVertical: 8,
        paddingHorizontal: 5
    },

    result: {

    },

    row: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'pink'
    },

    date: {
        color: '#aaa'
    }
})