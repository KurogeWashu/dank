import React from 'react'
import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles'
import theme from '../theme/theme'
import { WadDecimal, getData, 
  // toChai, 
  toDai, toDeur } from '../utils/web3Utils'
import { join, exit } from '../actions/main'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'

const styles = () => ({
   card: {
        marginBottom: theme.spacing(6)
   },
   input: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
    actionButton: {
        marginTop: theme.spacing(2),
        margin: '0px auto'
    },
    accountBalance: {
        float: 'right',
    },
})

class JoinExitContainer extends React.Component {
    async componentDidMount() {
        // update data periodically
        this.watchData()
    }

    async watchData() {
        await getData.bind(this)()
        setInterval(() => {
            getData.bind(this)()
        }, 10 * 1000)
    }

    join() {
        join.bind(this)()
    }

    exit() {
        exit.bind(this)()
    }

    setMax() {
      const {store} = this.props
      const action = store.get('joinexitAction')
      if (action === 0) {
        const daiBalanceDecimal = store.get('daiBalanceDecimal')
        store.set('joinAmount', daiBalanceDecimal)
      } else {
        const deurBalanceDecimal = store.get('deurBalanceDecimal')
        store.set('exitAmount', deurBalanceDecimal)
      }
    }

    handleInput(event) {
      const {store} = this.props
      const action = store.get('joinexitAction')
      let value
      try {
        value = new WadDecimal(event.target.value)
      } catch {
        if (event.target.value.length === 0) {
          value = new WadDecimal(0)
        } else {
          return
        }
      }
      if (action === 0) {
        store.set('joinAmount', value)
      } else {
        store.set('exitAmount', value)
      }
    }
    handleChange (event, newValue) {
      const {store} = this.props
      store.set('joinexitAction',  newValue)
    }

    render() {
        const {classes, store} = this.props

        const walletAddress = store.get('walletAddress')
        const daiBalance = store.get('daiBalance')
        const daiBalanceDecimal = store.get('daiBalanceDecimal')
        // const chaiBalance = store.get('chaiBalance')
        // const chaiBalanceDecimal = store.get('chaiBalanceDecimal')
        const deurBalance = store.get('deurBalance')
        const deurBalanceDecimal = store.get('deurBalanceDecimal')
        const joinAmount = store.get('joinAmount')
        const exitAmount = store.get('exitAmount')
        const web3 = store.get('web3')
        const isSignedIn = walletAddress && walletAddress.length

        const canJoin = joinAmount && (joinAmount.cmp(daiBalanceDecimal) < 1)
        const canExit = exitAmount && (exitAmount.cmp(deurBalanceDecimal) < 1)
        // const canExit = true

        const joinexitAction = store.get('joinexitAction')

        return <Card className={classes.card}>
                  <CardContent>
                    <Typography variant='h4'>Exchange</Typography>

                    {/* TODO: Add radio buttons to choose which token to interface with */}

                    <Tabs value={joinexitAction} onChange={this.handleChange.bind(this)} centered>
                      {/* Dai -> Deur */}
                      <Tab label="Buy" id="join-tab" />
                      {/* Deur -> Dai */}
                      <Tab label="Sell" id="exit-tab" />
                    </Tabs>
                    <br/>

                  <Box hidden={joinexitAction !== 0}> 
                    <Typography variant='subtitle1' align="center">DAI &#8594; DEUR</Typography><br/>

                    <Button variant="text" className={classes.accountBalance}
                  style={{textTransform: 'none'}}
                  onClick={this.setMax.bind(this)}
                    >{daiBalance ? `Balance: ${daiBalance} DAI` : '-'}</Button>
                    
                    <TextField label="DAI Amount" placeholder='0' className={classes.input} value={joinAmount.toString() !== "0" ? joinAmount : ''} margin="normal" variant="outlined" type="number" onChange={this.handleInput.bind(this)} InputProps={{ inputProps: { min: 0 },
                                            endAdornment: <InputAdornment className={classes.endAdornment} position="end">DAI</InputAdornment>
                                        }}
                  helperText={(isSignedIn && joinAmount) ? "You will receive approximately " + toDeur.bind(this)(web3.utils.toWei(String(joinAmount))) + " DEUR": " "}
                    />
                        <Button color='primary'
                            size='large'
                            onClick={() => {
                                this.join()
                            }} variant="contained" disabled={!isSignedIn || !canJoin} className={classes.actionButton}>
                            Convert
                        </Button>
                  </Box>
                  <Box hidden={joinexitAction !== 1}>
                    <Typography variant='subtitle1' align="center">DEUR &#8594; DAI</Typography><br/>

                    <Button className={classes.accountBalance}
                  style={{textTransform: 'none'}}
                  onClick={this.setMax.bind(this)}
                    >{deurBalance? `Balance: ${deurBalance} DEUR` : '-'}</Button>


                    <TextField label="DEUR Amount" placeholder='0' className={classes.input} margin="normal" variant="outlined" value={exitAmount.toString() !== "0" ? exitAmount : ''} type="number" onChange={this.handleInput.bind(this)} InputProps={{ inputProps: { min: 0 },
                                        endAdornment: <InputAdornment className={classes.endAdornment} position="end">DEUR</InputAdornment>
                                    }}
                  helperText={(isSignedIn && exitAmount) ? "You will receive approximately " + toDai.bind(this)(web3.utils.toWei(String(exitAmount))) + " Dai": " "}
                    />
                    <Button color='primary'
                        size='large'
                        onClick={() => {
                            this.exit()
                        }} variant="contained" disabled={!isSignedIn || !canExit} className={classes.actionButton}>
                       Convert
                    </Button>
              </Box>
          </CardContent></Card>

    }
}

export default withStyles(styles)(withStore(JoinExitContainer))
