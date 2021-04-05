import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useTransition, animated} from 'react-spring'
import { useRouter } from 'next/router'

import SideNav from './SideNav'
import Loader from '../Loader/loader'

import style from './header.module.scss'

const Header = () => {

    const [nav, setNav] = useState(false)
    const [loader, showLoader] = useState(false)

    // For getting the path name
    const router = useRouter()

    const transition1 = useTransition(nav, null, {
        from: { opacity: '0', transform: 'translateX(-20rem)'},
        enter: { opacity: '1', transform: 'translateX(0)'},
        leave: { opacity: '0', transform: 'translateX(-20rem)'},
    })

    const transition2 = useTransition(nav, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    useEffect(function mount() {
        function onScroll() {
            setNav(false)
        }

        window.addEventListener("scroll", onScroll)

        return function unMount() {
            window.removeEventListener("scroll", onScroll)
        }
    })

    return (
        <header className={style.header}>
            {transition2.map(({ item, key, props }) => 
                item && 
                    <animated.div style={props}>
                        <div 
                            className={style.backdrop}
                            onClick={() => setNav(!nav)}
                            onScroll={() => setNav(!nav)}
                        ></div>
                    </animated.div>
            )}
            {transition1.map(({ item, key, props }) => 
                item && <animated.div style={props}><SideNav loader={loader} showLoader={showLoader}/></animated.div>
            )}
            <div className="container">
                {
                    loader
                    ? <Loader/>
                    : null
                }
                <div className={style.headerContent}>
                    <div className={style.mainLinks}>
                        <Link href="/">
                            <a
                                onClick={
                                    router.pathname === '/'
                                    ? null
                                    : () => showLoader(true)
                                }
                            >
                                <Image 
                                    src="/images/logo.png"
                                    width={200}
                                    height={27}
                                />
                            </a>
                        </Link>
                        <div>
                            <Link href="/falcon-9">
                                <a
                                    onClick={
                                        router.pathname === '/falcon-9'
                                        ? null
                                        : () => showLoader(true)
                                    }
                                >Falcon 9</a>
                            </Link>
                            <Link href="/falcon-heavy">
                                <a
                                    onClick={
                                        router.pathname === '/falcon-heavy'
                                        ? null
                                        : () => showLoader(true)
                                    }
                                >Falcon Heavy</a>
                            </Link>
                            <Link href="/dragon-2">
                                <a
                                    onClick={
                                        router.pathname === '/dragon-2'
                                        ? null
                                        : () => showLoader(true)
                                    }
                                >Dragon 2</a>
                            </Link>
                            <Link href="/starship">
                                <a
                                    onClick={
                                        router.pathname === '/starship'
                                        ? null
                                        : () => showLoader(true)
                                    }
                                >Starship</a>
                            </Link>
                        </div>
                    </div>

                    <div 
                        class={`${style.barsCross} ${nav ? style.open : null}`}
                        onClick={() => setNav(!nav)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>     
                </div>
            </div>
        </header>
    )
}

export default Header