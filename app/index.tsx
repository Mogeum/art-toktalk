import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { MOCK_ARTWORKS } from '@/src/feature/art/mocks';
import Header from '@/src/components/Header';
import ArtCard from '@/app/art/component/ArtCard';

const FILTERS = ['전체', '인상주의', '바로크', '현대미술', '르네상스', '낭만주의'];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>오늘의 추천</Text>
          <Text style={styles.bannerTitle}>빛과 색의 거장들</Text>
          <Text style={styles.bannerSub}>인상주의 화가들이 포착한 순간의 빛</Text>
        </View>
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          style={styles.filterList}
          contentContainerStyle={styles.filterContent}
          scrollEnabled={true}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={[styles.filterChip, index === 0 && styles.filterChipActive]}>
              <Text style={[styles.filterText, index === 0 && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        {MOCK_ARTWORKS.map((artwork) => (
          <ArtCard key={artwork.id} artwork={artwork} />
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', overflow: 'hidden', maxWidth: '100%' },

  banner: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F8F9FF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  bannerLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  bannerTitle: { fontSize: 22, fontWeight: '700', color: '#111111', marginBottom: 4 },
  bannerSub: { fontSize: 13, color: '#6B7280' },

  filterList: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  filterContent: { paddingHorizontal: 16, paddingVertical: 12 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: '#111111' },
  filterText: { fontSize: 13, fontWeight: '500', color: '#6B7280' },
  filterTextActive: { color: '#FFFFFF' },
});
