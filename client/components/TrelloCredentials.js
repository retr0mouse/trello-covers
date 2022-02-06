export function TrelloCredentials({trelloKey, trelloToken, onKeyChanged, onTokenChanged, onValidate}) {
    return (
        <div>
            <label>
                Trello key:
                <input 
                    value={trelloKey} 
                    type="text" 
                    onChange={(event) => onKeyChanged(event.target.value)}
                >
                </input>
                <br />
            </label>
            <label>
                Trello token:
                <input
                    value={trelloToken} 
                    type="text" 
                    onChange={(event) => onTokenChanged(event.target.value)}
                >
                </input>
                <br />
            </label>
            <button onClick={() => onValidate()}>🚗</button>
        </div>);
}
