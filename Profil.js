import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import store from './store';

const Profil = () => {
  // State variables
  const navigation = useNavigation();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villesDesirees, setVillesDesirees] = useState([]);

  const [specialiteOptions, setSpecialiteOptions] = useState([]);
  const [villeActuelleOptions, setVilleActuelleOptions] = useState([]);
  const [villeDesireeOptions, setVilleDesireeOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const loggedUserId = useSelector((state) => state.loggedUserId);
  const [loggedUser, setLoggedUser] = useState('');

  useEffect(() => {
    setLoggedUser(loggedUserId);
  }, [loggedUserId]);

  // Fetch data from API and set options
  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        const specialites = [
          ...new Set(data.map((professeur) => professeur.specialite)),
        ].map((specialite) => ({
          label: specialite,
          value: specialite,
        }));

        const villesActuelles = [
          ...new Set(data.map((professeur) => professeur.villeFaculteActuelle)),
        ].map((ville) => ({
          label: ville,
          value: ville,
        }));

        const villesDesirees = [
          ...new Set(
            data.map((professeur) => professeur.villeDesiree.split(';')).flat()
          ),
        ].map((ville) => ({
          label: ville,
          value: ville,
        }));

        const grades = [
          ...new Set(data.map((professeur) => professeur.grade)),
        ].map((grade) => ({
          label: grade,
          value: grade,
        }));

        setSpecialiteOptions(specialites);
        setVilleActuelleOptions(villesActuelles);
        setVilleDesireeOptions(villesDesirees);
        setGradeOptions(grades);

        // Set default form values with the account data
        const comptes = data.filter(
          (professeur) => professeur._id == loggedUser
        );

        if (comptes.length) {
          let compte = comptes[0];
          setNom(compte.nom);
          setPrenom(compte.prenom);
          setTelephone(compte.tel);
          setEmail(compte.email);
          setGrade(compte.grade);
          setEtablissement(compte.faculteActuelle);
          setSpecialite(compte.specialite);
          setVilleActuelle(compte.villeFaculteActuelle);
          setVillesDesirees(compte.villeDesiree.split(';'));
        }
      });
  }, [loggedUser]);

  // Enable or disable submit button based on form validation
  useEffect(() => {
    const isFormValid =
      nom !== '' &&
      prenom !== '' &&
      telephone !== '' &&
      email !== '' &&
      grade !== '' &&
      etablissement !== '' &&
      specialite !== '' &&
      villeActuelle !== '' &&
      villesDesirees.length > 0;

    setIsButtonDisabled(!isFormValid);
  }, [
    nom,
    prenom,
    telephone,
    email,
    grade,
    etablissement,
    specialite,
    villeActuelle,
    villesDesirees,
  ]);

  const handleSubmit = () => {
    // modifier profil et l enregistrer dans la bdd

    setModalVisible(true);
  };
  const handleLogout = () => {
    const action = {
      type: 'SET_LOGGED_USER_ID',
      payload: null,
    };
    store.dispatch(action);
    navigation.navigate('Accueil');
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profil</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}><Text style={styles.textgras}>Nom:</Text> {nom}</Text>
        <Text style={styles.cardText}><Text style={styles.textgras}>Prénom:</Text> {prenom}</Text>
        <Text style={styles.cardText}><Text style={styles.textgras}>Téléphone:</Text> {telephone}</Text>
        <Text style={styles.cardText}><Text style={styles.textgras}>Email:</Text> {email}</Text>
        <Text style={styles.cardText}><Text style={styles.textgras}>Grade:</Text> {grade}</Text>
        <Text style={styles.cardText}><Text style={styles.textgras}>Établissement:</Text> {etablissement}</Text>
        <Text style={styles.cardText}><Text style={styles.textgras}>Spécialité:</Text> {specialite}</Text>
        <Text style={styles.cardText}><Text style={styles.textgras}>Ville actuelle:</Text> {villeActuelle}</Text>
        <Text style={styles.cardText}>
          <Text style={styles.textgras}> Villes désirées:</Text> {villesDesirees.join(', ')}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nom:</Text>
        <TextInput style={styles.input} value={nom} onChangeText={setNom} />

        <Text style={styles.label}>Prénom:</Text>
        <TextInput
          style={styles.input}
          value={prenom}
          onChangeText={setPrenom}
        />

        <Text style={styles.label}>Téléphone:</Text>
        <TextInput
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Grade:</Text>
        <RNPickerSelect
          value={grade}
          onValueChange={setGrade}
          items={gradeOptions}
        />

        <Text style={styles.label}>Établissement:</Text>
        <TextInput
          style={styles.input}
          value={etablissement}
          onChangeText={setEtablissement}
        />

        <Text style={styles.label}>Spécialité:</Text>
        <RNPickerSelect
          value={specialite}
          onValueChange={setSpecialite}
          items={specialiteOptions}
        />

        <Text style={styles.label}>Ville actuelle:</Text>
        <RNPickerSelect
          value={villeActuelle}
          onValueChange={setVilleActuelle}
          items={villeActuelleOptions}
        />

        <Text style={styles.label}>Villes désirées:</Text>
        <MultiSelect
          hideTags
          items={villeDesireeOptions}
          uniqueKey="value"
          onSelectedItemsChange={setVillesDesirees}
          selectedItems={villesDesirees}
          selectText="Sélectionner les villes"
          searchInputPlaceholderText="Rechercher..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="label"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#9BD1A8"
          submitButtonText="Valider"
        />

        <Button
          color="#9BD1A8"
          title="Enregistrer"
          onPress={handleSubmit}
          disabled={isButtonDisabled}
        />

        <Button color="#D15a5a" title="Logout" styles={{marginTop: 20}} onPress={handleLogout} />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Les modifications ont été enregistrées avec succès !
          </Text>
          <Button color="#9BD1A8" title="Fermer" onPress={handleModalClose} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  cardText: {
    marginBottom: 10,
  },
  textgras:{
        fontWeight: 'bold',

  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Profil;
