import { useContextState } from "../contextState";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const DishDetails = ({ route, navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [platoElegido, setPlatoElegido] = useState({});

  const onPress = () => {
    if (contextState?.menu?.length >= 4) {
      alert("Te has pasado en la cantidad de platos maximos en el menu");
      return;
    }
    if (
      platoElegido.vegan &&
      contextState?.menu?.filter((item) => item.vegan).length >= 2
    )
    {
      alert("Te has pasado en la cantidad de platos veganos maximos en el menu");
      return;
    }
    if (
      !platoElegido.vegan &&
      contextState?.menu?.filter((item) => !item.vegan).length >= 2
    )
    {
      alert("Te has pasado en la cantidad de platos NO veganos maximos en el menu");
      return;
    } 
    setContextState({ newValue: platoElegido, type: "SET_MENU" });

  };

  useEffect(() => {
    const id = route.params.id;
    async function getById(id) {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=327335afa8d0407c923e7ad7a38c441c`
      );
      setPlatoElegido(response.data);
    }
    getById(id);
  }, []);

  useEffect(() => {
    if(contextState.token == ""){
      alert("No hay token")
      navigation.navigate("Login")
    }
  }, []);


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: platoElegido.image }} />
      <View style={styles.card}>
        <Text style={styles.title}>{platoElegido.title}</Text>
        <Text style={styles.text}>Health Score: {platoElegido.healthScore}</Text>
        <Text style={styles.text}>Precio: {platoElegido.pricePerServing}</Text>
        <Text style={styles.text}>
          {platoElegido.vegan ? "Es" : "No es"} vegano
        </Text>
        <TouchableOpacity
          disabled={Boolean(contextState?.menu?.find((element) => platoElegido.id === element.id))}
          style={styles.addButton}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>Agregar al Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECEFF1",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  card: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15, 
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: "#1E88E5",
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#F5E7E0",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DishDetails;