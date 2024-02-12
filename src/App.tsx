import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as ToasterSonner } from "./components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { theme } from "./theme";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const queryClient = new QueryClient();

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_G_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <RouterProvider router={router} />
          <Toaster />
          <ToasterSonner />
        </MantineProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
