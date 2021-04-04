import { useState } from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'moment'
import {useTransition, animated} from 'react-spring'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import style from '../styles/rocket.module.scss'

export default function Dragon2 ({ dragon }) {

    const [activeNav, setActiveNav] = useState('overview')

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function getFirstSentence(str) {
        const regex = /^(.*?)[.?!]\s/
        let m

        if ((m = regex.exec(str)) !== null) {
            return m[0]
        }
    }

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
     }

    const getTitle = () => {
        if (activeNav === 'overview') {
            return 'Overview'
        } else if (activeNav === 'first') {
            return 'First Thruster'
        } else if (activeNav === 'second') {
            return 'Second Thruster'
        }
    }

    const transition1 = useTransition(activeNav === 'overview', null, {
        from: { transform: 'translate(10rem)', opacity: '0' },
        enter: { transform: 'translate(0)', opacity: '1' },
        leave: { transform: 'translate(10rem)', display: 'none' },
    })

    const transition2 = useTransition(activeNav === 'first', null, {
        from: { transform: 'translate(10rem)', opacity: '0' },
        enter: { transform: 'translate(0)', opacity: '1' },
        leave: { transform: 'translate(10rem)', display: 'none' },
    })

    const transition3 = useTransition(activeNav === 'second', null, {
        from: { transform: 'translate(10rem)', opacity: '0' },
        enter: { transform: 'translate(0)', opacity: '1' },
        leave: { transform: 'translate(10rem)', display: 'none' },
    })

    const overviewContent = () => {
        return (
            <div>
                <div class={style.stats}>
                    <div>
                        <strong>First Flight: </strong> <span>{Moment(dragon.first_flight, "YYYY-MM-DD").format("Do MMMM, YYYY")}</span>
                    </div>
                    <div>
                        <strong>Crew Capacity: </strong> <span>{dragon.crew_capacity}</span>
                    </div>
                    <div>
                        <strong>Diameter: </strong> <span>{dragon.diameter.meters}m<span> / {dragon.diameter.feet}ft</span></span>
                    </div>
                    <div>
                        <strong>Dry Mass: </strong> <span>{numberWithCommas(dragon.dry_mass_kg)}kg<span> / {numberWithCommas(dragon.dry_mass_lb)}lb</span></span>
                    </div>
                    <div>
                        <strong>Launch Payload Mass: </strong> <span>{numberWithCommas(dragon.launch_payload_mass.kg)}kg<span> / {numberWithCommas(dragon.launch_payload_mass.lb)}lb</span></span>
                    </div>
                    <div>
                        <strong>Launch Payload Volume: </strong> <span>{numberWithCommas(dragon.launch_payload_vol.cubic_meters)}m<sup>3</sup><span> / {numberWithCommas(dragon.launch_payload_vol.cubic_feet)}ft<sup>3</sup></span></span>
                    </div>
                </div>
            </div>
        )
    }

    const firstThrusterContent = () => {
        return (
            <div>
                <div class={style.stats}>
                    <div>
                        <strong>Amount: </strong> <span>{dragon.thrusters[0].amount}</span>
                    </div>
                    <div>
                        <strong>First Type of Fuel: </strong> <span>{titleCase(dragon.thrusters[0].fuel_1)}</span>
                    </div>
                    <div>
                        <strong>Second Type of Fuel: </strong> <span>{titleCase(dragon.thrusters[0].fuel_2)}</span>
                    </div>
                    <div>
                        <strong>Pods: </strong> <span>{dragon.thrusters[0].pods}</span>
                    </div>
                    <div>
                        <strong>Thrust: </strong> <span>{numberWithCommas(dragon.thrusters[0].thrust.kN)}kN<span> / {numberWithCommas(dragon.thrusters[0].thrust.lbf)}lbf</span></span>
                    </div>
                    <div>
                        <strong>Type: </strong> <span>{dragon.thrusters[0].type}</span>
                    </div>
                </div>
            </div>
        )
    }

    const SecondThrusterContent = () => {
        return (
            <div>
                <div class={style.stats}>
                    <div>
                        <strong>Amount: </strong> <span>{dragon.thrusters[1].amount}</span>
                    </div>
                    <div>
                        <strong>First Type of Fuel: </strong> <span>{titleCase(dragon.thrusters[1].fuel_1)}</span>
                    </div>
                    <div>
                        <strong>Second Type of Fuel: </strong> <span>{titleCase(dragon.thrusters[1].fuel_2)}</span>
                    </div>
                    <div>
                        <strong>Pods: </strong> <span>{dragon.thrusters[1].pods}</span>
                    </div>
                    <div>
                        <strong>Thrust: </strong> <span>{numberWithCommas(dragon.thrusters[1].thrust.kN)}kN<span> / {numberWithCommas(dragon.thrusters[1].thrust.lbf)}lbf</span></span>
                    </div>
                    <div>
                        <strong>Type: </strong> <span>{dragon.thrusters[1].type}</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <SEO 
                title={dragon.name} 
                description={getFirstSentence(dragon.description)}
                index="index"
                follow="follow"
            />
            <Layout>
                <div className={style.Dragon2Banner}>
                    <div className="container banner-container">
                        <div className="double-grid">
                            <div>
                                <h1>{dragon.name}</h1>
                                <h2>{getFirstSentence(dragon.description)}</h2>
                                <AnchorLink className="cta" href="#info"><span>Learn more</span></AnchorLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="info" className={style.info}>
                    <div className="container">
                        <div className={style.rocketGrid3}>
                            <img src="images/dragon-2.png"/>
                            <div>
                                <div className={style.navigation}>
                                    <div>
                                        <div 
                                            className={`${style.num} ${activeNav === 'overview' ? style.activeNum : null}`}
                                            onClick={() => setActiveNav('overview')}
                                        >
                                            <span><FontAwesomeIcon icon={['fas', 'space-shuttle']}/></span>
                                        </div>
                                        <h3>Overview</h3>
                                    </div>
                                    <div>
                                        <div 
                                            className={`${style.num} ${activeNav === 'first' ? style.activeNum : null}`}
                                            onClick={() => setActiveNav('first')}
                                        >
                                            <span>1</span>
                                        </div>
                                        <h3>First Thruster</h3>
                                    </div>
                                    <div>
                                        <div 
                                            className={`${style.num} ${activeNav === 'second' ? style.activeNum : null}`}
                                            onClick={() => setActiveNav('second')}
                                        >
                                            <span>2</span>
                                        </div>
                                        <h3>Second Thruster</h3>
                                    </div>
                                </div>
                                <div className={style.content}>
                                    <div class={style.spaceBetween}>
                                        <div>
                                            <p className={style.rocketName}>{dragon.name}</p>
                                            <h3 className={style.title}>
                                                {getTitle()}
                                            </h3>
                                        </div>
                                        <div className={style.right}>
                                            {
                                                dragon.active ? 
                                                <span className={style.statusActive}>Active</span> :
                                                <span className={style.statusInactive}>Inactive</span>
                                            }
                                        </div>
                                    </div>
                                    {transition1.map(({ item, key, props }) => 
                                        item && 
                                            <animated.div style={props}>
                                                {overviewContent()}
                                            </animated.div>
                                    )}
                                    {transition2.map(({ item, key, props }) => 
                                        item && 
                                            <animated.div style={props}>
                                                {firstThrusterContent()}
                                            </animated.div>
                                    )}
                                    {transition3.map(({ item, key, props }) => 
                                        item && 
                                            <animated.div style={props}>
                                                {SecondThrusterContent()}
                                            </animated.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const client = new ApolloClient({
      uri: 'https://api.spacex.land/graphql/',
      cache: new InMemoryCache()
    })
  
    const { data } = await client.query({
      query: gql`
        {
            dragon(id: "dragon2") {
                active
                crew_capacity
                description
                diameter {
                    feet
                    meters
                }
                dry_mass_kg
                dry_mass_lb
                first_flight
                name
                thrusters {
                    amount
                    fuel_1
                    fuel_2
                    pods
                    thrust {
                        kN
                        lbf
                    }
                    type
                    }
                launch_payload_mass {
                    kg
                    lb
                }
                launch_payload_vol {
                    cubic_feet
                    cubic_meters
                }
            }
        }
      `
    })
  
    return {
      props: {
        dragon: data.dragon
      }
    }
  }