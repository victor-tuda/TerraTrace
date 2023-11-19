import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const Dashboard = () => {
  const luminosidade = 65;
  const nivelAgua = 75;
  const temperatura = 73;
  const media = (luminosidade + nivelAgua + temperatura) / 3;

  const pieChartData1 = [
    {
      name: 'Saúde',
      nivel: media,
      color: '#90ee90',
    },
    {
      name: 'Restante',
      nivel: 100 - media,
      color: '#d3d3d3',
    },
  ];

  const pieChartData2 = [
    {
      name: 'Nível de Água',
      nivel: 75,
      color: '#0000FF',
    },
    {
      name: 'Ausência',
      nivel: 25,
      color: '#d3d3d3',
    },
  ];

  const dataBar = {
    labels: ['Luminosidade', 'Nível de Água', 'Temperatura'],
    datasets: [
      {
        data: [luminosidade, nivelAgua, temperatura],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.card}>
        <View style={{ alignItems: 'center' }}>
          <PieChart
            data={pieChartData1}
            width={300}
            height={150}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="nivel"
            backgroundColor="transparent"
            style={{ marginVertical: 10 }}
          />
        </View>
      </View>
      <View style={styles.card}>
        <View style={{ alignItems: 'center' }}>
          <PieChart
            data={pieChartData2}
            width={300}
            height={150}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
            }}
            accessor="nivel"
            backgroundColor="transparent"
            style={{ marginVertical: 10 }}
          />
        </View>
      </View>
      <View style={styles.card}>
        <View style={{ alignItems: 'center' }}>
          <BarChart
            data={dataBar}
            width={300}
            height={200}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(230, 87, 41, ${opacity})`, // Laranja
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#F5F5F5',
  },
  title: {
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: 350,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default Dashboard;
