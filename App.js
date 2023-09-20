import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContextProvider } from './contextState';
import Formulario from './Formulario';
import Lista from './Lista';
import DetallePlato from './DetallePlato';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={Formulario} />
          <Stack.Screen name="buscador" component={Lista} />
          <Stack.Screen name="verdetalle" component={DetallePlato} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
