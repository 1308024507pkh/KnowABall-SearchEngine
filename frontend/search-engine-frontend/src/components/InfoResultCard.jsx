import React, { Component } from 'react'
import Card from "@material-ui/core/Card";
import cx from 'clsx';
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Link1 from '@material-ui/core/Link';
import {Link} from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ModeComment from '@material-ui/icons/ModeComment';
import Favorite from '@material-ui/icons/Favorite';
import Chip from '@material-ui/core/Chip';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
import { useLabelIconStyles } from '@mui-treasury/styles/icon/label';
import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';
import LinkIcon from "_@material-ui_icons@4.11.2@@material-ui/icons/Link";

const useStyles = makeStyles(({ spacing, palette }) => ({
    card: {
        display: 'flex',
        borderRadius: 16,
    },
    media: {
        width:'160px',
        height:'160px',
        display: 'block',
        flexShrink: 0,
        backgroundColor: palette.grey[200],
        borderRadius: 12,
        boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
        marginRight:'40px'
    },
    content: {
        padding: spacing(0, 2, 0, 0),
        width:'100%'
    },
    heading: {
        fontSize: 17,
        textDecoration:'none',
        Color:'black',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        marginBottom: 5,
        marginRight: spacing(1.5),
        display: 'inline-block',
    },
    body: {
        fontSize: 15,
        width:'100%',
        color: palette.grey[500],
    },
    divider: {
        margin: spacing(1, 0),
    },
    textFooter: {
        fontSize: 14,
    },
    icon: {
        fontSize: '1.2rem',
        verticalAlign: 'bottom',
    },
    textItem:{
        marginBottom:'5px',
        lineHeight:'25px'
    }
}));
const ReviewCard2Demo = React.memo(function(info) {
    const styles = useStyles();
    const labelStyles = useLabelIconStyles({ linked: true });
    const flexStyles = useRowFlexStyles();
    const data = info.info;
    const tags = (data.tags.toString().split(','))
    const tag = tags.length>4?tags[0]+','+tags[1]+','+tags[2]:data.tags;
    return (
        <Card className={styles.card} elevation={0}>
            <CardMedia
                className={styles.media}
                component="img"
                image={data.img_url}
            />
            <CardContent className={styles.content}>
                <Box mb={1}>
                    <Chip  size="small" label="资讯" style={{marginRight:'8px'}}/>
                    <a  dangerouslySetInnerHTML={{__html:data.title}} href={data.url} className={styles.heading}/>
                </Box>
                <Row >
                    <Column className={styles.body} >
                        <Row>
                            <Item dangerouslySetInnerHTML={{__html:"作者："+data.author}} className={styles.textItem} style={{width:'30%'}}/>
                            <Item dangerouslySetInnerHTML={{__html:"标签："+tag}}  className={styles.textItem}/>
                        </Row>
                        <Item  dangerouslySetInnerHTML={{__html:data.content.length>123?data.content.substring(0,123)+'...':data.content}}  className={styles.textItem}/>
                    </Column>
                </Row>
            </CardContent>
        </Card>
    );
});
class InfoResultCard extends Component {

    render() {
        return (
            <ReviewCard2Demo info={this.props.data}/>
        )
    }
}

export default InfoResultCard;