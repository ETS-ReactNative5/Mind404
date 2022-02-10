import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../../../components/Button";
import styles from "./../../../../components/styles";
import { firebase } from "./../../../firebase/config";
import useUser from "../../../../useUser";
import DateTimePicker from "@react-native-community/datetimepicker"
import { acc } from "react-native-reanimated";

export default function ServicesPostScreen({ navigation }) {
  const [serviceType, setServiceT] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDecription] = useState("");
  const { user } = useUser();

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);


  const fromThis = (event, selectedFromDate) => {
    const currentFromDate = selectedFromDate || fromDate;
    setShow(Platform.OS === 'ios');
    setFromDate(currentFromDate);
    console.log(toDate);
  };

  const toThis = (event, selectedToDate) => {
    const currentToDate = selectedToDate || toDate;
    setShow(Platform.OS === 'ios');
    setToDate(currentToDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onPostPress = () => {
    /** Checks to see if type of service is an empty string */
    if (serviceType == "") {
      alert("Please select a type of service.");
      return;
    }
    /** Checks to see if location field is an empty string */
    if (location == "") {
      alert("Please enter a valid location.");
      return;
    }
    /**Checks to see if phone number is a valid entry */
    if (!validPhoneCheck(contact)) {
      alert("Please enter a valid phone number.");
      return;
    }
    if(!validEmail(email)){
      alert("Please enter a valid email address.");
      return;
    }
    /**Checks to see if the description field is empty */
    if (description == "") {
      alert("Please enter a description detailing your service.");
      return;
    }
    const data = {
      contact,
      email,
      description,
      location,
      serviceType,
      providerId: user.id,
    };
    firebase
      .firestore()
      .collection("services")
      .add(data)
      .then(() => {
        alert("Your service was successfully posted!");
        navigation.navigate("Prov Home");
      });
  };

  let landscaping = "Landscaping";
  let carDetailing = "Car Detailing";
  let housekeeping = "Housekeeping";
  let accounting = "Accounting";
  let techSupport = "Tech Support";
  let tutoring = "Tutoring";
  let contracting = "Contracting";
  let consulting = "Consulting";

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View>
          <Text style={styles.instructionText}>
            {" "}
            Please Enter the following information:
          </Text>
        </View>
        <Text style={styles.explanation}>Select your type of service (Scroll):</Text>
        <ScrollView style={{padding:10}} persistentScrollbar={true} horizontal={true}>
          <TouchableOpacity style={styles.serviceTypeButton}
          onPress={() => setServiceT(landscaping)}>
            <Text style={styles.buttonTitle}> {landscaping} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceTypeButton}
          onPress={() => setServiceT(carDetailing)}>
            <Text style={styles.buttonTitle}> {carDetailing} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceTypeButton}
          onPress={() => setServiceT(housekeeping)}>
            <Text style={styles.buttonTitle}> {housekeeping} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceTypeButton}
          onPress={() => setServiceT(accounting)}>
            <Text style={styles.buttonTitle}> {accounting} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceTypeButton}
          onPress={() => setServiceT(techSupport)}>
            <Text style={styles.buttonTitle}> {techSupport} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceTypeButton}
          onPress={() => setServiceT(tutoring)}>
            <Text style={styles.buttonTitle}> {tutoring} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceTypeButton}
          onPress={() => setServiceT(contracting)}>
            <Text style={styles.buttonTitle}> {contracting} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceTypeButton}
          onPress={() => setServiceT(consulting)}>
            <Text style={styles.buttonTitle}> {consulting} </Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={{padding:4}}></View>
        <View style={styles.containerSide}>
          <Text style={styles.explanation}>Selected service type: </Text>
          <Text style={styles.selectedOption}>{serviceType}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Location (City, State)"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setLocation(text)}
          value={location}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.multilineInput}
          placeholder="Description of services"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDecription(text)}
          value={description}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          multiline
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Phone Number eg. xxx-xxx-xxxx"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setContact(text)}
          value={contact}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.explanation}>
           Please set timeframe for contact via phone number:
        </Text>
        <View style={styles.containerSide}>
        <Text style={styles.explanation}>From:</Text>
        <View>
          <Button style={styles.timeButton} onPress={showTimepicker}>
            <Text>{fromDate.getHours()}:{fromDate.getMinutes()}</Text>
          </Button>
        </View>
        {show && (
          <DateTimePicker
          testID="dateTimePickerFrom"
          value={fromDate}
          mode={mode}
          is24Hour={false}
          minuteInterval={5}
          display="default"
          onChange={fromThis}
          />
        )}
        <Text style={styles.explanation}>To:</Text>
        <View>
          <Button style={styles.timeButton} onPress={showTimepicker}>
            <Text>{toDate.getHours()}:{toDate.getMinutes()}</Text>
          </Button>
        </View>
        {show && (
          <DateTimePicker
          testID="dateTimePickerTo"
          value={toDate}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={toThis}
          minuteInterval={5}
          />
        )}
        </View>

        <TouchableOpacity
          style={styles.servicesPostButton}
          onPress={onPostPress}
        >
          <Text style={styles.buttonTitle}>Post Service</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

/** Function to see if a string is in phone number syntax*/
function validPhoneCheck(phoneNumber) {
  
  if(/^(1?\s?\(?[0-9]{3}\)?\s?[0-9]{3}\s?[0-9]{4})$/.test(phoneNumber)){
    return true;
  }else if(/^(1?\s?\({1}[0-9]{3}\){1}\s?[0-9]{3}\-?\s?[0-9]{4})$/.test(phoneNumber)){
    return true;
  }else if(/^(1?\s?[0-9]{3}\-?\s?[0-9]{3}\-?\s?[0-9]{4})$/.test(phoneNumber)){
    return true;
  }
  else {
    return false;
  }
}

function validEmail(email){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email)){
      return true;
    } else {
      return false;
    }
}