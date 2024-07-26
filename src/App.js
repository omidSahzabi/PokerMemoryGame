import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';



// images that we need for game and not the cover

const imgCard = [
  { "src" : "img/ace_of_spades.png" , matched : false} ,
  { "src" : "img/ace_of_hearts.png" , matched : false},
  { "src" : "img/king_of_clubs.png" , matched : false},
  { "src" : "img/king_of_diamonds.png" , matched : false},
  { "src" : "img/king_of_hearts.png" , matched : false},
  { "src" : "img/king_of_spades2.png" , matched : false}
]
  


function App() {

  // creating states that we need
  const [cards, setCards] = useState([])
  const [turns, setTurns ] = useState(0)
  const [firstCard, setFirstCard ] = useState(null)
  const [secondCard,  setSecondCard ] = useState(null)
  const [showCard, setShowCard ] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...imgCard , ...imgCard] 
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card ,  id : Math.random()}))

    setFirstCard(null)
    setSecondCard(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handeling choosen card
  const handleChosenCard = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card)
  }

  // game logic and checking FirstCard and SecondCard 
  useEffect(() => {
    if( firstCard && secondCard){
      setShowCard(true)

      if(firstCard.src === secondCard.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstCard.src){
              return {...card , matched: true}
            }else{
              return card
            }
          })
        })
        newTry()
      }else{
        setTimeout(() => newTry() , 800)
      }
    }
  },[firstCard , secondCard])


  // wrong being event or keep plaing for finding other mathed cards
  const newTry = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurns(prevNum => prevNum + 1)
    setShowCard(false)
  }

  useEffect(()=>{
    shuffleCards()
  },[])


  return (
    <div className="App">
      <h1>Poker Memory game!</h1>
      <button onClick={shuffleCards}>Let's Play</button>

      <div className="card-grid">
      {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChosenCard={handleChosenCard}
            flipped = {card === firstCard || card === secondCard || card.matched}
            showCard = {showCard}
          />
        ))}
      </div>
      <p>your total tries = {turns}</p>
    </div>
  );
}

export default App;
