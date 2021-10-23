import { useNavigation } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PokeServices from '../services';
import { zeroFilled } from '../utils';
interface Props {}

const POKEMONS_PER_PAGE = 18;
const spritePrefix = 'https://img.pokemondb.net/sprites/home/normal/';

interface PokemonData {
  name: string;
  url: string;
}

const isCloseToBottom = (nativeEvent: NativeScrollEvent) => {
  const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const PokemonsScreen = (props: Props) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PokemonData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    const response = await PokeServices.getPokemons(
      (page - 1) * POKEMONS_PER_PAGE,
      POKEMONS_PER_PAGE,
    );
    const newPokemons = response.data.results;
    const nextData = data ? [...data, ...newPokemons] : newPokemons;

    setData(nextData);
    setLoading(false);
  };

  const handleScroll = (nativeEvent: NativeScrollEvent) => {
    if (isCloseToBottom(nativeEvent)) {
      setPage(page + 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <SafeAreaView />
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
                  <Image
                    style={styles.pokemonSprite}
                    source={{ uri: sprite }}
                  />
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
    </View>
  );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  idTag: {
    fontSize: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pokemonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
  },
  pokemonContainer: {
    padding: 15,
    width: width / 2 - 15,
    borderRadius: 20,
    backgroundColor: '#eee',
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

export default PokemonsScreen;
