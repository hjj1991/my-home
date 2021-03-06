import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import './SignUp.css'




const SighUp = ({ signUpSubmit, checkUserValue, validationData, isOk }) => {

    if(isOk === true)
        alert("회원가입이 성공하였습니다.");
    // return (
    return isOk ?
    (<Redirect to="/"/>) : (
        <Container>
            <Row id="title">
                <Col>
                    <h1>회원가입</h1>
                </Col>
            </Row>
            <Form onSubmit={signUpSubmit}>
                <Form.Group controlId="userId" onBlur={checkUserValue} >
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="text" placeholder="아이디를 입력하세요" />
                    <div style={{"color": validationData.idFontColor}}>
                        {validationData.idCheckMessage}
                    </div>
                </Form.Group>
                <Form.Group controlId="userPw" onChange={checkUserValue}>
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호를 입력하세요."/>
                    <div style={{"color": validationData.pwFontColor}}>
                        {validationData.pwCheckMessage}
                    </div>
                </Form.Group>
                <Form.Group controlId="userPw2" onChange={checkUserValue}>
                    <Form.Label>비밀번호확인</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호를 입력하세요."/>
                    <div style={{"color": validationData.pw2FontColor}}>
                        {validationData.pw2CheckMessage}
                    </div>
                </Form.Group>
                <Form.Group controlId="userName" onChange={checkUserValue} >
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" placeholder="이름을 입력하세요" />
                    <div style={{"color": validationData.nameFontColor}}>
                        {validationData.nameCheckMessage}
                    </div>
                </Form.Group>
                <Form.Group controlId="userEmail">
                    <Form.Label>이메일 주소</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Button style={{marginBottom: "10px"}} variant="outline-secondary" type="submit" size="lg" block>
                    회원가입
                </Button>
            </Form>
            <div></div>
        </Container>
    );
};

export default SighUp;