import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { HiMenuAlt4 } from 'react-icons/hi'

const NavBarItem = ({ title, classprops }) => (
    <li className={`li ${classprops}`}>{title}</li>
)

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <div className='nav'>
            <h1>Coinbile</h1>

            <ul>
                {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                    <NavBarItem key={item + index} title={item} />
                ))}

                <button>Sign in</button>
            </ul>

            <div className='nav2'>
                {!toggleMenu && (
                    <HiMenuAlt4 className='open' onClick={() => setToggleMenu(true)} />
                )}
                {toggleMenu && (
                    <ul className='ul2 '>
                        <li className='li2'>
                        <AiOutlineClose className='close' onClick={() => setToggleMenu(false)} />
                            {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                                <NavBarItem key={item + index} title={item} />
                            ))}

                        </li>
                    </ul>
                )}

            </div>

        </div>
    )
}

export default Navbar