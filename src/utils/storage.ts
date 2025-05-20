import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Character {
  id: number;
  name: string;
  image: string;
}

const FAVORITES_KEY = 'FAVORITE_CHARACTERS';

export const getFavorites = async (): Promise<Character[]> => {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
};

export const addFavorite = async (character: Character) => {
  const favorites = await getFavorites();
  const updated = [...favorites, character];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const removeFavorite = async (id: number) => {
  const favorites = await getFavorites();
  const updated = favorites.filter((item) => item.id !== id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const isFavorite = async (id: number): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some((item) => item.id === id);
};