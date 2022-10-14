import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import Compose from "./Compose";
import Inbox from "./Inbox";
import Outbox from "./Outbox";

const Welcome = () => {

    const [compose, setCompose] = useState(false);
    const [inbox, setInbox] = useState(true);
    const [outbox, setOutbox] = useState(false);
    const [count, setCount] = useState(0);

    const composeHandler = () => {
       setCompose(true);
       setInbox(false);
       setOutbox(false);
    };

    const inboxHandler = () => {
        setInbox(true);
        setCompose(false);
        setOutbox(false);
    };

    const outboxHandler = () => {
        setOutbox(true);
        setInbox(false);
        setCompose(false);
    };
       

    return(
        <Fragment>
            <h1>Mail box</h1>
            <button onClick={composeHandler}>Compose</button>
            <div>
            
            <button onClick={inboxHandler}>
            
                Inbox
               <br/>
               <span>unread:{count}</span>
            </button>
            </div>
            
            <button onClick={outboxHandler}>Outbox</button>
            <div>
            {compose && <Compose/>}
            {inbox && <Inbox setToCount={setCount}/>}
            {outbox && <Outbox/>}
            </div>
        </Fragment>
    );
}
export default Welcome;