import Head from 'next/head'

const SEO = ({ title, description, index, follow }) => {

    const indexAndFollow = `${index}, ${follow}`

    return (
        <Head>
            <title>Space X | {title}</title>
            <meta name="description" content={description}/>
            <meta name="robots" content={indexAndFollow}/>
        </Head>
    )
}

export default SEO