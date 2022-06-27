import * as API from '../features/actions/user'

let TurnIceServers = null;

export const fetchTURNcredentials = async () => {
    const res = API.getTurnCredentials();

    if (res.token?.iceServers) {
        TurnIceServers = res.token.iceServers
    }

    return TurnIceServers
}

export const getTurnServer = () => {
    return TurnIceServers;
}