import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService }) => {
  const [cards, setCards] = useState({
    1: {
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
    2: {
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
    3: {
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
  });

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

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
  };
  return (
    <section className={styles.maker}>
      <Header className={styles.header} onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
