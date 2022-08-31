import React, { useEffect, useState, useCallback } from "react"
import { StyleSheet, Text, View, Image } from "react-native";
import { ThemeContext } from "../../themes/theme-context";
import CustomAppbar from '../components/CustomAppbar';
import { Utils } from "../../helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
const DrinkDetailScreen = ({ route }) => {
   
    const { drinkID, drinkName } = route.params;
    const { dark, theme, toggle } = React.useContext(ThemeContext);
    SplashScreen.preventAutoHideAsync();

    const [drinkDetail, setDrinkDetail] = useState({});
    const [drinkIngredients, setDrinkIngredients] = useState([]);
    const [appIsReady, setAppIsReady] = useState(false);
    const [fav, setFav] = useState(false)

    useEffect(() => {
        Utils.getData(drinkID).then((data) => {
            if (data == null){
             setFav(false)
            } else {
             setFav(true)
            }
         }) 
    },[fav]);

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
            for (let i = 1; i < 16; i++) {
                if (res.drinks[0][`strMeasure${i}`] === null || res.drinks[0][`strMeasure${i}`] === "") {
                    break
                } else {
                    let ingredient = res.drinks[0][`strMeasure${i}`] + res.drinks[0][`strIngredient${i}`]
                    setDrinkIngredients(prev => [
                        ...prev,
                        ingredient
                    ])
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

    const favPressed = () => {
        Utils.getData(drinkID).then((data) => {
            if (data == null){
                Utils.storeData(drinkID, drinkDetail);
                setFav(true)
            } else {
                AsyncStorage.removeItem(drinkID);
                setFav(false)
            }
         }) 
    
    }
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }
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

            <Text style={[styles.ingredientTitle, { color: theme.color }]}>Ingredients</Text>
            {drinkIngredients.map((ingredient, i) => {
                return (
                    <Text key={i} style={[styles.ingredientText, { color: theme.color }]}>• {ingredient}</Text>
                )
            })}

            <Text style={[styles.instructionTitle, { color: theme.color }]}>Instructions</Text>
            <Text style={[styles.instructionText, { color: theme.color }]}>{drinkDetail.drinkInstruction}</Text>

            <Ionicons  
            style={styles.fav}
            name={fav === true? "heart-sharp": "heart-outline" }
            size="36" 
            color={fav === true? "red": "white" }
            onPress={() => {favPressed()}} />

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
        fontSize: 24,
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginHorizontal: 20,
        fontWeight: 'bold'

    },
    instructionText: {
        fontSize: 16,
        marginHorizontal: 20,
    
    },
    ingredientTitle: {
        fontSize: 24,
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginHorizontal: 20,
        fontWeight:'bold'

    },
    ingredientText: {
        fontSize: 16,
        marginHorizontal: 20,
        marginBottom: 8
    
    },
    tagContainer: {
        position:'absolute',
        top:320,
        right: 20
    },
    tag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1,
        borderRadius: 4


    },
    tagText: {
        fontSize: 18,
        fontWeight: 'bold'
    }, 
    fav:{
        position:'absolute',
        left:340, 
        top:55
    }
});

export default DrinkDetailScreen