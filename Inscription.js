import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';

const Inscription = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
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
const [loggedin, setLoggedin] = useState('');
  async () => {
    const id = await AsyncStorage.getItem('id');
    if (id) {
      setLoggedin(id);
    }
  };
  let isLoggedIn = () => loggedin.length > 0;
  console.log(isLoggedIn());
  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const specialites = [...new Set(data.map(professeur => professeur.specialite))].map(specialite => ({
          label: specialite,
          value: specialite
        }));

        const villesActuelles = [...new Set(data.map(professeur => professeur.villeFaculteActuelle))].map(ville => ({
          label: ville,
          value: ville
        }));

        const villesDesirees = [...new Set(data.map(professeur => professeur.villeDesiree.split(';')).flat())].map(ville => ({
          label: ville,
          value: ville
        }));

        const grades = [...new Set(data.map(professeur => professeur.grade))].map(grade => ({
          label: grade,
          value: grade
        }));

        setSpecialiteOptions(specialites);
        setVilleActuelleOptions(villesActuelles);
        setVilleDesireeOptions(villesDesirees);
        setGradeOptions(grades);
      });
  }, []);

  useEffect(() => {
    const isFormValid =
      nom !== '' &&
      prenom !== '' &&
      telephone !== '' &&
      email !== '' &&
      motDePasse !== '' &&
      grade !== '' &&
      etablissement !== '' &&
      specialite !== '' &&
      villeActuelle !== '' &&
      villesDesirees.length > 0;

    setIsButtonDisabled(!isFormValid);
  }, [nom, prenom, telephone, email, motDePasse, grade, etablissement, specialite, villeActuelle, villesDesirees]);

  const handleSubmit = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titelcont}>
        <Text style={styles.title}>Inscription</Text>
      </View>
      <View style={styles.totalpage}>
        <Text style={styles.label}>Nom:</Text>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          
        />
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
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Mot de passe:</Text>
        <TextInput
          style={styles.input}
          value={motDePasse}
          onChangeText={setMotDePasse}
          secureTextEntry
        />
        <Text style={styles.label}>Grade:</Text>
        <RNPickerSelect
          value={grade}
          onValueChange={setGrade}
          items={gradeOptions}
          placeholder={{ label: 'Sélectionner le grade', value: null }}
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
          placeholder={{ label: 'Sélectionner une spécialité', value: null }}
        />
        <Text style={styles.label}>Ville actuelle:</Text>
        <RNPickerSelect
          value={villeActuelle}
          onValueChange={setVilleActuelle}
          items={villeActuelleOptions}
          placeholder={{ label: 'Sélectionner la ville actuelle', value: null }}
        />
        <Text style={styles.label}>Villes désirées:</Text>
        <MultiSelect
          hideTags
          items={villeDesireeOptions}
          uniqueKey="value"
          onSelectedItemsChange={setVillesDesirees}
          selectedItems={villesDesirees}
          selectText="Sélectionner les villes désirées"
          searchInputPlaceholderText="Sélectionner..."
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
        <Button color="#9BD1A8" style={styles.save} title="Envoyer" onPress={handleSubmit} disabled={isButtonDisabled} />

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Inscription effectuée avec succès!</Text>
              <Button color="#9BD1A8" title="OK" onPress={handleModalClose} />
            </View>
          </View>
        </Modal>
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
  },
  totalpage: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
  },
  save:{
      marginTop:60,
  },
  input: {
    borderColor: '#9BD1A8',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 4,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Inscription;
