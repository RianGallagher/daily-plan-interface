import { eachMonthOfInterval, format } from "date-fns";
import { Fragment, FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { FormattedDailyToDo } from "./to-dos";

interface Props {
    readonly todos: FormattedDailyToDo[];
}

/**
 * Break down the todos into months.
 * @param todos The todos to break down.
 * @returns An array with the first element as the month and the second as the todos for that month.
 */
const breakdownByMonth = (todos: FormattedDailyToDo[]): [string, FormattedDailyToDo[]][] => {
    // Get the name of each month and reverse the array so it's in descending order.
    const months = eachMonthOfInterval({
        start: todos[todos.length - 1].date,
        end: todos[0].date,
    }).reverse();

    return months.map((month) => {
        const monthName = format(month, "MMMM");
        const todosInMonth = todos.filter(({ date }) => format(date, "MMMM") === monthName);
        return [monthName, todosInMonth];
    });
};

const Months: FunctionComponent<Props> = ({ todos }) => {
    const history = useHistory();

    const handleClick = (id: string, title: string) => {
        history.push(`/daily-todo/${id}`, { title });
    };

    const mapToListItem = ({ id, title }: FormattedDailyToDo) => (
        <li className="daily-todos__item" key={id} onClick={() => handleClick(id, title)}>
            {title}
        </li>
    );

    return (
        <Fragment>
            {breakdownByMonth(todos).map(([monthName, todos]) => (
                <Fragment key={monthName}>
                    <h2>{monthName}</h2>
                    {todos.map(mapToListItem)}
                </Fragment>
            ))}
        </Fragment>
    );
};

export default Months;
