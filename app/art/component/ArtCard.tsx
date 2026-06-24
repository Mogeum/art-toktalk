import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Art } from '@/src/feature/art/models';

export default function ArtCard({ artwork }: { artwork: Art }) {
  return (
    <TouchableOpacity
      key={artwork.id}
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => router.push(`/art/${artwork.id}`)}
    >
      <Image source={{ uri: artwork.imageUrl }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{artwork.title}</Text>
        <Text style={styles.cardArtist}>
          {artwork.artist} · {artwork.year}
        </Text>
        <View style={styles.tagRow}>
          {artwork.tags.map((tag) => (
            <View key={tag.id} style={styles.tag}>
              <Text style={styles.tagText}>#{tag.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', overflow: 'hidden', maxWidth: '100%' },
  card: { marginBottom: 1, backgroundColor: '#FFFFFF', borderBottomWidth: 8, borderBottomColor: '#F3F4F6' },
  cardImage: { width: '100%', aspectRatio: 4 / 3, backgroundColor: '#F3F4F6' },
  cardInfo: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#111111', marginBottom: 4 },
  cardArtist: { fontSize: 14, color: '#6B7280', marginBottom: 10 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#EFF6FF', borderRadius: 12 },
  tagText: { fontSize: 12, color: '#2563EB', fontWeight: '500' },
});
