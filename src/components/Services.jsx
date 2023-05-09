import React from 'react'
import { BsShieldFillCheck } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'
import { RiHeart2Fill } from 'react-icons/ri'

import { motion } from 'framer-motion'

const ServiceCard = ({ title, icon, subtitle }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ rotate: 360, scale: 1 }}
    transition={{
      type: 'spring',
      stiffness: 260,
      damping: 20,
    }}
    className='servicedesign white-glassmorphism' >
    <div className='icon'>
      {icon}
    </div>
    <div className='text'>
      <h4>{title}</h4><br />
      <h6>{subtitle}</h6>
    </div>
  </motion.div>
)

const Services = () => {
  return (
    <div className='bg-services'>
      <div className='text2'>
        <h1 className='txt2 text-gradient'>Services that we <br /> offer</h1>
        <p className='pp'>The best choice for buying and selling your <br />cryto assets, with the various super <br />friendly service we offer.</p>
      </div>

      <div className='serviceCard'>
        <ServiceCard
          title='Security Guaranteed'
          subtitle='Your security are 100% guaranteed by us'
          icon={<BsShieldFillCheck className='icon1' />}
        />

        <ServiceCard
          title='Best exchange rates'
          subtitle='Your security are 100% guaranteed by us'
          icon={<BiSearchAlt className='icon2' />}
        />

        <ServiceCard
          title='Fastest transactions'
          subtitle='Your security are 100% guaranteed by us'
          icon={<RiHeart2Fill className='icon3' />}
        />
      </div>
    </div>

  )
}

export default Services