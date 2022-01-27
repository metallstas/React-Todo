import cls from './Button.module.css'

interface IProps {
  text: string;
  onClick: () => void;
  buttonTodo: boolean;
}

const Button = ({text, onClick, buttonTodo}: IProps) => {
  return (
    <button className={buttonTodo ? `${cls.ButtonForm}` : `${cls.Button}`} onClick={onClick}>{text}</button>
  )
}

export default Button
