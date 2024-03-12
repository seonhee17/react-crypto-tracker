import React from "react";
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";
/* import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; */
import { QueryClient,QueryClientProvider } from "react-query";
// devtools를 깔면 다시 react-query를 쓸수 있다.
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

//useEffect 부분 축약할 수있음

//설치
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    {/* //설치 */}
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider> 
    </QueryClientProvider>
  </React.StrictMode>,
);
