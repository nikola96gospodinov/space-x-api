import { useState } from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'moment'
import {useTransition, animated} from 'react-spring'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import style from '../styles/rocket.module.scss'

export default function Falcon9 ({ rocket }) {

    const [activeNav, setActiveNav] = useState('overview')

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getTitle = () => {
        if (activeNav === 'overview') {
            return 'Overview'
        } else if (activeNav === 'first') {
            return 'First Stage'
        } else if (activeNav === 'second') {
            return 'Second Stage'
        } else {
            return 'Engines'
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

    const transition4 = useTransition(activeNav === 'engines', null, {
        from: { transform: 'translate(10rem)', opacity: '0' },
        enter: { transform: 'translate(0)', opacity: '1' },
        leave: { transform: 'translate(10rem)', display: 'none' },
    })

    const overviewContent = () => {
        return (
            <div>
                <div class={style.stats}>
                    <div>
                        <strong>First Flight: </strong> <span>{Moment(rocket.first_flight, "YYYY-MM-DD").format("Do MMMM, YYYY")}</span>
                    </div>
                    <div>
                        <strong>Cost per launch: </strong> <span>${rocket.cost_per_launch/1000000} million</span>
                    </div>
                    <div>
                        <strong>Diameter: </strong> <span>{rocket.diameter.meters}m<span> / {rocket.diameter.feet}ft</span></span>
                    </div>
                    <div>
                        <strong>Height: </strong> <span>{rocket.height.meters}m<span> / {rocket.height.feet}ft</span></span>
                    </div>
                    <div>
                        <strong>Mass: </strong> <span>{numberWithCommas(rocket.mass.kg)}kg<span> / {numberWithCommas(rocket.mass.lb)}lb</span></span>
                    </div>
                    <div>
                        <strong>Stages: </strong> <span>{rocket.stages}</span>
                    </div>
                </div>
            </div>
        )
    }

    const firstStageContent = () => {
        return (
            <div>
                <div class={style.stats}>
                    <div>
                        <strong>Burn Time: </strong> <span>{rocket.first_stage.burn_time_sec} sec</span>
                    </div>
                    <div>
                        <strong>Number of Engines: </strong> <span>{rocket.first_stage.engines}</span>
                    </div>
                    <div>
                        <strong>Fuel Used: </strong> <span>{rocket.first_stage.fuel_amount_tons} tones</span>
                    </div>
                    <div>
                        <strong>Thrust in Vacuum: </strong> <span>{numberWithCommas(rocket.first_stage.thrust_vacuum.kN)}kN<span> / {numberWithCommas(rocket.first_stage.thrust_vacuum.lbf)}lbf</span></span>
                    </div>
                    <div>
                        <strong>Thrust at Sea Level: </strong> <span>{numberWithCommas(rocket.first_stage.thrust_sea_level.kN)}kN<span> / {numberWithCommas(rocket.first_stage.thrust_sea_level.lbf)}lbf</span></span>
                    </div>
                    <div>
                        <strong>Reusable: </strong>
                        {
                            rocket.first_stage.reusable ?
                            <span className={style.reusable}>YES</span> :
                            <span className={style.nonReusable}>NO</span>
                        }
                    </div>
                </div>
            </div>
        )
    }

    const secondStageContent = () => {
        return (
            <div>
                <div class={style.stats}>
                    <div>
                        <strong>Burn Time: </strong> <span>{rocket.second_stage.burn_time_sec} sec</span>
                    </div>
                    <div>
                        <strong>Number of Engines: </strong> <span>{rocket.second_stage.engines}</span>
                    </div>
                    <div>
                        <strong>Fuel Used: </strong> <span>{rocket.second_stage.fuel_amount_tons} tones</span>
                    </div>
                    <div>
                        <strong>Thrust: </strong> <span>{numberWithCommas(rocket.second_stage.thrust.kN)}kN<span> / {numberWithCommas(rocket.second_stage.thrust.lbf)}lbf</span></span>
                    </div>
                    <div>
                        <strong>Fairing Diameter: </strong> <span>{rocket.second_stage.payloads.composite_fairing.diameter.meters}m<span> / {rocket.second_stage.payloads.composite_fairing.diameter.feet}ft</span></span>
                    </div>
                    <div>
                        <strong>Fairing Height: </strong> <span>{rocket.second_stage.payloads.composite_fairing.height.meters}m<span> / {rocket.second_stage.payloads.composite_fairing.height.feet}ft</span></span>
                    </div>
                </div>
            </div>
        )
    }

    const enginesContent = () => {
        return (
            <div>
                <div class={style.stats}>
                    <div>
                        <strong>Version: </strong> <span>{rocket.engines.version}</span>
                    </div>
                    <div>
                        <strong>Layout: </strong> <span>{rocket.engines.layout}</span>
                    </div>
                    <div>
                        <strong>Number of Engines: </strong> <span>{rocket.engines.number}</span>
                    </div>
                    <div>
                        <strong>Thrust to Weight: </strong> <span>{rocket.engines.thrust_to_weight}</span>
                    </div>
                    <div>
                        <strong>Thrust at Sea Level: </strong> <span>{rocket.engines.thrust_sea_level.kN}kN<span> / {numberWithCommas(rocket.engines.thrust_sea_level.lbf)}lbf</span></span>
                    </div>
                    <div>
                        <strong>Thrust in Vacuum: </strong> <span>{rocket.engines.thrust_vacuum.kN}kn<span> / {numberWithCommas(rocket.engines.thrust_vacuum.lbf)}lbf</span></span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <SEO 
                title={rocket.name} 
                description={rocket.description}
                index="index"
                follow="follow"
            />
            <Layout>
                <div className={style.Falcon9Banner}>
                    <div className="container banner-container">
                        <div className="double-grid">
                            <div>
                                <h1>{rocket.name}</h1>
                                <h2>{rocket.description}</h2>
                                <AnchorLink className="cta" href="#info"><span>Learn more</span></AnchorLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="info" className={style.info}>
                    <div className="container">
                        <div className={style.rocketGrid}>
                            <img src="images/falcon-9.png"/>
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
                                        <h3>First Stage</h3>
                                    </div>
                                    <div>
                                        <div 
                                            className={`${style.num} ${activeNav === 'second' ? style.activeNum : null}`}
                                            onClick={() => setActiveNav('second')}
                                        >
                                            <span>2</span>
                                        </div>
                                        <h3>Second Stage</h3>
                                    </div>
                                    <div>
                                        <div 
                                            className={`${style.num} ${activeNav === 'engines' ? style.activeNum : null}`}
                                            onClick={() => setActiveNav('engines')}
                                        >
                                            <span><FontAwesomeIcon icon={['fas', 'fire-alt']}/></span>
                                        </div>
                                        <h3>Engines</h3>
                                    </div>
                                </div>
                                <div className={style.content}>
                                    <div class={style.spaceBetween}>
                                        <div>
                                            <p className={style.rocketName}>{rocket.name}</p>
                                            <h3 className={style.title}>
                                                {getTitle()}
                                            </h3>
                                        </div>
                                        <div className={style.right}>
                                            {
                                                rocket.active ? 
                                                <span className={style.statusActive}>Active</span> :
                                                <span className={style.statusInactive}>Inactive</span>
                                            }
                                            <p>
                                                <strong>Success rate: </strong> {rocket.success_rate_pct}%
                                            </p>
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
                                                {firstStageContent()}
                                            </animated.div>
                                    )}
                                    {transition3.map(({ item, key, props }) => 
                                        item && 
                                            <animated.div style={props}>
                                                {secondStageContent()}
                                            </animated.div>
                                    )}
                                    {transition4.map(({ item, key, props }) => 
                                        item && 
                                            <animated.div style={props}>
                                                {enginesContent()}
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
            rocket(id: "falcon9") {
                name
                description
                active
                success_rate_pct
                cost_per_launch
                diameter {
                    meters
                    feet
                }
                first_flight
                height {
                    feet
                    meters
                }
                mass {
                    kg
                    lb
                }
                stages
                first_stage {
                    burn_time_sec
                    engines
                    fuel_amount_tons
                    reusable
                    thrust_vacuum {
                        kN
                        lbf
                    }
                    thrust_sea_level {
                        kN
                        lbf
                    }
                }
                second_stage {
                    burn_time_sec
                    engines
                    fuel_amount_tons
                    thrust {
                        kN
                        lbf
                    }
                    payloads {
                        composite_fairing {
                            diameter {
                                feet
                                meters
                            }
                            height {
                                feet
                                meters
                            }
                        }
                    }
                }
                engines {
                    layout
                    number
                    thrust_sea_level {
                        kN
                        lbf
                    }
                    thrust_to_weight
                    thrust_vacuum {
                        kN
                        lbf
                    }
                    version
                }
            }
        }
      `
    })
  
    return {
      props: {
        rocket: data.rocket
      }
    }
  }