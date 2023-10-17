import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import LoginUser from "./src/components/LoginUser.js";
import Menu from "./src/components/Menu";
import SearchDishes from "./src/components/SearchDishes.js";
import DishDetails from "./src/components/DishDetails.js";
import { ContextProvider } from "./src/contextState.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: '#1E88E5',
            },
            headerTintColor: '#F5E7E0',  
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerBackTitleVisible: false, 
          }}>
            <Stack.Screen
              name="LoginUser"
              component={LoginUser}
              options={{ title: "Iniciar Sesión" }}
            />
             <Stack.Screen
              name="SearchDishes"
              component={SearchDishes}
              options={{ title: "Explorar Platos" }}
            />
            <Stack.Screen
              name="DishDetails"
              component={DishDetails}
              options={{ title: "Detalles del Plato" }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{ title: "Menú Principal" }}
            />
           
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light-content" backgroundColor="#1E88E5" /> {}
      </SafeAreaView>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECEFF1",  
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    paddingBottom: 12,
    color: "#1E88E5", 
  },
});