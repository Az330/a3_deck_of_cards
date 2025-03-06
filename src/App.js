import React, { useState } from "react";
import "./App.css";
import logo from "./logo.svg"; // Updated: Added the logo

const suits = ["♥", "♦", "♣", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const generateDeck = () => {
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

function App() {
  const [deck, setDeck] = useState(generateDeck());
  const [hand, setHand] = useState([]);
  const [pickedCard, setPickedCard] = useState(null);

  const drawCard = () => {
    if (deck.length === 0) return;
    const randomIndex = Math.floor(Math.random() * deck.length);
    const newCard = deck[randomIndex];
    setHand([...hand, newCard]);
    setDeck(deck.filter((_, index) => index !== randomIndex));
  };

  const dealCards = (num) => {
    if (deck.length < num) return;
    let newHand = [];
    let newDeck = [...deck];

    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * newDeck.length);
      newHand.push(newDeck[randomIndex]);
      newDeck.splice(randomIndex, 1);
    }

    setHand(newHand);
    setDeck(newDeck);
    setPickedCard(null);
  };

  const resetGame = () => {
    setDeck(generateDeck());
    setHand([]);
    setPickedCard(null);
  };

  const pickCard = (index) => {
    setPickedCard(pickedCard === index ? null : index);
  };

  const swapCards = (index) => {
    if (pickedCard !== null && pickedCard !== index) {
      let newHand = [...hand];
      [newHand[pickedCard], newHand[index]] = [newHand[index], newHand[pickedCard]];
      setHand(newHand);
      setPickedCard(null);
    }
  };

  const tossCard = () => {
    if (pickedCard !== null) {
      setHand(hand.filter((_, index) => index !== pickedCard));
      setPickedCard(null);
    }
  };

  const wildcard = () => {
    const newCard = {
      suit: suits[Math.floor(Math.random() * suits.length)],
      value: values[Math.floor(Math.random() * values.length)],
    };
    setHand([...hand, newCard]);
  };

  const regroup = () => {
    let shuffledHand = [...hand].sort(() => Math.random() - 0.5);
    setHand(shuffledHand);
  };

  return (
    <div className="container">
      <img src={logo} className="logo" alt="logo" />
      <h1>Deck of Cards</h1>
      <p>Click the deck to draw a card</p>
      <div className="deck" onClick={drawCard}>
        {deck.length === 0 ? "No cards remaining" : "Deck"}
      </div>
      <div className="buttons">
        <button onClick={() => dealCards(5)}>Deal 5</button>
        <button onClick={() => dealCards(7)}>Deal 7</button>
        <button onClick={resetGame}>Reset</button>
        <button onClick={tossCard} disabled={pickedCard === null}>Toss</button>
        <button onClick={wildcard}>Wildcard</button>
        <button onClick={regroup}>Regroup</button>
      </div>
      <div className="hand">
        {hand.map((card, index) => (
          <div key={index} className={`card ${pickedCard === index ? "picked" : ""}`} onClick={() => pickCard(index)}>
            {card.value} {card.suit}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
