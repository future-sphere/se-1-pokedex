import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PokemonData } from '../screens/Pokemons';
import { isCloseToBottom, zeroFilled } from '../utils';

interface Props {
  data: PokemonData[] | null | undefined;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  page?: number;
  loading?: boolean;
}

const spritePrefix = 'https://img.pokemondb.net/sprites/home/normal/';

const PokemonsGrid = ({ data, setPage, page = 0, loading }: Props) => {
  const navigation = useNavigation();

  const handleScroll = (nativeEvent: NativeScrollEvent) => {
    if (isCloseToBottom(nativeEvent) && setPage && page) {
      setPage(page + 1);
    }
  };

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
      scrollEventThrottle={2000}
      contentContainerStyle={styles.pokemonsContainer}
    >
      {data
        ? data.map((v, i) => {
            const sprite = `${spritePrefix}${v.name}.png`;
            const url = v.url.split('/');
            const number = url[6];
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    'pokemonDetails' as never,
                    {
                      pokemonName: v.name,
                    } as never,
                  )
                }
                style={styles.pokemonContainer}
                key={i}
              >
                <Text style={styles.pokemonName}>{v.name}</Text>
                <Text style={styles.idTag}>#{zeroFilled(number)}</Text>
                <Image style={styles.pokemonSprite} source={{ uri: sprite }} />
              </TouchableOpacity>
            );
          })
        : null}

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading more pokemons...</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  idTag: {
    fontSize: 10,
  },
  pokemonContainer: {
    padding: 15,
    width: width / 2 - 15,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    position: 'relative',
    height: 100,
  },
  pokemonSprite: {
    height: 90,
    width: 90,
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  pokemonName: {
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'capitalize',
  },

  pokemonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 0,
  },
  loadingContainer: {
    paddingVertical: 15,
    textAlign: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default PokemonsGrid;
