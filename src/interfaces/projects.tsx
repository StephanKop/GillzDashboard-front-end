export default interface projectsInterface {
    "id": string,
    "name": string,
    "description": string,
    "url": string,
    "state": string,
    "revision": number,
    "_links": {
        "self": {
            "href": string
        },
        "collection": {
            "href": string
        },
        "web": {
            "href": string
        }
    },
    "visibility": number,
    "defaultTeam": {
        "id": string,
        "name": string,
        "url": string
    },
    "lastUpdateTime": Date,
    "defaultTeamImageUrl": string
}