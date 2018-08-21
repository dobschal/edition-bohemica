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
    },

    /**
     *  We store all texts in the local storage and load them on page start.
     *  @param {VueState} state - current stored data
     *  @param {object} content - dictionary of contents to be stored
     *  @returns {void}
     */
    storeContent( state, content )
    {
        state.content = content;
    },

    storeUserAmount( state, amount )
    {
        state.userAmount = amount;
    },

    addToCart( state, product )
    {
        state.cart.push( product );
    },

    removeFromCart( state, productId )
    {
        state.cart = state.cart.filter( product => product._id !== productId );
    },

    setAmountInCart( state, productId, amount )
    {
        state.cart = state.cart.map( product => {
            if(product._id === productId) product.amount = amount;
            return product;
        });
    },

    emptyCart( state )
    {
        state.cart = [];
    }
};