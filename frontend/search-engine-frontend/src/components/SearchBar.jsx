import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import MessageBar from './MessageBar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from "_axios@0.19.2@axios";
import {Search} from "_@material-ui_icons@4.11.2@@material-ui/icons";
import IconButton from "_@material-ui_core@4.12.1@@material-ui/core/IconButton";
import { Row } from '@mui-treasury/components/flex';


const style = theme => ({
  divider: {
    width: 1,
    height: 35,
    display: 'inline',
    margin: 5,
  },
  select: {
    width: '100px',
    margin: '0 10px'
  },
});
// const catalogs = ["全部资源", "使用手册", "项目实战", "视频教程", "源码分析", "技术问答"];

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: this.props.match.params.input || "",
      catalog: 0, //catalog index, first is 0
      showMsg: false,
      msg: "",
      complete:[]
    }
  };
  handleInputChange = (event,newInputValue) => {
    const that = this
    if(newInputValue===''){
      this.setState({
        complete:[],
      })
    }
    else{
      axios.get('/search/suggest/all/' +newInputValue)
          .then(function (response) {
            console.log(response.data)
            that.setState({
              complete: response.data,
              input:newInputValue
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }
  handleSearch = (e) => {
    e.preventDefault();
    const {input} = this.state;
    if(input.trim().length === 0) {
      // alert("输入不能为空！");
      this.setState({
        showMsg: true,
        msg: "输入不能为空！",
        input: ""
      })
    }else if(input.length > 30) {
      // alert("输入不能超过20个字符！");
      this.setState({
        showMsg: true,
        msg: "输入不能超过30个字符！",
        input: ""
      })
    }  else {
      this.props.history.push({
        pathname: `/search/query/${input}`,
        query: {
          input: input
        }
      });
    }
  }

  handleClose = () => {
    this.setState({
      showMsg: false,
    })
  }
  render() {
    const { input, showMsg, msg, complete} = this.state;
    let options = complete.map((option) => option.keyword);
    return (
      <div >
        {showMsg && <MessageBar show={showMsg} msg={msg} handleClose={this.handleClose} />}
        <form onSubmit={this.handleSearch}>
              <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  value={input}
                  autoHighlight
                  onInputChange={this.handleInputChange}
                  style={{width:'660px'}}
                  getOptionLabel={(option) => option}
                  options={options}
                  renderInput={(params) => (
                      <Row>
                      <TextField
                          {...params}style={{textDecoration:'none'}}

                          margin="normal"
                          variant="outlined"
                          placeholder="搜索足球资讯..."
                          InputProps={{ ...params.InputProps, type: 'search',style:{backgroundColor:'rgb(255,255,255)'}}}
                          style={{marginTop:'0px',marginBottom:'0px',marginLeft:'10px'}}
                      />
                        <IconButton  aria-label="Search"
                                    color="primary"
                            // onClick={this.handleClick}
                                    type="submit"
                        >
                          <Search />
                        </IconButton>
                    </Row>
                  )}
              />
        </form>
      </div>
    )
  }
}
const SearchRouter = withRouter(SearchBar);
export default withStyles(style)(SearchRouter);