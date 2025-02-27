import React, { Component } from "react";
import {
  Platform,
  YellowBox,
  View,
  Alert,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
]);
import Buttons from "../../Buttons";
import SubmitButton from "../components/SubmitButton";
import SelectedReport from "../components/SelectedReport";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import { Draw } from '../../DrawerNavigator';

function convertToUTC(unixTime) {
  const date = new Date(unixTime);
  return date.toUTCString().toString();
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loc: false,
      latitude: null,
      longitude: null,
      timestamp: null,
      error: null,
      category: null,
      description: null,
      description_id: null,
    };
  }
  onReportSelect = (category, description, description_id) => {
    this.setState({
      category: category,
      description: description,
      description_id: description_id,
    });
    console.log("State: ", this.state);
  };

  componentWillMount() {
    // console.log("Will mount!")
    const geoOptions = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 3600000,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // timestamp: position.timestamp,
          timestamp: convertToUTC(position.timestamp),
          error: null,
          loc: true,
        });
      },
      (error) => Alert.alert(error.message),
      geoOptions
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#093F61" barStyle="light-content" />

        <View style={styles.navbar}>
          <Text style={styles.indraText}>
            INDRA Reporter {"\n"} International Natural Disaster Research and
            Analytics
          </Text>
        </View>
        {this.state.loc && (
          <Buttons
            navigation={this.props.navigation}
            location={this.state}
            selectReport={() => this.onReportSelect}
          />
        )}
        <SelectedReport
          report={{
            category: this.state.category,
            desc: this.state.description,
          }}
        />
        <View style={styles.mapContainer}>
          {this.state.loc && (
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.01,
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
                title={"Your are here"}
              />
            </MapView>
          )}
        </View>
        <SubmitButton data={this.state} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b3e5fc",
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#b3e5fc",
  },
  navbar: {
    height: 45,
    backgroundColor: "#093F61",
    elevation: 4,
    paddingTop: Platform.OS === "ios" ? 8 : 0,
  },
  indraText: {
    color: "white",
    // fontWeight: 'bold',
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    marginTop: 8,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 11,
    right: 11,
    bottom: 70,
  },
});
