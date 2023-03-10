import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { motion } from "framer-motion";
import Xicon from './assets/xicon.png';



const FeesPricing = () => {
    const data = [
        { title: "White labelling", price: "$21.32", },
        { title: "Offline crypto transfer", price: "$21.32", },
        { title: "Stable coin launch", price: "$21.32", },
        { title: "Blok pool", price: "$21.32", },
    ]

  return (
    <section className='feespricing section-gap py-7 bg-light'>
        <Container>
            <Row className="gy-6 align-items-center">
                <Col lg="6" xl="6">
                    <div className='card-body ps-lg-6 text-center text-lg-start'>
                        <h2 className="text-dark fw-bold fs-3xl fs-md-5xl mb-3">Blokramp Token</h2>
                        <div className="mb-4 mb-lg-5">
                            <p>The Blokramp is the token used in the Blok ecosystem and will be extensively used to process transactions, governance on the network, back our stable coin and in the Blok pool to provide liquidity.</p>
                        </div>
                        <a target="_blank" href="https://www.pinksale.finance/launchpad/0xc4351CdF4d91903C0Ab250694F92C2a9Ff382be8?chain=BSC"><button className="btn btn-primary rounded-pill shadow fw-bold">Buy</button></a>
                    </div>
                </Col>
                <Col lg="6" xl="6" className='order-lg-first'>
                    <motion.div className="pricebox position-relative"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.8 }}
                            >
                        <div className="card rounded-4 shadow">
                            <div className="card-body p-4 p-lg-5">
                                <h3 className='fs-lg fs-lg-2xl text-dark fw-bold'>Top Anticipated products</h3>
                                <hr className='border-dark border-opacity-25 my-4'/>
                                <ul className="list-unstyled fs-sm fs-lg-lg fw-bold mb-5 d-flex flex-column gap-4">
                                    {data && data.map((item, i) =>(
                                    <motion.li key={i} className='d-flex align-items-center gap-3 gap-4'
                                        initial={{ 
                                            opacity: 0,
                                            y: 100,
                                        }}
                                        whileInView={{ 
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        {item.title && <div className='text-dark'>{item.title}</div>}
                                        {/* {item.price &&<div className='ms-auto text-primary'>{item.price}</div>} */}
                                    </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="pricebox__float">
                            <motion.div className="card shadow rounded-4 text-center" 
                            variants={{
                                offscreen: { y: 300},
                                onscreen: { y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 }
                                }
                            }}>
                                <div className="card-body p-4 px-lg-5">
                                    <h5 className='mb-3 mb-lg-4 fw-bold text-dark fs-sm fs-lg-xl'>The future of Digital finance:</h5>
                                    <div className="mb-4 mb-lg-5">
                                        <h6 className="text-success fs-xs fs-lg-sm fw-light mb-2">Learn more</h6>
                                        {/* <h4 className="fw-bold text-dark fs-sm fs-lg-md">BTC 0.0156635</h4> */}
                                    </div>
                                    <a href="https://blokramp.gitbook.io/blokramp-litepaper/road-map"><div className='pricebox__btn btn-dark'>Road Map</div></a>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default FeesPricing