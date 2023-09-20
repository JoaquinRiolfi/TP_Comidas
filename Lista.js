import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Button,
} from "react-native";
import { ActionTypes, useContextState } from "./contextState";

const Lista = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [buscador, setBuscador] = useState("");

  useEffect(() => {
    if (buscador.length > 1) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${buscador}&maxFat=25&number=20&apiKey=383fc80d46654b08912b0ff16ae73bab&includeNutrition=true`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.ok) {
            const recipesData = await response.json();
            setContextState({
              newValue: recipesData.results,
              type: ActionTypes.setRecepies,
            });
            setContextState({ newValue: false, type: ActionTypes.setLoading });
          } else {
            alert("No se encontraron recetas para la búsqueda.");
          }
        } catch (error) {
          alert(JSON.stringify(error));
          console.error(error);
        }
      };

      fetchData();
    }
  }, [buscador, setContextState]);

  const Item = ({ title, image, id }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: image }} />
      <Button
        title="Más detalle"
        onPress={() => navigation.navigate("verdetalle", { id })}
      />
    </View>
  );

  return contextState.userToken ? (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese..."
        onChangeText={setBuscador}
        value={buscador}
      />
      <FlatList
        data={contextState?.allRecepies ?? []}
        renderItem={({ item }) => (
          <Item title={item.title} image={item.image} id={item.id} />
        )}
        keyExtractor={(item) => item.id.toString()} // Cambié keyExtractor a una cadena para que funcione correctamente
      />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.alerta}>
        ¡Atención! No se le permite usar el buscador debido a que no ha iniciado sesión. Vaya a la página principal para hacerlo.
      </Text>
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
  item: {
    backgroundColor: "#ccc2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  alerta: {
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    marginBottom: 10, // Añadí un margen inferior para separar el TextInput de la lista
  },
});

export default Lista;
