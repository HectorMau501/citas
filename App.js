//Componentes de React
import React, {useState} from 'react' //Hooks es el de useState. Regla 1 de hooks se coloca en la parte principal de los componentes
import {
  SafeAreaView,
  View, //View se comporta como un div en html y es necesario porque no vas a poder retornar dos text
  Text,
  StyleSheet, //Es como el css pero en React
  Button,
  Pressable, //Este tienes mas tipos de eventos que button, como dejar presionado, presionado y soltar y asi
  Modal, //Es para desplegar una ventana emergente.
  FlatList,
} from 'react-native'
import Formulario from './src/Formulario'
import Paciente from './src/Paciente'

//Siempre vamos a tener un return en nuestros componentes sino nos va a marca error
const App = () => {
  //Aqui se  colocan los hooks
  const [modalVisible, setModalVisible] = useState(false) //Asi se declaran los hooks, otra regla de los hooks es que no se puede regitrar si esta en una condicion
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  // Antes del return aqui se pone todo tipo de codigo de javaScript

  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id)

    setPaciente(pacienteEditar[0])
  }

  return (
    //  El componentes SafeArea sirve para bajar todo el texto y componentes en ios para el noch
    // <SafeAreaView>
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      {/* Se puede anidar componenets */}
      <Text style={styles.titulo}>
        Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinarias</Text>
      </Text>
      <Pressable style={styles.btnNuevaCita}>
        <Text
          style={styles.btnTextoNuevaCita}
          onPress={() => setModalVisible(!modalVisible)}>
          Nueva Cita
        </Text>
      </Pressable>

      <Modal
        animationType="slide"
        visible={modalVisible} //animation y visible es para cambiar al modal
      >
        {/* <Text>Desde Modal</Text> */}
      </Modal>

      {pacientes.length === 0 ? 
        <Text style={styles.noPacientes}>No hay pacientes aun</Text>
       : 
        <FlatList //FlatList es para mostrar las variables
        style={styles.listado}
          data={pacientes} //data va hacer referecia a los datos que va a redendizar
          keyExtractor={item => item.id} //Va a buscar en el arreglo de pacientes o en los datos que le diste en el flatlist o bien iterar sobre los elementos
          renderItem={({item}) => {
            //El componentes que se van a mostrar cuando comience a irerar sobre los elementos
            return(
              <Paciente 
              item={item}
              setModalVisible={setModalVisible}
              pacienteEditar={pacienteEditar}
              />
            ) 
          }}
        />
      }

      <Formulario
        // prob se llama modalVisible igual que la variable
        // los prob se pasan del hijo al padre
        // sirven para que los state puedan estar disponibles en otros componentes hijos
        modalVisible={modalVisible} //Este es un prob, estoy pasando la variable que es nuestro state
        pacientes={pacientes}
        setModalVisible={setModalVisible}
        setPacientes={setPacientes}
        paciente={paciente}
      />

      {/* <Button  */}
      {/* title='Nueva Cita' */}
      {/* onPress={() => { */}
      {/* console.log('Presionaste en el boton') */}
      {/* }} //Para asociar un evento con los botones, andrentro del podras tener javaScript */}
      {/* ></Button> */}
    </SafeAreaView>
  )
}

//Por buenas practicas asi se declara la variable
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1, //Esto sirve para que todo el contenido este en la parte de arriba hacia abajo
  },
  titulo: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#374151',
    fontWeight: 'bold',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20, //Este marginHorizontal es como si tuvieras el mismo margin para left y right
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  },
})

export default App
