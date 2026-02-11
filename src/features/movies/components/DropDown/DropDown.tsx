import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import { FormControl, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import type { SortValueType } from '../../../../types/types.ts'
import s from './DropDown.module.css'

type DropDownProps = {
  values: SortValueType[]
  onChange: (value: SortValueType) => void
  value: SortValueType
}

export default function DropDown({ values, onChange, value }: DropDownProps) {
  const handleChange = (e: SelectChangeEvent) => {
    const chosenValue = values.find((item) => item.sortOption === e.target.value)
    if (chosenValue) onChange(chosenValue)
  }

  return (
    <Box className={s.dropDownBox} sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel
          sx={{ fontSize: 20, fontWeight: 700, left: -15, top: -15 }}
          id="demo-simple-select-label"
        >
          Search option
        </InputLabel>
        <Select
          className={s.dropDownSelect}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value.sortOption}
          label="Search option"
          onChange={handleChange}
        >
          {values.map((item) => (
            <MenuItem key={item.sortOption} value={item.sortOption}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
