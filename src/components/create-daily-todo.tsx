import { Field, FieldProps, Form, Formik } from "formik";
import { FunctionComponent } from "react";
import Modal, { useModal } from "./modal";
import "./create-daily-todo.scss";
import axios from "utilities/axios";
import urljoin from "url-join";
import Button from "./button";

interface Props {
    readonly id: string;
}

interface FormValues {
    readonly todo: string;
}

const url = "/daily-todos";

const CreateDailyTodo: FunctionComponent<Props> = ({ id }) => {
    // const { closeModal, openModal, props: modalProps } = useModal();
    const modalProps = useModal();
    const { closeModal, openModal } = modalProps;

    const onSubmit = async (formValues: FormValues) => {
        await axios.post(urljoin(url, id), { todo: formValues.todo });
        closeModal();
    };

    return (
        <>
            <Modal {...modalProps}>
                <h1 className="create-daily-todo__title">Add new todo</h1>
                <Formik<FormValues> initialValues={{ todo: "" }} onSubmit={onSubmit}>
                    <Form className="create-daily-todo__form">
                        <div className="field">
                            <label htmlFor="todo">Todo Title</label>
                            <Field name="todo">
                                {({ field }: FieldProps) => (
                                    <input placeholder="Your new todo..." type="text" {...field} />
                                )}
                            </Field>
                        </div>
                        <Button className="button" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Formik>
            </Modal>
            <Button className="button" onClick={openModal}>
                Add new todo
            </Button>
        </>
    );
};

export default CreateDailyTodo;
