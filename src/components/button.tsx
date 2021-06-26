import { ButtonHTMLAttributes, FunctionComponent } from "react";
import "./button.scss";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FunctionComponent<IProps> = (props) => <button className="button" {...props} />;

export default Button;
