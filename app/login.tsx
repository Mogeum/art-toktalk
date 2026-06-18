import * as React from 'react';
import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeRedirectUri } from 'expo-auth-session';
import { router } from 'expo-router';
import { supabase } from '@/src/lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    if (Platform.OS !== 'web') return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSuccess(true);
        setTimeout(() => router.replace('/'), 1500);
      }
    });
  }, []);

  async function signInWithGoogle() {
    if (Platform.OS === 'web') {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });
      if (error) console.error(error);
      return;
    }

    const redirectUrl = makeRedirectUri({ scheme: 'com.arttoktalk', path: 'auth/callback' });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
      },
    });

    if (error || !data.url) return;

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

    if (result.type === 'success') {
      const url = new URL(result.url);
      const accessToken = url.searchParams.get('access_token');
      const refreshToken = url.searchParams.get('refresh_token');
      if (accessToken && refreshToken) {
        await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        setSuccess(true);
        setTimeout(() => router.replace('/'), 1500);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.top}>
          <Image source={require('../assets/artTokTalk.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.bottom}>
          {success ? (
            <View style={styles.successBanner}>
              <Text style={styles.successText}>로그인 성공!</Text>
            </View>
          ) : (
            <>
              <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
                <Text style={styles.googleButtonText}>Google로 계속하기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.replace('/')}>
                <Text style={styles.skipText}>로그인 없이 둘러보기</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  inner: { flex: 1, paddingHorizontal: 32, justifyContent: 'space-between', paddingVertical: 60 },
  top: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 300, height: 200, marginBottom: 12 },
  bottom: { gap: 16 },
  successBanner: {
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  successText: { color: '#065F46', fontSize: 16, fontWeight: '600' },
  googleButton: {
    backgroundColor: '#111111',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  googleButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  skipText: { textAlign: 'center', fontSize: 14, color: '#9CA3AF' },
});
