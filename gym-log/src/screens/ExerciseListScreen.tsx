import React, { useState, useCallback } from 'react';
import { 
  FlatList, Text, TouchableOpacity, View, StyleSheet 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Exercise, Set } from '../types/exercise';

type Props = NativeStackScreenProps<RootStackParamList, 'ExerciseList'>;

export default function ExerciseListScreen({ navigation }: Props) {
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: 'Bench Press', bodyPart: 'Chest', sets: [] },
    { id: '2', name: 'Squat', bodyPart: 'Legs', sets: [] },
    { id: '3', name: 'Pull-up', bodyPart: 'Back', sets: [] },
  ]);

  const handleSaveSet = useCallback((exerciseId: string, newSet: Set) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.id === exerciseId
          ? { ...ex, sets: [...(ex.sets ?? []), newSet] }
          : ex
      )
    );
  }, []);

  const renderItem = ({ item }: { item: Exercise }) => {
    const setsSummary =
      item.sets?.length
        ? item.sets.map(s => `${s.reps}x${s.weight}kg`).join(', ')
        : 'No sets logged';

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('LogSet', { exercise: item, onSaveSet: handleSaveSet })
        }
        activeOpacity={0.7}
      >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.bodyPart}>{item.bodyPart}</Text>
        <Text style={styles.sets}>{setsSummary}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: { padding: 16, marginBottom: 12, backgroundColor: '#f1f1f1', borderRadius: 8 },
  name: { fontSize: 18, fontWeight: '600' },
  bodyPart: { fontSize: 14, color: '#555' },
  sets: { fontSize: 14, color: '#333', marginTop: 8 },
});