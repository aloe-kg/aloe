import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@mui/material'

interface RHFTextFieldProps {
  name: string
  label: string
  type?: string
  InputProps?: any
}

export const RHFTextField: FC<RHFTextFieldProps> = ({ name, ...other }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  )
}
