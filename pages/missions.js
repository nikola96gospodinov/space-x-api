import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import style from '../styles/missions.module.scss'

export default function Missions ({ missions }) {

    const displayMissions = () => {
        return missions.map((mission) => {
            return (
                <div className={style.card}>
                    <div className={style.circle}></div>
                    <div className={style.zIndexIncrease}>
                        <h2>{mission.name}</h2>
                        <p>{mission.description}</p>
                    </div>
                    <div>
                        <div className={style.manufacturer}>
                            <span>Manufacturer:</span>
                            <span><strong>{mission.manufacturers[0]}</strong></span>
                        </div>
                        <div className={style.links}>
                            {
                                mission.twitter 
                                ? <a href={mission.twitter} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={['fab', 'twitter']}/></a>
                                : null
                            }
                            {
                                mission.website 
                                ? <a href={mission.website} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={['fas', 'globe']}/></a>
                                : null
                            }
                            {
                                mission.wikipedia 
                                ? <a href={mission.wikipedia} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={['fab', 'wikipedia-w']}/></a>
                                : null
                            }
                        </div>
                    </div>
                    
                </div>
            )
        })
    }

    return (
        <>
            <SEO
                title="Missions" 
                description="This page contains a list of SpaceX's missions"
                follow="foloow"
                index="index"
            />
            <Layout>
                <div className={style.missionsBanner}>
                    <div className="container banner-container">
                        <div className="double-grid">
                            <div>
                                <h1>Missions</h1>
                                <h2>Browse through SpaceX's missions</h2>
                                <AnchorLink className="cta" href="#missions"><span>Learn more</span></AnchorLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="missions" className={style.missions}>
                    <div className="container">
                        <div className="double-grid-t">
                            {displayMissions()}
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
            missions {
                name
                description
                manufacturers
                twitter
                website
                wikipedia
            }
        }
      `
    })
  
    return {
      props: {
        missions: data.missions
      }
    }
  }