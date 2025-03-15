import { useState } from 'react';
import './App.css'
import io from 'socket.io-client'

const socket = io('http://localhost:3000');

const App = () => {
    const [joined, setJoined] = useState(false)

    if (joined === true) {
        return <div>App not joined</div>;
    }

    return <div>Not Joined</div>;

};

export default App;
