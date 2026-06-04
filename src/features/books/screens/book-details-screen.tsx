import { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { Spacing } from "@/constants/theme";
import { useWorkWithEditions } from "@/features/books/hooks/useWorkDetails";
import { BookCover } from "@/features/books/components/book-cover";
import { BookInfo } from "@/features/books/components/book-info";
import { BookDescription } from "@/features/books/components/book-description";
import { BookSubjects } from "@/features/books/components/book-subjects";
import { BookAdditionalSubjects } from "@/features/books/components/book-additional-subjects";
import { BookMetadata } from "@/features/books/components/book-metadata";
import { BookLinks } from "@/features/books/components/book-links";
import { EditionsSection } from "@/features/books/components/editions-section";
import { DetailsLoading } from "@/features/books/components/details-loading";
import { DetailsError } from "@/features/books/components/details-error";

type Props = {
  workId: string;
};

export function BookDetailsScreen({ workId }: Props) {
  const { data, isLoading, isError, refetch } = useWorkWithEditions(workId);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <DetailsLoading />;
  }

  if (isError || !data) {
    return <DetailsError onRetry={handleRetry} />;
  }

  const { work, author, coverUrl, editions, editionsTotal } = data;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.gray[50] }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BookCover coverUrl={coverUrl} title={work.title} />

        <View style={styles.content}>
          <BookInfo
            title={work.title}
            author={author}
            firstPublishYear={work.first_publish_date}
          />

          <BookDescription description={work.description} />

          {work.subjects && work.subjects.length > 0 && (
            <BookSubjects subjects={work.subjects} />
          )}

          <BookAdditionalSubjects
            places={work.subject_places}
            people={work.subject_people}
            times={work.subject_times}
          />

          <BookMetadata
            work={work}
            editionsTotal={editionsTotal}
          />

          <BookLinks work={work} />

          {editions.length > 0 && (
            <EditionsSection editions={editions} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
  },
  content: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.four,
  },
});
