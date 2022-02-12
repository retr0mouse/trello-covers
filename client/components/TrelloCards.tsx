import React, {ReactElement} from "react";

interface Props{
    cards: any[],
    selectedCardIndex: number,
    disabled: boolean,
    onSelected(id: number): void
}

export function TrelloCards(props: Props): ReactElement{
    return(
        <>
            <button 
                onClick={() => props.onSelected(props.selectedCardIndex - 1)} 
                disabled={props.selectedCardIndex === 0 || props.disabled}
            >⬅️
            </button>
            <span>{props.cards[props.selectedCardIndex]?.name}</span>
            <button 
                onClick={() => props.onSelected(props.selectedCardIndex + 1)} 
                disabled={props.selectedCardIndex === props.cards.length - 1 || props.disabled}
            >➡️
            </button>
        </>
    );
}