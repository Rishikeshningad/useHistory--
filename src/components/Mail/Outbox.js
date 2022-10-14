import React,{Fragment, useState, useEffect} from "react";
import Mail from "./Mail";

const Outbox = (props) => {
 const[email, setEmail] = useState({});
 const[mail, setMail] = useState('');
 const[show, setShow] = useState(false);

 useEffect(() => {
    fetch(`https://mail-box-7607c-default-rtdb.firebaseio.com/sentemails.json`,
    {
        method: 'GET',
        headers:{
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => {
        setEmail(data);
        console.log(data);
    });
 },[show]);

 const openEmailClickHandler = (e) => {
   setMail({
    email: email[e.currentTarget.id],
    ID: e.currentTarget.id,
   });
 };

 const emailList = email ? (
    <ul>
        {Object.keys(email).map((item) => {
            return(
                <li
                id={item}
                onClick={openEmailClickHandler}
                key={item}
                >
                    <div>
                        <span>To:</span>
                        <span>{email[item].to}</span>
                    </div>
                    <br/>
                    <div>
                        <span>Subject:</span>
                        <span>{email[item].heading}</span>
                    </div>
                    <br/>
                    <div>
                        <span>Msg:</span>
                        <span>{email[item].body.replace(/<[^>]*>/g,"")}</span>
                    </div>
                    <br/>
                </li>
            );
        })}
    </ul>
 ) : (
 <p>
    No Email Found
    <button onClick={() => onSingleMailBackHandler()}>Back</button>
 </p>
 
 );
    
 const onSingleMailBackHandler = () => {
    setMail("");
    setShow(true);
 };

 const onSingleMailDeleteHandler = (data) => {
    setEmail(data);
    setMail("");
 };

 return(
        <Fragment>
           {!mail && emailList}
           {mail && (<><Mail
                 onClose={onSingleMailBackHandler}
                 onDelete={onSingleMailDeleteHandler}
                 data={mail}
                 setShow={setShow}
           /></>)}
        </Fragment>
    );
};

export default Outbox;