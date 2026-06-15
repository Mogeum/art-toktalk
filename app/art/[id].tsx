import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';

import { MOCK_ARTWORKS } from '@/src/feature/art/mocks';

type Hotspot = (typeof MOCK_ARTWORKS)[0]['hotspots'][0];

export default function ArtDetail() {
  const { id } = useLocalSearchParams();
  const artwork = MOCK_ARTWORKS.find((a) => a.id === Number(id));
  const [imageRatio, setImageRatio] = useState<number>(1);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'hotspot' | 'comment'>('info');
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    if (artwork) {
      Image.getSize(artwork.imageUrl, (width, height) => {
        setImageRatio(width / height);
      });
    }
  }, [artwork]);

  if (artwork) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />

        {showUI && (
          <View style={styles.detailHeader}>
            <TouchableOpacity
              onPress={() => {
                router.back();
                setSelectedHotspot(null);
                setActiveTab('info');
              }}
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
          <TouchableOpacity activeOpacity={1} onPress={() => setShowUI((prev) => !prev)} style={styles.imageContainer}>
            <Image
              source={{ uri: artwork.imageUrl }}
              style={[styles.detailImage, { aspectRatio: imageRatio }]}
              resizeMode="cover"
            />
            {showUI &&
              artwork.hotspots.map((hotspot) => (
                <TouchableOpacity
                  key={hotspot.id}
                  style={[styles.hotspotBtn, { left: `${hotspot.x * 100}%` as any, top: `${hotspot.y * 100}%` as any }]}
                  onPress={(e) => {
                    e.stopPropagation();
                    setSelectedHotspot(hotspot);
                  }}
                >
                  <Text style={styles.hotspotIcon}>✔︎</Text>
                </TouchableOpacity>
              ))}
          </TouchableOpacity>

          <View style={styles.detailInfo}>
            <Text style={styles.detailTitle}>{artwork.title}</Text>
            <Text style={styles.detailArtist}>{artwork.artist}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>연도</Text>
                <Text style={styles.metaValue}>{artwork.year}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>재료</Text>
                <Text style={styles.metaValue}>{artwork.medium}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>크기</Text>
                <Text style={styles.metaValue}>{artwork.dimensions}</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>소장처</Text>
              <Text style={styles.locationValue}>{artwork.location}</Text>
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
                  {tab === 'info' ? '작품 정보' : tab === 'hotspot' ? `핫스팟 (${artwork.hotspots.length})` : '댓글'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tabContent}>
            {activeTab === 'info' && <Text style={styles.description}>{artwork.description}</Text>}
            {activeTab === 'hotspot' && (
              <View>
                {artwork.hotspots.length === 0 ? (
                  <Text style={styles.emptyText}>등록된 핫스팟이 없습니다.</Text>
                ) : (
                  artwork.hotspots.map((h) => (
                    <TouchableOpacity key={h.id} style={styles.hotspotCard} onPress={() => setSelectedHotspot(h)}>
                      <View style={styles.hotspotCardIcon}>
                        <Text style={{ fontSize: 16 }}>❕</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.hotspotCardTitle}>{h.title}</Text>
                        <Text style={styles.hotspotCardSummary} numberOfLines={2}>
                          {h.summary}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
            {activeTab === 'comment' && <Text style={styles.emptyText}>첫 번째 감상을 남겨보세요.</Text>}
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
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', overflow: 'hidden', maxWidth: '100%' },
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
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

  hotspotCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  hotspotCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotspotCardTitle: { fontSize: 15, fontWeight: '600', color: '#111111', marginBottom: 4 },
  hotspotCardSummary: { fontSize: 13, color: '#6B7280', lineHeight: 20 },

  bottomSheetOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  dimArea: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetTitle: { fontSize: 20, fontWeight: '700', color: '#111111', marginBottom: 12 },
  sheetBody: { fontSize: 15, color: '#374151', lineHeight: 26, marginBottom: 24 },
  closeButton: { backgroundColor: '#111111', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  closeText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
});
