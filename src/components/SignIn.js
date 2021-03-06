import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import kakaoLoginButton from 'images/kakao_login.png'
import naverLoginButton from 'images/naver_login.png'
import './SignUp.css'




const SighIn = ({ onClickSubmit, msg, success }) => {
    if (success){ //로딩이 완료되었고, 로그인이 성공적으로 됐다면
        return(
            <Redirect to="/"/>
        );
    }
    return (
        <Container>
            <Row id="title">
                <Col>
                    <h1>로그인</h1>
                </Col>
            </Row>
            <Form onSubmit={onClickSubmit}>
                <Form.Group controlId="userId"  >
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="text" placeholder="아이디를 입력하세요" />
                </Form.Group>
                <Form.Group controlId="userPw" >
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호를 입력하세요."/>
                </Form.Group>
                <div style={{"color": "red"}}>
                    {msg}
                </div>
                <Button variant="outline-secondary" type="submit" size="lg" block>
                    로그인
                </Button>
                <div className="hr-sect">소셜 로그인</div>
                <div className="social-login-div">
                    <a href="https://kauth.kakao.com/oauth/authorize?client_id=656c5afa5455de8f5ad9eb51e09e3720&redirect_uri=http://dognas.ipdisk.co.kr/sociallogin?provider=kakao&response_type=code"><img width="400" src={kakaoLoginButton} alt="kakaoLogin" /></a>
                    <a href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=sUyp7Y2KoOfRvdsAEdCc&redirect_uri=http://dognas.ipdisk.co.kr/sociallogin?provider=naver&state=hLiDdL2uhPtsftcU"><img width="400" src={naverLoginButton} alt="naverLogin" /></a>

                </div>
                
                
            </Form>
        </Container>
)
};

export default SighIn;