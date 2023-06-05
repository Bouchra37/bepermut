import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const ProfesseursParSpecialiteChart = () => {
  const [professeursParSpecialite, setProfesseursParSpecialite] = useState([]);

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        const professeursParSpecialite = data.reduce((acc, professeur) => {
          acc[professeur.specialite] = (acc[professeur.specialite] || 0) + 1;
          return acc;
        }, {});

        const topSpecialites = Object.entries(professeursParSpecialite)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15);

        setProfesseursParSpecialite(topSpecialites);
      });
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <PieChart
      data={professeursParSpecialite.map(([specialite, nombre]) => ({
        name: specialite,
        population: nombre,
        color: getRandomColor(),
        legendFontColor: '#7F7F7F',
        legendFontSize: 9,
      }))}
      width={Dimensions.get('window').width - 30}
      height={220}
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="8"
      absolute
    />
  );
};

export default ProfesseursParSpecialiteChart;
