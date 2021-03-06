import React from 'react';

import {withStore} from '@spyna/react-store'
import {withStyles} from '@material-ui/styles';
import theme from '../theme/theme'
import { getData } from '../utils/web3Utils'

import Card from '@material-ui/core/Card';
//import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// import { toDai } from '../utils/web3Utils';

import logogif from '../assets/logo.gif'
import logostill from '../assets/logostill.png'

const styles = () => ({
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
        minHeight: 52
    },
    balanceStats: {
        marginBottom: theme.spacing(3),
    },
    paper: {
        // padding: theme.spacing(2),
        textAlign: 'center',
    },
})

class DeurBalanceContainer extends React.Component {

    async componentDidMount() {
        // update data periodically
        //this.watchDsrData()
    }

    async watchDsrData() {
        await getData.bind(this)();
        setInterval(() => {
            getData.bind(this)();
        }, 10 * 1000);
    }

    render() {
        const {classes, store} = this.props
        // const dsr = store.get('dsr')
        const der = store.get('der')
        // const dsrPercent = dsr;
        const deurBalance = store.get('deurBalance')
        const deurBalanceDec = store.get('deurBalanceDecimal')
        let deurBdai = der && deurBalanceDec ? deurBalanceDec.mul(der).div('1e18').toFormat(3) : '-'
        const dankBalance = store.get('dankBalance')
        const dankBalanceDec = store.get('dankBalanceDecimal')
        let dankBdai = der && dankBalanceDec ? dankBalanceDec.mul(der).div('1e18').toFormat(3) : '-'
        const deurTotalSupply = store.get('deurTotalSupply')
        const deurTotalSupplyDec = store.get('deurTotalSupplyDecimal')
        let deurTSdai = der && deurTotalSupplyDec ? deurTotalSupplyDec.mul(der).div('1e18').toFormat(2) : '-'
        const dankTotalSupply = store.get('dankTotalSupply')
        const dankTotalSupplyDec = store.get('deurTotalSupplyDecimal')
        let dankTSdai = der && dankTotalSupplyDec ? dankTotalSupplyDec.mul(der).div('1e18').toFormat(2) : '-'
        const daidankTotalSupply = store.get('daidankTotalSupply')
        const daidankTotalSupplyDec = store.get('daidankTotalSupplyDecimal')
        let daidankTSdai = der && daidankTotalSupplyDec ? daidankTotalSupplyDec.mul(der).div('1e18').toFormat(2) : '-'
        const daideurTotalSupply = store.get('daideurTotalSupply')
        const daideurTotalSupplyDec = store.get('daideurTotalSupplyDecimal')
        let daideurTSdai = der && daideurTotalSupplyDec ? daideurTotalSupplyDec.mul(der).div('1e18').toFormat(2) : '-'


      return <Card ><CardContent>
        
        <Paper elevation={0} className={classes.paper}>
            <Typography variant='h4'>Digital Euro Wallet</Typography>
        </Paper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={0} className={classes.paper}>
                <img
                    style={{resizeMode: 'contain',     width: 250}}
                    src={deurBalance > 0 ? logogif : logostill} 
                    alt="you own DEUR"
                 />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper  elevation={0} className={classes.paper}>
                    <Typography variant='subtitle1'>DEUR Balance</Typography>
                    <Typography variant='h5'>{deurBalance ? `${deurBalance}` : '-'}</Typography>
                    <Typography variant='subtitle2'>(~ ${deurBdai} DAI)</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper  elevation={0} className={classes.paper}>
                    <Typography variant='subtitle1'>DANK Balance</Typography>
                    <Typography variant='h5'>{dankBalance ? `${dankBalance}` : '-'}</Typography>
                    <Typography variant='subtitle2'>(~ ${dankBdai} DAI)</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper  elevation={0} className={classes.paper}>
                    <Typography variant='subtitle1'>Total DEUR Supply</Typography>
                    <Typography variant='h5'>{deurTotalSupply ? `${deurTotalSupply}` : '-'}</Typography>
                    <Typography variant='subtitle2'>(~ ${deurTSdai} DAI)</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper  elevation={0} className={classes.paper}>
                    <Typography variant='subtitle1'>DEUR LP Size</Typography>
                    <Typography variant='h5'>{deurTotalSupply ? `${daideurTotalSupply}` : '-'}</Typography>
                    <Typography variant='subtitle2'>(~ ${daideurTSdai} DAI)</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper  elevation={0} className={classes.paper}>
                    <Typography variant='subtitle1'>Total DANK Supply</Typography>
                    <Typography variant='h5'>{dankTotalSupply ? `${dankTotalSupply}` : '-'}</Typography>
                    <Typography variant='subtitle2'>(~ ${dankTSdai} DAI)</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper  elevation={0} className={classes.paper}>
                    <Typography variant='subtitle1'>DANK LP Size</Typography>
                    <Typography variant='h5'>{dankTotalSupply ? `${daidankTotalSupply}` : '-'}</Typography>
                    <Typography variant='subtitle2'>(~ ${daidankTSdai} DAI)</Typography>
              </Paper>
            </Grid>
        </Grid><br/>
        <Paper elevation={0} className={classes.paper}>
            <a target="_blank" href="/about.html" rel="noopener noreferrer">Learn more about digital euro</a>
        </Paper>
        </CardContent></Card>
    }
}

export default withStyles(styles)(withStore(DeurBalanceContainer))
