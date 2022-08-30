import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import CellarHome from "./CellarHome";
import DrinksScreen from "./DrinksScreen";
import DrinkDetailScreen from './DrinkDetailScreen';
const HomeStackScreen = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CellarHome" component={CellarHome} />
            <Stack.Screen name="DrinksScreen" component={DrinksScreen} />
            <Stack.Screen name="DrinkDetailScreen" component={DrinkDetailScreen} />
        </Stack.Navigator>
  )
}

export default HomeStackScreen