import React, { ReactElement } from "react";

interface Props {
    boards: any[],
    selectedBoardId: string,            // selectedBoardId is string
    onBoardSelected(id: string): void
}

export function TrelloBoards(props: Props): ReactElement {
    return (
        <label>
            board:
            <select
                value={props.selectedBoardId}
                onChange={(event) => props.onBoardSelected(event.target.value)}
            >
                <option
                    value=""
                    disabled>Choose board
                </option>
                {props.boards.map((board) => <option key={board.id} value={board.id}>{board.name}</option>)}
            </select>
        </label>);
}