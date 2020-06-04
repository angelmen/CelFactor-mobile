import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableNativeFeedback,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import NavHeader from '../../components/navHeader';

export default function params({ route, navigation }) {
    return <EditClient id={route.params.data.id} data={route.params.data} navigation={navigation} />;
}

export class EditClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorMsg: '',
            isLoading: false,
            data: {},
            emptyError: false,
        };
        this.data = this.props.data;
        this.emptyFields = {
            name: false,
            buysIn: false,
            maxCredit: false,
            owned_company_name: false,
            totalPurchased: false,
        };
    }


    saveData() {
        const url = `https://celfactor-api.glitch.me/v2/clients/?buysIn=${
            this.data.buysIn
            }&id=${this.props.id}`;
        try {
            fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.data),
            })
                .then(response => response.json())
                .then(responseJson => {
                    alert(responseJson.message);
                });
        } catch (e) {
            console.log(e);
        }
    }

    async deleteItem() {
        const url = `https://celfactor-api.glitch.me/v2/clients/?buysIn=${
            this.data.buysIn
            }&id=${this.data.id}`;
        try {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    Alert.alert("Alerta", "Cliente correctamente eliminado");
                    this.props.navigation.goBack()
                });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        this.data = this.props.data;
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            );
        } else {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <NavHeader icon="back" name="Editar"/>
                    {this.state.error ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text>
                                {this.state.errorMsg || 'Hubo un problema al obtener los datos'}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'blue',
                                    borderRadius: 10,
                                    marginTop: 10,
                                }}
                                onPress={() => {
                                    this.setState({ isLoading: true });
                                    this.setState({ isLoading: false });
                                }}>
                                <Text style={{ color: '#FFF' }}>Reintentar</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                            <View
                                style={{
                                    flex: 7,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <ScrollView style={{ flex: 1, width: '90%' }}>
                                    <Text style={styles.inputHolders}>{'Nombre:'}</Text>
                                    <TextInput
                                        autoFocus={true}
                                        value={`${this.data.name}`}
                                        ref={input => (this.nombre = input)}
                                        style={styles.inputField}
                                        onChangeText={val => {
                                            this.data.name = val.toUpperCase();
                                            this.setState({ emptyError: true });
                                            this.emptyFields.name = false;
                                            this.setState({ emptyError: false });
                                        }}
                                        onSubmitEditing={() => {
                                            if (this.data.name === '') {
                                                this.setState({ emptyError: true });
                                                this.emptyFields.name = true;
                                            } else {
                                                this.setState({ emptyError: false });
                                                this.emptyFields.name = false;
                                            }
                                            this.creditoMaximo.focus();
                                        }}
                                    />
                                    {this.emptyFields.name ? (
                                        <Text style={styles.errorInInput}>
                                            {'Este campo es necesario'}
                                        </Text>
                                    ) : (
                                            <Text />
                                        )}
                                    <Text style={styles.inputHolders}>{'Credito maximo:'}</Text>
                                    <TextInput
                                        style={styles.inputField}
                                        keyboardType="number-pad"
                                        ref={input => (this.creditoMaximo = input)}
                                        value={`${this.data.maxCredit}`}
                                        onChangeText={val => {
                                            this.data.maxCredit = val;
                                            this.setState({ emptyError: true });
                                            this.emptyFields.maxCredit = false;
                                            this.setState({ emptyError: false });
                                        }}
                                        onSubmitEditing={() => {
                                            if (this.data.maxCredit == '') {
                                                this.setState({ emptyError: true });
                                                this.emptyFields.maxCredit = true;
                                            } else {
                                                this.setState({ emptyError: false });
                                                this.emptyFields.maxCredit = false;
                                            }
                                            this.nombreCompania.focus();
                                        }}
                                    />
                                    {this.emptyFields.maxCredit ? (
                                        <Text style={styles.errorInInput}>
                                            {'Este campo es necesario'}
                                        </Text>
                                    ) : (
                                            <Text />
                                        )}
                                    <Text style={styles.inputHolders}>{'Nombre de compañía:'}</Text>
                                    <TextInput
                                        style={styles.inputField}
                                        ref={input => (this.nombreCompania = input)}
                                        value={`${this.data.company_owned_name}`}
                                        onChangeText={val => {
                                            this.data.company_owned_name = val;
                                            this.setState({ emptyError: true });
                                            this.emptyFields.company_owned_name = false;
                                            this.setState({ emptyError: false });
                                        }}
                                        onSubmitEditing={() => {
                                            if (this.data.company_owned_name == '') {
                                                this.setState({ emptyError: true });
                                                this.emptyFields.company_owned_name = true;
                                            } else {
                                                this.setState({ emptyError: false });
                                                this.emptyFields.company_owned_name = false;
                                            }
                                            this.totalComprado.focus();
                                        }}
                                    />
                                    {this.emptyFields.company_owned_name ? (
                                        <Text style={styles.errorInInput}>
                                            {'Este campo es necesario'}
                                        </Text>
                                    ) : (
                                            <Text />
                                        )}
                                    <Text style={styles.inputHolders}>{'Total comprado:'}</Text>
                                    <TextInput
                                        style={styles.inputField}
                                        keyboardType="number-pad"
                                        ref={input => (this.totalComprado = input)}
                                        value={`${this.data.totalPurchased}`}
                                        onChangeText={val => {
                                            this.data.totalPurchased = val;
                                            this.setState({ emptyError: true });
                                            this.emptyFields.totalPurchased = false;
                                            this.setState({ emptyError: false });
                                        }}
                                        onSubmitEditing={() => {
                                            if (this.data.totalPurchased == '') {
                                                this.setState({ emptyError: true });
                                                this.emptyFields.totalPurchased = true;
                                            } else {
                                                this.setState({ emptyError: false });
                                                this.emptyFields.totalPurchased = false;
                                            }
                                        }}
                                    />
                                    {this.emptyFields.totalPurchased ? (
                                        <Text style={styles.errorInInput}>
                                            {'Este campo es necesario'}
                                        </Text>
                                    ) : (
                                            <Text />
                                        )}
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignSelf: 'center',
                                            paddingBottom: 20,
                                        }}>
                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => {
                                                Alert.alert(
                                                    'Alerta',
                                                    'Seguro que quiere eliminar este cliente',
                                                    [
                                                        {
                                                            text: 'Si',
                                                            onPress: () => { this.deleteItem(); }
                                                        },
                                                        {
                                                            text: 'No',
                                                            style: 'cancel',
                                                        },
                                                    ],
                                                    { cancelable: true }
                                                );
                                            }}>
                                            <Text style={styles.buttonText}>Eliminar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.sendButton}
                                            onPress={() => {
                                                this.saveData();
                                            }}>
                                            <Text style={styles.buttonText}>Enviar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        )}
                </SafeAreaView>
            );
        }
    }
}

var styles = StyleSheet.create({
    inputHolders: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 20,
    },
    inputField: {
        borderBottomColor: 'rgba(100,100,255,1)',
        borderBottomWidth: 2,
        lineHeight: 30,
        fontSize: 18,
    },
    errorInInput: {
        color: 'red',
        fontSize: 12,
    },
    deleteButton: {
        width: 100,
        height: 50,
        backgroundColor: 'rgba(250,50,100,1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
        marginRight: 5,
    },
    sendButton: {
        width: 100,
        height: 50,
        backgroundColor: 'rgba(100,50,250,1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 5,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'century-gothic',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
