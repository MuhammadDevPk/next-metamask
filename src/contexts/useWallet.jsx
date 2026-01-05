import React, { createContext, useContext, useEffect, useState } from 'react'

const { ethereum } = typeof window !== 'undefined' ? window : {}

const WalletContext = createContext({
    account: undefined,
    error: undefined,
    connect: () => {},
})

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null)
    const [error, setError] = useState(null)

    const isEthereumExists = () => {
        if(!ethereum){
            return false
        }
        return true
    }

    const checkWalletConnection = async () => {
        if(isEthereumExists()) {
            try {
                const accounts = await ethereum.request({ method: 'eth_accounts'})
                if (accounts.length > 0) {
                    setAccount(accounts[0])
                } else {
                    setError("No Account Found")
                }
            } catch (error) {
                setError(error.message || "An error occurred")
            }
        }
    }

    const connect = async () => {
        if (isEthereumExists) {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
                if (accounts.length > 0) {
                    setAccount(accounts[0])
                } else {
                    setError("No Account Found")
                }
            } catch (error) {
                setError(error.message || "An error occurred")
            }
        } else {
            setError("Please Install Metamask")
        }
    }

    useEffect(() => {
        checkWalletConnection()
    }, [checkWalletConnection])

    return (
        <WalletContext.Provider value={{ account, connect, error}}>
            {children}
        </WalletContext.Provider>
    )
}

const useWallet = () =>useContext(WalletContext)

export default useWallet