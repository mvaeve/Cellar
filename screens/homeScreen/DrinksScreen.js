import React, { useEffect, useState, useCallback } from "react"
import { StyleSheet, Text, View, Image, Animated, ScrollView } from "react-native";
import { ThemeContext } from "../../themes/theme-context";
import CustomAppbar from '../components/CustomAppbar';
import { Utils } from "../../helpers";
import { TableView, Cell } from 'react-native-tableview-simple'
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/core';

const DrinksScreen = ({ route }) => {
  const { category } = route.params;
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  SplashScreen.preventAutoHideAsync();
  const navigation = useNavigation();

  const [drinksArray, setDrinksArray] = useState([]);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {

    const getDrinksListSortedByCat = async () => {

      const endpoint = "filter.php?c=" + category;

      const res = await Utils.getApi(endpoint, {}, true);
      res.drinks.forEach((obj) => {
        setDrinksArray((prevArray) => [
          ...prevArray,
          {
            drinkID: obj.idDrink,
            drinkName: obj.strDrink,
            drinkImg: obj.strDrinkThumb
          }

        ]);
      });
      setAppIsReady(true);
    }
    //reset
    setDrinksArray([]);
    setAppIsReady(false);
    getDrinksListSortedByCat();

  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const onDrinksPressed = (drink) => {
    navigation.navigate("DrinkDetailScreen",{ drinkName: drink.drinkName ,drinkID: drink.drinkID })
  }

  return (

    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]} onLayout={onLayoutRootView}>
      <CustomAppbar title={category} />
      <ScrollView style={styles.scrollView}>
        <TableView>
          {drinksArray.map((drinks, i) => {
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

  cellPrice: {
    justifyContent: 'center',
  },
  titleText: {
    marginVertical: 10,
    fontSize: 22,
    flexShrink: 1,
  },
  priceText: {
    fontSize: 16,

  },
})

export default DrinksScreen