import { RouteProp } from '@react-navigation/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ParamsList = {
  abilityDetails: {
    abilityUrl: string;
  };
};

interface Props {
  route: RouteProp<ParamsList, 'abilityDetails'>;
}

interface AbilityResponse {
  effect_entries: [
    {
      effect: string;
      language: {
        name: string;
        url: string;
      };
      short_effect: string;
    },
  ];
}

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

  console.log(abilityShortDescription);
  console.log(abilityLongDescription);

  return (
    <View>
      <View style={styles.blockContainer}>
        <Text style={styles.shortDesc}>{abilityShortDescription}</Text>
        <Text style={styles.longDesc}>{abilityLongDescription}</Text>
      </View>
      <Text>Ability Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
