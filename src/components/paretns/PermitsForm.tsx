import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Dropdown from 'react-native-input-select';
import {Student} from '../../types/responses';
import {
  fetchAllTeachers,
  fetchCreatePermit,
  fetchParentDetails,
} from '../../api/permit';
import {useAuth} from '../../context/AuthContext';
import {useEffect} from 'react';

const INITIAL_DATA = {
  teacher: '',
  student: '',
  description: '',
};

const TuComponente = () => {
  const {authState, userAuth} = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  const [data, setData] = useState(INITIAL_DATA);

  const fetchCreatePermitFN = async () => {
    if (
      !data.description.trim().length ||
      !data.teacher.trim().length ||
      !data.student.trim().length
    ) {
      return Alert.alert('Error', 'Campos invalidos', [{text: 'OK'}]);
    } else {
      try {
        await fetchCreatePermit(authState?.token!, data);
        Alert.alert('Info', 'Permiso enviado', [{text: 'OK'}]);
        setData(INITIAL_DATA);
      } catch (error: any) {
        Alert.alert(error.message, 'Error', [{text: 'OK'}]);
      }
    }
  };

  const fetchStudents = async () => {
    try {
      const parent = await fetchParentDetails(
        authState?.token!,
        userAuth?._id!,
      );
      setStudents(parent.students);
    } catch (error: any) {}
  };

  const fetchTeachers = async () => {
    const teachersC = await fetchAllTeachers(authState?.token!);
    setTeachers(teachersC);
  };

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          margin: 25,
        }}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Padre:</Text>
          <TextInput
            style={styles.input}
            placeholder="Padre"
            editable={false}
            value={userAuth?.firstName + ' ' + userAuth?.lastName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Estudiante:</Text>
          <Dropdown
            placeholder="Seleccionar estudiante"
            options={students.map(s => {
              return {
                label: s.user.firstName + ' ' + s.user.lastName,
                value: s.user._id,
              };
            })}
            selectedValue={data.student}
            onValueChange={(value: React.SetStateAction<undefined>) =>
              setData({
                ...data,
                student: value?.toString() || '',
              })
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Profesor:</Text>
          <Dropdown
            placeholder="Seleccionar profesor"
            options={teachers.map(t => {
              return {
                label: t.user.firstName + ' ' + t.user.lastName,
                value: t._id,
              };
            })}
            selectedValue={data.teacher}
            onValueChange={(value: React.SetStateAction<undefined>) =>
              setData({...data, teacher: value?.toString() || ''})
            }
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Motivo:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            placeholder="Escribe el motivo aquí"
            value={data.description}
            onChangeText={text =>
              setData({
                ...data,
                description: text,
              })
            }
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            fetchCreatePermitFN();
          }}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
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
    textAlignVertical: 'top', // Para que el texto comience desde arriba en un TextInput multiline
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TuComponente;
