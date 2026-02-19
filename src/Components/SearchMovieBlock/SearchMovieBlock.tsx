import s from './SearchMovieBlock.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CrossBtn } from '../ui/Cross/CrossBtn.tsx'
import { Button } from '../ui/Button/Button.tsx'
import * as React from 'react'

export const SearchMovieBlock = () => {
  const [inputVal, setInputVal] = useState('')

  const navigate = useNavigate()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchMovie()
    }
  }
  const handleSearchMovie = () => {
    setInputVal('')
    navigate(`/search/movie?query=${encodeURIComponent(inputVal)}`)
  }
  const changeInputValue = (inputVal: string) => {
    setInputVal(inputVal)
  }

  const checkDisable = () => {
    return inputVal.trim().length === 0
  }

  return (
    <div className={s.searchMovieBlock}>
      <div className={s.inputWrapper}>
        <input
          className={s.searchInput}
          type="text"
          value={inputVal}
          onChange={(e) => changeInputValue(e.currentTarget.value)}
          placeholder="Search Movie"
          onKeyDown={handleKeyDown}
        />
        <CrossBtn isDisable={checkDisable()} removeVal={() => setInputVal('')} />
      </div>
      <Button
        classNames={s.searchBtn}
        title={'Search'}
        callBack={handleSearchMovie}
        isDisabled={checkDisable()}
      />
    </div>
  )
}
