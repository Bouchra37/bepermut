import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfesseursParGradeCard = () => {
  const [professeursParGrade, setProfesseursParGrade] = useState([]);

  useEffect(() => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const gradesCount = data.reduce((acc, professeur) => {
          const grade = professeur.grade;
          if (grade) {
            acc[grade] = (acc[grade] || 0) + 1;
          }
          return acc;
        }, {});

        setProfesseursParGrade(Object.entries(gradesCount));
      });
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Number of teachers per grade:</Text>
      <View style={styles.table}>
        {professeursParGrade.map(([grade, count], index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{grade}</Text>
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

export default ProfesseursParGradeCard;
