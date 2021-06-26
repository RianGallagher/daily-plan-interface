import { Fragment, FunctionComponent } from "react";
import { eachYearOfInterval, format } from "date-fns";
import { FormattedDailyToDo } from "./to-dos";
import Months from "./months";
import "./to-do-list.scss";

interface Props {
    readonly todos: FormattedDailyToDo[];
}

/**
 * Break down the todos into years.
 * @param todos The todos to break down.
 * @returns An array with the first element as the year and the second as the todos for that year.
 */
const breakdownByYear = (todos: FormattedDailyToDo[]): [string, FormattedDailyToDo[]][] => {
    // Get the name of each year and reverse the array so it's in descending order.
    const years = eachYearOfInterval({
        start: todos[todos.length - 1].date,
        end: todos[0].date,
    }).reverse();

    return years.map((year) => {
        const yearName = format(year, "yyyy");
        const todosInYear = todos.filter(({ date }) => format(date, "yyyy") === yearName);
        return [yearName, todosInYear];
    });
};

const ToDoList: FunctionComponent<Props> = ({ todos }) => (
    <ul className="daily-todos">
        {breakdownByYear(todos).map(([yearName, todos]) => (
            <Fragment key={yearName}>
                <h1>{yearName}</h1>
                <Months todos={todos} />
            </Fragment>
        ))}
    </ul>
);

export default ToDoList;
