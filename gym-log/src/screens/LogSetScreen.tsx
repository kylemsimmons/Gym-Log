import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Exercise, Set } from '../types/exercise';
import { v4 as uuidv4 } from 'uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'LogSet'>;

export default function LogSetScreen({ route, navigation }: Props) {
  const { exercise, onSaveSet } = route.params;
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleSave = () => {
    const repsNum = parseInt(reps, 10);
    const weightNum = parseFloat(weight);

    if (isNaN(repsNum) || isNaN(weightNum)) {
      Alert.alert('Invalid input', 'Please enter numeric values for reps and weight.');
      return;
    }

    const newSet: Set = {
      id: uuidv4(),
      reps: repsNum,
      weight: weightNum,
    };

    onSaveSet(exercise.id, newSet);
    navigation.goBack(); // return to Exercise List
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Reps"
        keyboardType="numeric"
        value={reps}
        onChangeText={setReps}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <Button title="Save Set" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 18,
  },
});