import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import App from "./App.jsx";
import {store} from './app/store.js'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageGallery from "../components/Dummy/Dummy.jsx";


const GlobalStyle = createGlobalStyle`

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{

min-height:100vh;
color: rgba(255, 255, 255, 0.87);
background-color: #242424;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
 font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
  ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      background: #2c0404ff;
      border-radius: 10px;
    }

  ::-webkit-scrollbar-thumb {
      background-color: #e43d3dff;
      border-radius: 10px;
      border: 3px solid #190202ff;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }


}

`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <Provider store={store}>
      <GlobalStyle/>
    <App />
  </Provider>
  {/* <ImageGallery/> */}
  </StrictMode>
);
