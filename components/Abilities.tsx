import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
}

interface Props {
  abilities?: Ability[];
  moves?: Move[];
}

const Abilities = ({ abilities, moves }: Props) => {
  return (
    <View>
      <Text>This is Abilities</Text>
    </View>
  );
};

export default Abilities;
