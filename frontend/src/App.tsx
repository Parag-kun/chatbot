import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as StoreProvider } from "react-redux";
import AppRoutes from "./routes";
import { store } from "./redux/store";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <AppRoutes />
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
