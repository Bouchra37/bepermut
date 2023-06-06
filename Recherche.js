import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Recherche = () => {
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villeDesiree, setVilleDesiree] = useState('');

  const [specialiteOptions, setSpecialiteOptions] = useState([]);
  const [villeActuelleOptions, setVilleActuelleOptions] = useState([]);
  const [villeDesireeOptions, setVilleDesireeOptions] = useState([]);

  const [professeurs, setProfesseurs] = useState([]);
  const [filteredProfesseurs, setFilteredProfesseurs] = useState([]);

  useEffect(() => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        setProfesseurs(data);

        const specialites = [
          ...new Set(data.map((professeur) => professeur.specialite)),
        ].map((specialite) => ({
          label: specialite,
          value: specialite,
        })).sort((a, b) => a.label.localeCompare(b.label));

        const villesActuelles = [
          ...new Set(data.map((professeur) => professeur.villeFaculteActuelle)),
        ].map((ville) => ({
          label: ville,
          value: ville,
        })).sort((a, b) => a.label.localeCompare(b.label));

        const villesDesirees = [
          ...new Set(
            data.flatMap((professeur) => professeur.villeDesiree.split(';'))
          ),
        ].map((ville) => ({
          label: ville,
          value: ville,
        })).sort((a, b) => a.label.localeCompare(b.label));

        setSpecialiteOptions(specialites);
        setVilleActuelleOptions(villesActuelles);
        setVilleDesireeOptions(villesDesirees);
      });
  }, []);

  useEffect(() => {
    const filteredProfesseurs = professeurs.filter((professeur) => {
      const matchSpecialite =
        specialite === '' || professeur.specialite === specialite;
      const matchVilleActuelle =
        villeActuelle === '' ||
        professeur.villeFaculteActuelle === villeActuelle;
      const matchVilleDesiree =
        villeDesiree === '' || professeur.villeDesiree.includes(villeDesiree);

      return matchSpecialite && matchVilleActuelle && matchVilleDesiree;
    });

    setFilteredProfesseurs(filteredProfesseurs);
  }, [specialite, villeActuelle, villeDesiree, professeurs]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Research</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Speciality:</Text>
        <RNPickerSelect
          value={specialite}
          onValueChange={setSpecialite}
          items={specialiteOptions}
          placeholder={{ label: 'Select speciality', value: '' }}
        />

        <Text style={styles.label}>Current City:</Text>
        <RNPickerSelect
          value={villeActuelle}
          onValueChange={setVilleActuelle}
          items={villeActuelleOptions}
          placeholder={{ label: 'Select current city', value: '' }}
        />

        <Text style={styles.label}>Desired cities:</Text>
        <RNPickerSelect
          value={villeDesiree}
          onValueChange={setVilleDesiree}
          items={villeDesireeOptions}
          placeholder={{ label: 'Select desired cities:', value: '' }}
        />

        <Button
          color="#D8BFD8"
          title="Reset"
          onPress={() => {
            setSpecialite('');
            setVilleActuelle('');
            setVilleDesiree('');
          }}
        />

        <Text style={styles.label}>Result of the research:</Text>
        {filteredProfesseurs.map((professeur) => (
          <View key={professeur.id} style={styles.card}>
            <Text
              style={
                styles.textlabel
              }>{`${professeur.nom} ${professeur.prenom}`}</Text>
            <Text>{`${professeur.email} | ${professeur.grade}`}</Text>
            <Text>{`Speciality: ${professeur.specialite}`}</Text>
            <Text>{` ${professeur.villeFaculteActuelle}`}-----{` ${professeur.villeDesiree}`} </Text>
          </View>
        ))}
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
    backgroundColor: '#D8BFD8',
    padding: 16,
  },
  contentContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
        textAlign: 'center',
  },
  card: {
    backgroundColor: '#F4F4F4',
    padding: 10,
    marginBottom: 10,
  },
  textlabel: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default Recherche;
