import {
    QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// children data type
type ReactQueryProviderChildren = {
  children: React.ReactNode;
};
export default function ReactQueryProvider({children}:ReactQueryProviderChildren) {
    const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
