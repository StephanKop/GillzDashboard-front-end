export default interface DeadlineInterface {
    id: number;
    project: string;
    name: string;
    deadline: string;
    link: string;
    isActive: boolean;
    members: [{
            id: number;
            name: string;
            image: string;
            present: boolean;
        },{
            id: number;
            name: string;
            image: string;
            present: boolean;
        },{
            id: number;
            name: string;
            image: string;
            present: boolean;
        }
    ];
}