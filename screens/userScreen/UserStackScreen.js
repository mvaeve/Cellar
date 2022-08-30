import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import UserScreen from "./UserScreen";

const UserStackScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UserScreen" component={UserScreen} />
        </Stack.Navigator>
    )
}

export default UserStackScreen