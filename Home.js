import React from 'react';
import LoginForm from './LoginForm';
import Banner from './Banner';
import { Row, Col, Container } from 'react-bootstrap';
const Home = () => {
    return (
        <div className="bodyWrapper">
            <Container>
                <Row className="align-items-center">
                    <Col md="4">
                        <LoginForm/>
                    </Col>
                    <Col md="8" >
                        <Banner/>
                    </Col>
                </Row>
            </Container>
        </div>
     );
}
 
export default Home;