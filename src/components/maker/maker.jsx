import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService, cardRepository }) => {
  const location = useLocation();
  const locationState = location?.state;
  const navigate = useNavigate();
  // console.log(`locationState : ${locationState.id}`);
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(locationState && locationState.id);

  const onLogout = useCallback(() => {
    /*
      디펜더시를 잘 파악해서 authService처럼 캐시된 콜백 안에서 사용하는 디펜더시가 있다면
      그 디펜더시가 변경이 될 때 다시 사용할 수 있게 해줘야함.
    */
    authService.logout();
  });

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
    });
    return () => {
      /*
       * useEffect return문은 언마운트될 때 실행된다.
       * 메모리를 반납해야할 경우에 작성
       */
      stopSync();
    };
  }, [userId, cardRepository]);

  useEffect(() => {
    /*
        컴포넌트가 마운트되거나 업데이트 될 때 실행되는 useEffect를 사용
      */
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate("/");
      }
    });
  }, [authService, userId, navigate]);

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
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
