import React, { useContext } from 'react'
import { AiFillPlayCircle } from "react-icons/ai"
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'
import { motion } from 'framer-motion'


import { Loader } from './'
import { TransactionContext } from "../context/TransactionContext"
import { shortenAddress } from '../utils/shortenAddress'


const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="inputfield"
  />
)

const Welcome = () => {
  const { currentAccount, connectWallet, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext)

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData

    e.preventDefault()

    if (!addressTo || !amount || !keyword || !message) return

    sendTransaction()

  }


  return (
    <motion.div
      className="Welcome">
      <motion.h1
        animate={{
          x: ['100px', '0px']
        }}
        className='txt1 text-gradient'>Buy and Sell crypto<br /> using coinbile.</motion.h1>
      <p>Send Crypto around<br /> the world.</p>

      <div className="button">
        {!currentAccount && (
          <button type='button' className="btn" onClick={connectWallet}>Connect Wallet</button>
        )}

      </div>

      <motion.div
        class='design blue-glassmorphism'>
        Ethereum
      </motion.div>

      <div class='design2 blue-glassmorphism'>
        uniswap
      </div>

      <div class='design3 blue-glassmorphism'>
        Polygon
      </div>

      <div className="cardlist">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="card eth-card">
          <div className="icon">
            <SiEthereum className="eth-icon" />
            <BsInfoCircle className="info-icon" />
          </div>
          <div className="info">
            <h5>{shortenAddress(currentAccount)}</h5>
            <h3>Ethereum</h3>

          </div>


        </motion.div>
      </div>

      <div className='in'>
        <motion.div className="inputs blue-glassmorphism">
          <Input placeholder="  Address To" name="addressTo" type="text" handleChange={handleChange} />
          <Input placeholder="  Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
          <Input placeholder="  Keyword (GIF)" name="keyword" type="keyword" handleChange={handleChange} />
          <Input placeholder="  Enter Message" name="message" type="text" handleChange={handleChange} />


          <hr />

          {isLoading ? (
            <Loader />

          ) : (
            <button className="bbn" onClick={handleSubmit}>Send</button>
          )}

        </motion.div>
      </div>
    </motion.div>

  )
}

export default Welcome