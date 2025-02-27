import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// NOTE - localhost does not work, make the PC's ip and host the django project in that Ip
const url = "https://indrareport.herokuapp.com/api/report/";

function convertToUTC(unixTime) {
  const date = new Date(unixTime);
  return date.toUTCString().toString();
}
export default class Flood extends Component {
  constructor() {
    super();
    this.state = {
      latitude: null,
      longitude: null,
      timestamp: null,
      error: null,
      total: null,
    };
  }

  getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((result) =>
        this.setState({
          total: result.length,
        })
      )
      .catch((error) => console.log(error));
    console.log(Dimensions.get("window").width);
    console.log(Dimensions.get("window").height);
  };
  sendData = () => {
    const data = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      timestamp: this.state.timestamp,
      reporttype: "Sample RN",
    };
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(Alert.alert("Success"))
      // .then(response => response.json())
      // .then(result => console.log(result))
      .catch((error) => console.log(error));
  };
  getLocation = () => {
    let geoOptions = {
      enableHighAccuracy: false,
      timeout: 20000,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // timestamp: position.timestamp,
          timestamp: convertToUTC(position.timestamp),
          error: null,
        });
      },
      (error) => Alert.alert(error.message),
      geoOptions
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.getLocation} style={styles.button}>
          <Text style={styles.floodText}>LATITUDE: {this.state.latitude}</Text>
          <Text style={styles.floodText}>
            LONGITUDE: {this.state.longitude}
          </Text>
          <Text style={styles.floodText}>
            Timestamp: {this.state.timestamp}
          </Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.sendData} style={styles.button}>
          <Text style={styles.floodText}> Send Data </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getData} style={styles.button}>
          <Text style={styles.floodText}> Get Data </Text>
          <Text style={styles.floodText}> Total Data: {this.state.total}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#b3e5fc",
    padding: 8,
  },
  floodText: {
    fontSize: 30,
    fontFamily: "Arial",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4dd0e1",
    padding: 10,
    borderRadius: 6,
    margin: 2,
    borderWidth: 0.5,
  },
});
