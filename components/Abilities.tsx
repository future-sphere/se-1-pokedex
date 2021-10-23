import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
  console.log(abilities);
  return (
    <View style={styles.container}>
      {abilities?.map((v, i) => (
        <View style={styles.abilityBlock} key={i}>
          <Text style={styles.abilityText}>{v.ability.name}</Text>
        </View>
      ))}
    </View>
  );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  abilityBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 15,
    width: width / 2 - 20,
    borderRadius: 10,
    marginBottom: 10,
    height: 50,
  },
  abilityText: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default Abilities;
