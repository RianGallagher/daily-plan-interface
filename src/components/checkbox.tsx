import { Field, FieldAttributes } from "formik";
import { FunctionComponent } from "react";
import "./checkbox.scss";

interface IProps extends Omit<FieldAttributes<any>, "type"> {
    readonly label: string;
}

const Checkbox: FunctionComponent<IProps> = ({ label, ...props }) => (
    <label className="checkbox">
        {label}
        <Field type="checkbox" {...props}></Field>
    </label>
);

export default Checkbox;
