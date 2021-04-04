import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {useTransition, animated} from 'react-spring'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import Loader from '../Loader/loader'

import style from './sidenav.module.scss'

const SideNav = (props) => {

    // For getting the path name
    const router = useRouter()

    const [subMenu, toggleSubMenu] = useState(false)

    // Handle resize of screen etc.
    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        })
    
        useEffect(() => {
        if (typeof window !== 'undefined') {
            function handleResize() {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                })
            }

            window.addEventListener("resize", handleResize)
            handleResize()
    
            return () => window.removeEventListener("resize", handleResize)
        }
        }, [])
        return windowSize
    }

    const screenSize = useWindowSize()

    const transition = useTransition(subMenu, null, {
        from: { height: '0rem' },
        enter: { height: `${screenSize.width >= 600 ? '12rem' : '8rem'}` },
        leave: { height: '0rem' },
    })

    const displayLoader = () => {
        toggleLoader(true)
    }

    return (
        <div className={style.menuContainer}>
            <div className={style.navContainer}>
                {
                    props.showLoader
                    ? <Loader/>
                    : null
                }
                <a 
                    className={`${style.rocketLink} ${subMenu === true ? style.activeLink : null}`}
                    onClick={() => toggleSubMenu(!subMenu)}
                >Rockets <FontAwesomeIcon icon={['fas', 'angle-down']}/></a>
                {transition.map(({ item, key, props }) => 
                    item && 
                        <animated.div style={props}>
                            <div>
                                <Link href="/falcon-9">
                                    <a>Falcon 9</a>
                                </Link>
                                <Link href="/falcon-heavy">
                                    <a>Falcon Heavy</a>
                                </Link>
                                <Link href="/dragon-2">
                                    <a>Dragon 2</a>
                                </Link>
                                <Link href="/starship">
                                    <a>Starship</a>
                                </Link>
                            </div>
                        </animated.div>
                )}
                <Link href="/about">
                    <a
                        onClick={
                            router.pathname === '/about'
                            ? null
                            : () => props.showLoader(true)
                        }
                    >About</a>
                </Link>
                <Link href="/key-events">
                    <a
                        onClick={
                            router.pathname === '/key-events'
                            ? null
                            : () => props.showLoader(true)
                        }
                    >Key Events</a>
                </Link>
                <Link href="/launches">
                    <a
                        onClick={
                            router.pathname === '/launches'
                            ? null
                            : () => props.showLoader(true)
                        }
                    >Launches</a>
                </Link>
                <Link href="/land-pads">
                    <a
                        onClick={
                            router.pathname === '/land-pads'
                            ? null
                            : () => props.showLoader(true)
                        }
                    >Land Pads</a>
                </Link>
                <Link href="/missions">
                    <a
                        onClick={
                            router.pathname === '/missions'
                            ? null
                            : () => props.showLoader(true)
                        }
                    >Missions</a>
                </Link>
            </div>
            <div className={style.socialContainer}>
                <a href="#" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={['fab', 'twitter']}/>
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={['fab', 'youtube']}/>
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={['fab', 'instagram']}/>
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={['fab', 'flickr']}/>
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={['fab', 'linkedin-in']}/>
                </a>
                <AnchorLink href="#footer">Socials</AnchorLink>
            </div>
            <div className={style.circles}>
                <div className={style.circle1}></div>
                <div className={style.circle2}></div>
            </div>
        </div>
    )
}

export default SideNav