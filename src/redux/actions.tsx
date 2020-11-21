import { SET_DEADLINES } from "./actionTypes";
import {useState} from "react";

let nextTodoId = 0;
const [errors, setErrors] = useState(false)
const [fetchUrl, setFetchUrl] = useState(process.env.REACT_APP_API_DEADLINES_ORDEREDBYDATE)


async function fetchData() {
    const res = await fetch(fetchUrl as Request | string);
    res
        .json()
        .then((res) => {
            setDeadlines(res);
        })
        .catch(err => setErrors(err));
    return true;
}

export const setDeadlines = content => ({
    type: SET_DEADLINES,
    payload: {
            id: Number,
            name: "",
            deadline: Date,
            link: "",
            isActive: Boolean,
            members: [
                {
                    id: Number,
                    name: "",
                    image: "",
                    present: Boolean
                }
            ]
    }
});
