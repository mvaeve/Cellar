import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { ThemeContext } from "../../themes/theme-context";
import { Utils } from "../../helpers";
import { useNavigation } from "@react-navigation/native";

const CellarHome = () => {
    const { dark, theme, toggle } = React.useContext(ThemeContext);
    const navigation = useNavigation();
    const [catArray, setCatArray] = useState([]);
    useEffect(() => {
        const getDrinksCategoryList = async () => {

            const endpoint = "list.php?c=list";

            const res = await Utils.getApi(endpoint, {}, true);
            res.drinks.forEach((obj) => {
                setCatArray((prevArray) => [
                    ...prevArray,
                    obj.strCategory,
                ]);
            });
        }
        //reset
        setCatArray([]);
        getDrinksCategoryList();
    }, []);

    const onCatPress = (cat) => {
        navigation.navigate("DrinksScreen", { category: cat });
    
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.titleContainer}>
                <Text style={[styles.titleText, { color: theme.color }]}>C E L L A R</Text>
            </View>
            <View style={styles.catContainer}>
                {catArray.map((cat, i) => {
                    return (
                        <Pressable key={i} onPress={() =>{onCatPress(cat)}}>
                        <View style={[styles.catBtn, {backgroundColor: theme.backgroundCard, shadowColor:theme.shadowColor}]}>
                         <Text style={{color:theme.color}}>{cat}</Text>
                         </View>
             
                     </Pressable>
                    )
                })}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        bottom:20,
        marginBottom:30
    },

    titleText: {
        fontSize: 50
    },
    catContainer: {
        flexDirection: 'row',
		flexWrap: 'wrap',
        justifyContent:'space-evenly'
    },
    catBtn: {
		width: 150,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5

	},
})

export default CellarHome