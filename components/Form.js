import { View, Text } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import FormLabel from './FormLabel';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const FormInputGroup = ({ children }) => {
  return (
    <Animatable.View animation="fadeInUp" style={tw`my-3`}>
      {children}
    </Animatable.View>
  );
};

export default function Form(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const screen = route.name;
  const primaryButtonText = screen === 'Register' ? 'Register' : 'Login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = () => {
    props.onSubmit(email, password);
    console.log('Login form submitted');
  };

  const handleRegisterSubmit = () => {
    props.onSubmit(email, password);
    console.log('Register form submitted');
  };

  const handlePrimaryButtonPress = () => {
    if (screen === 'Register') {
      handleRegisterSubmit(); // Call register submit function if in Register form
    } else {
      handleLoginSubmit(); // Call login submit function if in Login form
    }
  };

  const handleSecondaryButtonPress = () => {
    navigation.navigate(screen === 'Register' ? 'Home' : 'Register');
  };

  return (
    <View style={{ backgroundColor: '#7FB3D5' }}>
    <View>
      <FormInputGroup>
        <FormLabel text="Email" />
        <FormInput onChangeText={(text) => setEmail(text)} value={email} />
        {!!props.errorEmail && (
          <Text style={tw`p-1 my-2 text-red-700 rounded-lg`}>
            {props.errorEmail}
          </Text>
        )}
      </FormInputGroup>

      <FormInputGroup>
        <FormLabel text="Password" />
        <FormInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </FormInputGroup>

      {!!props.error && (
        <Text style={tw`p-1 my-2 text-red-700 rounded-lg`}>
          {props.error}
        </Text>
      )}

      {screen === 'Login' && !!props.errorPassword && (
        <Text style={tw`p-1 my-2 text-red-700 rounded-lg`}>
          {props.errorPassword}
        </Text>
      )}

      <FormButton
        primary={true}
        onPress={handlePrimaryButtonPress}
        text={primaryButtonText}
      />

      <FormButton
        primary={false}
        onPress={handleSecondaryButtonPress}
        text={screen === 'Register' ? 'Login' : 'Register'}
      />

      <FormButton
      noBorder={true}
        text="Forgot Password?"
        onPress={() => {
          navigation.navigate('PasswordReset');
        }}
      />
    </View>
    </View>
  );
}
