import React, { useEffect, useState } from "react";
import { useContextState } from "../contextState";
import axios from "axios";
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";

const SearchDishes = ({ navigation }) => {
  const { contextState } = useContextState();
  const [busqueda, setBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

  const onChangeHandler = async (values) => {
    const query = values.nativeEvent.text;
    setBusqueda(query);

    if (query.length >= 2) {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${busqueda}&apiKey=327335afa8d0407c923e7ad7a38c441c`);
      setResultadosBusqueda(response.data.results);
    }
  };

  useEffect(() => {
    if (contextState.token === "") {
      alert("No hay token");
      navigation.navigate("LoginUser");
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        onChange={onChangeHandler} 
        placeholder="Busqueda" 
        placeholderTextColor="#A5A5A5" 
      />
      <FlatList
        data={resultadosBusqueda}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate("DishDetails", { id: item.id })}>
              <Text style={styles.buttonText}>Ver Detalle</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("Menu")}>
        <Text style={styles.buttonText}>Ir al menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 15,
    width: "90%",
    borderRadius: 25,
    backgroundColor: "#ECEFF1",
    marginVertical: 10,
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#ECEFF1",
    alignItems: "center",
  },
  item: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginTop: 15,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  detailButton: {
    backgroundColor: "#1E88E5",
    padding: 10,
    alignItems: "center",
  },
  menuButton: {
    width: "90%",
    backgroundColor: "#3F51B5",
    alignItems: "center",
    padding: 15,
    borderRadius: 25,
    marginVertical: 15,
  },
  buttonText: {
    color: "#F5E7E0",
    fontWeight: "bold",
  },
});

export default SearchDishes;