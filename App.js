import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
import { RadioButton } from 'react-native-paper';
import * as MailComposer from 'expo-mail-composer';
import  aguaImg from './assets/agua.png';
import  noFotoImg from './assets/no-photos.png';


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

      <TouchableOpacity style={styles.boton} 
        onPress={() => navigation.navigate('Reporte')}>
        <Text style={styles.tituloBtn}> Crear Reporte</Text>
      </TouchableOpacity>

    </View>
    
  );
}
///////////////////Reporte//////////////////////////

function Reporte({navigation}){
  const [direccionFuga, onChangeDireccion]= React.useState("")
  const [comentarios, onChangeComentarios]= React.useState("")
  const [selectedImage, setSelectedImage]= React.useState(null)
  const [actual, setActual] = React.useState("Moderada")

  //Modulo para cargar una img de la galeria
  let openImagePicker= async () =>{

    let permisos= await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permisos.granted === false){
      alert("Permisos requeridos") 
      return;
    }
    let imgPickeada= await ImagePicker.launchImageLibraryAsync() 
    if (imgPickeada.cancelled === true){
      return;
    }
    setSelectedImage({localUri: imgPickeada.uri});
  }  



  //Funcion que se ejecuta cuando se envia el reporte
  const enviarReporte= ()=>{
    alert('Reporte enviado con exito')
    console.log(direccionFuga)
    console.log(comentarios)
    console.log(actual)
    navigation.navigate('INCO 2021')
  }

return (
  <View style={styles.containerReporte}>
  <Text style={styles.tituloVentana2}> Crea tu Reporte</Text>

  <TextInput 
    style={styles.inputs}
    placeholder= "Direccion de la fuga"
    onChangeText={onChangeDireccion}
    value={direccionFuga}

  />

<Text style={styles.tituloVentana2}>Gravedad de la fuga </Text>

  <RadioButton.Group onValueChange={actual => setActual(actual)} value={actual}>
      <View>
        <Text>Grave</Text>
        <RadioButton value="Grave"  color= "#82d5f2"/>
      </View>
      <View>
        <Text>Moderada</Text>
        <RadioButton value="Moderada" color= "#82d5f2" />
      </View>
    </RadioButton.Group>


  <TextInput 
    style={styles.inputs}
    placeholder= "Observaciones adicionales"
    onChangeText={onChangeComentarios}
    value={comentarios}
    keyboardType= 'default'
    multiline
  />

  <Image
    style={styles.fotoFuga}
    source={{
      uri:
      selectedImage !== null ? selectedImage.localUri : "/assets/no-photos.png",
    }}
  />
  <Button
    title="Cargar Foto de la Fuga"
    onPress={openImagePicker}
  />

  <TouchableOpacity style={styles.botonEnviar} 
    onPress={()=>{MailComposer.composeAsync({
      recipients: ['davidmw4@hotmail.com'], // array of email addresses
      subject: 'Fuga en: ' + direccionFuga,
      body: 'Gravedad: ' + actual +  '\n' + 'Comentarios adicionales: ' + comentarios,
      attachments: [selectedImage.localUri],
    })}}>
    <Text style={styles.tituloBtn}> Enviar Reporte</Text>
  </TouchableOpacity>
  </View>
  );
}

//////////////Navegacion///////////////////////////

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="INCO 2021">
        <Stack.Screen name="INCO 2021" component={Login} options={{
          headerStyle: {
            backgroundColor: '#82d5f2',
          }
        }}/>
        <Stack.Screen name="Reporte" component={Reporte}   options={{
          headerStyle: {
            backgroundColor: '#82d5f2',
          }
        }} />
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
  },
  tituloVentana2: {
    marginTop: 15,
    fontSize: 25,
  },
  tituloBtn: {
    
    fontSize: 20,
    color: 'white',
  },
  boton: {
    backgroundColor: '#000',
    padding: 20,
    marginTop: 100,
    borderRadius: 10
  },
  botonEnviar: {
    backgroundColor: '#000',
    padding: 10,
    marginTop: 50,
    borderRadius: 10
  },
  inputs: {
    height:50,
    marginTop: 40,
    borderWidth: 1.5,
    width: 250,
    padding: 10,
    borderRadius: 5
  },
  fotoFuga: {
    width:150,
    height:150,
    marginTop: 20
  },
  radioButton: {
    padding:10
  }
});


