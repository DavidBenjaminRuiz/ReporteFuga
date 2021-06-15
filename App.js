import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import  aguaImg from './assets/agua.png';


//////////////////Login/////////////////////

 function Login( {navigation}) {

  return (
   
    <View style={styles.container}>
      <Image
        source={aguaImg}
        style={styles.img}      
      />
      <Text style={styles.titulo}>Reporte de Fugas</Text>
      <StatusBar style="auto" />

      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Reporte')}>
        <Text style={styles.tituloBtn}> Crear Reporte</Text>
      </TouchableOpacity>

    </View>
    
  );
}
///////////////////Reporte//////////////////////////

  function Reporte(){
return (
  <View style={styles.containerReporte}>
  <Text style={styles.tituloVentana2}> Crea tu Reporte</Text>
  </View>
  );
}

//////////////Navegacion///////////////////////////

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="INCO 2021" component={Login} />
        <Stack.Screen name="Reporte" component={Reporte} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/////////////////Estilos//////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  containerReporte: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  img: {
    width:200,
    height: 200,

  },
  titulo: {
    marginTop: 15,
    fontSize: 30,
    fontFamily: 'Inter_400Regular',
  },
  tituloVentana2: {
    marginTop: 15,
    fontSize: 25,
    fontFamily: 'Inter_400Regular'
  },
  tituloBtn: {
    
    fontSize: 20,
    color: 'white',
    fontFamily: 'Inter_400Regular'
  },
  boton: {
    backgroundColor: '#000',
    padding: 20,
    marginTop: 100,
    borderRadius: 10
  }
});


