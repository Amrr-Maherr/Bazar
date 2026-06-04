import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { getCoverUrl } from "@/services/openlibrary/openlibrary";
import type { BookEdition } from "@/types/openlibrary";

type Props = {
  editions: BookEdition[];
};

export function EditionsSection({ editions }: Props) {
  const renderEdition = ({ item }: { item: BookEdition }) => {
    const editionCover = getCoverUrl(item.cover_id ?? item.covers?.[0], "S");

    return (
      <View style={styles.editionItem}>
        <View style={styles.editionCoverContainer}>
          {editionCover ? (
            <Image
              source={{ uri: editionCover }}
              style={styles.editionCover}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.editionPlaceholder, { backgroundColor: colors.gray[200] }]}>
              <Text style={styles.editionPlaceholderText}>
                {item.title?.charAt(0) ?? "?"}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.editionInfo}>
          <Text style={styles.editionTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {item.publish_date && (
            <Text style={styles.editionDetail}>
              {item.publish_date}
            </Text>
          )}
          {item.publishers?.[0] && (
            <Text style={styles.editionDetail} numberOfLines={1}>
              {item.publishers[0]}
            </Text>
          )}
          {item.number_of_pages && (
            <Text style={styles.editionDetail}>
              {item.number_of_pages} pages
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        Editions ({editions.length})
      </Text>
      <FlatList
        data={editions}
        renderItem={renderEdition}
        keyExtractor={(item) => item.key}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.gray[900],
    marginBottom: 12,
  },
  editionItem: {
    flexDirection: "row",
    gap: 12,
  },
  editionCoverContainer: {
    width: 50,
    height: 70,
    borderRadius: 6,
    overflow: "hidden",
  },
  editionCover: {
    width: "100%",
    height: "100%",
  },
  editionPlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  editionPlaceholderText: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.gray[400],
  },
  editionInfo: {
    flex: 1,
    justifyContent: "center",
  },
  editionTitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies["roboto-semibold"],
    color: colors.gray[900],
    marginBottom: 2,
  },
  editionDetail: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[600],
  },
  separator: {
    height: 12,
  },
});
