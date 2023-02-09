import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import appstore from '../../assets/app-store.svg';
import googleplay from '../../assets/google-play.svg';
import Shape1 from './assets/footer-shape-1.svg';
import Shape2 from './assets/footer-shape-2.svg';

// Social Icons
import socialTwitter from '../../assets/social/twitter.svg';
import socialFacebook from '../../assets/social/facebook.svg';
import socialLinkedin from '../../assets/social/linkedin.svg';
import socialGithub from '../../assets/social/github.svg';
import socialVectory from '../../assets/social/vector.svg';
import socialBall from '../../assets/social/ball.svg';
import { FaTelegramPlane, FaTwitter, FaInstagram, FaYoutube, FaMediumM } from 'react-icons/fa';
import "./Footer.css"

const Footer = () => {
    const data = {
        menu: [
            {
                name: 'Overview',
                url: '/overview',
            },
            {
                name: 'Features',
                url: '/features',
            },
            {
                name: 'Pricing',
                url: '/pricing',
            },
            {
                name: 'Careers',
                url: '/careers',
            },
            {
                name: 'Help',
                url: '/help',
            },
            {
                name: 'Privacy',
                url: '/privacy',
            },
        ],
        social: [
            {
                name: 'Twitter',
                icon: socialTwitter,
                url: 'https://twitter.com/',
            },
            {
                name: 'Facebook',
                icon: socialFacebook,
                url: 'https://facebook.com/',
            },
            {
                name: 'Linkedin',
                icon: socialLinkedin,
                url: 'https://linkedin.com/',
            },
            {
                name: 'Github',
                icon: socialGithub,
                url: 'https://github.com/',
            },
            {
                name: 'Vectory',
                icon: socialVectory,
                url: 'https://github.com/',
            },
            {
                name: 'socialBall',
                icon: socialBall,
                url: 'https://twitter.com/',
            },
        ]
    }
  return (
    <footer className='footer pt-6 pb-4'>
        <img src={Shape1} alt="Shape1" className="shape-1"/>
        <img src={Shape2} alt="Shape2" className="shape-2"/>
        <Container>
            <Row className='gy-4 gx-lg-5 gx-xl-6'>
                <Col md="6" lg="3" xl="4">
                    <div className="footer-widget pe-xl-4">
                        <div className="mb-3 mb-lg-4">
                            <img src={logo}/>
                        </div>
                        <div className="fs-xs" style={{ '--bs-font-size' : '15px' }}>
                            <p className='mb-4'>Blokramp is an on-and-off-ramp solution tailored for individual and institutional usage. Our Whitelabel on-ramp solution is designed to scale your business.</p>
                            <div>© Copyright 2023, All Rights Reserved</div>
                        </div>
                    </div>
                </Col>
                <Col md="6" lg="3" xl="3">
                    <div className="footer-widget">
                        <h5 className='text-dark fw-regular mb-4 mb-lg-5 fs-md'>Contacts</h5>

                        <ul className="list-unstyled d-flex flex-column gap-3 fs-xs">
                            <li><Link to={'/'} className="text-muted">Live chat</Link></li>
                            <li><Link to='mailto:support@blokramp.com' className="text-muted">support@blokramp.com</Link></li>
                        </ul>

                    </div>
                </Col>
                <Col md="6" lg="3" xl="3">
                    <div className="footer-widget">
                        <h5 className='text-dark fw-regular mb-4 mb-lg-5 fs-md'>About</h5>

                        <ul className="list-unstyled d-flex flex-column gap-3 fs-xs">
                            <li><Link to={'/'} className="text-muted">Audit</Link></li>
                            <li><Link to='https://blokramp.gitbook.io/blokramp-litepaper/blockramp-token-brmp-tokenomics' className="text-muted">Tokenomics</Link></li>
                            <li><Link to={'/'} className="text-muted">SAFU</Link></li>
                            <li><Link to={'/'} className="text-muted">DOXX</Link></li>
                        </ul>

                    </div>
                </Col>
                <Col md="6" lg="3" xl="2">
                    <div className="footer-widget">
                        <h5 className='text-dark fw-regular mb-4 mb-lg-5 fs-md'>Social</h5>

                        <div className="social_link">
                          <a href='https://t.me/blokramp' className="text-muted"><FaTelegramPlane /></a>
                          <Link to='https://twitter.com/Blokramp_inc?t=oofMcdHjFQyE2mcH8o8f9A&s=09' className="text-muted"><FaTwitter /></Link>
                          <Link to='https://www.instagram.com/blokramp_inc' className="text-muted"><FaInstagram /></Link>
                          <Link to='https://youtube.com/@blokramp' className="text-muted"><FaYoutube /></Link>
                          <Link to='/' className="text-muted"><FaMediumM /></Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer