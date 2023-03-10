import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import paymentsBanner from './assets/payments-banner.png';
import shape1 from './assets/payments-shape-1.svg';
import shape2 from './assets/payments-shape-2.svg';
import tVideo from "./assets/shVideo.mp4"
import closeIcon from "./assets/close.png"
import { RiCloseCircleFill } from 'react-icons/ri';
// import ModalVideo from 'react-modal-video'
import "./Payments.css"

const Payments = () => {
    const [isOpen, setOpen] = useState(false)
  return (
    <section className="payments overflow-hidden bg-light py-7 section-gap text-center">
        <Container>
            <Row className='justify-content-center'>
                <Col lg="8" xl="8">
                    <div className="payments-content">
                        <div className="section-heading mb-5 mb-lg-7">
                            <h2 className="text-dark fw-bold lh-md fs-3xl fs-md-5xl mb-3">The fastest and better way to send and receive crypto & fiat payments around the world</h2>                         
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="payments-body position-relative">
                        <span className="shape-1"><img src={shape1} alt="" /></span>
                        <span className="shape-2"><img src={shape2} alt="" /></span>
                        <img src={paymentsBanner} alt="" className='p-1 p-lg-2 img-fluid border bg-white shadow rounded-5'/>
                        <div className='play-btn-icon text-light'><svg onClick={()=> setOpen(true)} stroke="currentColor" style={{cursor: "pointer"}} fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path></svg></div>
                        {/* <ModalVideo channel='youtube' youtube={{ autoplay: 1, mute:1 }} isOpen={isOpen} videoId="UxPkK8gW0hs" onClose={() => setOpen(false)} /> */}
                        <div className={`trailer ${isOpen ? "active" : ""}`}>
                            <video controls="true" loop muted autoPlay>
                                <source src={tVideo} type="video/mp4" />
                            </video>
                            {/* <img src={closeIcon} className='close' alt="" /> */}
                            <RiCloseCircleFill className='close' onClick={()=> setOpen(false)} />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>

    </section>
  )
}

export default Payments