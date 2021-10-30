import { RouteProp } from '@react-navigation/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import PokemonsGrid from '../components/PokemonsGrid';
import { PokemonData } from './Pokemons';

type ParamsList = {
  abilityDetails: {
    abilityUrl: string;
  };
};

interface Props {
  route: RouteProp<ParamsList, 'abilityDetails'>;
}

interface Language {
  name: string;
  url: string;
}

interface AbilityResponse {
  effect_entries: [
    {
      effect: string;
      language: Language;
      short_effect: string;
    },
  ];
  names: [
    {
      language: Language;
      name: string;
    },
  ];
  pokemon: [
    {
      pokemon: PokemonData;
    },
  ];
}

const languages = [
  {
    key: 'ja-Hrkt',
    icon: '🇯🇵',
  },
  {
    key: 'ko',
    icon: '🇰🇷',
  },
  {
    key: 'zh-Hans',
    icon: '🇨🇳',
  },
  {
    key: 'en',
    icon: '🇺🇸',
  },
];

const AbilityScreen = (props: Props) => {
  const url = props.route.params.abilityUrl;
  const [data, setData] = useState<AbilityResponse | null>(null);

  useEffect(() => {
    if (url) {
      axios.get(url).then((response) => {
        setData(response.data);
      });
    }
  }, []);

  let abilityShortDescription, abilityLongDescription;

  if (data) {
    const entry = data.effect_entries.find((v) => {
      return v.language.name === 'en';
    });

    abilityShortDescription = entry?.short_effect;
    abilityLongDescription = entry?.effect;
  }

  return (
    <View>
      <View style={styles.blockContainer}>
        <Text style={styles.shortDesc}>{abilityShortDescription}</Text>
        <Text style={styles.longDesc}>{abilityLongDescription}</Text>
      </View>
      <View style={styles.languageContainer}>
        {languages.map((v) => {
          const name = data?.names.find((w) => w.language.name === v.key);
          return (
            <View style={styles.languageBlock} key={v.key}>
              <Text>{v.icon}</Text>
              <Text style={styles.languageText}>{name?.name}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.blockContainer}>
        <Text>{data?.pokemon?.length} Pokemons that also has this ability</Text>
      </View>
      <PokemonsGrid data={data?.pokemon.map((v) => v.pokemon)} />
    </View>
  );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  languageContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  languageBlock: {
    width: width / 4 - 12.5,
    marginRight: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  languageText: {
    fontWeight: '600',
    marginTop: 5,
    fontSize: 14,
  },
  blockContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  longDesc: {
    fontSize: 14,
    fontWeight: '300',
  },
  shortDesc: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
});

export default AbilityScreen;
