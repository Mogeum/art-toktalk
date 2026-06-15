import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>아트 톡톡</Text>
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchIcon}>🔍</Text>
      </TouchableOpacity>
    </View>
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
});
