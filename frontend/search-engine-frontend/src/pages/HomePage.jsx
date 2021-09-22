import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FindInPage, Favorite } from '@material-ui/icons';
import backgroundImg from '../assets/images/background2.jpg';
import SearchBar from '../components/SearchBar';
import logo from '../assets/images/logo.png';
import soccer from '../assets/images/soccer.svg'


const style = theme => ({
  root: {
    height: '100%'
  },
  wrapper: {
    width: '100%',
    height: '100%',
    background: `url(${backgroundImg}) no-repeat center`,
    backgroundSize: 'cover',
    position: 'fixed'
  },
  title: {
    marginLeft: '15px',
    marginTop: '150px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center'
  },
  navLinks: {
    marginLeft: 'auto',
    marginRight: '0'
  },
  linkItem: {
    margin: '0 10px'
  },
  navBar: {
    backgroundColor: 'transparent',
    color: "#ffffff",
    boxShadow: '0 0 0 0',
    padding: '20px 30px'
  },
  content: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    color: '#ffffff',
    position: 'fixed',
    bottom: 20
  },
  loveIcon: {
    fontSize: '1rem',
    padding: '2px 5px'
  }
});

class HomePage extends React.Component {
  state = {
    input: "",
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <AppBar position="absolute" className={classes.navBar}>
            <Toolbar>
              {/*<img src={soccer} style={{width: 25,fill:'rgb(245,245,245)'}}/>*/}
              {/*<Typography variant="subtitle1" >*/}
              {/* 超全球员数据，海量比赛资讯*/}
              {/*</Typography>*/}

            </Toolbar>
          </AppBar>
          <div>
            <div className={classes.title}>
              <img src={logo} alt="techhub logo" style={{width: 350}}/>
              <SearchBar />
            </div>

          </div>
          <footer className={classes.footer} >
            <Typography variant="body2" component="p">
              Copyright © <a href={'https://github.com/Cheungki/KnowABall'} style={{color: 'white'}}>G07</a> @Zhejiang University. All Rights Reserved.
              {/*<InfoCircleOutlined />*/}
            </Typography>
          </footer>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(HomePage);