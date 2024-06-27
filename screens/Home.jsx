import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SearchInput from '../components/SearchInput';
import MovieCard from '../components/MovieCard';
import {COLORS} from '../constants/Colors.js';


import axios from 'axios';


const Home = ({navigation}) => {

    { /* READING AUTH TOKEN FROM .ENV */}
    const AUTH_TOKEN = process.env.AUTH_TOKEN

    {/* Array of categories with corresponding endpoints */}

    const categories = [
        {
            name: 'Now Playing',
            endpoint : 'https://api.themoviedb.org/3/movie/now_playing'
        },
        {
            name: 'Top Rated',
            endpoint : 'https://api.themoviedb.org/3/movie/top_rated'
        },
        {
            name: 'Upcoming',
            endpoint : 'https://api.themoviedb.org/3/movie/upcoming'
        },
        {
            name: 'Popular',
            endpoint : 'https://api.themoviedb.org/3/movie/popular'
        },
    ]


     {/* Array Data returned by TMDB */}
    const [data, setData] = useState([]);

     {/* State variable for index of selected category
         By default Now playing will be firstly Selected
    */}
    const [catIndex , setCategoryIndex] = useState(0)


    {/*  Fetches data every time user changes selection
    */}
    useEffect(() => {
        fetchData()
    },[catIndex])

    const fetchData = async() => {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: AUTH_TOKEN
              },
            params:{
                page: '1',
                language : "en-US",
                
            }
        }

        try{
            const response =  await axios.get(categories[catIndex].endpoint,options)
            setData(response.data)
        }catch(e){
            console.log('Error fetching the data')
        }
    }

  return (
    <SafeAreaView style={styles.container}>

         {/* Container for the top part */}
        <View style={styles.topPart}>

            {/* header*/}
           <View style={styles.header}>

                <View>
                    <Text style={styles.headerText}>
                        Welcome back <Text style={{color:COLORS.lightBlue}}>John</Text>
                    </Text>
                </View>

                <View style={{
                    marginTop: 30,
                }}>
                    <FontAwesome name="user-circle-o" size={20} color="grey" />
                </View>
           </View>


            {/* search input*/}
            <SearchInput navigation={navigation}/>

            <View
              style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#474747',
                  marginBottom: 30,
              }}
              >
              </View>

            <ScrollView horizontal>
                {/* Categories*/}
                {/* Overriding the bg color based on current selection of category*/}
                {categories.map((elm,index) =>
                    <TouchableOpacity onPress={() => setCategoryIndex(index)} 

                       
                    style={[
                        styles.categoriesContainer,
                        {backgroundColor: (catIndex === index )? COLORS.lightBlue : COLORS.lightGrey}
                    ]}>
                        <Text style={styles.categoryText}>
                            {elm.name}
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            
            
            



        </View>


       {/* Movie Feed*/}

        <FlatList
                style= {styles.flatlist}
                columnWrapperStyle={styles.row}  // space them out evenly

                data = {data.results}
                key={(item) => item.id}
                numColumns={3}
                renderItem={ ({item}) =>(
                    <MovieCard thumbnail={item.poster_path} title={item.title}/>)
                }

            />
        
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container : {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        backgroundColor: COLORS.darkBgColor
    },
    topPart : {
        padding : 20
    },
    header : {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    headerText : {
        marginTop: 30,
        fontSize: '20px',
        fontWeight: "600",
        color: COLORS.WhiteMuted
    },
    categoriesContainer : {
        borderRadius: 30,
        width: 90,
        height: 30,
        alignItems: 'center',
        justifyContent:'center',
        marginRight: 15,
          
    },
    categoryText: {
        color: COLORS.darkGrey,
        fontSize: '12px',
        textAlign: 'center'
    },
    flatlist: {
        
        margin: 5
        
    }
    
    ,row: {
        flex: 1,
        justifyContent: "space-around"
    }
})
