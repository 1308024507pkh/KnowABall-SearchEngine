import React, {Component} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { twitterTabsStylesHook } from '@mui-treasury/styles/tabs';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} style={index===1?{paddingBottom:'8px',paddingTop:'6px'}:{paddingTop:'0',paddingBottom:'13px'}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.rationRoot}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    rationRoot: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
}));
export default function TablePanel(props) {
        const classes = useStyles();
        const [value, setValue] = React.useState(0);
        const [selectValue, setSelectValue] = React.useState('female');
        const tabsStyles = twitterTabsStylesHook.useTabs();
        const tabItemStyles = twitterTabsStylesHook.useTabItem();

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };
        const selectHandleChange = (event) => {
            setSelectValue(event.target.value);
            props.changeCatalog(event.target.value);
        };


        return (
            <div className={classes.root}>
                <AppBar position="static" style={{backgroundColor: "rgb(255,255,255)", color: "rgb(0,0,0)"}}>
                    <Tabs value={value} classes={tabsStyles} onChange={handleChange} aria-label="simple tabs example">
                        <Tab style={{width: '15%'}} classes={tabItemStyles} label="搜索结果" {...a11yProps(0)} />
                        <Tab style={{width: '15%'}} classes={tabItemStyles} label="高级筛选" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <AppBar position="static" style={{backgroundColor: "rgb(255,255,255)", color: "rgb(0,0,0)"}}>
                    <TabPanel value={value} index={1}>
                        <FormControl component="fieldset" style={{display: 'inline-block'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <FormLabel component="legend"
                                           style={{display: 'inline-block', marginRight: '50px'}}>结果:</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={selectValue}
                                            style={{display: 'inline-block'}} onChange={selectHandleChange}>
                                    <FormControlLabel value="all" control={<StyledRadio/>} label="全部"/>
                                    <FormControlLabel value="player" control={<StyledRadio/>} label="球员"/>
                                    <FormControlLabel value="team" control={<StyledRadio/>} label="球队"/>
                                    <FormControlLabel value="news" control={<StyledRadio/>} label="资讯"/>
                                </RadioGroup>
                            </div>
                        </FormControl>
                    </TabPanel>
                    <TabPanel value={selectValue + value} index={"player1"}>
                        <FormControl component="fieldset" style={{display: 'inline-block'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <FormLabel component="legend"
                                           style={{display: 'inline-block', marginRight: '50px'}}>结果</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={selectValue}
                                            style={{display: 'inline-block'}} onChange={selectHandleChange}>
                                    <FormControlLabel value="all" control={<StyledRadio/>} label="全部"/>
                                    <FormControlLabel value="player" control={<StyledRadio/>} label="球员"/>
                                    <FormControlLabel value="team" control={<StyledRadio/>} label="球队"/>
                                    <FormControlLabel value="news" control={<StyledRadio/>} label="资讯"/>
                                </RadioGroup>
                            </div>
                        </FormControl>
                    </TabPanel>
                    <TabPanel value={selectValue + value} index={"team1"}>
                        <FormControl component="fieldset" style={{display: 'inline-block'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <FormLabel component="legend"
                                           style={{display: 'inline-block', marginRight: '50px'}}>国家:</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={selectValue}
                                            style={{display: 'inline-block'}}>
                                    <FormControlLabel value="all" control={<StyledRadio/>} label="巴西"/>
                                    <FormControlLabel value="player" control={<StyledRadio/>} label="阿根廷"/>
                                    <FormControlLabel value="team" control={<StyledRadio/>} label="法国"/>
                                    <FormControlLabel value="news" control={<StyledRadio/>} label="德国"/>
                                </RadioGroup>
                            </div>
                        </FormControl>
                    </TabPanel>
                    <TabPanel value={selectValue + value} index={"news1"}>
                        <FormControl component="fieldset" style={{display: 'inline-block'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <FormLabel component="legend"
                                           style={{display: 'inline-block', marginRight: '50px'}}>排序：</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={selectValue}
                                            style={{display: 'inline-block'}}>
                                    <FormControlLabel value="all" control={<StyledRadio/>} label="按相关度排序"/>
                                    <FormControlLabel value="player" control={<StyledRadio/>} label="按时间排序"/>
                                </RadioGroup>
                            </div>
                        </FormControl>
                    </TabPanel>
                </AppBar>

            </div>
        );
}
