import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
)

export default function Navbar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Professional English - Encuesta
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
