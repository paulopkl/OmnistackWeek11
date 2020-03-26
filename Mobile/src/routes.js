import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents/index';
import Detail from './pages/Detail/index';

export default function Routes() {

    const screen = {
        headerShown: false // Tirar cabeçalho
    }

    return(
        <NavigationContainer>

            <AppStack.Navigator screenOptions={screen} initialRouteName={Incidents}>
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />  
            </AppStack.Navigator>

        </NavigationContainer>
    );
}