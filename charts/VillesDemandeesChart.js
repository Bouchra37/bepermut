import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const VillesDemandeesChart = () => {
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
      data={villesLesPlusDemandees.map(([ville, count]) => ({
        name: ville,
        population: count,
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
        decimalPlaces: 0,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="8"
      absolute
    />
  );
};

export default VillesDemandeesChart;
