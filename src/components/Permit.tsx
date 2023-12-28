import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

interface Props {
  permit: any;
}
const PermitCard = ({permit}: Props) => {
  return (
    <View style={styles.card}>
      <View key={permit._id} style={styles.permitContainer}>
        <Text>
          Estudiante: {permit.student.user.firstName}{' '}
          {permit.student.user.firstName}
        </Text>
        <Text>Fecha: {' ' + permit.createdAt.toString().substring(0, 10)}</Text>
        <Text>
          Motivo:{' '}
          <Text style={[styles.input, styles.textArea]}>
            {permit.description}
          </Text>
        </Text>

        <Text>
          Comentario:{' '}
          <Text style={[styles.input, styles.textArea]}>
            {permit.adittionalNotes}
          </Text>
        </Text>
        <View style={styles.statusContainer}>
          <Text>
            {permit.approvedStatus === 'pending'
              ? 'Pendiente'
              : permit.approvedStatus === 'accepted'
              ? 'Aceptado'
              : 'Rechazado'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    padding: 20,
    margin: 20,
  },
  permitContainer: {
    justifyContent: 'space-between',
    marginVertical: 10,
    gap: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 3,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default PermitCard;
