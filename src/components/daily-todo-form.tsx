import { FunctionComponent } from "react";
import { Field, Form, Formik } from "formik";
import "./daily-todo.scss";

interface Todo {
    readonly checked: boolean;
    readonly id: string;
    readonly text: string;
}

interface FormValues {
    [text: string]: boolean;
}

interface Props {
    readonly initialValues: FormValues;
    readonly onSubmit: VoidFunction;
    readonly todos: Todo[];
}

const DailyToDoForm: FunctionComponent<Props> = ({ initialValues, onSubmit, todos }) => (
    <Formik<FormValues> initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
            <div className="daily-todo">
                {todos.map(({ id, text }) => (
                    <label key={id} className="daily-todo__item">
                        {text}
                        <Field type="checkbox" name={text} />
                    </label>
                ))}
            </div>
        </Form>
    </Formik>
);

export default DailyToDoForm;
export type { Props as DailyTodoFormProps };
