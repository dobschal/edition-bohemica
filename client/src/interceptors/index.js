import toastr from "toastr";

export function success( response )
{
    console.log( "[interceptor] Success: ", response );
    return response;
}

export function error( response )
{
    toastr.error(`Info: ${response.message}`, "Fehler");
    console.error( "[interceptor] Error: ", response );
    return response;
}