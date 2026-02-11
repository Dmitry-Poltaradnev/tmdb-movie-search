type ButtonProps = {
  title: string
  callBack: () => void
  classNames?: string
  isDisabled?: boolean
}

export const Button = ({ title, callBack, classNames, isDisabled }: ButtonProps) => {
  return (
    <button disabled={isDisabled} className={classNames} onClick={callBack}>
      {title}
    </button>
  )
}
