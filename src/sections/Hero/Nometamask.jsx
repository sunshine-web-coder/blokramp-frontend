import React, { useState, useEffect }  from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import appStore from './assets/app-store.svg';
import playStore from './assets/play-store.svg';
import Xicon from '../FeesPricing/assets/xicon.png';
import AccpetPayments from './assets/accept.svg';
import { motion } from 'framer-motion';
import { Tab, Tabs } from 'react-bootstrap';
import Select, { components } from 'react-select';
import currencyUSD from './assets/currency-usd.svg';
import currencyBTC from './assets/currency-btc.svg';
import arrow from './assets/arrow-down.svg';
import shape1 from './assets/hero-shape-1.svg';
import shape2 from './assets/hero-shape-2.svg';
import shape3 from './assets/arrow-shape.svg';
import shape4 from './assets/hero-user.svg';
import currencyETH from './assets/ethereum.svg';
import currencyBNB from './assets/binance.svg';
import currencyUSDT from './assets/tether.svg';
import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';
import Buyemailandaddress from './Buyemailandaddress';








export default function Nometamask(props) {




    return (
        <div className="heroform card-body p-4 p-lg-5">
           <div className=' d-flex flex-column text-center mb-5' >
             <img src="/metamask.png" alt="" />
             <div className="">
                Install Metamask
             </div>
           </div>
           <div className='text-center'>
               <h6 className="text-dark fs-sm fw-light">We accept</h6>

               <img src={AccpetPayments} alt="" className='img-fluid'/>


           </div>
       </div>
   )
}