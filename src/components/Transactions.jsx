import React, { useContext } from 'react'

import { TransactionContext } from '../context/TransactionContext'

import { motion } from 'framer-motion'


import dummyData from '../utils/dummyData'
import { shortenAddress } from '../utils/shortenAddress'

const TransactionCard = ({ addressTo, addressFrom, timestamp, keyword, amount, url, message }) => {
  return (
    <div className='card3'>
      <motion.div
        animate={{
          x: ['100px', '0px']
        }}
        className='transactCard white-glassmorphism'>
        <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target='_blank' rel='noopener noreferror'>
          <p className=''>From: {shortenAddress(addressFrom)}</p>

        </a>

        <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target='_blank' rel='noopener noreferror'>
          <p className=''>To: {shortenAddress(addressTo)}</p>

        </a>

        <p className=''>Amount: {amount} ETH</p>

        {message && (
          <>
            <br />
            <p className=''>Message: {message}</p>
          </>
        )}

        <div className='timestamp'>
          <p className=''>{timestamp}</p>
        </div>
      </motion.div>
    </div>
  )
}

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext)

  return (
    <div className='bg-transactions'>
      <div className='cardtransact'>
        {currentAccount ? (
          <h2>Latest Transactions</h2>
        ) : (
          <h2>Connect Your Account to see latest transactions</h2>
        )}

      </div>

      <div className='card3'>
        {[...dummyData, ...transactions].reverse().map((transaction, i) => (
          <TransactionCard key={i} {...transaction} />
        ))}
      </div>

    </div>
  )
}

export default Transactions