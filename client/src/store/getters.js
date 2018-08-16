
/**
 * @author Sascha Dobschal <s.dobschal@tdsoftware.de>
 * date 07/16/2018
 */

export default
{
    token( state )
    {
        return state.user.token;
    },

    /**
     *  Get content by id
     *  @param {VueState} state - current state store
     *  @returns {function} - getter by id
     */
    content( state )
    {
        return id => state.content[id];
    },

    userAmount( state )
    {
        return state.userAmount;
    },

    cart( state )
    {
        return state.cart;
    }
};