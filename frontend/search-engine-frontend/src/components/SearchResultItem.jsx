import React, { Component } from 'react'
import Card from "@material-ui/core/Card";
import cx from 'clsx';
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Link1 from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Chip from '@material-ui/core/Chip';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import { useLabelIconStyles } from '@mui-treasury/styles/icon/label';
import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';

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
        verticalAlign: 'text-top',
    },
    content: {
        padding: spacing(0, 2, 0, 0),
        width:'100%'
    },
    heading: {
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        marginBottom: 5,
        marginRight: spacing(1.5),
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
const ReviewCard2Demo = React.memo(function(prams) {
    const styles = useStyles();
    const labelStyles = useLabelIconStyles({ linked: true });
    const flexStyles = useRowFlexStyles();
    console.log(prams)
    const data = prams['info']['info'];
    const imgURL = prams['info']['imgURL'];
    const show = prams['info']['show']
    return (
        <Card className={styles.card} elevation={0}>
            <CardMedia
                className={styles.media}
                component="img"
                image={imgURL}
            />
            <CardContent className={styles.content}>
                <Box mb={1}>
                    <Chip  size="small" label="球员" style={{marginRight:'8px'}}/>
                    <h3 dangerouslySetInnerHTML={{__html:data.name}} className={styles.heading}/>
                    {
                        show ? <div/> : <Rating
                            name={'rating'}
                            max={10}
                            value={prams['info']['score']}
                            className={styles.rating}
                            size={'small'}
                            readOnly={true}
                        />
                    }
                </Box>
                <Row >
                    <Column className={styles.body} style={{width:'30%'}}>
                        <Item dangerouslySetInnerHTML={{__html:"俱乐部："+data.club}} className={styles.textItem}/>
                        <Item dangerouslySetInnerHTML={{__html:"国家："+data.country}} className={styles.textItem}/>
                        <Item dangerouslySetInnerHTML={{__html:"身高："+data.height}} className={styles.textItem}/>
                    </Column>
                    <Column className={styles.body} style={{marginRight:'20%'}}>
                        <Item dangerouslySetInnerHTML={{__html:"位置："+data.role}} className={styles.textItem}/>
                        <Item dangerouslySetInnerHTML={{__html:"年龄："+data.age}} className={styles.textItem}/>
                        <Item dangerouslySetInnerHTML={{__html:"体重："+data.weight}} className={styles.textItem}/>
                    </Column>
                    <Column className={styles.body}>
                        <Item dangerouslySetInnerHTML={{__html:"号码："+data.number}} className={styles.textItem}/>
                        <Item dangerouslySetInnerHTML={{__html:"生日："+data.birthday}} className={styles.textItem}/>
                        <Item className={styles.textItem}>
                            惯用脚：{data.foot?"左脚":"右脚"}
                        </Item>
                    </Column>
                </Row>
                <div className={flexStyles.parent}>
                    {show?<div className={flexStyles.parent}>
                        <Link1
                            className={cx(labelStyles.primaryLink, styles.textFooter)}
                            href={"/player/"+data.id}
                        >
                            Read more <ArrowForwardIos className={labelStyles.icon} />
                        </Link1>
                    </div>:""}
                </div>
            </CardContent>
        </Card>
    );
});
class SearchResultItem extends Component {

    render() {
        return (
            <ReviewCard2Demo info={this.props.data}/>
        )
    }
}

export default SearchResultItem;