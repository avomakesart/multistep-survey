import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
import {
  Card,
  CardContent,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  CircularProgress,
  TextField,
  Checkbox,
} from '@material-ui/core'

import { fetchData } from '../helpers/fetch'

const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

export default function Home() {
  const methods = useForm()
  const { handleSubmit, control, reset } = methods
  const onSubmit = (data) => console.log(data)

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Option 1: pass a component to the Controller. */}
          <Box paddingBottom={2}>
            <Controller
              fullWidth
              as={TextField}
              name="TextField"
              label="Nombre"
              control={control}
              defaultValue=""
            />
          </Box>
          {/* Option 2: use render props to assign events and value */}
          <Box paddingBottom={2}>
            <Controller
              name="MyCheckbox"
              control={control}
              defaultValue={false}
              rules={{ required: true }}
              render={(props) => <Checkbox {...props} />} // props contains: onChange, onBlur and value
            />
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}


