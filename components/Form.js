import { View } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import FormLabel from './FormLabel';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { useNavigation, useRoute } from '@react-navigation/native';

const FormInputGroup = ({ children }) => {
  return (
    <View style={tw`my-3`}>
      {children}
    </View>
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
    props.onSubmit(email,password);
    console.log('Login form submitted');
  };

  const handleRegisterSubmit = () => {
    // Submit function for Register form
    console.log('Register form submitted');
  };

  const handlePrimaryButtonPress = () => {
    if (screen === 'Register') {
      handleRegisterSubmit(); // Call register submit function if in Register form
    } else {
      handleLoginSubmit(); // Call login submit function if in Login form
    }
    // console.log("nice it")
  };

  const handleSecondaryButtonPress = () => {
    navigation.navigate(screen === 'Register' ? 'Home' : 'Register');
  };

  return (
    <View>
      <FormInputGroup>
        <FormLabel text="Email" />
        <FormInput
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </FormInputGroup>

      <FormInputGroup>
        <FormLabel text="Password" />
        <FormInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </FormInputGroup>

      <FormButton
        primary={true}
        onPress={handlePrimaryButtonPress}
        // onPress={() => {
        //   // console.log("nice it")
        //   handlePrimaryButtonPress()
        // }}
        text={primaryButtonText}
      />

      <FormButton
        primary={false}
        onPress={handleSecondaryButtonPress}
        text={screen === 'Register' ? 'Login' : 'Register'}
      />
    </View>
  );
}

