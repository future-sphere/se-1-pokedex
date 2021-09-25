import { RouteProp, useNavigation } from '@react-navigation/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type ParamsList = {
  pokemonDetails: {
    pokemonName: string;
  };
};

interface Props {
  route: RouteProp<ParamsList, 'pokemonDetails'>;
}

export const COLORS_MAP: Record<string, string> = {
  black: '#000',
  blue: '#0A285F',
  brown: '#D5A100',
  gray: '#DFDFDF',
  green: '#4DAD5B',
  pink: '#f5d9e2',
  purple: '#855AC9',
  red: '#ee1515',
  white: '#fff',
  yellow: '#FFCC00',
};

const capitalize = (name: string): string =>
  name[0].toUpperCase() + name.slice(1);

const PokemonDetailScreen: React.FC<Props> = ({ route }) => {
  const { pokemonName } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (pokemonName) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
        .then((response) => {
          const color = response.data.color.name;
          const lightBackground = ['white', 'yellow', 'pink'];
          const tintColor = lightBackground.includes(color) ? 'black' : 'white';
          navigation.setOptions({
            title: capitalize(pokemonName),
            headerStyle: {
              backgroundColor: COLORS_MAP[color],
              opacity: 0.1,
            },
            headerTintColor: tintColor,
          });

          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => {
              setData(response.data);
            });
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capitalize(pokemonName)}</Text>
      <Image
        style={styles.sprite}
        source={{
          uri: data?.sprites?.other['official-artwork']?.front_default,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  title: { fontSize: 38 },
  sprite: {
    height: 300,
    width: 300,
  },
});

export default PokemonDetailScreen;
