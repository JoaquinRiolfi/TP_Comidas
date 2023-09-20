import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { ActionTypes, useContextState } from "./contextState";

const Formulario = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verificacion = async () => {
    try {
      const response = await fetch(`http://challenge-react.alkemy.org/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const token = await response.json();
        setContextState({
          newValue: token.token,
          type: ActionTypes.setUserToken,
        });
        setContextState({ newValue: false, type: ActionTypes.setLoading });
        navigation.navigate("buscador");
      } else {
        alert("Los datos no son correctos, vuelva a intentarlo");
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.error(error);
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("Campos vacíos");
      return;
    }
    setIsLoading(true);
    verificacion();
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text>Password:</Text>
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Pressable
        onPress={handleLogin}
        disabled={isLoading}
        style={{
          backgroundColor: isLoading ? "#ccc" : "#007AFF",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Enviar</Text>
      </Pressable>
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
});

export default Formulario;
