import React, { useState } from 'react'
import {
  Formik,
  Form,
  Field,
  FormikConfig,
  FormikValues,
  useFormik,
} from 'formik'
import { object, mixed, number, string, boolean } from 'yup'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
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
} from '@material-ui/core'

import { fetchData } from '../helpers/fetch'
import { useForm } from '../hooks/useInput'

const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            name: '',
            lastname: '',
            email: '',
            telephone: '',
            ocupacion: '',
            terms: false,
            money: 0,
            description: '',
          }}
          onSubmit={async (values) => {
            await sleep(3000)
            console.log('values', values)

            try {
              const resp = await fetchData(
                'user_data',
                {
                  values,
                },
                'POST'
              )
              const body = await resp.json()
              console.log(body)
              setTimeout(() => {
                window.location.reload(true)
              }, 2000)
            } catch (err) {
              console.log(err.message)
            }
          }}
        >
          <FormikStep
            validationSchema={object({
              name: string()
                .min(2, 'Muy corto!')
                .max(50, 'Muy Largo!')
                .required('Campo requerido'),
              lastname: string()
                .min(2, 'Muy corto!')
                .max(50, 'Muy Largo!')
                .required('Campo requerido'),
              email: string()
                .email('Correo electrónico invalido')
                .required('Campo requerido'),
              telephone: string()
                .min(10, 'El teléfono tiene que tener 10 digitos!')
                .required('Campo requerido'),
              ocupacion: string()
                .min(2, 'Muy corto!')
                .max(50, 'Muy Largo!')
                .required('Campo requerido'),
              terms: boolean()
                .required('Requerido')
                .oneOf(
                  [true],
                  'Tienes que aceptar los terminos y condiciones.'
                ),
            })}
            label="Personal Data"
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="name"
                label="Nombre"
                component={TextField}
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="lastname"
                label="Apellido"
                component={TextField}
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="email"
                label="Correo electrónico"
                component={TextField}
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="telephone"
                label="Teléfono"
                component={TextField}
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="ocupacion"
                label="Ocupación"
                component={TextField}
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                name="terms"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: 'Acepto los terminos y condiciones' }}
              />
            </Box>
          </FormikStep>
          <FormikStep
            validationSchema={object({
              money: mixed().when('millionare', {
                is: true,
                then: number().required().min(1_000_000),
                otherwise: number().required(),
              }),
            })}
            label="Bank Account"
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                type="number"
                name="money"
                component={TextField}
                label="All the money I have"
              />
            </Box>
          </FormikStep>
          <FormikStep label="More Info">
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="description"
                component={TextField}
                label="Description"
              />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  )
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[]
  const [step, setStep] = useState(0)
  const currentChild = childrenArray[step] as React.ReactElement<
    FormikStepProps
  >
  const [completed, setCompleted] = useState(false)

  function isLapStep() {
    return step === childrenArray.length - 1
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLapStep()) {
          await props.onSubmit(values, helpers)
          setCompleted(true)
        } else {
          setStep((s) => s + 1)
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Atras
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting
                  ? 'Enviando'
                  : isLapStep()
                  ? 'Enviar'
                  : 'Siguiente'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
