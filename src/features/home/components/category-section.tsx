import { useCallback, useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { HOME_CATEGORIES, CATEGORY_ICONS } from "@/services/openlibrary/openlibrary";

type Props = {
  onCategoryPress: (category: string) => void;
};

export function CategorySection({ onCategoryPress }: Props) {
  const data = useMemo(() => HOME_CATEGORIES, []);

  const renderItem = useCallback(
    ({ item }: { item: (typeof HOME_CATEGORIES)[number] }) => {
      const iconName = CATEGORY_ICONS[item.key] as keyof typeof Ionicons.glyphMap;
      return (
        <Pressable
          style={({ pressed }) => [
            styles.item,
            pressed && styles.itemPressed,
          ]}
          onPress={() => onCategoryPress(item.key)}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.purple[100] }]}>
            <Ionicons name={iconName} size={22} color={colors.purple[500]} />
          </View>
          <Text style={styles.label} numberOfLines={1}>
            {item.label}
          </Text>
        </Pressable>
      );
    },
    [onCategoryPress]
  );

  const keyExtractor = useCallback(
    (item: (typeof HOME_CATEGORIES)[number]) => item.key,
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.gray[900],
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 16,
    gap: 16,
  },
  item: {
    alignItems: "center",
    width: 72,
  },
  itemPressed: {
    opacity: 0.7,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[700],
    textAlign: "center",
  },
});
