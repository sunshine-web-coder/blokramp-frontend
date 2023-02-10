import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Col, Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css"

const Flokramper = () => {
    const data = [
        { title: "Request and get API plug-in" },
    ]
    const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (!website || !companyName || !email || !firstName || !lastName) {
        return toast.error('Please fill website, company name, email, first name and last name');
      } else{
        toast.success('Your message sent successfully');
      }

    emailjs.sendForm('service_jfvj0r5', 'template_xsfytrk', form.current, 'N-kPUBLLizOnu40nB')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      e.target.reset()
  };
  return (
    <section className='py-5 py-lg-7 section-gap flokramper'>
        <ToastContainer position="bottom-center" limit={1} />
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
                <Col lg="5">
                    {data && 
                    <div className="flokramper__testing">
                        <Accordion defaultActiveKey="accordion-0" className='d-flex flex-column gap-4'>
                            {data.map((item, i) =>(
                            <Accordion.Item key={i} eventKey={`accordion-${i}`} className="rounded-4 overflow-hidden">
                                <Accordion.Header><div className='fs-md fw-bold text-dark'>{i+1}. {item.title}</div></Accordion.Header>
                                <Accordion.Body>
                                    <form ref={form} onSubmit={sendEmail}>
                                        <div className="form-group mb-3">
                                            <input type="text" name='website' onChange={(e) => setWebsite(e.target.value)} className='form-control' placeholder='Your website URL' required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="text" name="companyName" onChange={(e) => setCompanyName(e.target.value)} className='form-control' placeholder='Your company name' required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Your business email' required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)} className='form-control' placeholder='Your first name' required />
                                        </div>
                                        <div className="form-group mb-4">
                                            <input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)} className='form-control' placeholder='Your last name' required />
                                        </div>
                                        <div className="form-group">
                                            <button type='submit' disabled={loading} className="btn btn-primary shadow w-100 rounded-pill">
                                            {loading ? 'Sending...' : 'Get API Key'}</button>
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