import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, useState } from "react";
import Layout from "./components/Layout/Layout";
import Tours from "./pages/Tours/Tours";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MantineProvider } from "@mantine/core";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Home from "./pages/Home";
import Tour from "./pages/Tour/tour";
import UserDetailContext from "./Context/UserDetailsContext";

function App() {
  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favorites: [],
    bookings: [],
    token: null,
  });

  return (
    <div>
      <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={{ colorScheme: "light" }}>
            <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/tours">
                      <Route index element={<Tours />} />
                      <Route path=":tourId" element={<Tour />} />
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </MantineProvider>
        </QueryClientProvider>
      </UserDetailContext.Provider>
    </div>
  );
}

export default App;
