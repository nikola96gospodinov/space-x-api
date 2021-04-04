import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useTransition, animated} from 'react-spring'
import Moment from 'moment'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import style from '../styles/launches.module.scss'

export default function Launches ({ launches }) {

    const launchesStable = launches

    const [pageNumber, setPageNumber] = useState(0)
    const [activeLaunch, setActiveLaunch] = useState(null)

    const transition = useTransition(activeLaunch, null, {
        from: { opacity: '0' },
        enter: { opacity: '1' },
        leave: { opacity: '0' },
    })

    const launchesPerPage = 20
    const pagesVisited = pageNumber * launchesPerPage
    const pageCount = Math.ceil(launchesStable.length / launchesPerPage)

    const displayLaunches = launchesStable
        .slice(pagesVisited, pagesVisited + launchesPerPage)
        .map((launch) => {
            return (
                <>
                    <div 
                        className={style.card}
                        onClick={() => setActiveLaunch(launch)}
                    >
                        <div className={style.imgTitle}>
                            {
                                launch.links.flickr_images[0]
                                ? <img loading="lazy" src={launch.links.flickr_images[0]}/>
                                : <FontAwesomeIcon icon={['fas', 'image']}/>
                            }
                            <h2>{launch.mission_name}</h2>
                        </div>
                        {
                            launch.launch_success
                            ? <span className={style.success}>Success</span>
                            : <span className={style.failure}>Failure</span>
                        }
                    </div>
                    {
                        activeLaunch === launch
                        ?
                        transition.map(({ item, key, props }) => 
                            item && 
                                <animated.div style={props}>
                                    <div className={style.backdrop}>
                                        <div className={style.content}>
                                            <FontAwesomeIcon 
                                                onClick={() => setActiveLaunch(null)} 
                                                icon={['fas', 'times']}
                                                className={style.cross}
                                            />
                                            {
                                                launch.links.flickr_images[0]
                                                ? <img src={launch.links.flickr_images[0]}/>
                                                : <div className={style.noImage}><span>No image available</span></div>
                                            }
                                            <div className={style.details}>
                                                <div>
                                                    <h2>{launch.mission_name}</h2>
                                                    {
                                                        launch.launch_success
                                                        ? <span className={style.success}>Success</span>
                                                        : <span className={style.failure}>Failure</span>
                                                    }
                                                </div>
                                                {
                                                    launch.details
                                                    ? <p>{launch.details}</p>
                                                    : <p>No details available.</p>
                                                }
                                                <div className={style.iconInfo}>
                                                    <FontAwesomeIcon icon={['fas', 'space-shuttle']}/>
                                                    <span>{launch.rocket.rocket_name}</span>
                                                </div>
                                                <div className={style.iconInfo}>
                                                    <FontAwesomeIcon icon={['fas', 'calendar-day']}/>
                                                    <span>{Moment.unix(launch.launch_date_unix).format("Do MMMM, YYYY")}</span>
                                                </div>
                                                <div className={style.iconInfo}>
                                                    <FontAwesomeIcon icon={['fas', 'building']}/>
                                                    <span>{launch.launch_site.site_name}</span>
                                                </div>
                                                <div className={style.bottomLinks}>
                                                    {
                                                        launch.links.reddit_launch
                                                        ? <a href={launch.links.reddit_launch} target="_blank" rel="noreferrer">
                                                            <FontAwesomeIcon icon={['fab', 'reddit-alien']}/>
                                                        </a>
                                                        : null
                                                    }
                                                    {
                                                        launch.links.wikipedia
                                                        ? <a href={launch.links.wikipedia} target="_blank" rel="noreferrer">
                                                            <FontAwesomeIcon icon={['fab', 'wikipedia-w']}/>
                                                        </a>
                                                        : null
                                                    }
                                                    {
                                                        launch.links.article_link
                                                        ? <a href={launch.links.article_link} target="_blank" rel="noreferrer">
                                                            <FontAwesomeIcon icon={['fas', 'newspaper']}/>
                                                        </a>
                                                        : null
                                                    }
                                                    {
                                                        launch.links.video_link
                                                        ? <a href={launch.links.video_link} target="_blank" rel="noreferrer">
                                                            <FontAwesomeIcon icon={['fas', 'film']}/>
                                                        </a>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </animated.div>
                        )
                        : null
                    }
                </>
            )
        })
    
    
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }


    return (
        <>
            <SEO 
                title="Launches" 
                description="This page contains all launches from SpaceX"
                follow="foloow"
                index="index"
            />
            <Layout>
                <div className={style.launchesBanner}>
                    <div className="container banner-container">
                        <div className="double-grid">
                            <div>
                                <h1>Launches</h1>
                                <h2>Browse through the launches by SpaceX throughout the years</h2>
                                <AnchorLink className="cta" href="#launches"><span>Learn more</span></AnchorLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="launches" className={style.launches}>
                    <div className="container">
                        {displayLaunches}
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={style.paginationButtons}
                            disabledClassName={style.paginationDisabled}
                            activeClassName={style.paginationActive}
                        />
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
            launches {
                details
                mission_name
                rocket {
                    rocket_name
                    rocket_type
                }
                launch_date_unix
                launch_site {
                    site_name
                    site_name_long
                }
                launch_success
                links {
                    flickr_images
                    wikipedia
                    article_link
                    reddit_launch
                    video_link
                }
            }
        }
      `
    })
  
    return {
      props: {
        launches: data.launches
      }
    }
  }