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

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        const specialites = [
          ...new Set(data.map((professeur) => professeur.specialite)),
        ]
          .map((specialite) => ({
            label: specialite,
            value: specialite,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        const villesActuelles = [
          ...new Set(data.map((professeur) => professeur.villeFaculteActuelle)),
        ]
          .map((ville) => ({
            label: ville,
            value: ville,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        const villesDesirees = [
          ...new Set(
            data.map((professeur) => professeur.villeDesiree.split(';')).flat()
          ),
        ]
          .map((ville) => ({
            label: ville,
            value: ville,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

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
  }, [
    nom,
    prenom,
    telephone,
    email,
    motDePasse,
    grade,
    etablissement,
    specialite,
    villeActuelle,
    villesDesirees,
  ]);

  const handleSubmit = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign up</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Last name:</Text>
        <TextInput style={styles.input} value={nom} onChangeText={setNom} />
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={prenom}
          onChangeText={setPrenom}
        />
        <Text style={styles.label}>Phone number:</Text>
        <TextInput
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={motDePasse}
          onChangeText={setMotDePasse}
          secureTextEntry
        />
        <Text style={styles.label}>Rank:</Text>
        <RNPickerSelect
          value={grade}
          onValueChange={setGrade}
          items={gradeOptions}
          placeholder={{ label: 'Select rank', value: null }}
        />
        <Text style={styles.label}>Establishment:</Text>
        <TextInput
          style={styles.input}
          value={etablissement}
          onChangeText={setEtablissement}
        />
        <Text style={styles.label}>Speciality:</Text>
        <RNPickerSelect
          value={specialite}
          onValueChange={setSpecialite}
          items={specialiteOptions}
          placeholder={{ label: 'Select speciality', value: null }}
        />
        <Text style={styles.label}>Current City:</Text>
        <RNPickerSelect
          value={villeActuelle}
          onValueChange={setVilleActuelle}
          items={villeActuelleOptions}
          placeholder={{ label: 'Select current city', value: null }}
        />
        <Text style={styles.label}>Desired cities:</Text>
        <MultiSelect
          hideTags
          items={villeDesireeOptions}
          uniqueKey="value"
          onSelectedItemsChange={setVillesDesirees}
          selectedItems={villesDesirees}
          selectText="Select desired cities:"
          searchInputPlaceholderText="Select..."
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
          submitButtonText="Ok"
        />
        <Button
          color="#9BD1A8"
          style={styles.save}
          title="Sign up"
          onPress={handleSubmit}
          disabled={isButtonDisabled}
        />

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Registration successful!</Text>
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
  titleContainer: {
    backgroundColor: '#9BD1A8',
    padding: 16,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color:'#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
     paddingVertical: 16,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  save: {
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default Inscription;
