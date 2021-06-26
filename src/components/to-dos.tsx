import { AxiosError } from "axios";
import { isValid, parse, parseISO } from "date-fns";
import { useQuery } from "react-query";
import axios from "utilities/axios";
import Loader from "./loader";
import ToDoList from "./to-do-list";

interface DailyTodo {
    readonly createdAt: string;
    readonly id: string;
    readonly title: string;
}

export interface FormattedDailyToDo extends DailyTodo {
    readonly date: Date;
}

const url = "/daily-todos";
const requestDailyTodos = async () => {
    const { data } = await axios.get<DailyTodo[]>(url);
    return data;
};

export const ToDos = () => {
    const { data } = useQuery<DailyTodo[], AxiosError, FormattedDailyToDo[]>(url, requestDailyTodos, {
        select: (data) =>
            data.map((todo) => {
                const titleDate = parse(todo.title, "dd-MM-yyyy", new Date());
                const date = isValid(titleDate) ? titleDate : parseISO(todo.createdAt);
                return { ...todo, date };
            }),
    });

    if (typeof data === "undefined") {
        return <Loader />;
    }

    return <ToDoList todos={data} />;
};
