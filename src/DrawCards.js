import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";
import "./DrawCard.css"

const DrawCards = () => {
const [deck,setDeck] = useState(null)
const [drawnCard, setDrawnCard] = useState([]);
const [isShuffling, setIsShuffling] = useState(false)
const url = `https://deckofcardsapi.com/api/deck`;



useEffect(() => {
    async function getDeck(){
        const res = await axios.get(`${url}/new/shuffle`);
       setDeck(res.data);
        
    }
    getDeck();

}, [url]);

async function drawCard (){
    try{
    const cardRes = await axios.get(`${url}/${deck.deck_id}/draw/?count=1`);
    if(cardRes.data.remaining === 0) throw new Error("Error: no more cards remaining!")
       
    
        const card = cardRes.data.cards[0];
        console.log(card)
        setDrawnCard(c => [
            ...c,
            {
            id: card.code,
            face: card.value + " of " + card.suit,
            img: card.image,
            },
        ]);
    }
    catch (e){
        alert(e);
    }
}

async function shuffleCards(){
    setIsShuffling(true)
    try{
     await axios.get(`${url}/${deck.deck_id}/shuffle`) 
     setDrawnCard([]);
    }
    catch(e){
        alert(e);
    }
    finally{
    setIsShuffling(false)
    }
    
}


 function showDrawButton(){
    return (
        <button
        className="Deck-deal"
         onClick={drawCard}
         disabled={isShuffling}>
         Draw Card
         </button>
    );
 }


 function showShuffleButton(){
    return (
        <button
        className="Deck-shuffle"
         onClick={shuffleCards}
         disabled={isShuffling}>
         Shuffle Cards
         </button>
    );
 }


  return (
    <div className="Deck">
        {showDrawButton()}
        {showShuffleButton()}
        <div className="Deck-cardarea">
          {drawnCard.map(card => (
          <Card key={card.id} face={card.face} img={card.img}/>
          ))}
        </div> 
    </div>

  );
  
}


export default DrawCards;
