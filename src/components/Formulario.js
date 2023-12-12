import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const Formulario = ({
  modalVisible,
  cerrarModal,
  pacientes,
  setPacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp,
}) => {
  const [id, setId] = useState('');
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id);
      setPaciente(pacienteObj.paciente);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setFecha(pacienteObj.fecha);
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]); //Le pasamos el objeto para que se este actualizando

  //Hook useEffect si declaramos un state podemos tener un useEffect que este revisando cuando aya cambios en este state
  //Sirve ejecutarse automaticamente cuando el componentes esta listo,  colocar codigo para consultar una API o LocalStorage

  const handleCita = () => {
    //Validar que haya contenido en los input
    if ([paciente, propietario, email, fecha, sintomas].includes('')) {
      //El alert toma tres argumentos uno va hacer el encabezado, cuerpo y el texto del boton
      Alert.alert(
        'Error',
        'Todos los campos son Obligatorios',
        // [{text:'OK'}, {text:'Cancelar'}, {text:'Neutral'}]//Aqui es el boton, puedes agregar mas botones
      );
      return; //Es importante el return ya que sino va a continuar con el proceso y va a agregar
    }

    // Revisar si es un registro nuevo o edición
    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    //Revisar si es un registro nuevo o edicion
    if (id) {
      //Editando
      nuevoPaciente.id = id;

      const pacienteActualizados = pacientes.map(pacienteState =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState);
      setPacientes(pacienteActualizados);
      setPacienteApp({});
    } else {
      //Nuevo Registro
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]); //Esta es la que agrega nuevo paciente
    }

    //Esto se encarga de recetiar el formulario
    cerrarModal();
    setId('')
    setPaciente(''); //Para recetear
    setPropietario('');
    setEmail('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible} //animation y visible es para cambiar al modal
    >
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}
          >{pacienteObj.id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCancelar}
            onLongPress={() => {
              cerrarModal();
              setPacienteApp({});
              setId('')
              setPaciente(''); //Para recetear
              setPropietario('');
              setEmail('');
              setTelefono('');
              setFecha(new Date());
              setSintomas('');
            }}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Paciente" //Recuerda este es para text en el input
              placeholderTextColor={'#666'}
              value={paciente} //Esto es para la variable de paciente
              onChangeText={setPaciente} //Para que reciba el cambio
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Propietario" //Recuerda este es para text en el input
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Propietario" //Recuerda este es para text en el input
              placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono Propietario" //Recuerda este es para text en el input
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10} //Para el maximo de letras o numeros
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker
                date={fecha}
                mode="date"
                locale="es"
                onDateChange={date => setFecha(date)}
              />
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder="Síntomas Paciente" //Recuerda este es para text en el input
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={setSintomas}
              //Estas dos ultimas propiedades son para poder poner un input pas grande
              //y que haya mas lineas
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>
              {pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeigh: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    margintop: 15,
    fontSize: 20,
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 10,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    color: '#5827A4',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 16
  },
});

export default Formulario;
