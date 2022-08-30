import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export function storeData(key, value) {
  const jsonValue = JSON.stringify(value);
  try {
    AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    //console.log("storeData error: " + e)
  }
}

export async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    //console.log("getData error: " + e)
  }
}


export async function getApi(endpoint, parameters = {}) {
  const url = "http://www.thecocktaildb.com/api/json/v1/1/" + endpoint;
  let params = {};
  params.params = parameters;
  try {
    const res = await axios.get(url, params);
    return res.data;
  } catch (e) {
    console.log("[getApi error]")
    console.log("url: " + url);
    console.log("params: " + JSON.stringify(params));
    console.log(e);
  }
}