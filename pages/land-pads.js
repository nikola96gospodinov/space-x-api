import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import style from '../styles/landpads.module.scss'

export default function LandPads ({ landpads }) {

    const calcSuccessRate = (success, attempt) => {
      if (isNaN(success / attempt) || (success / attempt) === 0 ) {
        return 0
      } else if (Number.isInteger((success / attempt) * 100)) {
        return (success / attempt) * 100
      } else {
        return ((success / attempt) * 100).toFixed(2)
      }
    }

    const displayLandPads = () => {
        return landpads.map((pad) => {
          return (
            <div className={style.card}>
              <div className={style.circle}></div>
              <div>
                <h2>{pad.full_name}</h2>
                {
                  pad.status === 'active'
                  ? <span className={style.active}>Active</span>
                  : <span className={style.retired}>Retired</span>
                }
              </div>
              <p>{pad.details}</p>
              <div className={style.successRate}>
                <span>Success rate:</span>
                {
                  calcSuccessRate(pad.successful_landings, pad.attempted_landings) >= 80
                  ? <span className={style.success}>{calcSuccessRate(pad.successful_landings, pad.attempted_landings)}%</span>
                  : <span className={style.failure}>{calcSuccessRate(pad.successful_landings, pad.attempted_landings)}%</span>
                }
              </div>
              <div className={style.locationAndLink}>
                <div>
                  <FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>
                  <span>{pad.location.name}, {pad.location.region}</span>
                </div>
                <a className={style.wiki} href={pad.wikipedia} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={['fab', 'wikipedia-w']}/>
                </a>
              </div>
            </div>
          )
        })
    }

    return (
        <>
            <SEO
                title="Launch Pads" 
                description="This page contains a list of SpaceX's launch pads"
                follow="foloow"
                index="index"
            />
            <Layout>
              <div className={style.landPadsBanner}>
                    <div className="container banner-container">
                        <div className="double-grid">
                            <div>
                                <h1>Land Pads</h1>
                                <h2>Browse through SpaceX's land pads</h2>
                                <AnchorLink className="cta" href="#land-pads"><span>Learn more</span></AnchorLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="land-pads" className={style.landPads}>
                  <div className="container">
                    <div className="double-grid-t">
                      {displayLandPads()}
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
            landpads {
                attempted_landings
                full_name
                details
                status
                location {
                    name
                    region
                }
                successful_landings
                wikipedia
            }
        }
      `
    })
  
    return {
      props: {
        landpads: data.landpads
      }
    }
  }