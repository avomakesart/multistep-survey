import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Card, CardContent, Box, TextField, Checkbox } from '@material-ui/core'

import { fetchData } from '../helpers/fetch'
import { useInput } from '../hooks/useInput'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
)

function getSteps() {
  return [
    'Llena este formulario',
    'Selecciona tu preferencia',
    'Seleccion final',
  ]
}

function GetStepContent(stepIndex: number) {
  const methods = useForm()
  const { control } = methods

  const [formValues, handleInputChange] = useInput({
    name: string,
    lastname: '',
    email: '',
    telephone: '',
    ocupacion: '',
    terms: '',
  })

  switch (stepIndex) {
    case 0:
      return (
        <Card>
          <CardContent>
            {/* Option 1: pass a component to the Controller. */}
            <Box paddingBottom={2}>
              <Controller
                fullWidth
                as={TextField}
                name="name"
                label="Nombre"
                control={control}
                defaultValue={formValues.name}
              />
            </Box>
            {/* Option 2: use render props to assign events and value */}
            <Box paddingBottom={2}>
              <label>Acepta los terminos y condiciones</label>
              <Controller
                name="MyCheckbox"
                control={control}
                defaultValue={false}
                rules={{ required: true }}
                render={(props) => <Checkbox {...props} />} // props contains: onChange, onBlur and value
              />
            </Box>
          </CardContent>
        </Card>
      )
    case 1:
      return 'What is an ad group anyways?'
    case 2:
      return 'This is the bit I really care about!'
    default:
      return 'Unknown stepIndex'
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()
  const methods = useForm()
  const { handleSubmit, control, reset } = methods
  const onSubmit = (data) => console.log(data)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {GetStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? (
                  <Button onSubmit={handleSubmit(onSubmit)}>Enviar</Button>
                ) : (
                  'Next'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
