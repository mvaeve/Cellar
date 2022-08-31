import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import UserScreen from "./UserScreen";
import DrinkDetailScreen from "../homeScreen/DrinkDetailScreen";
const UserStackScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UserScreen" component={UserScreen} />
            <Stack.Screen name="DrinkDetailScreen" component={DrinkDetailScreen} />
        </Stack.Navigator>
    )
}

export default UserStackScreen