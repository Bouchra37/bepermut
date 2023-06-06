import React, { useEffect, useState, useCallback } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, ScrollView, Dimensions, View, Text } from 'react-native';
import ProfesseursParSpecialiteChart from './charts/ProfesseursParSpecialiteChart';
import VillesDemandeesChart from './charts/VillesDemandeesChart';
import ProfesseursParGradeChart from './charts/ProfesseursParGradeChart';
import Inscription from './Inscription';
import Apropos from './Apropos';
import Connexion from './Connexion';
import Recherche from './Recherche';
import Profil from './Profil';
import ProfesseursParSpecialiteCard from './cards/ProfesseursParSpecialiteCard';
import VillesDemandeesCard from './cards/VillesDemandeesCard';
import ProfesseursParGradeCard from './cards/ProfesseursParGradeCard';
import { Provider } from 'react-redux';
import store from './store';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const [nombreProfesseursInscrits, setNombreProfesseursInscrits] = useState(0);
  const [loggedUserId, setLoggedUserId] = useState('');

  useEffect(() => {
    const subscription = store.subscribe(() => {
      setLoggedUserId(store.getState().loggedUserId);
    });

    return () => {
      subscription(); // Unsubscribe from the store
    };
  }, []);

  useEffect(() => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => {
        setNombreProfesseursInscrits(data.length);
      });
  }, []);

  const isLoggedIn = useCallback(() => loggedUserId?.length > 0, [loggedUserId]);

  const Accueil = () => (
    <ScrollView style={styles.container}>
      <View style={styles.titreacc}>
        <Text style={styles.title}>Home</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Number of registered teachers: </Text>
          <Text style={styles.nombreProfesseurs}>
            {nombreProfesseursInscrits}
          </Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Number of teachers by specialty: </Text>
        <ProfesseursParSpecialiteChart />
      </View>

      <View style={styles.separator} />

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Most requested cities:</Text>
        <VillesDemandeesChart />
      </View>

      <View style={styles.separator} />

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Number of teachers per grade:</Text>
        <ProfesseursParGradeChart />
      </View>

      <View style={styles.separator} />

      <View style={styles.cardContainer}>
        <ProfesseursParSpecialiteCard />
      </View>

      <View style={styles.cardContainer}>
        <VillesDemandeesCard />
      </View>

      <View style={styles.cardContainer}>
        <ProfesseursParGradeCard />
      </View>
    </ScrollView>
  );

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#fff"
          shifting={true}>
          {isLoggedIn() ? (
            <>
              <Tab.Screen
                name="Home"
                options={{
                  tabBarLabel: 'Home',
                  tabBarColor: '#8CBED6',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="home"
                      color={color}
                      size={26}
                    />
                  ),
                }}
                component={Accueil}
              />

              <Tab.Screen
                name="Profil"
                component={Profil}
                options={{
                  tabBarLabel: 'Profil',
                  tabBarColor: '#9BD1A8',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="account"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />

              <Tab.Screen
                name="Research"
                component={Recherche}
                options={{
                  tabBarLabel: 'Research',
                  tabBarColor: '#D8BFD8',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="search-web"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />

              <Tab.Screen
                name="About"
                component={Apropos}
                options={{
                  tabBarLabel: 'About',
                  tabBarColor: '#FFAEB9',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="information"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
            </>
          ) : (
            <>
              <Tab.Screen
                name="Home"
                options={{
                  tabBarLabel: 'Home',
                  tabBarColor: '#8CBED6',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="home"
                      color={color}
                      size={26}
                    />
                  ),
                }}
                component={Accueil}
              />

              <Tab.Screen
                name="Registration"
                component={Inscription}
                options={{
                  tabBarLabel: 'Registration',
                  tabBarColor: '#9BD1A8',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="account-plus"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />

              <Tab.Screen
                name="Login"
                component={Connexion}
                options={{
                  tabBarLabel: 'Login',
                  tabBarColor: '#9BD1A8',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="account-circle"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />

              <Tab.Screen
                name="About"
                component={Apropos}
                options={{
                  tabBarLabel: 'About',
                  tabBarColor: '#FFAEB9',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="information"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  titreacc: {
    backgroundColor: '#8CBED6',
    padding: 16,
    marginBottom: 30,

  },
  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nombreProfesseurs: {
    fontSize: 24,
    fontWeight: 'bold',
    
  },
});

export default App;
