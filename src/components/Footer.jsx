import React from 'react'

const FooterItem = ({ title }) => (
  <div className='footerItems'>
    <div className='list'>{title}</div>
    <div className='list'>{title}</div>
    <div className='list listp'>{title}</div>
  </div>
)

const Footer = () => {
  return (
    <div className='footer'>
      <h1>Coinbile</h1>

      {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
        <FooterItem key={index + item} title={item} />


      ))}

      <p className='footerP'>Built with 💖 by Esan Samuel </p>
    </div>
  )
}

export default Footer