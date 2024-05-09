/**
 * Service to handle Session CRUD
 */
class SessionService {

    /**
     * creates a new session
     * TODO: use session api
     * 
     * @returns code of new session
     */
    static async createSession() {
        await new Promise(resolve => setTimeout(resolve, 3000));//wait 3 seconds //TODO: remove when connecting
        return 1
    }

}

export default SessionService