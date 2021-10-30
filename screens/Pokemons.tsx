import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import PokemonsGrid from '../components/PokemonsGrid';
import PokeServices from '../services';

const POKEMONS_PER_PAGE = 18;

export interface PokemonData {
  name: string;
  url: string;
}

const PokemonsScreen = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PokemonData[] | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <SafeAreaView />
      <PokemonsGrid
        data={data}
        page={page}
        setPage={setPage}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingTop: 10,
  },
});

export default PokemonsScreen;
