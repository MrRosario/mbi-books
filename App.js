import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import * as SplashScreen from "expo-splash-screen";

import Routes from '@routes';
import { isAndroid } from '@utils/constants';
import fontsSetup from 'setup/fonts';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fontsSetup();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <Routes />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: isAndroid ? StatusBar.currentHeight : 0,
  },
});
