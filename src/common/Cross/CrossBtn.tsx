import s from './CrossBtn.module.css'

type CrossBtnProps = {
  isDisable: boolean
  removeVal: () => void
}
export const CrossBtn = ({ isDisable, removeVal }: CrossBtnProps) => {
  return (
    <button onClick={removeVal} className={s.clearBtn} disabled={isDisable}>
      <svg
        className={s.crossSvg}
        width="16px"
        height="16px"
        viewBox="0 0 24 24"
        fill="#f8fafc"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 20L4 4.00003M20 4L4.00002 20"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
  )
}
