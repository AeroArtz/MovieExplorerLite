import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import SearchScreen from './screens/SearchScreen';
import Onboarding from './screens/Onboarding';
import { COLORS } from './constants/Colors';

export default function App() {
  const Stack = new createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* Setting header shown to true to allow navigation back to home */}
        <Stack.Screen name='Onboarding' component={Onboarding} options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.darkBgColor
          },
        }}>
        </Stack.Screen>

        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}>

        </Stack.Screen>

        <Stack.Screen name='SearchScreen' component={SearchScreen} options={{headerShown:false}}>

        </Stack.Screen>

        


      </Stack.Navigator>
    </NavigationContainer>

  );
}


