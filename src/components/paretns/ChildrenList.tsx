import React, {useState} from 'react';
import {useEffect} from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {fetchParent} from '../../api/parent';
import {useAuth} from '../../context/AuthContext';
import {Student} from '../../types/responses';
import Card from '../Card';

export default function ChildrenList() {
  const {userAuth} = useAuth();
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await fetchParent(userAuth?._id!);
      setStudents(response.students);
    } catch (error: any) {
      console.error('Error fetching students:', error.message);
    }
  };

  useEffect(() => {
    if (!userAuth?._id) return;

    fetchStudents();
  }, [userAuth?._id]);

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          width: '100%',
          textAlign: 'center',
          paddingTop: 10,
        }}>
        Estudiantes matriculados
      </Text>
      {students?.map((student, index) => (
        <Card
          imageUrl={student.user.avatar}
          description={student.user.firstName}
          title="Estudiante"
          key={index}></Card>
      ))}
    </View>
  );
}
