import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native'

const Paciente = ({item, setModalVisible, pacienteEditar}) => {
  const {paciente, fecha, id} = item

  const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha)
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones) //Es una API para fecha y lo podemos poner en español
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Paciente</Text>
      <Text style={styles.texto}>{paciente}</Text>
      <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>

      <View style={styles.contenedorBotones}>
        <Pressable 
        style={[styles.btn, styles.btnEditar]}
        onLongPress={() => {
          setModalVisible(true)
          pacienteEditar(id)
        }}
        >
          <Text style={styles.btnTexto}>Editar</Text>
        </Pressable>

        <Pressable style={[styles.btn, styles.btnEliminar]} s>
          <Text style={styles.btnTexto}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94A3B8',
    borderBottomWidth: 1
  },
  label:{
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10
  },
  texto:{
    color: '#6D28D9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10
  },
  fecha:{
    color: '#6D28D9'
  },
  contenedorBotones:{
    //Cada elemento que vamos creando ya tiene un display Flex
    flexDirection: 'row', //En React-Native todo es en columna de arriba hacia abajo
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn:{
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar:{
    backgroundColor: '#F59E0B'
  },
  btnEliminar:{
    backgroundColor: '#EF4444',
  },
  btnTexto:{
    textTransform: 'uppercase' ,
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },

})

export default Paciente
