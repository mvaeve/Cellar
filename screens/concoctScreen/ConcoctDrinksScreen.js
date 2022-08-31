import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { ThemeContext } from "../../themes/theme-context";
import { useNavigation } from '@react-navigation/core';
import { TableView, Cell } from 'react-native-tableview-simple'
import CustomAppbar from "../components/CustomAppbar";

const ConcoctDrinksScreen = ({ route }) => {
    const { dark, theme, toggle } = React.useContext(ThemeContext);
    const navigation = useNavigation();
    const { d1, d2, d3, ings } = route.params;
    let finalCombi;

    if (d2.length === 0 && d3.length === 0) {
        finalCombi = d1;
    }
    else if (d3.length === 0 && d2.length !== 0) {
        finalCombi = d1.filter(o1 => d2.some(o2 => o1.id === o2.id));
    } else {
        let firstCombi;
        firstCombi = d1.filter(o1 => d2.some(o2 => o1.id === o2.id));
        finalCombi = firstCombi.filter(o1 => d3.some(o3 => o1.id === o3.id));

    }

    const onDrinksPressed = (drink) => {
        navigation.navigate("DrinkDetailScreen", { drinkName: drink.name, drinkID: drink.id })
    }


    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <CustomAppbar title="Concocted Drinks" />

            <View style={styles.tagContainer}>
                {ings.map((ingredient, i) => {
                    return (
                        <View key={i} style={[styles.tag, {
                            backgroundColor: theme.iconColor,
                            borderColor: theme.color,
                        }]}>
                            <Text style={[styles.tagText, { color: theme.color }]}> {ingredient}</Text>
                        </View>
                    )
                })}
            </View>




            <ScrollView style={styles.scrollView}>
                <TableView>
                    {finalCombi.length === 0 ?
                        <View style={styles.infoContainer}>
                            <Text style={[styles.infoText, { color: theme.color }]}>There are no drinks of this combination</Text>
                        </View>
                        :
                        finalCombi.map((drinks, i) => {
                            return (
                                <Cell
                                    onPress={() => { onDrinksPressed(drinks) }}
                                    key={i}
                                    contentContainerStyle={{ height: 100, backgroundColor: theme.backgroundCard }}
                                    cellContentView={
                                        <View style={[styles.homeCell, { backgroundColor: theme.backgroundCard }]}>
                                            <View style={styles.imageContainer}>
                                                <Image style={styles.cellImage} source={{ uri: drinks['image'] }} />
                                            </View>

                                            <View style={styles.cellCol}>
                                                <Text style={[styles.titleText, { color: theme.color }]}>{drinks['name']}</Text>

                                            </View>
                                        </View>
                                    }>

                                </Cell>
                            )
                        })}
                </TableView>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    scrollView: {

    },
    homeCell: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',

    },
    cellImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        borderRadius: 10,


    },
    imageContainer: {
        height: '100%',
        width: '25%',
        justifyContent: 'center',
        marginRight: 15
    },

    cellCol: {
        flexDirection: 'column',
        width: '80%',
        flex: 1
    },

    cellPrice: {
        justifyContent: 'center',
    },
    titleText: {
        marginVertical: 10,
        fontSize: 22,
        flexShrink: 1,
    },
    priceText: {
        fontSize: 16,

    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,

    },
    infoText:
    {
        fontSize: 20,
    },
    tagContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        marginVertical:5
    },
    tag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 4,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal:8

    },
    tagText: {
        fontSize: 18,
        fontWeight: 'bold',
        right:2,
    },
})
export default ConcoctDrinksScreen