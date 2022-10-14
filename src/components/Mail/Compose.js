import React from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { v4 } from "uuid";
import { useState, useRef } from "react";
import './Compose.css';

const Compose = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const toEmailRef = useRef();
  const emailHeadingRef = useRef();

  const onEditorChange = (currEditorState) => {
  setEditorState(currEditorState);
  };

  const sendMailHandler = () => {
    const emailData = {
     from: "",
     to: toEmailRef.current.value,
     heading: emailHeadingRef.current.value,
     body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
     isRead: true,
     id: v4(),
    };
    console.log(emailData);

    fetch(`https://mail-box-7607c-default-rtdb.firebaseio.com/sentemails.json`,
    {
        method: 'POST',
        body: JSON.stringify(emailData),
        headers: {
            "Content-type": "application/json",
        },
    }
    ).then((res) => {
        console.log(res);
        if(res.ok){
            alert("Send to database");
            return res.json();
        }
    });
       toEmailRef.current.value = "";
    emailHeadingRef.current.value = ""; 
    setEditorState(EditorState.createEmpty());
  };

  return(
       <div>
        <label>To:</label>
        <input type='email' required  ref={toEmailRef}/>
        <br/>
        <label>Heading:</label>
        <input type="text" ref={emailHeadingRef}/>
        <br/>
        <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorChange}
       />
       <button onClick={sendMailHandler}>Send</button>
       </div>
        
    );
}; 

export default Compose;