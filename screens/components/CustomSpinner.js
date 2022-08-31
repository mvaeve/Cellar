
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const CustomSpinner = ({ loading }) => {
    return (
        <View style={styles.loading}>
            {
                <ActivityIndicator color={'#FFF'} size={'large'} animating={loading} />
            }
        </View>
    )
}
const styles = StyleSheet.create({
    loading: {
        flex:1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent:'center',
        left:178,
        top:400,
        zIndex:1
    }
})

export default CustomSpinner