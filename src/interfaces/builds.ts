export default interface BuildsInterface {
    'requestId': number;
    'queueTime': string;
    'assignTime': string;
    'receiveTime': string;
    'finishTime': string;
    'result': number;
    'serviceOwner': string;
    'hostId': string;
    'scopeId': string;
    'planType': string;
    'planId': string;
    'jobId': string;
    'demands': [
        string
    ];
    'reservedAgent': {
        '_links': {
            'self': {
                'href': string
            },
            'web': {
                'href': string
            }
        },
        'id': number,
        'name': string,
        'version': string,
        'osDescription': string,
        'enabled': boolean,
        'status': number,
        'provisioningState': string,
        'accessPoint': string
    };
    'definition': {
        '_links': {
            'web': {
                'href': string
            },
            'self': {
                'href': string
            }
        },
        'id': number,
        'name': string
    };
    'owner': {
        '_links': {
            'web': {
                'href': string
            },
            'self': {
                'href': string
            }
        },
        'id': number,
        'name': string
    };
    'data': {
        'ParallelismTag': string,
        'IsScheduledKey': string
    };
    'poolId': 9;
    'agentSpecification': {
        'vmImage': string
    };
    'orchestrationId': string;
    'matchesAllAgentsInPool': boolean;
    'priority': number;
}