import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  I18nManager,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {RootStackParamList} from '../App';
import LinearGradient from 'react-native-linear-gradient';
// Force RTL layout if not already set
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Group.png')} // Replace with your background image
      style={styles.background}
      resizeMode="cover">
      <LinearGradient
        colors={['#19C7D8', '#139097']} // Use alpha for opacity
        locations={[0.57, 0.86]}
        style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Logo + App Name */}
            <View style={styles.header}>
              <Image
                source={require('../assets/Layer_1.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Image
                source={require('../assets/textimage.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Login Box */}
            <View style={styles.loginBox}>
              <TextInput
                placeholder="اسم المستخدم"
                placeholderTextColor="#999"
                style={styles.input}
              />
              <TextInput
                placeholder="كلمة المرور"
                placeholderTextColor="#999"
                secureTextEntry
                style={styles.input}
              />
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>نسيت كلمة المرور</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}>
                <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 220,
    height: 80,
  },
  appNameArabic: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000',
  },
  appNameEnglish: {
    fontSize: 45,
    color: '#000',
    letterSpacing: 2,
    marginBottom: 10,
  },
  slogan: {
    fontSize: 40,
    color: '#000',
    marginBottom: 20,
  },
  loginBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 15,
    color: '#000',
  },
  forgotPassword: {
    color: '#00BCD4',
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  loginButton: {
    backgroundColor: '#00BCD4',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginScreen;
