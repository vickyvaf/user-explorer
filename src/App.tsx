import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserListScreen } from "./screens/user-list-screen";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserListScreen />;
    </QueryClientProvider>
  );
}
