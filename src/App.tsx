import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as ToasterSonner } from "./components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { theme } from "./theme";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { onMessageListener } from "./firebase";
import { useState } from "react";
import Message from "./components/ui/message";
import toast, { Toaster as ReactHotToast } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({
    image: "",
    title: "",
    body: "",
  });

  if (show) {
    toast(() => <Message notification={notification} />);
  }

  onMessageListener()
    .then((payload: any) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
        image: payload.notification.image,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_G_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <RouterProvider router={router} />
          <Toaster />
          <ToasterSonner />
          <ReactHotToast position="bottom-right" reverseOrder={true} />
        </MantineProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
