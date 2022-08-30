import React, { useEffect, useState, useCallback } from "react"
import { StyleSheet, Text, View, Image, Animated, ScrollView } from "react-native";
import { ThemeContext } from "../../themes/theme-context";
import CustomAppbar from '../components/CustomAppbar';
import { Utils } from "../../helpers";
import * as SplashScreen from 'expo-splash-screen';

const DrinkDetailScreen = ({ route }) => {
    const { drinkID, drinkName } = route.params;
    const { dark, theme, toggle } = React.useContext(ThemeContext);
    SplashScreen.preventAutoHideAsync();

    const [drinkDetail, setDrinkDetail] = useState({});
    const [drinkIngredients, setDrinkIngredients] = useState([]);
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {

        const getDrinkDetails = async () => {
            const endpoint = "lookup.php?i=" + drinkID;
            const res = await Utils.getApi(endpoint, {}, true);

            setDrinkDetail(
                {
                    drinkID: res.drinks[0]["idDrink"],
                    drinkAlc: res.drinks[0]["strAlcoholic"],
                    drinkName: res.drinks[0]["strDrink"],
                    drinkInstruction: res.drinks[0]["strInstructions"],
                    drinkImg: res.drinks[0]["strDrinkThumb"]
                }
            );
            for (let i = 0; i < 15; i++) {
                if (res.drinks[0][`strMeasure${i}`] === null) {
                    break
                } else {
                    let ingredient = res.drinks[0][`strMeasure${i}`] + res.drinks[0][`strIngredient${i}`]
                    setDrinkIngredients(prev => {[
                        ...prev,
                        ingredient
                       
                    ]

                    })
}
            }
setAppIsReady(true);
        }
//reset
setDrinkIngredients([]);
setDrinkDetail({});
setAppIsReady(false);
getDrinkDetails();

    }, []);
const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
        await SplashScreen.hideAsync();
    }
}, [appIsReady]);

if (!appIsReady) {
    return null;
}
console.log(drinkIngredients)
return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]} onLayout={onLayoutRootView}>
        <CustomAppbar title={drinkDetail.drinkName} />
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: drinkDetail.drinkImg }} />
        </View>
        <View style={styles.tagContainer}>
            <View style={[styles.tag, {
                backgroundColor: drinkDetail.drinkAlc === "Alcoholic" ? theme.redTrans : theme.greenTrans,
                borderColor: drinkDetail.drinkAlc === "Alcoholic" ? theme.red : theme.green,
            }]}>
                <Text style={[styles.tagText, { color: theme.color }]}>{drinkDetail.drinkAlc}</Text>
            </View>
        </View>
        <Text style={[styles.instructionTitle, { color: theme.color }]}>Instructions</Text>
        <Text style={[styles.instructionText, { color: theme.color }]}>{drinkDetail.drinkInstruction}</Text>
    </View>
)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        height: '30%',
        marginBottom: 15
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',

    },
    instructionTitle: {
        fontSize: 34,
        alignSelf: 'center',
        marginBottom: 10

    },
    instructionText: {
        fontSize: 16,
        marginHorizontal: 20
    },
    tagContainer: {
        marginHorizontal: 20
    },
    tag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderWidth: 1,
        borderRadius: 4


    },
    tagText: {
        fontSize: 15
    }
});

export default DrinkDetailScreen