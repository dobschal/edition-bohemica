
/**
 *  @author Sascha Dobschal
 *  @description Specify configuration variables based on the environment.
 */

import { version } from "../../package.json";

export default {
    BUILD_NUMBER: process.env.npm_config_buildNumber || "",
    ENVIRONMENT: process.env.NODE_ENV || "",
    ROOT_API: "https://api.editionbohemica.de",
    VERSION: version
};
