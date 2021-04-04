import AnchorLink from 'react-anchor-link-smooth-scroll'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import style from '../styles/key-events.module.scss'

export default function KeyEvents ({ histories }) {

    const [activeEvent, setEvent] = useState(null)

    const timestampConvertor = (timestamp) => {
        const date = Moment.unix(timestamp).format("Do MMMM, YYYY")
        return date
    }

    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    let historiesSorted = [...histories]
    historiesSorted.sort(dynamicSort("event_date_unix"))

    const displayEvents = () => {
        return historiesSorted.map((history, i) => {
            return (
                <>
                    <div className={style.year}>
                        <span>{timestampConvertor(history.event_date_unix)}</span>
                        <FontAwesomeIcon 
                            icon={['fas', 'circle']}
                            onMouseEnter={() => setEvent(history)}
                            onMouseLeave={() => setEvent(null)}
                            className={`${activeEvent === history ? style.scale : null}`}
                        />
                    </div>
                    <div
                        onMouseEnter={() => setEvent(history)}
                        onMouseLeave={() => setEvent(null)}
                        className={`${style.description} ${activeEvent === history ? style.descriptionActive : null}`}
                    >
                        <h2>{history.title}</h2>
                        <p>{history.details}</p>
                        {
                            history.links.article !== null
                            ? <a href={history.links.article} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={['fas', 'newspaper']}/></a>
                            : null
                        }
                        {
                            history.links.reddit !== null
                            ? <a href={history.links.reddit} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={['fab', 'reddit-alien']}/></a>
                            : null
                        }
                        {
                            history.links.wikipedia !== null
                            ? <a href={history.links.wikipedia} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={['fab', 'wikipedia-w']}/></a>
                            : null
                        }
                    </div>
                </>
            )
        })
    }

    return (
        <>
            <SEO
                title="Key Events" 
                description="Discover some of the key point in the history of SpaceX"
                index="index"
                follow="follow"
            />
            <Layout>
                <div className={style.KeyEventsBanner}>
                    <div className="container banner-container">
                        <div className="double-grid">
                            <div>
                                <h1>Key Events</h1>
                                <h2>Discover some of the key points in the history of SpaceX</h2>
                                <AnchorLink className="cta" href="#timeline"><span>Learn more</span></AnchorLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="timeline" className={style.timeline}>
                    <div className="container">
                        <div className={style.timelineGrid}>
                            {displayEvents()}
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
            histories {
                details
                links {
                    article
                    reddit
                    wikipedia
                }
                title
                event_date_unix
            }
        }
      `
    })
  
    return {
      props: {
        histories: data.histories
      }
    }
  }