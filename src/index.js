import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import AuthService from "./service/auth_service";
import { BrowserRouter } from "react-router-dom";
import ImageUploader from "./service/image_uploader";
import ImageFileInput from "./components/image_file_input/image_file_input";
import CardRepository from "./service/card_repository";

const authService = new AuthService();
const cardRepository = new CardRepository();
const imageUploader = new ImageUploader();
const FileInput = (props) => (
  // props 를 전달 받은 이유는 onClick, onChange 등 컴포넌트의 다른 prop을 활용하기 위함이다.
  // 즉 컴포넌트의 확장성을 위하여 props를 전달 받는다.
  <ImageFileInput {...props} imageUploader={imageUploader} />
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App
        authService={authService}
        FileInput={FileInput}
        cardRepository={cardRepository}
      />
      {/* FileInput이라는 컴포넌트를 따로 만들어 prop으로 전달해준 이유는 authService 같은 Defendency Injection이 필요한
          경우 위의 컴포넌트에만 추가해주면 바로 적용이 가능하다.
      */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
