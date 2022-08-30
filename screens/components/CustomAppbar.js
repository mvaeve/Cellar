import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../themes/theme-context";

const CustomAppbar = ({ title }) => {
  const navigation = useNavigation();
  const { dark, theme } = React.useContext(ThemeContext);

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      {Platform.OS === "ios" ? (
        <Appbar.Header
          style={{
            backgroundColor:theme.backgroundColor,
          }}
        >
          <Appbar.BackAction onPress={goBack} color={theme.color} />
          <Appbar.Content
            title={title}
            style={styles.content}
            titleStyle={[
              styles.title,
              {
                color: theme.color,
              },
            ]}
          />
        </Appbar.Header>
      ) : (
        <Appbar.Header
          style={{
            backgroundColor:theme.backgroundColor ,
          }}
          statusBarHeight={0}
        >
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content
            title={title}
            style={styles.content}
            titleStyle={[
              styles.title,
              {
                color: theme.color,
              },
            ]}
          />
        </Appbar.Header>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    marginLeft: 0,
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: -1,
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
  },
});

export default CustomAppbar;

