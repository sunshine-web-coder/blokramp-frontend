import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import "./style.css"

const Flokramper = () => {
    const data = [
        { title: "Request and get API plug-in" },
    ]
    // const [website, setWebsite] = useState('');
    // const [companyName, setCompanyName] = useState('');
    // const [email, setEmail] = useState('');
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [loading, setLoading] = useState(false);

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     if (!website || !companyName || !email || !firstName || !lastName) {
    //       return toast.error('Please fill website, company name, email, first name and last name');
    //     }

    //     try{
    //         setLoading(true);
    //         const { data } = await axios.post(`/api/email`, {
    //             website,
    //             companyName,
    //             email,
    //             firstName,
    //             lastName,
    //           });
    //           setLoading(false);
    //           toast.success(data.message);

    //     } catch (err) {
    //         setLoading(false);
    //         toast.error(
    //             err.response && err.response.data.message
    //             ? err.response.data.message
    //             : err.message
    //         );
    //     }
    // };

  return (
    <section className='py-5 py-lg-7 section-gap flokramper'>
        <Container>
            <Row className='justify-content-center'>
                <Col lg="8" xl="7">
                    <div className="section-heading mb-5 mb-lg-6 text-center">
                        <h2 className="text-dark fw-bold fs-3xl fs-md-5xl mb-3">Customize Blokramp for your business</h2>
                        <p>Integrate Blokramp Widget on your website/platform in three easy steps</p>
                    </div>
                </Col>
            </Row>
            <Row className='gy-4 ddnnd'>
                <ToastContainer position="bottom-center" limit={1} />
                <Col lg="5">
                    {data && 
                    <div className="flokramper__testing">
                        <Accordion defaultActiveKey="accordion-0" className='d-flex flex-column gap-4'>
                            {data.map((item, i) =>(
                            <Accordion.Item key={i} eventKey={`accordion-${i}`} className="rounded-4 overflow-hidden">
                                <Accordion.Header><div className='fs-md fw-bold text-dark'>{i+1}. {item.title}</div></Accordion.Header>
                                <Accordion.Body>
                                    <form>
                                        <div className="form-group mb-3">
                                            <input onChange={(e) => setWebsite(e.target.value)} type="text" id='website' className='form-control' placeholder='Your website URL' />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input onChange={(e) => setCompanyName(e.target.value)} type="text" id='companyName' className='form-control' placeholder='Your company name' />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input onChange={(e) => setEmail(e.target.value)} type="email" className='form-control' placeholder='Your business email' />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input onChange={(e) => setFirstName(e.target.value)} type="text" id='firstName' className='form-control' placeholder='Your first name' />
                                        </div>
                                        <div className="form-group mb-4">
                                            <input onChange={(e) => setLastName(e.target.value)} type="text" id='lastName' className='form-control' placeholder='Your last name' />
                                        </div>
                                        <div className="form-group">
                                            <button type='submit'
                                            className="btn btn-primary shadow w-100 rounded-pill">
                                            Get API Key
                                            </button>
                                            {/* <button type='submit'
                                            className="btn btn-primary shadow w-100 rounded-pill">
                                            {loading ? 'Sending...' : 'Get API Key'}    
                                            </button> */}
                                        </div>
                                    </form>
                                </Accordion.Body>
                            </Accordion.Item>
                            ))}
                            <div className='fs-md fw-bold text-dark snKKN'>2. Copy & paste code to create widget</div>
                            <div className='fs-md fw-bold text-dark snKKN'>3. Start using integration</div>
                        </Accordion>
                    </div>}
                </Col>
                {/* <Col lg="7">
                    <div className="flokramper__frame">
                        <iframe src="//codepen.io/anon/embed/QWwdEed?height=550&amp;theme-id=1&amp;slug-hash=QWwdEed&amp;default-tab=js,result" height="767" scrolling="no" frameborder="0" allowfullscreen allowpaymentrequest name="CodePen Embed QWwdEed" title="CodePen Embed QWwdEed" class="rounded" style={{ width:'100%', overflow: 'hidden' }}>CodePen Embed Fallback</iframe>
                    </div>
                </Col> */}
            </Row>
        </Container>
    </section>
  )
}

export default Flokramper