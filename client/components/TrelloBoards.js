export function TrelloBoards({ boards, selectedBoardId, onBoardSelected }) {
    return (
        <label>
            board:
            <select
                value={selectedBoardId} 
                onChange={(event) => onBoardSelected(event.target.value)}
            >
                <option
                    value="" 
                    disabled>Choose board
                </option>
                {boards.map((board) => <option key={board.id} value={board.id}>{board.name}</option>)}
            </select>
        </label>);
}