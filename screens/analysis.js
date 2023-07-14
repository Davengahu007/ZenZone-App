import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const chartConfig = {
  backgroundGradientFrom: '#3182CE',
  backgroundGradientTo: '#3182CE',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

export default function Analysis() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
    const email = await AsyncStorage.getItem('userEmail');
      try {
        const response = await axios.get(`https://09da-2c0f-fe38-2100-2861-8942-8f58-eda6-8f6a.ngrok-free.app/api/getAssessmentResults/${email}`);
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const formatDataForGraph = (set) => {
    if (!data) return null;
    return {
      labels: data.map((item, index) => `T${index+1}`),
      datasets: [{
        data: data.map(item => item[set]),
      }],
    };
  };

  return (
    <View style={styles.container}>
      {data && (
        <>
        <View style={styles.positive}>
          <Text style={styles.title}>Positive Emotions</Text>
          <LineChart
            data={formatDataForGraph('set1_mean')}
            width = {370}
            height={240}
            chartConfig={chartConfig}
          />
          </View>
         <View style={styles.negative}>
          <Text style={styles.title}>Negative Emotions</Text>
          <LineChart
            data={formatDataForGraph('set2_mean')}
            width = {370}
            height={240}
            chartConfig={chartConfig}
          />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius:20,
    padding:20
  },
  title: {
    backgroundColor: '#3182CE',
    paddingHorizontal: 10,
    color:'white',
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 30, 
    maxWidth: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  negative: {
    marginTop:40,
  },
  positive: {
    marginTop:40,
  }
});
