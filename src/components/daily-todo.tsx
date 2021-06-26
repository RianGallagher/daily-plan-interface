import { Field, Form, Formik } from "formik";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import urljoin from "url-join";
import axios from "utilities/axios";
import Checkbox from "./checkbox";
import CreateDailyTodo from "./create-daily-todo";
import "./daily-todo.scss";
import Loader from "./loader";

const url = "/daily-todos";

interface Todo {
    readonly checked: boolean;
    readonly id: string;
    readonly text: string;
}

interface FormValues {
    [text: string]: boolean;
}

const requestDailyTodo = async (id: string) => {
    const { data } = await axios.get<Todo[]>(urljoin(url, id));
    return data;
};

const DailyToDo = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useLocation<{ title: string }>();

    const { data } = useQuery([url, id], () => requestDailyTodo(id));

    const initialValues = useMemo(
        () => data?.reduce<FormValues>((values, { text, checked }) => ({ ...values, [text]: checked }), {}),
        [data]
    );

    /**
     * The Notion API doesn't support updating or deleting blocks yet.
     */
    const onSubmit = () => {};

    if (typeof data === "undefined" || typeof initialValues === "undefined") {
        return <Loader />;
    }

    return (
        <>
            <h1>{state.title}</h1>
            <Formik<FormValues> initialValues={initialValues} onSubmit={onSubmit}>
                <Form>
                    <div className="daily-todo">
                        {data.map(({ id, text }) => (
                            // <div className="daily-todo__item" key={id}>
                            <Checkbox label={text} name={text} key={id} />
                            // </div>
                        ))}
                    </div>
                </Form>
            </Formik>
            <CreateDailyTodo id={id} />
        </>
    );
};

export default DailyToDo;
