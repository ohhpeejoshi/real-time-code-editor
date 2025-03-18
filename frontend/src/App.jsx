import { useState } from 'react';
import './App.css'
import io from 'socket.io-client'
import Editor from '@monaco-editor/react';

const socket = io('http://localhost:3000');

const App = () => {
    const [joined, setJoined] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [userName, setUserName] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("console.log('Hello World!')");

    const joinRoom = () => {
        if (roomId && userName) {
            socket.emit('join', { roomId, userName });
            setJoined(true);
        }
    }

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        alert('Room Id copied to clipboard');
    }

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    }

    if (!joined) {
        return (
            <div className='join-container'>
                <div className="join-form">
                    <h1>Join Code Room</h1>
                    <input type="text" placeholder='Room Id' value={roomId} onChange={(e) => { setRoomId(e.target.value) }} />
                    <input type="text" placeholder='Your Name' value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            </div>
        );
    }

    return <div className='editor-container'>
        <div className="sidebar">
            <div className="room-info">
                <h2>Room: {roomId}</h2>
                <button onClick={copyRoomId} className='copy-button'>Copy Id</button>
            </div>
            <h3>Users in Room:</h3>
            <ul id="users">
                <li>arpit</li>
                <li>ram</li>
            </ul>
            <p className='typing-indicator'>User Typing...</p>
            <select className='language-selector'>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
            </select>

            <button className='leave-button'>Leave Room</button>

        </div>

        <div className="editor-wrapper">
            <Editor
                height="100%" // remove the quotes from the height property
                defaultLanguage={language}
                value={code}
                onChange={handleCodeChange}
                theme='vs-dark'
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    fontSize: 18
                }}
            />

        </div>
    </div>;

};

export default App;
