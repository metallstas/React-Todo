import cls from './Alert.module.css'
interface IProps {
  text: string;
}

const Alert = ({ text }: IProps) => {
  return <p className={cls.Alert}>{text}</p>
}

export default Alert
