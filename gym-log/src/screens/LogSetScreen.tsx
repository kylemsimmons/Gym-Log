import React, { useState } from 'react';
import { 
  View, Text, TextInput, Button, StyleSheet, Alert, Platform 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Set } from '../types/exercise';
import { v4 as uuidv4 } from 'uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'LogSet'>;

export default function LogSetScreen({ route, navigation }: Props) {
  const { exercise, onSaveSet } = route.params;
  const [reps, setReps] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  const handleSave = () => {
    const repsNum = Number(reps);
    const weightNum = Number(weight);

    if (!Number.isFinite(repsNum) || !Number.isFinite(weightNum)) {
      Alert.alert('Invalid input', 'Please enter numeric values for reps and weight.');
      return;
    }

    const newSet: Set = {
      id: uuidv4(),
      reps: repsNum,
      weight: weightNum,
    };

    onSaveSet(exercise.id, newSet);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Reps"
        keyboardType="number-pad"
        value={reps}
        onChangeText={setReps}
        returnKeyType="done"
        editable={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="decimal-pad"
        value={weight}
        onChangeText={setWeight}
        returnKeyType="done"
        editable={true}
      />

      <Button 
        title="Save Set" 
        onPress={handleSave} 
        disabled={reps.length === 0 || weight.length === 0} 
      />
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