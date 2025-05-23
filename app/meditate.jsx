import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mindfullness, movement, pranayama, healing, spiritual, focused, recommended } from '../constants/meditate';

import Recommend from '../components/Recommend';


const meditate = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {

    console.log('Received item.name:', item.name);


    switch (item.name) {
      case 'Focused':
        setData(focused);
        break;
      case 'Spiritual':
        setData(spiritual);
        break;
      case 'Healing':
        setData(healing);
        break;
      case 'Pranayama':
        setData(pranayama);
        break;
      case 'Movement':
        setData(movement);
        break;
      case 'Mindfullness':
        setData(mindfullness);
        break;
      default:
        setData([]);
    }

  }, [item.name]);



  return (
    <SafeAreaView className="flex-1 bg-[#000a15] flex space-y-5 px-2" edges={['top']}>
      {/* Header */}
      <View style={styles.header} className="">
        <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={34} color="white" />
        </TouchableOpacity>
        <Text style={styles.title} className="text-white">{item.name}</Text>
      </View>
      <View>

        <Text className="text-[20px] mx-8 mt-3 text-center text-[#84bdfd]">Audio Shorts</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => <Card item={item} index={index} />}
          ListEmptyComponent={<Text style={styles.emptyText}>No data available</Text>}
        />
        <View className="h-1 w-full bg-black mt-3"></View>
      </View>
      <View>
        <Recommend/>
      </View>
    </SafeAreaView>
  );
};

const Card = ({ item, index }) => {
  return (
    <View style={styles.card} className="h-[230px] bg-[#ffffff17] p-6 rounded-lg">
      <TouchableOpacity>
        <Image source={item.image} style={styles.cardImage} />
        <View className="mt-2">
          <Text className="text-white text-lg font-bold text-center">{item.name}</Text>
          <Text className="text-[13px] text-white text-center">{item.subname}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


export default meditate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  title: {
    fontSize: 24,
    marginLeft: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
    fontSize: 16,
  },
  card: {
    marginHorizontal: 8,
    alignItems: 'center',
  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  cardText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
});
