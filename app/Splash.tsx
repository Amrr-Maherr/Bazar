import { Image, Text, View, StyleSheet } from "react-native";

export default function Splash() {
  return (
    <>
      <View style={style.container}>
        <Text style={style.title}>Bazar.</Text>
        <Image
          style={style.logo}
          source={require("../assets/images/Logo.png")}
        />
        <Image
          style={style.image}
          source={require("../assets/images/Logo.png")}
        />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#54408C",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row-reverse",
    gap: 10,
    position: "relative",
  },
  logo: {
    width: 37.94,
    height: 37.94,
  },
  title: {
    fontSize: 31,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    position: "absolute",
    bottom: 0,
    left:-30,
    width: 316.61,
    height: 316.61,
    opacity:0.2
  },
});
