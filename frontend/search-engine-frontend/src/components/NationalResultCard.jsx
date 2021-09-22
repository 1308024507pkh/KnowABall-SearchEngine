import React, { Component } from 'react'
import Card from "@material-ui/core/Card";
import cx from 'clsx';
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Link1 from '@material-ui/core/Link';
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
        width:'auto',
        height:'160px',
        display: 'block',
        flexShrink: 0,
        backgroundColor: palette.grey[200],
        borderRadius: 12,
        boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
        marginRight:'40px'
    },
    rating: {
        fontSize: 17,
        display: 'inline-block',
        marginBottom: 5,
        color: palette.grey[700],
    },
    content: {
        padding: spacing(0, 2, 0, 0),
        width:'100%'
    },
    heading: {
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        marginBottom: 0,
        marginRight: spacing(2),
        display: 'inline-block',
    },
    body: {
        fontSize: 15,
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
        marginBottom:'10px'
    }
}));
const ReviewCard2Demo = React.memo(function(prams)  {
    const styles = useStyles();
    const labelStyles = useLabelIconStyles({ linked: true });
    const flexStyles = useRowFlexStyles();
    const data = prams['info']['info'];
    const imgURL = prams['info']['imgURL'];
    const show = prams['info']['show'];
    return (
        <Card className={styles.card} elevation={0}>
            <CardMedia
                className={styles.media}
                component="img"
                image={imgURL}
            />
            <CardContent className={styles.content}>
                <Box mb={1}>
                    {show?<Chip  size="small" label="球队" style={{marginRight:'8px'}}/>:
                        <Chip  size="small" label="球队" style={{marginRight:'8px',marginBottom:'10px'}}/>}
                    <h3 dangerouslySetInnerHTML={{__html:data.name}} className={styles.heading}/>
                    <h3 dangerouslySetInnerHTML={{__html:data.englishName}} className={styles.rating}/>
                </Box>
                <Row>
                    <Column className={styles.body} style={{width:'30%'}}>
                        <Item dangerouslySetInnerHTML={{__html:"成立："+data.birthYear}} className={styles.textItem}/>
                        <Item dangerouslySetInnerHTML={{__html:"主场："+data.stadium}} className={styles.textItem}/>
                    </Column>
                    <Column className={styles.body} style={{width:'30%'}}>
                        <Item dangerouslySetInnerHTML={{__html:"国家："+data.country}} className={styles.textItem}/>
                        <Item dangerouslySetInnerHTML={{__html:"容纳："+data.audience}} className={styles.textItem}/>
                    </Column>
                    <Column className={styles.body} style={{marginRight:'0'}}>
                        <Item dangerouslySetInnerHTML={{__html:"城市："+data.city}} className={styles.textItem}/>
                        <Item dangerouslySetInnerHTML={{__html:"电话："+data.phone}} className={styles.textItem}/>
                    </Column>
                </Row>
                <Row className={styles.body}>
                    <Item dangerouslySetInnerHTML={{__html:"地址："+data.address}} className={styles.textItem} style={{width:"60%"}}/>
                    <Item dangerouslySetInnerHTML={{__html:"邮箱："+data.email}} className={styles.textItem}/>
                </Row>
                {show?<div className={flexStyles.parent}>
                    <Link1
                        className={cx(labelStyles.primaryLink, styles.textFooter)}
                        href={"/team/"+data.id}
                    >
                        Read more <ArrowForwardIos className={labelStyles.icon} />
                    </Link1>
                </div>:""}
            </CardContent>
        </Card>
    );
})
class NationalResultCard extends Component {

    render() {
        return (
            <ReviewCard2Demo info={this.props.data}/>
        )
    }
}

export default NationalResultCard;