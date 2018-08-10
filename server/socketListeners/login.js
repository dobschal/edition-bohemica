const name = "login";

function listener( data )
{
    console.log("[socketListeners/login.js] User wants to login.", data);
    this.connection.emit( name, "Successful");
    this.io.emit("login", "bla");
}

module.exports = { name, listener };