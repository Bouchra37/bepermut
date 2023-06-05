import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const ProfesseursParGradeChart = () => {
  const [professeursParGrade, setProfesseursParGrade] = useState([]);

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
  .then(data => {
        const professeursParGrade = data.reduce((acc, professeur) => {
          acc[professeur.grade] = (acc[professeur.grade] || 0) + 1;
          return acc;
        }, {});

        setProfesseursParGrade(professeursParGrade);
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
      data={Object.entries(professeursParGrade).map(([grade, nombre]) => ({
        name: grade,
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

export default ProfesseursParGradeChart;
