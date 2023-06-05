import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfesseursParSpecialiteCard = () => {
  const [professeursParSpecialite, setProfesseursParSpecialite] = useState([]);

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const specialitesCount = data.reduce((acc, professeur) => {
          const specialite = professeur.specialite;
          if (specialite) {
            acc[specialite] = (acc[specialite] || 0) + 1;
          }
          return acc;
        }, {});

        const topSpecialites = Object.entries(specialitesCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15);

        setProfesseursParSpecialite(topSpecialites);
      });
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Nombre de profs par spécialité (Top 15)</Text>
      <View style={styles.table}>
        {professeursParSpecialite.map(([specialite, count], index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{specialite}       </Text>
            <Text style={styles.cell}>:  {count}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
  },
});

export default ProfesseursParSpecialiteCard;
