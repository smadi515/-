import React from 'react';
import {SafeAreaView, View, Image, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Group7.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 10,
  },
  arabicText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  englishText: {
    fontSize: 30,
    letterSpacing: 4,
    color: '#000',
  },
});

export default SplashScreen;
