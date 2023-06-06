import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import bcrypt from 'react-native-bcrypt';
import store from './store';
import myImage from './assets/user.png';

const Connexion = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [errone, setErrone] = useState(false);
  const [comptes, setComptes] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSubmit = async () => {
    const matched = comptes.filter((compte) => {
      return compte.email.toLowerCase() == email.toLowerCase();
    });
    let selectedCompte;
    if (matched.length > 0) {
      selectedCompte = matched[0];
      const hashedMotDePasse = selectedCompte.password;
      const comparedPass = bcrypt.compareSync(motDePasse, hashedMotDePasse);
      if (comparedPass) {
        handleSetLoggedUserId(selectedCompte._id);
        navigation.navigate('Home');
        setErrone(false);
      } else setErrone(true);
    } else setErrone(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    let valid = !validateEmail(value) || motDePasse === '';
    setIsButtonDisabled(valid);
    setErrone(valid);
  };

  const handlePasswordChange = (value) => {
    setMotDePasse(value);
    let valid = email === '' || !validateEmail(email) || value === '';
    setIsButtonDisabled(valid);
    setErrone(valid);
  };

  const handleSetLoggedUserId = (userId) => {
    const action = {
      type: 'SET_LOGGED_USER_ID',
      payload: userId,
    };
    store.dispatch(action);
  };

  useEffect(() => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        setComptes([...data]);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titelcont}>
        <Text style={styles.title}>Log In</Text>
      </View>
      <Image style={styles.img} source={myImage} />
      <View style={styles.totalpage}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={errone ? styles.error_input : styles.input}
          value={email}
          onChangeText={handleEmailChange}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={errone ? styles.error_input : styles.input}
          value={motDePasse}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        <Text style={errone ? styles.error_message : styles.error_hidden}>
          Email ou mot de passe incorrecte
        </Text>
        <Text style={styles.mdp}>Forgot password ? </Text>
        <Button
          color="#9BD1A8"
          title="Login"
          onPress={handleSubmit}
          disabled={isButtonDisabled}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  titelcont: {
    backgroundColor: '#9BD1A8',
    padding: 16,
    marginBottom:30,
  },
  totalpage: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#9BD1A8',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  img: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },

  error_input: {
    height: 40,
    borderColor: '#D17B7B',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  mdp: {
    marginBottom: 20,
    color: 'black',
  },
  error_message: {
    marginBottom: 20,
    color: 'red',
  },
  error_hidden: {
    display: 'none',
  },
});

export default Connexion;
