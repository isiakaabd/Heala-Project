import React from "react";
import { useActions } from "components/hooks/useActions";
import { useSelector } from "react-redux";
import styles from "./App.module.css";

const App = () => {
  const { toggleText } = useSelector((state) => state.entities);
  const { toggleHelloWorld } = useActions();

  return (
    <>
      <div className={styles.container}>
        <h1>{!toggleText ? "Hello World" : "Goodbye World."}</h1>
        <button onClick={toggleHelloWorld} className={styles.button}>
          Toggle Text
        </button>
      </div>
    </>
  );
};

export default App;
