import React, { useEffect, useState, useCallback } from "react"
import { StyleSheet, Text, View, ScrollView, FlatList, Pressable, ImageBackground, Alert } from "react-native";
import { ThemeContext } from "../../themes/theme-context";
import { Utils } from "../../helpers";
import { useNavigation } from '@react-navigation/core';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import CustomSpinner from "../components/CustomSpinner";
import { useIsFocused } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';

const ConcoctScreen = () => {
    const { dark, theme, toggle } = React.useContext(ThemeContext);
    const navigation = useNavigation();

    const [appIsReady, setAppIsReady] = useState(false);
    const [ingredientsArray, setIngredientsArray] = useState([]);
    const [ingredientPressTime, setIngredientPressTime] = useState(0);
    const [ingredientPressName, setIngredientPressName] = useState("");
    const [ingredientPressNameLs, setIngredientPressNameLs] = useState([]);
    const [ingredientDrinks1, setIngredientDrinks1] = useState([]);
    const [ingredientDrinks2, setIngredientDrinks2] = useState([]);
    const [ingredientDrinks3, setIngredientDrinks3] = useState([]);
    const [disable, setDisable] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const isFocused = useIsFocused()

    useEffect(() => {
        const getIngredientsList = async () => {

            const endpoint = "list.php?i=list";

            const res = await Utils.getApi(endpoint, {});
            res.drinks.forEach((obj) => {
                setIngredientsArray((prevArray) => [
                    ...prevArray,
                    {
                        ingredient: obj.strIngredient1,

                    }

                ]);
            });
            setAppIsReady(true);
        }
        //reset
        setIngredientPressTime(0)
        setIngredientsArray([]);
        getIngredientsList();
        setSpinner(false)
        setDisable(false)
        setAppIsReady(false);


    }, [isFocused]);

    useEffect(() => {
        const getIngredientDrinks = async () => {
            const endpoint = "filter.php?i=" + ingredientPressName;
            const res = await Utils.getApi(endpoint, {});

            if (ingredientPressTime === 1) {
                res.drinks.forEach((obj) => {
                    setIngredientDrinks1((prevArray) => [
                        ...prevArray,
                        {
                            name: obj.strDrink,
                            image: obj.strDrinkThumb,
                            id: obj.idDrink

                        }

                    ]);
                });
            }
            if (ingredientPressTime === 2) {
                res.drinks.forEach((obj) => {
                    setIngredientDrinks2((prevArray) => [
                        ...prevArray,
                        {
                            name: obj.strDrink,
                            image: obj.strDrinkThumb,
                            id: obj.idDrink

                        }

                    ]);
                });
            }
            if (ingredientPressTime === 3) {
                res.drinks.forEach((obj) => {
                    setIngredientDrinks3((prevArray) => [
                        ...prevArray,
                        {
                            name: obj.strDrink,
                            image: obj.strDrinkThumb,
                            id: obj.idDrink

                        }

                    ]);
                });
            }

        }

        getIngredientDrinks()


    }, [ingredientPressTime])

    const ingredientPressed = (item) => {
        setIngredientPressTime(ingredientPressTime + 1);
        if (ingredientPressNameLs.includes(item.ingredient)){
            setIngredientPressNameLs(ingredientPressNameLs.filter(arr => arr !== item.ingredient))
            setIngredientPressTime(ingredientPressTime-1);
        
        } else{
            setIngredientPressName(item.ingredient);
            setIngredientPressNameLs((prevName) => [...prevName, item.ingredient])
        }
        

    }

    const concoctDrinks = () => {
        setDisable(true)
        if (ingredientPressTime === 0) {
            setSpinner(false)
            Alert.alert("No ingredients selected",
                "Please go ahead and choose ingredients to concoct a drink.")
        } else {

            navigation.navigate("ConcoctDrinksScreen", { d1: ingredientDrinks1, d2: ingredientDrinks2, d3: ingredientDrinks3, ings: ingredientPressNameLs });
            setIngredientDrinks1([])
            setIngredientDrinks2([])
            setIngredientDrinks3([])
            setIngredientPressName("")
            setIngredientPressNameLs([])
            setIngredientPressTime(0)
            setSpinner(false);
        }
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
            <ImageBackground
                source={require("../../assets/image/barBackground.jpeg")}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={styles.titleContainer}>
                    <Text style={[styles.titleText, { color: theme.color }]}>Concoct your own drink</Text>
                    <Text style={[styles.subtitleText, { color: theme.color }]}>Select up to 3 ingredients!</Text>
                </View>
                <ScrollView
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}
                    contentContainerStyle={{ top: 130 }}>
                    <FlatList
                        scrollEnabled={false}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        numColumns={20}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={true}
                        data={ingredientsArray.sort((a, b) => a.ingredient.toLowerCase().localeCompare(b.ingredient.toLowerCase()))}
                        renderItem={({ item, index }) => {
                            return (
                                <Pressable key={index} onPress={() => { ingredientPressed(item) }}>
                                    <View style={ingredientPressNameLs.includes(item.ingredient) ?
                                        [styles.ingredientsBtn, { backgroundColor: theme.iconColor, shadowColor: 'white' }] :
                                        [styles.ingredientsBtn, { backgroundColor: theme.backgroundCard, shadowColor: 'white' }]}>
                                        <Text style={{ color: theme.color }}>{item.ingredient}</Text>
                                    </View>

                                </Pressable>
                            )
                        }}
                    />

                </ScrollView>
                <View style={styles.iconContainer}>
                    {ingredientPressTime === 0 ?
                        <FontAwesome5 name="glass-martini" size="150" color="white" /> :
                        ingredientPressTime === 1 || ingredientPressTime === 2 ?
                            <FontAwesome5 name="glass-martini-alt" size="150" color={theme.iconColor} /> :
                            <FontAwesome5 name="glass-martini" size="150" color={theme.iconColor} />
                    }

                </View>

                <View style={styles.buttonContainer}>
                    <Pressable
                        disabled={disable}
                        onPress={() => { concoctDrinks(); setSpinner(true); }}
                        style={[styles.button, { backgroundColor: theme.backgroundCard }]}
                    >
                        <Text style={[styles.buttonText, { color: theme.color }]}>
                            CONCOCT
                        </Text>
                    </Pressable>
                </View>
                <CustomSpinner loading={spinner} />

            </ImageBackground>
            <View style={styles.ingredientsContainer}>

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
        top: 50,
        justifyContent: 'center',
        alignItems: 'center'

    },
    titleText: {
        fontSize: 30
    },
    subtitleText: {
        fontSize: 18
    },
    image: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        justifyContent: "center"
    },
    scrollView: {
        bottom: 50,

    },
    ingredientsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    ingredientsBtn: {
        width: 150,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5

    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    button: {
        width: "40%",
        height: 70,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 50,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 24,
    },
})

export default ConcoctScreen