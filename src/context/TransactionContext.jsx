import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { BrowserProvider } from 'ethers'

import { contractABI, contractAddress } from '../utils/constants'


export const TransactionContext = React.createContext()

const { ethereum } = window

const getEthereumContract = () => {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    return transactionContract
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' })
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask")
            const transactionContract = getEthereumContract()

            const availableTransactions = transactionContract.getAllTransactions()

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: transaction.parseInt(transaction.amount._hex) * (10 ** 18)
            }));

            console.log(structuredTransactions);

            setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error)



        }
    }

    const checkifWalletisConnected = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask")

            const accounts = await ethereum.request({ method: "eth_accounts" })

            console.log(accounts)


            if (accounts.length) {
                setCurrentAccount(accounts[0])

                getAllTransactions()

            } else {
                console.log("No accounts found")
            }

        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object")

        }
    }

    const checkIfTransactionsExist = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask")

            const transactionContract = getEthereumContract()

            const transactionCount = transactionContract.getTransactionCount()

            window.localStorage.setItem('transactionCount', transactionCount)
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object.")
        }
    }


    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask")

            const accounts = await ethereum.request({ method: "eth_requestAccounts" })

            setCurrentAccount(accounts[0])

            window.location.reload()
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object.")

        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask")

            const { addressTo, amount, keyword, message } = formData

            const transactionContract = getEthereumContract()
            //const parsedAmount = ethers.parseEther(amount)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: amount,
                }]
            })

            const transactionHash = transactionContract.addToBlockchain(addressTo, amount, keyword, message)
            console.log(transactionHash)

            setIsLoading(true)
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait()

            setIsLoading(false)
            console.log(`Success - ${transactionHash.hash}`)

            const transactionCount = transactionContract.getTransactionCount()

            setTransactionCount(transactionCount.toNumber())

        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object")
        }
    }


    useEffect(() => {
        checkifWalletisConnected()
        checkIfTransactionsExist()
    }, [transactionCount])

    return (
        <TransactionContext.Provider value={{ connectWallet, sendTransaction, currentAccount, formData, setFormData, handleChange, transactions, isLoading }}>
            {children}
        </TransactionContext.Provider>
    )

}