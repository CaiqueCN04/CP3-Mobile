import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import CharacterCard from '../components/CharactersCard';
import { Character, getFavorites, addFavorite, removeFavorite } from '../utils/storage';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { colors } from '../styles/colors';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const initialPage = route.params?.page || 1;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [page, setPage] = useState(initialPage);
  const [inputPage, setInputPage] = useState('');

  useEffect(() => {
    setPage(initialPage);
  }, [route.params]);

  useEffect(() => {
    fetchCharacters();
    loadFavorites();
  }, [page]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      setCharacters(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar personagens', error);
    }
  };

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const isFav = (id: number) => favorites.some((f) => f.id === id);

  const toggleFavorite = async (character: Character) => {
    if (isFav(character.id)) {
      await removeFavorite(character.id);
    } else {
      await addFavorite(character);
    }
    loadFavorites();
  };

  const goToPage = () => {
    const pageNumber = Number(inputPage);
    if (!isNaN(pageNumber) && pageNumber > 0) {
      navigation.replace('Home', { page: pageNumber });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Ir para Favoritos" onPress={() => navigation.navigate('Favorites')} color={colors.primary} />
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            isFav={isFav(item.id)}
            onToggleFav={() => toggleFavorite(item)}
          />
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a página"
        value={inputPage}
        onChangeText={setInputPage}
        keyboardType="numeric"
        placeholderTextColor={colors.text}
      />
      <Button title="Ir para página" onPress={goToPage} color={colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.background,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    marginVertical: 10,
    borderRadius: 4,
    color: colors.text,
  },
});