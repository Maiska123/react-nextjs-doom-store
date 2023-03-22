import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

interface Loading {
    loadingState: boolean
}

export default function LoadingIndicator(loadingState: Loading) {
    return (
        <> 
        <div className={styles.center}>
        {loadingState.loadingState ?
            <div className={styles.className}><h1>{"Loading...".toLocaleUpperCase()}</h1></div>
        :   <div className={styles.className}><h1>{"Loaded".toLocaleUpperCase()}</h1></div>
            }
            </div>
        </>
        )
}