import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import Tabs from '@material-ui/core/Tabs';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import axios from "axios";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Area } from '@ant-design/charts';

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

const legendConfig = {position: 'bottom'}

export default class PlayerTable extends Component {
    state = {
        value: "0",
        rows: [],
        statistics: {},
        opacity: {
            得分: 1,
            助攻: 1
        },
    }

    componentDidMount() {
        const that = this
        axios.get('/player/match/' + that.props.id + '/0')
            .then(function (response) {
                that.setState({
                    rows: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange = (event, newValue) => {
        if(newValue !== '4') {
            const that = this
            axios.get('/player/match/' + that.props.id + '/' + newValue)
                .then(function (response) {
                    that.setState({
                        rows: response.data,
                        value: newValue,
                        statistics: {}
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            const that = this
            axios.get('/player/match/' + that.props.id + '/0')
                .then(function (response) {
                    let data = response.data, stat = []
                    data.forEach(function (item) {
                        stat.push({贡献: '进球', value: item.goal, season: item.season})
                        stat.push({贡献: '助攻', value: item.assist, season: item.season})
                    })
                    stat.reverse()
                    that.setState({
                        statistics: stat,
                        value: newValue,
                        rows: []
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    handleMouseEnter = (o) => {
        const { dataKey } = o;
        const { opacity } = this.state;

        this.setState({
            opacity: { ...opacity, [dataKey]: 0.5 },
        });
    };

    handleMouseLeave = (o) => {
        const { dataKey } = o;
        const { opacity } = this.state;

        this.setState({
            opacity: { ...opacity, [dataKey]: 1 },
        });
    };

    render() {
        const {value, rows, statistics} = this.state
        let emptyCaption;
        if(rows.length === 0) {
            emptyCaption = <caption style={{textAlign: 'center'}}>暂无数据</caption>
        }
        else emptyCaption = <div/>

        return (
            <TabContext value={value}>
                <Tabs
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                    value={value}
                    onChange={this.handleChange}
                >
                    <Tab label={'总计'} value="0"/>
                    <Tab label={'联赛'} value="1"/>
                    <Tab label={'杯赛'} value="2"/>
                    <Tab label={'国家队'} value="3"/>
                    <Tab label={'数据分析'} value="4"/>
                </Tabs>
                <TabPanel value="0">
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">赛季</StyledTableCell>
                                    <StyledTableCell align="center">俱乐部</StyledTableCell>
                                    <StyledTableCell align="center">上场</StyledTableCell>
                                    <StyledTableCell align="center">首发</StyledTableCell>
                                    <StyledTableCell align="center">进球</StyledTableCell>
                                    <StyledTableCell align="center">助攻</StyledTableCell>
                                    <StyledTableCell align="center">黄牌</StyledTableCell>
                                    <StyledTableCell align="center">红牌</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.season}>
                                        <StyledTableCell component="th" scope="row" align="center">
                                            {row.season}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.club}</StyledTableCell>
                                        <StyledTableCell align="center">{row.play}</StyledTableCell>
                                        <StyledTableCell align="center">{row.start}</StyledTableCell>
                                        <StyledTableCell align="center">{row.goal}</StyledTableCell>
                                        <StyledTableCell align="center">{row.assist}</StyledTableCell>
                                        <StyledTableCell align="center">{row.yellowCard}</StyledTableCell>
                                        <StyledTableCell align="center">{row.redCard}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            {emptyCaption}
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value="1">
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">赛季</StyledTableCell>
                                    <StyledTableCell align="center">俱乐部</StyledTableCell>
                                    <StyledTableCell align="center">上场</StyledTableCell>
                                    <StyledTableCell align="center">首发</StyledTableCell>
                                    <StyledTableCell align="center">进球</StyledTableCell>
                                    <StyledTableCell align="center">助攻</StyledTableCell>
                                    <StyledTableCell align="center">黄牌</StyledTableCell>
                                    <StyledTableCell align="center">红牌</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.season}>
                                        <StyledTableCell component="th" scope="row" align="center">
                                            {row.season}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.club}</StyledTableCell>
                                        <StyledTableCell align="center">{row.play}</StyledTableCell>
                                        <StyledTableCell align="center">{row.start}</StyledTableCell>
                                        <StyledTableCell align="center">{row.goal}</StyledTableCell>
                                        <StyledTableCell align="center">{row.assist}</StyledTableCell>
                                        <StyledTableCell align="center">{row.yellowCard}</StyledTableCell>
                                        <StyledTableCell align="center">{row.redCard}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            {emptyCaption}
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value="2">
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">赛季</StyledTableCell>
                                    <StyledTableCell align="center">杯赛</StyledTableCell>
                                    <StyledTableCell align="center">俱乐部</StyledTableCell>
                                    <StyledTableCell align="center">上场</StyledTableCell>
                                    <StyledTableCell align="center">首发</StyledTableCell>
                                    <StyledTableCell align="center">进球</StyledTableCell>
                                    <StyledTableCell align="center">助攻</StyledTableCell>
                                    <StyledTableCell align="center">黄牌</StyledTableCell>
                                    <StyledTableCell align="center">红牌</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.season}>
                                        <StyledTableCell component="th" scope="row" align="center">
                                            {row.season}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.eventName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.club}</StyledTableCell>
                                        <StyledTableCell align="center">{row.play}</StyledTableCell>
                                        <StyledTableCell align="center">{row.start}</StyledTableCell>
                                        <StyledTableCell align="center">{row.goal}</StyledTableCell>
                                        <StyledTableCell align="center">{row.assist}</StyledTableCell>
                                        <StyledTableCell align="center">{row.yellowCard}</StyledTableCell>
                                        <StyledTableCell align="center">{row.redCard}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            {emptyCaption}
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value="3">
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">赛季</StyledTableCell>
                                    <StyledTableCell align="center">国家队</StyledTableCell>
                                    <StyledTableCell align="center">上场</StyledTableCell>
                                    <StyledTableCell align="center">首发</StyledTableCell>
                                    <StyledTableCell align="center">进球</StyledTableCell>
                                    <StyledTableCell align="center">助攻</StyledTableCell>
                                    <StyledTableCell align="center">黄牌</StyledTableCell>
                                    <StyledTableCell align="center">红牌</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.season}>
                                        <StyledTableCell component="th" scope="row" align="center">
                                            {row.season}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.club}</StyledTableCell>
                                        <StyledTableCell align="center">{row.play}</StyledTableCell>
                                        <StyledTableCell align="center">{row.start}</StyledTableCell>
                                        <StyledTableCell align="center">{row.goal}</StyledTableCell>
                                        <StyledTableCell align="center">{row.assist}</StyledTableCell>
                                        <StyledTableCell align="center">{row.yellowCard}</StyledTableCell>
                                        <StyledTableCell align="center">{row.redCard}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            {emptyCaption}
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value="4">
                    {/*<AreaChart*/}
                    {/*    width={800}*/}
                    {/*    height={400}*/}
                    {/*    data={statistics}*/}
                    {/*    margin={{*/}
                    {/*        top: 10,*/}
                    {/*        right: 30,*/}
                    {/*        left: 0,*/}
                    {/*        bottom: 0,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <CartesianGrid strokeDasharray="3 3" />*/}
                    {/*    <XAxis dataKey="season" />*/}
                    {/*    <YAxis />*/}
                    {/*    <Tooltip />*/}
                    {/*    <Area type="monotone" dataKey="得分" stackId="1" stroke="#8884d8" fill="#8884d8" />*/}
                    {/*    <Area type="monotone" dataKey="助攻" stackId="1" stroke="#82ca9d" fill="#82ca9d" />*/}
                    {/*    /!*<Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />*!/*/}
                    {/*    <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />*/}
                    {/*</AreaChart>*/}
                    <Area
                        data = {statistics}
                        xField = 'season'
                        smooth = {true}
                        yField = 'value'
                        seriesField = '贡献'
                        legend ={legendConfig}
                    />
                </TabPanel>
            </TabContext>
        );
    }
}