import s from './SearchMovieBlock.module.css'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CrossBtn } from '../ui/Cross/CrossBtn.tsx'
import { Button } from '../ui/Button/Button.tsx'
import * as React from 'react'

export const SearchMovieBlock = () => {
  const [searchParams] = useSearchParams()
  const title = searchParams.get('query') ?? ''
  const [inputVal, setInputVal] = useState(title)

  const navigate = useNavigate()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchMovie()
    }
  }
  const handleSearchMovie = () => {
    navigate(`/search/movie?query=${encodeURIComponent(inputVal)}`)
  }
  const changeInputValue = (inputVal: string) => {
    setInputVal(inputVal)
  }

  const checkDisable = () => {
    return inputVal.trim().length === 0
  }

  const handleReset = () => {
    setInputVal('')
    navigate(`/search/movie`)
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
        <CrossBtn isDisable={checkDisable()} removeVal={handleReset} />
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
