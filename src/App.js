import { useEffect, useState } from "react";
import { QRCode } from "react-qr-svg";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import {
    disconnectSocket,
    initiateSocket,
    subscribeToLogin,
    subscribeToData,
    requireChat,
} from "./socket/Socket";
import "./App.scss";

function App() {
    const [requiredQr, setRequiredQr] = useState(false);
    const [accessCode, setAccessCode] = useState("");

    const [allChats, setAllChats] = useState([]);

    const [chats, setChats] = useState([]);

    useEffect(() => {
        initiateSocket();

        subscribeToLogin((data) => {
            setAccessCode(data);
            setRequiredQr(true);
        });

        subscribeToData((data) => {
            setAllChats(data);
            setRequiredQr(false);
        });

        return () => disconnectSocket();
    }, []);

    const handleChatSelected = (e) => {
        requireChat(e, (mensajes) => {
            setChats(mensajes);
        });
    };

    return (
        <Container fluid style={{}}>
            <Navbar fixed="top" style={{ backgroundColor: "#ef4b4c" }}>
                <Navbar.Brand href="#home">WhatsUp</Navbar.Brand>
            </Navbar>

            <Row style={{ height: "100vh" }}>
                <Col md="3" className="sidebar">
                    <ul>
                        {allChats.map((item) => (
                            <li onClick={() => handleChatSelected(item)}>
                                <div className="wrap">
                                    <div class="meta">
                                        <p class="name">{item.name}</p>
                                        <p class="preview">
                                            {item.unreadCount}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Col>

                <Col md="9">
                    {chats.map((item) => {
                        <h3>{item.body}</h3>;
                    })}
                </Col>
            </Row>

            <Modal show={requiredQr}>
                <Modal.Body>
                    <QRCode
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="Q"
                        style={{ width: 256 }}
                        value={accessCode}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default App;
