import styles from './footer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
    return (
        <footer class={styles.footer} id="footer">
            <div className="container">
                <p>This app is not made by SpaceX. The app uses SpaceX's API for all the data used across. The app is made by <a target="_blank" href="https://portfolio-nik.netlify.app/">Nik Gospodinov</a>.</p>
                <div className={styles.social}>
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
                </div>
            </div>
        </footer>
    )
}

export default Footer