import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/Home';
import FavoriteScreen from '@screens/Favorite';
import SearchScreen from '@screens/Search'; 
import DetailsScreen from '@screens/Details';

const Stack = createNativeStackNavigator();

type Props = {
  routeName: string;
  children?: JSX.Element | JSX.Element[];
};

const StackNavigatorContainer: FC<Props> = ({ children, routeName }: Props) => (
  <Stack.Navigator 
    initialRouteName={routeName}
    screenOptions={{
      headerShown: false,
    }}
  >
    {children}
  </Stack.Navigator>
);
const HomeStack = () => (
  <StackNavigatorContainer routeName="HomeScreen" >
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ title: '' }}
    />
    <Stack.Screen
      name="DetailsScreen"
      component={DetailsScreen}
      options={{ title: '' }}
    />
  </StackNavigatorContainer>
);

const SearchStack = () => (
  <StackNavigatorContainer routeName="SearchScreen">
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
    />
    <Stack.Screen
      name="DetailsScreen"
      component={DetailsScreen}
    />
  </StackNavigatorContainer>
);

const FavoriteStack = () => (
  <StackNavigatorContainer routeName="FavoriteScreen">
    <Stack.Screen
      name="FavoriteScreen"
      component={FavoriteScreen}
    />
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
    />
    <Stack.Screen
      name="DetailsScreen"
      component={DetailsScreen}
    />
  </StackNavigatorContainer>
);

export {
  HomeStack,
  SearchStack,
  FavoriteStack
}