import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

const colors = ["#0AA4A2", "#27D0D7"];

const rainData = [
  { desc: "No Rain", desc_id: "a1" },
  { desc: "Light Rain (Drizzle)", desc_id: "a2" },
  { desc: "Heavy Rain", desc_id: "a3" },
  { desc: "Freezing Rain", desc_id: "a4" },
  { desc: "Freezing Drizzle", desc_id: "a5" },
  { desc: "Snow", desc_id: "a6" },
  { desc: "Mixed Rain and Snow", desc_id: "a7" },
];

export default class Rain extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.navigation.state.params)
  }
  onSelect = (desc, desc_id) => {
    console.log(desc, desc_id);
    this.props.navigation.state.params.selectReport("Rain", desc, desc_id);
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}> What kind of rain?</Text>
        </View>
        <FlatList
          data={rainData}
          keyExtractor={(item, index) => item.desc_id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors[index % colors.length] },
              ]}
              onPress={() => this.onSelect(item.desc, item.desc_id)}
            >
              <Text style={styles.rainText}>{item.desc}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b3e5fc",
    paddingLeft: 15,
    paddingRight: 15,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e88e5",
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  rainText: {
    fontSize: 20,
    fontFamily: "Montserrat-Medium",
    color: "white",
  },
  headerText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 25,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingBottom: 25,
    paddingTop: 25,
  },
});
