import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseListScreen from './src/screens/ExerciseListScreen';
import LogSetScreen from './src/screens/LogSetScreen';
import { Exercise, Set } from './src/types/exercise';

export type RootStackParamList = {
  ExerciseList: undefined;
  LogSet: { exercise: Exercise; onSaveSet: (exerciseId: string, newSet: Set) => void };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ExerciseList">
        <Stack.Screen 
          name="ExerciseList" 
          component={ExerciseListScreen} 
          options={{ title: 'Exercises' }} 
        />
        <Stack.Screen 
          name="LogSet" 
          component={LogSetScreen} 
          options={{ title: 'Log a Set' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}