import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
  SafeAreaView
} from "react-native";
import Button from "./../../../../components/Button";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import ServiceListing from "../../../../components/ServiceListing";
import SelectDropdown from "react-native-select-dropdown";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import CheckBox from 'expo-checkbox';
import { set } from "react-native-reanimated";

export default function ServicesScreen({ navigation }) {
  //displayed List in services
  const [listData, setListData] = useState([]);
  //Maintains full list at all times
  const [completeList, setCompleteList] = useState([]);
  //intermediate list to handle filters
  const [serviceList, setServiceList] = useState([]);
  //placeholder for service Type box (to maintain actual selection on filter close)
  const [placeHolder, setPlaceHolder] = useState('All')
  const [availableList, setAvailableList] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const services = ["All", "Landscaping", "Car Detailing", "Housekeeping", "Accounting", "Tech Support", "Tutoring", "Contracting","Consulting"]

  const LineSeparator = () => {
    return (
      <View
          style={{
            borderBottomColor: '#949494',
            borderBottomWidth: 2,
            marginBottom: 15,
          }}
        />
    );
  };

  const loadListData = () => {
    firebase
      .firestore()
      .collection("services")
      .get()
      .then((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let serviceDetails = {};
          serviceDetails = documentSnapshot.data();
          serviceDetails["id"] = documentSnapshot.id;
          temp.push(serviceDetails);
          setCompleteList(temp);
          setListData(temp);
          setServiceList(temp);
          setAvailableList(temp);
        });
      });
  }

  useEffect(() => {
    loadListData();
  }, []);
  
  
  const itemSeperatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#808080",
        }}
      />
    );
  };

  const setServiceFilter = (service) => {
    setServiceList(completeList);
    const serviceFiltered = completeList.filter(item => item.serviceType == service);
    setServiceList(serviceFiltered);
    setOverallFilter(serviceFiltered, 1);
  }

  const setOverallFilter = (list, id) => {
    let overall = completeList;
    switch (id){
      case 0:
        setListData(completeList);
        setServiceList(completeList);
        setToggleCheckBox(false);
        setPlaceHolder('All');
        break;
      case 1:
        overall = overall.filter(item => list.includes(item));
        overall = overall.filter(item => availableList.includes(item));
        break;
      case 2:
        overall = overall.filter(item => list.includes(item));
        overall = overall.filter(item => serviceList.includes(item));
        break;
      default:

    }
    setListData(overall)
  }
  const setAvail = () => {
    let currentHour = new Date().getHours();
    let temp = [];
    let avail = completeList;
    avail.forEach( item => {
      let toTime = item.toTime;
      let fromTime = item.fromTime;
      if(toTime < fromTime){
        toTime = toTime+24;
      }
      if(currentHour < fromTime) {
        currentHour = currentHour+24;
      }
      if ((toTime == fromTime) || (currentHour > fromTime && currentHour < toTime)){
        temp.push(item);
      }
    })
    return temp;
  }
  return (
    <ImageBackground
      source={require("../../../../images/grey_background.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <Text style={{
        color: "#FFAC1C", 
        paddingTop: 20, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        fontSize: 33,
        textShadowColor: "black",
        textShadowRadius: 8,
      }}
      >
        Services
      </Text>
      <View style={{paddingBottom: 10, flex: 1 }}>
        <Collapse>
          <CollapseHeader>
              <View style={{height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{backgroundColorfontSize: 18, fontWeight: 'bold', fontStyle: 'italic', marginEnd: 3, color: '#1C6FFF'}}>
                  Filter
                </Text>
                <AntDesign name="down" color='#1C6FFF' size={15} />
              </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={{backgroundColor: '#9CC0FF'}}>
              <LineSeparator/>
              <View style={{marginBottom: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: 18,fontWeight: 'bold', color: "black", padding: 6, marginStart: 20,}}>
                  Service type: 
                </Text>
                <SelectDropdown
                  data = {services}
                  onSelect={(selectedItem, index) => {
                    setPlaceHolder(selectedItem)
                    if(selectedItem == 'All'){
                      setOverallFilter([], 0);
                    } else {
                      setServiceFilter(selectedItem);
                    }
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return placeHolder;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                  buttonStyle={{backgroundColor: '#FFAC1C', borderRadius: 2, height: 30, width: 160}}
                  buttonTextStyle={{fontWeight: 'bold', color: 'white'}}
                  defaultButtonText={placeHolder}
                />
              </View>
              <View style={{marginBottom: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: 18,fontWeight: 'bold', color: "black", padding: 6, marginStart: 20,}}>
                  Currently Available to Call: 
                </Text>
                <CheckBox
                  disable={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => {
                    setToggleCheckBox(newValue)
                    if(newValue){
                      setOverallFilter(setAvail(), 2);
                      setAvailableList(setAvail())
                    } else {
                      setOverallFilter(completeList, 2);
                      setAvailableList(completeList)
                    }
                  }}
                />
              </View>
              <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity style={{borderRadius: 6, backgroundColor: '#FFAC1C', width: 130, height: 22}} onPress={() => setOverallFilter([], 0)}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <AntDesign name="close" color='white' size={15} />
                      <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'white'}} >Clear All Filters</Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
          </CollapseBody>
        </Collapse>
        
        <View
          style={{
            borderBottomColor: '#949494',
            borderBottomWidth: 2,
            flex: 1,
          }}
        />
        <FlatList
            data={listData}
            ItemSeparatorComponent={itemSeperatorView}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ServiceListing item={item} />}
            ListEmptyComponent={()=> <Text style={styles.noEvent}>No services are available with the applied filters.</Text>}
          />
        </View>
    </ImageBackground>
  );
}
