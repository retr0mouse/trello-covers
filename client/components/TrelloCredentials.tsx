import React, { ReactElement } from "react";

interface Props {
    trelloKey: string,
    trelloToken: string,
    onKeyChanged(value: string): void,
    onTokenChanged(value: string): void,
    onValidate(): void,
}

export function TrelloCredentials(props: Props): ReactElement {
    return (
        <div>
            <label>
                Trello key:
                <input
                    value={props.trelloKey}
                    type="text"
                    onChange={(event) => props.onKeyChanged(event.target.value)}
                >
                </input>
                <br />
            </label>
            <label>
                Trello token:
                <input
                    value={props.trelloToken}
                    type="text"
                    onChange={(event) => props.onTokenChanged(event.target.value)}
                >
                </input>
                <br />
            </label>
            <button onClick={() => props.onValidate()}>🚗</button>
        </div>);
}
