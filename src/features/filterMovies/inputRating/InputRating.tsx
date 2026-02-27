import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import s from './InputRating.module.css'
import type { VoteAverage } from '@/types/types.ts'

type RangeSliderProps = {
  value: VoteAverage
  onChange: (value: [number, number]) => void
}

export function RangeSlider({ value, onChange }: RangeSliderProps) {
  const handleChange = (_: Event, newValue: number | number[]) => {
    onChange(newValue as [number, number])
  }

  return (
    <div className={s.inputRatingWrap}>
      <h3>
        Rating: {value[0] / 10} - {value[1] / 10}
      </h3>
      <Box sx={{ width: 200 }}>
        <Slider
          getAriaLabel={() => 'Rating'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Box>
    </div>
  )
}
