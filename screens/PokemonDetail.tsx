import { RouteProp, useNavigation } from '@react-navigation/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Abilities, { Ability, Move } from '../components/Abilities';
import Overview from '../components/Overview';
import Stats from '../components/Stats';
import { zeroFilled } from '../utils';

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

const tabs = [
  {
    title: 'Overview',
    key: 1,
  },
  {
    title: 'Stats',
    key: 2,
  },
  {
    title: 'Abilities',
    key: 3,
  },
];

const PokemonDetailScreen: React.FC<Props> = ({ route }) => {
  const { pokemonName } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState<{
    types: [];
    id: string;
    sprites: any;
    moves: Move[];
    abilities: Ability[];
  } | null>(null);
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  useEffect(() => {
    if (pokemonName) {
      navigation.setOptions({
        title: capitalize(pokemonName),
      });

      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        });
    }
  }, []);

  const handleTabPress = (key: number) => {
    setActiveTab(key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.spriteContainer}>
        <View style={styles.circle} />
        <Image
          style={styles.sprite}
          source={{
            uri: data?.sprites?.other['official-artwork']?.front_default,
          }}
        />
      </View>
      <View style={styles.tagContainer}>
        <Text style={styles.tag}>#{zeroFilled(data ? data.id : 0)}</Text>
      </View>
      <Text style={styles.title}>{capitalize(pokemonName)}</Text>
      <Text>
        Type:{' '}
        {data?.types.length
          ? data?.types.map((v: { type: { name: string; url: string } }, i) => (
              <Text style={{ textTransform: 'capitalize' }} key={i}>
                {v.type.name}
                {i === data.types.length - 1 ? null : ','}{' '}
              </Text>
            ))
          : null}
      </Text>
      <View style={styles.tabContainer}>
        {tabs.map((v) => (
          <Pressable
            onPress={() => handleTabPress(v.key)}
            style={styles.tabButton}
            key={v.key}
          >
            <Text
              style={[
                styles.tabButtonText,
                {
                  fontWeight: activeTab === v.key ? '500' : '300',
                },
              ]}
            >
              {v.title}
            </Text>
            {activeTab === v.key ? <View style={styles.dot} /> : null}
          </Pressable>
        ))}
      </View>
      <View>
        {activeTab === tabs[0].key ? <Overview /> : null}
        {activeTab === tabs[1].key ? <Stats /> : null}
        {activeTab === tabs[2].key ? (
          <Abilities moves={data?.moves} abilities={data?.abilities} />
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(203,234,236)',
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
  },
  tabContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  tabButton: {
    width: '33%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabButtonText: {
    fontWeight: '300',
  },
  tagContainer: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    backgroundColor: 'rgb(167, 204, 205)',
    borderRadius: 20,
    marginVertical: 20,
  },
  tag: {
    fontWeight: '600',
    letterSpacing: 2,
    fontSize: 14,
  },
  title: { fontSize: 38, marginBottom: 20 },
  sprite: {
    height: 300,
    width: 300,
    position: 'absolute',
    bottom: -0,
    left: 20,
  },
  spriteContainer: {
    position: 'relative',
    height: 300,
    width: 300,
    marginTop: 50,
  },
  circle: {
    position: 'absolute',
    left: 20,
    top: 0,
    height: 260,
    width: 260,
    backgroundColor: 'rgb(234,252,255)',
    borderRadius: 150,
  },
});

export default PokemonDetailScreen;
