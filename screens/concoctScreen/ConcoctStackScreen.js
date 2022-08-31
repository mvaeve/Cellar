import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import ConcoctDrinksScreen from "./ConcoctDrinksScreen";
import ConcoctScreen from "./ConcoctScreen";
import DrinkDetailScreen from "../homeScreen/DrinkDetailScreen";
const ConcoctStackScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ConcoctScreen" component={ConcoctScreen} />
            <Stack.Screen name="ConcoctDrinksScreen" component={ConcoctDrinksScreen} />
            <Stack.Screen name="DrinkDetailScreen" component={DrinkDetailScreen} />
        </Stack.Navigator>
    )
}

export default ConcoctStackScreen