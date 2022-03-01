import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
    {
      id: "1",
      name: "Yuu",
      company: "Samsung",
      theme: "Dark",
      title: "Software Engineer",
      email: "22yuu@naver.com",
      message: "go for it",
      fileName: "yuu",
      fileURL: null,
    },
    {
      id: "2",
      name: "Yuu",
      company: "Samsung",
      theme: "Light",
      title: "Software Engineer",
      email: "22yuu@naver.com",
      message: "go for it",
      fileName: "yuu",
      fileURL: null,
    },
    {
      id: "3",
      name: "Yuu",
      company: "Samsung",
      theme: "Colorful",
      title: "Software Engineer",
      email: "22yuu@naver.com",
      message: "go for it",
      fileName: "yuu",
      fileURL: null,
    },
  ]);
  const navigate = useNavigate();
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    /*
        컴포넌트가 마운트되거나 업데이트 될 때 실행되는 useEffect를 사용
      */
    authService.onAuthChange((user) => {
      if (!user) {
        navigate("/");
      }
    });
  });

  const addCard = (card) => {
    const updated = [...cards, card];
    setCards(updated);
  };
  return (
    <section className={styles.maker}>
      <Header className={styles.header} onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} addCard={addCard} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
