import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

export default function SignUp() {
  const handleSignUp = () => {
    // TODO: Implement sign up logic
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Fill your information below or register with your social account</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#989898" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#989898"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#989898" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#989898"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#989898" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#989898"
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#989898" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#989898"
                secureTextEntry
              />
            </View>

            <View style={styles.termsContainer}>
              <TouchableOpacity style={styles.checkbox}>
                <Ionicons name="checkmark" size={16} color="white" />
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree with the <Text style={styles.termsLink}>Terms & Conditions</Text> and 
                <Text style={styles.termsLink}> Privacy Policy</Text>
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.signUpButton}
              onPress={handleSignUp}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity>
                  <Text style={styles.signInLink}>Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or sign up with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-twitter" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#989898',
    lineHeight: 20,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252A32',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    color: 'white',
    fontSize: 14,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#D17842',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    flex: 1,
    color: '#989898',
    fontSize: 12,
    lineHeight: 16,
  },
  termsLink: {
    color: '#D17842',
  },
  signUpButton: {
    backgroundColor: '#D17842',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  signInText: {
    color: '#989898',
    fontSize: 14,
  },
  signInLink: {
    color: '#D17842',
    fontSize: 14,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#252A32',
  },
  dividerText: {
    color: '#989898',
    fontSize: 12,
    marginHorizontal: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#252A32',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
