export default interface ServerInterface {
    'id': number;
    'name': string;
    'disk': string;
    'memory': string;
    'status': string;
    'memoryTotal': number;
    'memoryUsage': number;
    'diskTotal': number;
    'diskUsage': number;
}