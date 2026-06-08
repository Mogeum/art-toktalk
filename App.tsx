import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useState, useEffect } from 'react';
import {MOCK_ARTWORKS} from "@/src/feature/art/mocks";

const FILTERS = ['전체', '인상주의', '바로크', '현대미술', '르네상스', '낭만주의'];

type Artwork = (typeof MOCK_ARTWORKS)[0];
type Hotspot = (typeof MOCK_ARTWORKS)[0]['hotspots'][0];

export default function App() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [imageRatio, setImageRatio] = useState<number>(1);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'hotspot' | 'comment'>('info');
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    if (selectedArtwork) {
      Image.getSize(selectedArtwork.imageUrl, (width, height) => {
        setImageRatio(width / height);
      });
    }
  }, [selectedArtwork]);

  if (selectedArtwork) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />

        {showUI && (
          <View style={styles.detailHeader}>
            <TouchableOpacity
              onPress={() => { setSelectedArtwork(null); setSelectedHotspot(null); setActiveTab('info'); setShowUI(false); }}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareIcon}>↗</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} bounces>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowUI(prev => !prev)}
            style={styles.imageContainer}
          >
            <Image
              source={{ uri: selectedArtwork.imageUrl }}
              style={[styles.detailImage, { aspectRatio: imageRatio }]}
              resizeMode="cover"
            />
            {showUI && selectedArtwork.hotspots.map((hotspot) => (
              <TouchableOpacity
                key={hotspot.id}
                style={[
                  styles.hotspotBtn,
                  { left: `${hotspot.x * 100}%` as any, top: `${hotspot.y * 100}%` as any },
                ]}
                onPress={(e) => { e.stopPropagation(); setSelectedHotspot(hotspot); }}
              >
                <Text style={styles.hotspotIcon}>✔︎</Text>
              </TouchableOpacity>
            ))}
          </TouchableOpacity>

          <View style={styles.detailInfo}>
            <Text style={styles.detailTitle}>{selectedArtwork.title}</Text>
            <Text style={styles.detailArtist}>{selectedArtwork.artist}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>연도</Text>
                <Text style={styles.metaValue}>{selectedArtwork.year}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>재료</Text>
                <Text style={styles.metaValue}>{selectedArtwork.medium}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>크기</Text>
                <Text style={styles.metaValue}>{selectedArtwork.dimensions}</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>소장처</Text>
              <Text style={styles.locationValue}>{selectedArtwork.location}</Text>
            </View>
          </View>

          <View style={styles.tabRow}>
            {(['info', 'hotspot', 'comment'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab === 'info' ? '작품 정보' : tab === 'hotspot' ? `핫스팟 ${selectedArtwork.hotspots.length}` : '댓글'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tabContent}>
            {activeTab === 'info' && (
              <Text style={styles.description}>{selectedArtwork.description}</Text>
            )}
            {activeTab === 'hotspot' && (
              <View>
                {selectedArtwork.hotspots.length === 0 ? (
                  <Text style={styles.emptyText}>등록된 핫스팟이 없습니다.</Text>
                ) : (
                  selectedArtwork.hotspots.map((h) => (
                    <TouchableOpacity
                      key={h.id}
                      style={styles.hotspotCard}
                      onPress={() => setSelectedHotspot(h)}
                    >
                      <View style={styles.hotspotCardIcon}>
                        <Text style={{ fontSize: 16 }}>❕</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.hotspotCardTitle}>{h.title}</Text>
                        <Text style={styles.hotspotCardSummary} numberOfLines={2}>{h.summary}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
            {activeTab === 'comment' && (
              <Text style={styles.emptyText}>첫 번째 감상을 남겨보세요.</Text>
            )}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>

        {selectedHotspot && (
          <View style={styles.bottomSheetOverlay}>
            <TouchableOpacity style={styles.dimArea} onPress={() => setSelectedHotspot(null)} />
            <View style={styles.bottomSheet}>
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>{selectedHotspot.title}</Text>
              <Text style={styles.sheetBody}>{selectedHotspot.summary}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedHotspot(null)}>
                <Text style={styles.closeText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>아트 톡톡</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

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
            <TouchableOpacity
              style={[styles.filterChip, index === 0 && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, index === 0 && styles.filterTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {MOCK_ARTWORKS.map((artwork) => (
          <TouchableOpacity
            key={artwork.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => setSelectedArtwork(artwork)}
          >
            <Image
              source={{ uri: artwork.imageUrl }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{artwork.title}</Text>
              <Text style={styles.cardArtist}>{artwork.artist} · {artwork.year}</Text>
              <View style={styles.tagRow}>
                {artwork.tags.map((tag) => (
                  <View key={tag.id} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', overflow: 'hidden', maxWidth: '100%' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111111', letterSpacing: -0.5 },
  searchButton: { padding: 4 },
  searchIcon: { fontSize: 20 },

  banner: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F8F9FF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  bannerLabel: { fontSize: 11, fontWeight: '600', color: '#2563EB', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  bannerTitle: { fontSize: 22, fontWeight: '700', color: '#111111', marginBottom: 4 },
  bannerSub: { fontSize: 13, color: '#6B7280' },

  filterList: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  filterContent: { paddingHorizontal: 16, paddingVertical: 12 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, backgroundColor: '#F3F4F6', marginRight: 8 },
  filterChipActive: { backgroundColor: '#111111' },
  filterText: { fontSize: 13, fontWeight: '500', color: '#6B7280' },
  filterTextActive: { color: '#FFFFFF' },

  card: { marginBottom: 1, backgroundColor: '#FFFFFF', borderBottomWidth: 8, borderBottomColor: '#F3F4F6' },
  cardImage: { width: '100%', aspectRatio: 4 / 3, backgroundColor: '#F3F4F6' },
  cardInfo: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#111111', marginBottom: 4 },
  cardArtist: { fontSize: 14, color: '#6B7280', marginBottom: 10 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#EFF6FF', borderRadius: 12 },
  tagText: { fontSize: 12, color: '#2563EB', fontWeight: '500' },

  detailHeader: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    zIndex: 10,
  },
  backButton: { padding: 8 },
  backIcon: { fontSize: 22, color: '#111111' },
  shareButton: { padding: 8 },
  shareIcon: { fontSize: 20, color: '#111111' },

  scrollHint: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scrollHintText: { color: '#FFFFFF', fontSize: 13, fontWeight: '500' },

  imageContainer: { position: 'relative', width: '100%' },
  detailImage: { width: '100%', height: 'auto', backgroundColor: '#F3F4F6' },
  hotspotBtn: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -16,
    marginTop: -16,
  },
  hotspotIcon: { fontSize: 20, color: 'pink' },

  detailInfo: { padding: 20 },
  detailTitle: { fontSize: 24, fontWeight: '700', color: '#111111', marginBottom: 4 },
  detailArtist: { fontSize: 16, color: '#2563EB', fontWeight: '500', marginBottom: 20 },
  metaRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FF', borderRadius: 12, padding: 16, marginBottom: 14 },
  metaItem: { flex: 1, alignItems: 'center' },
  metaLabel: { fontSize: 11, color: '#6B7280', marginBottom: 4 },
  metaValue: { fontSize: 13, fontWeight: '600', color: '#111111', textAlign: 'center' },
  metaDivider: { width: 1, height: 32, backgroundColor: '#E5E7EB' },
  locationRow: { flexDirection: 'row', gap: 8 },
  locationLabel: { fontSize: 13, color: '#6B7280' },
  locationValue: { fontSize: 13, color: '#111111', fontWeight: '500' },

  tabRow: { flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F3F4F6' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#111111' },
  tabText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  tabTextActive: { color: '#111111', fontWeight: '700' },
  tabContent: { padding: 20 },
  description: { fontSize: 15, color: '#374151', lineHeight: 26 },
  emptyText: { fontSize: 14, color: '#9CA3AF', textAlign: 'center', paddingVertical: 40 },

  hotspotCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  hotspotCardIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center' },
  hotspotCardTitle: { fontSize: 15, fontWeight: '600', color: '#111111', marginBottom: 4 },
  hotspotCardSummary: { fontSize: 13, color: '#6B7280', lineHeight: 20 },

  bottomSheetOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  dimArea: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  bottomSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 40 },
  sheetHandle: { width: 40, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 20, fontWeight: '700', color: '#111111', marginBottom: 12 },
  sheetBody: { fontSize: 15, color: '#374151', lineHeight: 26, marginBottom: 24 },
  closeButton: { backgroundColor: '#111111', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  closeText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
});