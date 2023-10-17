import React from "react";
import { useContextState } from "../contextState";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";

const Menu = () => {
  const { contextState, setContextState } = useContextState();

  const removeItem = (id) => {
    setContextState({ newValue: id, type: "ELIMINAR_MENU" });
  };

  const renderItem = ({ item }) => (
    <MenuItem
      title={item.title}
      image={item.image}
      id={item.id}
      healthScore={item.healthScore}
      pricePerServing={item.pricePerServing}
      onRemove={removeItem}
    />
  );

  const totalPrice = contextState.menu.reduce((acc, item) => acc + item.pricePerServing, 0);
  const averageHealthScore = contextState.menu.reduce((acc, item) => acc + item.healthScore, 0) / (contextState.menu.length || 1);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Menu</Text>
      <FlatList
        data={contextState.menu}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatList}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Precio: ${totalPrice.toFixed(2)}</Text>
        <Text style={styles.footerText}>Promedio HealthScore: {averageHealthScore.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const MenuItem = ({ title, image, id, healthScore, pricePerServing, onRemove }) => {
  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>HealthScore: {healthScore}</Text>
        <Text style={styles.text}>Precio: ${pricePerServing.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(id)}>
        <Text style={styles.removeButtonText}>Borrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4ECF7",
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6C3483",
    textAlign: "left",
    marginVertical: 20,
    paddingLeft: 10,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#A569BD",
    marginVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    padding: 15,
    shadowColor: '#6C3483',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    justifyContent: 'flex-start'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: "#F4ECF7",
    borderWidth: 2,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F4ECF7",
    textAlign: 'left'
  },
  text: {
    color: "#F4ECF7",
    marginTop: 5,
    textAlign: 'left'
  },
  removeButton: {
    padding: 10,
    backgroundColor: "#E74C3C",
    borderRadius: 15,
    marginLeft: 10,
  },
  removeButtonText: {
    color: "#F4ECF7",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    borderTopColor: "#D2B4DE",
    borderTopWidth: 1,
    paddingVertical: 15,
  },
  footerText: {
    fontSize: 16,
    color: "#6C3483",
    textAlign: "left",
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Menu;