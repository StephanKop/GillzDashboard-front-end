export default interface DeadlinesInterface {
    id: number;
    project: string;
    name: string;
    deadline: Date;
    link: string;
    isActive: boolean;
    members: [
        {
            id: number,
            name: string,
            image: string,
            present: boolean
        }
    ];
}