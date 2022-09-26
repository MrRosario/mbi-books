import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'react-native';
import { HomeStack, FavoriteStack, SearchStack } from 'routes/Stacks';
import Logo from '@assets/Logo.png';
import { Colors } from 'styles';

const Tab = createBottomTabNavigator();
const headerConfig = () => (
    {
      headerTitle: () => <Image source={Logo} />,
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
    }
);
const Routes = () => (
    <NavigationContainer>
        <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                    ? 'home'
                    : 'home-outline';
                } 
                else if (route.name === 'Favorite') {
                    iconName = focused ? 
                        'heart' : 
                        'heart-outline';
                }
                else if (route.name === 'Search') {
                    iconName = focused ? 
                        'ios-search-sharp' : 
                        'search-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarInactiveTintColor: Colors.BLACK,
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeStack} 
                options={headerConfig()}
            />
            <Tab.Screen 
                name="Search" 
                component={SearchStack} 
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen 
                name="Favorite" 
                component={FavoriteStack} 
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
)

export default Routes;