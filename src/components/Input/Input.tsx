import React, {ChangeEventHandler} from 'react'
import cls from './Input.module.css'

interface IProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({onChange, value}:IProps) => {
  return (
    <input className={cls.input} onChange={onChange} value={value} />   
  )
}

export default Input
