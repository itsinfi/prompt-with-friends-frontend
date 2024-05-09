import PropTypes from 'prop-types'
import { useEffect } from 'react'
import './ParticlesWrapper.css'


/**
 * Wrap this with every screen/or wrapper that should have some nice background particles
 * This wrapper uses partcles.js by Vincent Garreau
 * 
 * @param child child page/wrapper
 */
function ParticlesWrapper({ child }) {

    console.log('update state of particles wrapper')

    //nice animations from particles.js
    useEffect(() => {
        const particlesScript = document.createElement('script');
        particlesScript.src = '/src/assets/javascripts/particles.min.js';
        particlesScript.async = true;
        particlesScript.onload = () => {
            const particleOptionsScript = document.createElement('script');
            particleOptionsScript.src = '/src/components/particles/particleOptions.js';
            particleOptionsScript.async = true;
            document.body.appendChild(particleOptionsScript);
        }
        document.body.appendChild(particlesScript);

        window.scrollTo(0, 0)

        return () => {
        document.body.removeChild(particlesScript);
        };
    }, [])

    return (
        <>
            <div id = "particles-js" ></div>
            { child }
        </>
    )

}

ParticlesWrapper.propTypes = {
    child: PropTypes.node.isRequired,
}

export default ParticlesWrapper