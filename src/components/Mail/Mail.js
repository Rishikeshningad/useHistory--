import React, {useEffect} from 'react';

const Mail = (props) => {
    const endPoint = props.data.ID;

    useEffect (() => {
        const body1 = props.data.email.body.replace(/<[^>]*>/g,"");
        fetch(`https://mail-box-7607c-default-rtdb.firebaseio.com/sentemails/${endPoint}.json`,
        {
            method: 'PATCH',
            headers: {
                "Content-type" : "application/json",
            },
            body: JSON.stringify({
               from: props.data.email.from,
               to: props.data.email.to,
               heading: props.data.email.heading,
               body: body1,
               isRead: false,
               id: props.data.email.id,
            }),
        }
        )
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        });
    });

    const msg = props.data.email.body.replace(/<[^>]*>/g,"");
    
    const deleteHandler = () => {
       fetch(`https://mail-box-7607c-default-rtdb.firebaseio.com/sentemails/${endPoint}.json`,
       {
        method: 'DELETE',
        headers: {
            'Content-type': "application/json"
        },
       })
       .then((res) => res.json())
       .then((data) => {
        props.onDelete(data);
        alert('Mail deleted from database');
       });
    };

    return(
        <div>
            <button onClick={props.onClose}>Back</button>
            <button onClick={deleteHandler}>Delete</button>
        <div>
            <span>From:</span>
            <span>
                <p>{props.data.email.to}</p>
            </span>
        </div>
        <hr/>
            <span>Subject:</span>
            <h3>{props.data.email.heading}</h3>
        <hr/>
        <p>{msg}</p>
        </div>
    );
};

export default Mail; 