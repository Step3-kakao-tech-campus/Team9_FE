import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalModal from "./components/atoms/GlobalModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const queryErrorHandler = (error) => {
  <Toast message="queryErrorHandler" type="error" />;
  console.log("queryErrorHandler", error);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      retry: 0,
      suspense: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <GlobalModal />
      <ToastContainer position="bottom-center" />
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
