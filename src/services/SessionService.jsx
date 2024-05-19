/**
 * Service to handle Session CRUD
 */
class SessionService {

    /**
     * creates a new session
     * 
     * @returns sesssion as response
     */
    static async createSession(config) {

        return await fetch(`${config.be_host}/session/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

}

export default SessionService