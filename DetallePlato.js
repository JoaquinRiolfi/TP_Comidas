import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { ActionTypes, useContextState } from './contextState';

const Menu = ({ route }) => {
  const { contextState, setContextState } = useContextState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${route.params.id}/information?apiKey=383fc80d46654b08912b0ff16ae73bab&includeNutrition=true`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();

        setContextState({
          newValue: data,
          type: ActionTypes.setDetallado,
        });
        setContextState({ newValue: false, type: ActionTypes.setLoading });
      } catch (error) {
        console.error(error);
        alert(JSON.stringify(error));
      }
    };

    fetchData();
  }, [route.params.id, setContextState]);

  return (
    <View style={styles.container}>
      {contextState.detallado ? (
        <>
          <Text style={styles.title}>{contextState.detallado.title}</Text>
          <Text>$ {contextState.detallado.pricePerServing}</Text>
          <Image source={{ uri: contextState.detallado.image }} />
        </>
      ) : (
        <Text style={styles.alerta}>La información se está cargando. Por favor, espere...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#634fe3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 32,
  },
  alerta: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Menu;
