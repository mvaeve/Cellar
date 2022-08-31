import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeContext } from "../../themes/theme-context";
import { TableView, Cell } from 'react-native-tableview-simple'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useIsFocused, useNavigation } from "@react-navigation/native";

//shall be favourites screen for now

const UserScreen = () => {
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const isFocused = useIsFocused()
  const navigation = useNavigation();

  const [favourites, setFavourites] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    const storeFav = async () => {
      const keys = await AsyncStorage.getAllKeys();
      var i = 0;
      while (i < keys.length) {
        if (!onlyNumbers(keys[i])) {
          keys.splice(i, 1);
        } else {
          ++i;
        }
      }
      const value = await AsyncStorage.multiGet(keys);
      value.map((fav) => {
        let parsedFav = JSON.parse(fav[1]);
        setFavourites((prevFav) => [...prevFav, parsedFav]);
      });
    };
    setFavourites([])
    storeFav()
    console.log(favourites)

  }, [state, isFocused])
  
  const onlyNumbers = (str) => {
    return /^[0-9]+$/.test(str);
  };

  const favPressed = (drink) => {
    Alert.alert(
      "Remove favourite",
      `Are you sure you want to remove ${drink.drinkName} as favourite?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          AsyncStorage.removeItem(drink.drinkID);
          setState(!state);

          }
        }
      ]
    );
  }
  const onDrinksPressed = (drinks) => {
    navigation.navigate("DrinkDetailScreen",{ drinkName: drinks.drinkName ,drinkID: drinks.drinkID })
  }
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, { color: theme.color }]}>My favourite drinks</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <TableView>
          {favourites.map((drinks, i) => {
            return (
              <Cell
                onPress={() => { onDrinksPressed(drinks) }}
                key={i}
                contentContainerStyle={{ height: 100, backgroundColor: theme.backgroundCard }}
                cellContentView={
                  <View style={[styles.homeCell, { backgroundColor: theme.backgroundCard }]}>
                    <View style={styles.imageContainer}>
                      <Image style={styles.cellImage} source={{ uri: drinks['drinkImg'] }} />
                    </View>

                    <View style={styles.cellCol}>
                      <Text style={[styles.titleText, { color: theme.color }]}>{drinks['drinkName']}</Text>

                    </View>
                    <Ionicons
                      style={styles.fav}
                      name="heart-sharp"
                      size="36"
                      color="red"
                      onPress={() => { favPressed(drinks) }} />
                  </View>
                }>

              </Cell>
            )
          })}
        </TableView>
      </ScrollView>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  titleText: {

    fontSize: 20,

  },
  scrollView: {
  },
  homeCell: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',

  },
  cellImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    borderRadius: 10,


  },
  imageContainer: {
    height: '100%',
    width: '25%',
    justifyContent: 'center',
    marginRight: 15
  },

  cellCol: {
    flexDirection: 'column',
    width: '80%',
    flex: 1
  },

  
  titleText: {
    marginVertical: 10,
    fontSize: 22,
    flexShrink: 1,
  },

  fav: {
    top: 30,
    left: 8
  }
})

export default UserScreen