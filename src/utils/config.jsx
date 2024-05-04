/**
 * The Config stored inside a class + method to load config
 */
class Config {

    static config = {}

    static async loadConfig() {
        const response = await fetch('config.json')
        this.config = await response.json()
    }

}



export default Config