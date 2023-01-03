import Card from "../../components/Card/Card";
import styles from "./LandingPage.module.css"
import "./styles.css";

import cardsArr from "../../data"

const cards = cardsArr.map((ele, idx) => {
  return <Card key={idx} {...ele} />;
});

// console.log("this is cards: ", cards);

export default function LandingPage() {
  return (
    <div>
      {/* <h1 className={styles.LandingPage}>Shop Here!</h1> */}
      <div >
        <div className={styles.LandingPage}>
          {/* <section className="cards"></section> */}
          {cards}
        </div>
      </div>
    </div>
  );
}
