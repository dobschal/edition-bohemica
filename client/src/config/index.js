
/**
 *  @author Sascha Dobschal @ TDSoftware
 *  @description Specify configuration variables based on the environment. 
 */

import { version } from "../../package.json";

let rootApi = "";

switch (process.env.NODE_ENV) {

    case "production":
        rootApi = "https://edition-bohemica.api.dobschal.eu";
        break;

    case "development":
        rootApi = "http://localhost:3001";
        break;

    default: console.error(`Unknown environment ${process.env.NODE_ENV}!`);
}

export default {      
    BUILD_NUMBER: process.env.npm_config_buildNumber || "",
    ENVIRONMENT: process.env.NODE_ENV || "",
    ROOT_API: rootApi,    
    VERSION: version
};