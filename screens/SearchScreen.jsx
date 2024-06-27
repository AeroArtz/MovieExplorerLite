import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieCard from '../components/MovieCard';
import { COLORS } from '../constants/Colors';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';



const SearchScreen = ({route,navigation}) => {

    { /* READING AUTH TOKEN FROM .ENV */}
    const AUTH_TOKEN = process.env.AUTH_TOKEN

    {/*  Accessing search parameter by user */}
    const {q} = route.params;

    {/* Defining a variable for search endpoint */}
    const API_URL = 'https://api.themoviedb.org/3/search/movie'

     {/* Storing data returned as state variable */}
     const [data,setData] = useState([]);

    {/* Fetching data on mount */}
    useEffect(() => {
        fetchData()
    },[]);

   

    

    {/* Function definiton for making API call via axios */}
    

    const fetchData = async() => {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: AUTH_TOKEN
            },
            params:{
                language: 'en-US',
                page: '1',
                query: q,
                include_adult : false

            }
        };

        console.log(data.results)
        try{
            const response = await axios.get(API_URL,options);
            setData(response.data)
        }catch(e){
            console.log('Error fetching the data')
        }
    }
  return (
    <SafeAreaView style={styles.container}>

        {/* Header Container */}
        <View style={styles.headerContainer}>

            {/* Back button which directs user back to home page */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Ionicons name="arrow-back" size={40} color={COLORS.WhiteMuted} />
            </TouchableOpacity>

            <Text style={styles.headerText}>
                Go Back
            </Text>
        </View>

            {/* List structure to store results returned by API call for searching topic */}
        <FlatList
            style= {styles.flatlist}
            columnWrapperStyle = {styles.row}
            data= {data.results}
            key = {({item}) => item.id}
            numColumns={3}
            renderItem={({item}) =>
                <MovieCard thumbnail={item.poster_path} title={item.title}/>
            }
        />
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        backgroundColor: COLORS.darkBgColor
    },
    flatlist: { 
        margin: 5
        
    }   
    ,row: {
        flex: 1,
        justifyContent: "space-around"
    },
    headerContainer: {
        flexDirection:'row',
        marginBottom: 30
    },
    backButton : {
        marginTop: 5,
        marginLeft: 5
    },
    headerText: {
        fontSize: '17px',
        color: COLORS.WhiteMuted,
        marginLeft: 5,
        marginTop: 15,
    }
})
