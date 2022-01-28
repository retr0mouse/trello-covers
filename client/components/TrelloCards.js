export function TrelloCards({cards, selectedCardIndex, disabled, onSelected}){
    return(
        <>
            <button 
                onClick={() => onSelected(selectedCardIndex - 1)} 
                disabled={selectedCardIndex === 0 || disabled}
            >⬅️
            </button>
            <span>{cards[selectedCardIndex]?.name}</span>
            <button 
                onClick={() => onSelected(selectedCardIndex + 1)} 
                disabled={selectedCardIndex === cards.length - 1 || disabled}
            >➡️
            </button>
        </>
    );
}