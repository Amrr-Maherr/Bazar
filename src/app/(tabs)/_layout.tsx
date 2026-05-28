import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, StyleSheet, type ColorValue } from "react-native";

import { colors } from "@/constants/colors";
import { fontSizes, fontWeights } from "@/constants/typography";

const icons: Record<
  string,
  {
    focused: keyof typeof Ionicons.glyphMap;
    unfocused: keyof typeof Ionicons.glyphMap;
  }
> = {
  home: { focused: "home", unfocused: "home-outline" },
  search: { focused: "search", unfocused: "search-outline" },
  favorites: { focused: "heart", unfocused: "heart-outline" },
  profile: { focused: "person", unfocused: "person-outline" },
};

function TabIcon({
  routeName,
  focused,
  color,
  size,
}: {
  routeName: string;
  focused: boolean;
  color: ColorValue;
  size: number;
}) {
  const icon = icons[routeName];
  return (
    <Ionicons
      name={focused ? icon.focused : icon.unfocused}
      size={size}
      color={color as string}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        animation: "fade",
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon
            routeName={route.name}
            focused={focused}
            color={color}
            size={size}
          />
        ),
        tabBarActiveTintColor: colors.purple[500],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    elevation: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    height: Platform.OS === "ios" ? 85 : 65,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    position: "absolute",
  },
  tabLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    marginBottom: Platform.OS === "ios" ? 0 : 6,
  },
});
