import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import ConcoctDrinksScreen from "./ConcoctDrinksScreen";
import ConcoctScreen from "./ConcoctScreen";

const ConcoctStackScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ConcoctScreen" component={ConcoctScreen} />
            <Stack.Screen name="ConcoctDrinksScreen" component={ConcoctDrinksScreen} />
        </Stack.Navigator>
    )
}

export default ConcoctStackScreen