import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'moment'
import Link from 'next/link'
import { useState } from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Loader from '../components/Loader/loader'

import styles from '../styles/index.module.scss'

export default function Home({ launches, company }) {

  const [loader, showLoader] = useState(false)

  const timestampConvertor = (timestamp) => {
    const date = Moment.unix(timestamp).format("Do MMMM, YYYY")
    return date
  }

  let valuation = company.valuation
  valuation = valuation / 1000000000

  return (
    <>
      <SEO 
        title="Home" 
        description="This is a fan made Space X app that shows all the latest launches"
        index="index"
        follow="follow"
      />
      <Layout>
        {
          loader
          ? <Loader/>
          : null
        }
        <div className={styles.banner}>
          <div className="container">
            <span className={styles.upcoming}>Upcoming Launch:</span>
            <h1>
              <FontAwesomeIcon icon={['fas', 'user-astronaut']}/> {launches.mission_name}
              <br/> 
              <FontAwesomeIcon icon={['fas', 'space-shuttle']}/> {launches.rocket.rocket_name}
              <br/>
              <FontAwesomeIcon icon={['fas', 'calendar-day']}/> {timestampConvertor(launches.launch_date_unix)}
            </h1>
            <Link href="/launches">
              <a 
                className="cta"
                onClick={() => showLoader(true)}
              ><span>Learn more</span></a>
            </Link>
          </div>
        </div>

        <div className={styles.aboutHome}>
          <div className="container">
            <div className={styles.customGrid}>
              <div>
                <img src="/images/banner2.jpg"/>
              </div>
              <div>
                <h2 className="sub-heading">About</h2>
                <p>{company.summary}</p>
                <Link href="/about">
                  <a 
                    className="cta"
                    onClick={() => showLoader(true)}
                  ><span>More about SpaceX</span></a>
                </Link>
              </div>
            </div>
            <div className={styles.gridContainer}>
              <div className="quadruple-grid">
                <div>
                  <span>Founded:</span>
                  <h3>{company.founded}</h3>
                </div>
                <div>
                  <span>Founder:</span>
                  <h3>{company.founder}</h3>
                </div>
                <div>
                  <span>Employees</span>
                  <h3>{company.employees}</h3>
                </div>
                <div>
                  <span>Valuation:</span>
                  <h3>${valuation} billion</h3>
                </div>
              </div>
              <div className={styles.circle1}></div>
              <div className={styles.circle2}></div>
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
        launchNext {
          launch_date_unix
          mission_name
          rocket {
            rocket_name
          }
        },
        company {
            employees
            founded
            founder
            valuation
            summary
        }
      }
    `
  })

  return {
    props: {
      launches: data.launchNext,
      company: data.company
    }
  }
}