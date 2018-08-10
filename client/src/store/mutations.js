/**
 * @author Sascha Dobschal <s.dobschal@tdsoftware.de>
 * date 07/16/2018
 */

export default
{

    /**
     *  Store the API auth token in the local storage.
     *  @param {VueState} state - state object containing currently stored data
     *  @param {string} token - Auth token
     *  @returns {void}
     */
    storeToken( state, token )
    {
        state.user.token = token;
    },

    /**
     *  Delete the API auth token from the local storage.
     *  @param {VueState} state - state object containing currently stored data
     *  @returns {void}
     */
    deleteToken( state )
    {
        state.user.token = null;
    }
};