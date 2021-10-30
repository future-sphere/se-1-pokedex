import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PokemonsScreen from './screens/Pokemons';
import { StatusBar } from 'expo-status-bar';
import PokemonDetailScreen, { COLORS_MAP } from './screens/PokemonDetail';
import AbilityScreen from './screens/Ability';

const pokemonsStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <pokemonsStack.Navigator>
        <pokemonsStack.Group>
          <pokemonsStack.Screen
            options={{
              title: '🌍 Pokedex',
              headerStyle: {
                backgroundColor: COLORS_MAP.red,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            name='pokemons'
            component={PokemonsScreen}
          />
          <pokemonsStack.Screen
            options={{
              title: 'Ability Details',
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#000',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
            name='abilityDetails'
            component={AbilityScreen}
          />
        </pokemonsStack.Group>
        <pokemonsStack.Group screenOptions={{ presentation: 'modal' }}>
          <pokemonsStack.Screen
            options={{
              title: 'Pokemon Details',
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#000',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
            name='pokemonDetails'
            component={PokemonDetailScreen}
          />
        </pokemonsStack.Group>
      </pokemonsStack.Navigator>
      <StatusBar style='light' />
    </NavigationContainer>
  );
}
