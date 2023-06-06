import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VillesDemandeesCard = () => {
  const [villesLesPlusDemandees, setVillesLesPlusDemandees] = useState([]);

  useEffect(() => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const villesDesirees = data.reduce((acc, professeur) => {
          if (professeur.villeDesiree) {
            const villes = professeur.villeDesiree.split(';');
            acc.push(...villes);
          }
          return acc;
        }, []);

        const villesLesPlusDemandees = villesDesirees.reduce((acc, ville) => {
          acc[ville] = (acc[ville] || 0) + 1;
          return acc;
        }, {});

        const topVillesDemandees = Object.entries(villesLesPlusDemandees)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15);

        setVillesLesPlusDemandees(topVillesDemandees);
      });
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Most requested cities (Top 15):</Text>
      <View style={styles.table}>
        {villesLesPlusDemandees.map(([ville, count], index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{ville}</Text>
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

export default VillesDemandeesCard;
