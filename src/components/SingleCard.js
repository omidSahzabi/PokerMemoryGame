import './SingleCard.css'

export default function singleCsrd({card, handleChosenCard, flipped, showCard}){
  const handleClick = () => {
    if(!showCard){
      handleChosenCard(card)
    }
  }

  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ''} >
        <img className="front" src={card.src} alt="card's front" />
        <img
        className='back'
         src="img/cover.png"
         onClick={handleClick}
         alt="card's back" 
         />
      </div>
    </div>
  )
}


