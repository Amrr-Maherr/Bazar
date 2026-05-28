import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { Spacing } from "@/constants/theme";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { Button } from "@/components/ui/button";

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
};

const menuItems: MenuItem[] = [
  { icon: "person-outline", label: "Edit Profile" },
  { icon: "notifications-outline", label: "Notifications" },
  { icon: "lock-closed-outline", label: "Privacy" },
  { icon: "color-palette-outline", label: "Appearance" },
  { icon: "information-circle-outline", label: "About" },
  { icon: "help-circle-outline", label: "Help & Support" },
];

export default function Profile() {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.gray[50] }]}>
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <View style={[styles.avatar, { backgroundColor: colors.gray[100] }]}>
            <Ionicons name="person" size={36} color={colors.gray[400]} />
          </View>
          <Text style={styles.name}>User Name</Text>
          <Text style={styles.email}>
            user@email.com
          </Text>
        </View>

        <View style={[styles.menuCard, { backgroundColor: colors.gray[100] }]}>
          {menuItems.map((item, index) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.menuItem,
                index < menuItems.length - 1 && [
                  styles.menuItemBorder,
                  { borderBottomColor: colors.gray[200] },
                ],
                pressed && { opacity: 0.6 },
              ]}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={20} color={colors.purple[500]} />
                <Text style={styles.menuItemLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.gray[400]} />
            </Pressable>
          ))}
        </View>

        <View style={styles.logout}>
          <Button
            title="Log Out"
            variant="outline"
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: Spacing.five,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.three,
  },
  name: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    marginBottom: Spacing.one,
    color: colors.gray[900],
  },
  email: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[600],
  },
  menuCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: Spacing.five,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    paddingHorizontal: Spacing.three,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemLabel: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[900],
  },
  logout: {
    marginTop: "auto",
    paddingBottom: Platform.OS === "ios" ? 100 : 80,
  },
});
