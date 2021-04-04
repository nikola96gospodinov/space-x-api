import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import styles from '../styles/about.module.scss'

export default function About({ company }) {

    console.log(company)

    return (
        <>
            <SEO 
                title="About" 
                description={company.summary}
                index="index"
                follow="follow"
            />
            <Layout>
                <div className={styles.aboutBanner}>
                    <div className="container banner-container">
                        <div className="double-grid">
                            <div>
                                <h1>About SpaceX</h1>
                                <h2>Get some basic facts about the company and its key employees.</h2>
                                <AnchorLink href="#meet-the-team" className="cta"><span>Learn more</span></AnchorLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="meet-the-team" className={styles.meetTheTeam}>
                    <div className="container">
                        <h2 className="sub-heading">Meet the team</h2>
                        <div className="triple-grid">
                            <div>
                                <img src="/images/Elon-Musk-Portrait.jpg"/>
                                <h3>{company.ceo}</h3>
                                <span>Founder, CEO, CTO</span>
                            </div>
                            <div>
                                <img src="/images/Gwynne-Shotwell-Portrait.jpg"/>
                                <h3>{company.coo}</h3>
                                <span>COO</span>
                            </div>
                            <div>
                                <img src="/images/Tom-Mueller-Portrait.jpg"/>
                                <h3>{company.cto_propulsion}</h3>
                                <span>Propulsion CTO</span>
                            </div>
                        </div>
                        <p><FontAwesomeIcon icon={['fas', 'user-friends']}/> {company.employees} employees in total</p>
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
            company {
                ceo
                coo
                cto
                cto_propulsion
                employees
                founder
            }
        }
      `
    })
  
    return {
      props: {
        company: data.company
      }
    }
  }