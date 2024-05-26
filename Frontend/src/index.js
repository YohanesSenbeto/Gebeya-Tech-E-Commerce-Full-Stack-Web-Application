//index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../App";
import reportWebVitals from "./reportWebVitals";
// Import the BrowserRouter
import { BrowserRouter } from "react-router-dom";

// Import the AuthContext Provider
import { AuthProvider } from "./components/Contexts/AuthContext";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
