import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '../constants/Colors';


const SearchInput = ({navigation}) => {
      {/* State variable to store users search query*/}
    const [query, setQuery] = useState('')

        

  return (    
    <View style={styles.container} >
        <TextInput
            style ={styles.input}
            value={query}
            onChangeText={(e) => setQuery(e)}
            placeholder='Search Movie'
            placeholderTextColor={COLORS.lightGrey}
        />

        {/* Directs user to SearchScreen when user presses search icon */}
        <TouchableOpacity 
          style= {styles.icon}
        onPress={() =>
         navigation.navigate('SearchScreen', {
            q: query
         })
        }>
            <AntDesign name="search1" size={24} color={COLORS.lightGrey} />
        </TouchableOpacity>

    </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    flexDirection: 'row',
    backgroundColor: COLORS.darkGrey,
    borderColor: COLORS.darkGrey,
    borderRadius: "12px",
    height: "24px",
    alignItems: 'center'
  },
  input : {
    backgroundColor: COLORS.darkGrey,
    color: COLORS.lightGrey,
    marginLeft: 5,
    padding: 9,
    height: "24px",
    flex: 1
  },
  icon : {
    marginRight: 
    10
  }

})