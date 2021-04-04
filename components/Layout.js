import Header from './Header/Header'
import Footer from './Footer/Footer'

// Font Awesome Icons - IMPORTS
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Adding the Icons to the App
library.add(fab, fas)

const Layout = (props) => {
    return (
        <>
            <Header/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </>
    )
}

export default Layout