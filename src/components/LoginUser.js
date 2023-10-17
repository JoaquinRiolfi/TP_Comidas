import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text} from "react-native";
import { Formik } from "formik";
import { login } from "../services/loginCatch.js";
import { useContextState } from "../contextState.js";


const Login = ({navigation}) => {

  const {contextState, setContextState} = useContextState();

  const onSubmitHandler = async (values) => {
    const token = await login(values).catch(error=>alert("Error al ingrear! Complete los datos correctamente"))

    setContextState({ newValue: token, type: "SET_USER_TOKEN" });
    console.log(token)
    
    navigation.navigate("SearchDishes")
  }

  const handleKeyPress = (event, values) => {
    if(event.key === 'Enter'){
      onSubmitHandler(values)    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>TP-Comidas-Kogan-Riolfi</Text>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmitHandler}>
        {({ handleSubmit, handleChange, handleBlur, values }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Email"
              onKeyPress={(e) => handleKeyPress(e, values)}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="Password"
              onKeyPress={(e) => handleKeyPress(e, values)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF2F8",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    paddingBottom: 30,
    color: "#34495E",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#D4E6F1",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: '#34495E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    placeholderTextColor: "gray",
  },
  button: {
    width: "70%",
    backgroundColor: "#5DADE2",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default Login;