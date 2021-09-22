import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import NavBar1 from "../components/NavBar1";
import Typography from "@material-ui/core/Typography";
import axios from "_axios@0.19.2@axios";
import Grid from "_@material-ui_core@4.12.1@@material-ui/core/Grid";
import Divider from "_@material-ui_core@4.12.1@@material-ui/core/Divider";
import TabContext from '@material-ui/lab/TabContext';
import Card from "_@material-ui_core@4.12.1@@material-ui/core/Card";
import CardContent from "_@material-ui_core@4.12.1@@material-ui/core/CardContent";
import NationalResultCard from "../components/NationalResultCard";
import TableCell from "_@material-ui_core@4.12.1@@material-ui/core/TableCell";
import TableRow from "_@material-ui_core@4.12.1@@material-ui/core/TableRow";
import Paper from "_@material-ui_core@4.12.1@@material-ui/core/Paper";
import Table from "_@material-ui_core@4.12.1@@material-ui/core/Table";
import TableHead from "_@material-ui_core@4.12.1@@material-ui/core/TableHead";
import TableBody from "_@material-ui_core@4.12.1@@material-ui/core/TableBody";
import TableContainer from "_@material-ui_core@4.12.1@@material-ui/core/TableContainer";
import TabPanel from "_@material-ui_lab@4.0.0-alpha.60@@material-ui/lab/TabPanel";
import statPic from "../assets/images/stat.svg";
import trophy from "../assets/images/trophy.svg"
import kgraph from "../assets/images/tupu.svg"
import {Column, Item, Row} from "_@mui-treasury_components@1.10.1@@mui-treasury/components/flex";
import {useDynamicAvatarStyles} from "_@mui-treasury_styles@1.13.1@@mui-treasury/styles/avatar/dynamic";
import Avatar from "_@material-ui_core@4.12.1@@material-ui/core/Avatar";
import {
    Info,
    InfoCaption,
    InfoSubtitle,
    InfoTitle
} from "_@mui-treasury_components@1.10.1@@mui-treasury/components/info";
import {useD01InfoStyles} from "_@mui-treasury_styles@1.13.1@@mui-treasury/styles/info/d01";
import injurePic from "../assets/images/injure.svg";
import Graph from "react-graph-vis";
import {useTrendInfoStyles} from "@mui-treasury/styles/info/trend";
import Box from "@material-ui/core/Box";



const style = theme => ({
    main: {
        backgroundColor: '#ffffff',
        minHeight: '100%',
        position: 'absolute',
        width: '100%',
        left: 0,
        top: 0
    },
    navBar: {
        backgroundColor: 'transparent',
        boxShadow: '0 0 0 0',
        padding: '20px',
    },
    wrapper: {
        padding: '100px 35px 35px 35px',
        [theme.breakpoints.down("xs")]: {
            padding: "10px 10px"
        },
        margin: '25px 25px'
    },
    footer: {
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        color: '#000000',
        height: '30px',
        backgroundColor: '#FFFFFF',
        position: 'fixed',
        bottom: 0
    },
    table: {
        marginTop:'10px',
        marginLeft:'20px'
    },
    line: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    infoCard: {
        padding: theme.spacing(3),
        backgroundColor: '#ffffff',
        height: '150px',
    },
    statisticCard: {
        padding: theme.spacing(3)
    },
    kgCard: {
        padding: theme.spacing(5),
        marginTop: '-75px'
    },
})
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'green',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const callbacks = {
    onWordClick: console.log,
    onWordMouseOver: console.log,
    getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
}
const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    fontSizes: [30, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
};

const graphOptions = {
    groups: {
        self: {
            color: { background: "#00FA9A", border: "#00FA9A" },
            // shape: "circle",
            scaling: { min: 20 }
        },
        teammate: {
            color: { background: "#ffa3a3", border: "#ffa3a3" },
            shapeProperties: { borderDashes: true },
            // shape: "box",
        },
        relation: {
            color: { background: "#a9d2a9", border: "#a9d2a9" },
            shapeProperties: { borderDashes: true },
            // shape: "ellipse"
        },
        教练: {
            color: { background: "#98F5FF", border: "#98F5FF" },
            shapeProperties: { borderDashes: true },
        },
        前锋: {
            color: { background: "#87CEFF", border: "#87CEFF" },
            shapeProperties: { borderDashes: true },
        },
        中场: {
            color: { background: "#90EE90", border: "#90EE90" },
            shapeProperties: { borderDashes: true },
        },
        后卫: {
            color: { background: "#FF83FA", border: "#FF83FA" },
            shapeProperties: { borderDashes: true },
        },
        门将: {
            color: { background: "#FFF8DC", border: "#FFF8DC" },
            shapeProperties: { borderDashes: true },
        },
        rival: {
            color: { background: "#FF6347", border: "#FF6347" },
            shapeProperties: { borderDashes: true },
            // shape: "box"
        },
        honor: {
            color: { background: "#FFD700", border: "#FFD700" },
            shapeProperties: { borderDashes: true },
            // shape: "box"
        }
    },
    layout: {
        hierarchical: false
    },
    edges: {
        width: 2,
        font: { align: "bottom", strokeWidth: 3, strokeColor: "#ffffff" },
        color: {
            color: "#cccccc",
            highlight: "#aabbee",
            hover: "#aaaaaa",
            inherit: "both",
            opacity: 1
        },
        arrowStrikethrough: false,
        // font: '12px arial #ff0000',
        scaling: {
            min: 1,
            max: 10,
            label: true
        },
        smooth: {
            type: "continuous",
            forceDirection: "horizontal"
        }
    },
    nodes: {
        font: {
            size: 10
        },
        color: {
            hover: {
                border: '#D2E5FF',
                background: '#D2E5FF'
            }
        },
        shape: "dot",
        size: 15,
        scaling: {
            type: "incomingAndOutgoingConnections",
            min: 10,
            max: 60,
            label: {
                enabled: true,
                min: 20,
                max: 32
            }
        }
    },
    interaction:{
        hover: true,
        zoomView: false
    }
};

const events = {
    select: function(event) {
        let { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
    }
};

const PersonItem = ({ src, name, type, id }) => {
    const avatarStyles = useDynamicAvatarStyles({ size: 85});
    return (
        <Item>
            <Avatar classes={avatarStyles} src={src} />
            {
                type === 1 ? <div style={{marginTop:"8px",textAlign:'center'}}><a href={"/player/" + id}>{name.length>6?name.toString().substring(0,5)+"...":name}</a></div> : <div style={{marginTop:"8px",textAlign:'center'}}><a href={"/team/" + id}>{name.length>6?name.toString().substring(0,5)+"...":name}</a></div>
            }
        </Item>
    );
}

function AboutList(prams) {
    const about = prams.about ? prams.about : []
    const avatarStyles = useDynamicAvatarStyles({ size: 40 });
    return (
        <Box style={{display:'flex', justifyContent:'space-between' ,marginBottom:'20px'}}>
            {
                about.map((item) => (
                    <Box>
                        <PersonItem name={item.name} src={item.img_url} type={item.type} id={item.id}/>
                    </Box>
                ))
            }
        </Box>
    );
}

function NewsList(prams) {
    const news = prams.news
    const avatarStyles = useDynamicAvatarStyles({ size: 40 });
    return (
        <Column gap={3}>
            {
                news.map((item) => (
                    <div>
                    <Row>
                        <Item>
                            <Avatar
                                variant={'rounded'}
                                classes={avatarStyles}
                                src={item.img_urls}
                            />
                        </Item>
                        <Info useStyles={useTrendInfoStyles}>
                            <InfoTitle style={{alignItems: 'center'}}><a style={{textDecoration: 'none'}} href={item.urls}>{item.titles}</a></InfoTitle>
                        </Info>
                    </Row>
                    <Divider/>
                    </div>
                ))
            }
        </Column>
    );
}

class TeamPage extends Component {
    state = {
        input: this.props.match.params.input,
        info: {},
        teamRelatedPeopleList: [],
        teamHonorRecordList:[],
        graph: {nodes: [], edges: []},
        news: [],
        about: [],
        imgURL: "",
        loading: true,
        catalog: -1,
        time: 220
    }

    async componentWillMount() {
        const that = this
        await axios.get('/team/getAll/' + that.state.input)
            .then(function (response) {
                that.setState({
                    info: response.data['teamBaseInfo'],
                    about: response.data['recommendList'],
                    teamRelatedPeopleList:response.data['teamRelatedPeopleList'],
                    teamHonorRecordList:response.data['teamHonorRecordList'],
                    imgURL: response.data['imgURL']
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        await axios.get('/team/kg/' + that.state.input)
            .then(function (response) {
                that.setState({
                    graph: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        await axios.get('/team/news/' + that.state.input)
            .then(function (response) {
                that.setState({
                    news: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.input &&
            (this.props.match.params.input !== nextProps.match.params.input)) {
            this.setState({
                input: nextProps.match.params.input
            })
        }
    }

    render() {
        const {classes} = this.props;
        const { info, imgURL, graph, news, about } = this.state;
        let rows = this.state.teamRelatedPeopleList;
        let rows1 = this.state.teamHonorRecordList;

        let emptyCaption, emptyCaption1;
        if(rows.length === 0) {
            emptyCaption = <caption style={{textAlign: 'center'}}>暂无数据</caption>
        }
        else emptyCaption = <div/>
        if(rows1.length === 0) {
            emptyCaption1 = <caption style={{textAlign: 'center'}}>暂无数据</caption>
        }
        else emptyCaption1 = <div/>

        return (
            <div className={classes.main}>
                <NavBar1 className={classes.navBar} />
                <div className={classes.wrapper}>
                    <Grid container spacing={5}>
                        <Grid container xs={8}>
                            <Grid container xs={12}>
                                <Grid item xs>
                                    <div className={classes.infoCard}>
                                        <NationalResultCard data={{info: info, imgURL: imgURL , show:0}}/>
                                    </div>
                                    <div className={classes.statisticCard}>
                                        <Row>
                                            <img src={statPic} style={{marginRight: '10px', height: '32px', width: '32px'}}/>
                                            <Typography variant="h6" component="h5" >俱乐部阵容</Typography>
                                        </Row>
                                        <TabContext>
                                            <TabPanel >
                                                <TableContainer component={Paper} >
                                                    <Table aria-label="customized table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell align="center">位置</StyledTableCell>
                                                                <StyledTableCell align="center">号码</StyledTableCell>
                                                                <StyledTableCell align="center">姓名</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {rows.map((row) => (
                                                                <StyledTableRow >
                                                                    <StyledTableCell align="center">{row.role}</StyledTableCell>
                                                                    <StyledTableCell align="center">{row.number?row.number:'~'}</StyledTableCell>
                                                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                                                </StyledTableRow>
                                                            ))}
                                                        </TableBody>
                                                        {emptyCaption}
                                                    </Table>
                                                </TableContainer>
                                            </TabPanel >
                                        </TabContext>
                                    </div>
                                    <Divider/>
                                    <div className={classes.statisticCard}>
                                        <Row>
                                            <img src={trophy} style={{marginRight: '10px', height: '32px', width: '32px'}}/>
                                            <Typography variant="h6" component="h5" >荣誉记录</Typography>
                                        </Row>
                                        <TabContext>
                                            <TabPanel >
                                                <TableContainer component={Paper} >
                                                    <Table aria-label="customized table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell align="center">比赛</StyledTableCell>
                                                                <StyledTableCell align="center">获奖年份</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {rows1.map((row) => (
                                                                <StyledTableRow >
                                                                    <StyledTableCell style={{width:'26%'}}>🏆&nbsp;{row.honor}✖️{row.years.split(',').length}</StyledTableCell>
                                                                    <StyledTableCell style={{wordBreak:"break-all" }} >{row.years.split(',').map((year) => (
                                                                        <span style={{width: 100, display: 'inline-block'}}>{year}</span>
                                                                    ))}</StyledTableCell>
                                                                </StyledTableRow>
                                                            ))}
                                                        </TableBody>
                                                        {emptyCaption1}
                                                    </Table>
                                                </TableContainer>
                                            </TabPanel >
                                        </TabContext>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Card className={classes.additionalInfo} style={{paddingTop:'6px',paddingLeft:'6px'}}>
                                <CardContent >
                                    <Typography variant="h6" component="h5" style={{marginBottom:"15px",marginTop:'30px'}}>
                                        相关搜索
                                    </Typography>
                                    <AboutList about={about}/>
                                    <Divider className={classes.line}/>
                                    <Typography variant="h6" component="h5" style={{marginBottom:"15px",marginTop:'30px'}}>
                                        {info.name}的最新动态
                                    </Typography>
                                    <NewsList news={news}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.kgCard}>
                    <Divider/>
                    <div className={classes.statisticCard}>
                        <Row>
                            <img src={kgraph} style={{marginRight: '10px', height: '32px', width: '32px'}}/>
                            <Typography variant="h6" component="h5">
                                知识图谱
                            </Typography>
                        </Row>
                        <Card style={{ height: "1000px", marginTop: '30px' }}>
                            <Graph
                                graph={graph}
                                options={graphOptions}
                                events={events}
                                style={{ height: "100%", width: "100%", fontFamily: 'sans-serif', textAlign: 'center' }}
                            />
                        </Card>
                    </div>
                </div>
                <footer className={classes.footer} >
                    <Typography variant="body2" component="p" style={{marginTop: 5}}>
                        Copyright © <a href={'https://github.com/Cheungki/KnowABall'} style={{color: 'black'}}>G07</a> @Zhejiang University. All Rights Reserved.
                    </Typography>
                </footer>
            </div>
        )
    }
}

export default withStyles(style)(TeamPage);