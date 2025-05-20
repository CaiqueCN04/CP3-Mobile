import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet, Text } from 'react-native';
import CharacterCard from '../components/CharactersCard';
import { getFavorites, removeFavorite, Character } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { colors } from '../styles/colors';

export default function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Favorites'>>();
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const handleRemove = async (character: Character) => {
    await removeFavorite(character.id);
    loadFavorites();
  };

  return (
    <View style={styles.container}>
      <Button title="Voltar para Home" onPress={() => navigation.goBack()} color={colors.primary} />
      <Text style={styles.title}>Favoritos:</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            isFav={true}
            onToggleFav={() => handleRemove(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.background,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: colors.secondary,
  },
});