export default interface deadlinesInterface {
    id: Number,
    name: string,
    deadline: Date,
    link: string,
    isActive: Boolean,
    members: [
        {
            id: Number,
            name: string,
            image: string,
            present: boolean
        }
    ]
}