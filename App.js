import { ThemeProvider } from './themes/theme-context';
import { ThemeContext } from "./themes/theme-context";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import HomeStackScreen from './screens/homeScreen/HomeStackScreen';
import UserStackScreen from './screens/userScreen/UserStackScreen';
import ConcoctStackScreen from './screens/concoctScreen/ConcoctStackScreen';

export default function App() {
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const Tab = createBottomTabNavigator();
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'beer'
                  : 'beer-outline';
              } else if (route.name === 'User') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else if (route.name === 'Concoct') {
                iconName = focused ? 'color-wand' : 'color-wand-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.iconColor,
            tabBarInactiveTintColor: 'white',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: { backgroundColor: theme.backgroundCard },
          
          })}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Concoct" component={ConcoctStackScreen} />
          <Tab.Screen name="User" component={UserStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}