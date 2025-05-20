import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { Character } from '../utils/storage';
import { colors } from '../styles/colors';

interface Props {
  character: Character;
  isFav: boolean;
  onToggleFav: () => void;
}

export default function CharacterCard({ character, isFav, onToggleFav }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Button
        title={isFav ? 'Desfavoritar' : 'Favoritar'}
        color={isFav ? colors.secondary : colors.primary}
        onPress={onToggleFav}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
});