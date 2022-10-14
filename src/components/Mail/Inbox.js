import React,{useEffect, useState} from "react";
import { Fragment } from "react";
import Mail from "./Mail";

const Inbox = (props) => {

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
           console.log(data, "inbox");
       });
    },[show]);

   useEffect(() => {
    let arr = [];
    for (let key in email) {
        if( email[key].isRead === true){
            arr.push(email[key].isRead);
        }
     }
     props.setToCount(arr.length);
   },[email, show]);


    console.log(show, 'inbox');
   
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
                       <div
                       
                        style={{
                            backgroundColor: email[item].isRead === true ? "blue" : "white",
                            height: "10px",
                            width: "10px",
                            marginTop: "7px",
                            border: "1px solid black"
                        }}
                        ></div>
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
   console.log(email, 'email');
    console.log(mail, 'mail');
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

export default Inbox;