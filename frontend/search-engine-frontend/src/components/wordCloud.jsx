import React, { useState, useEffect } from 'react';
import { WordCloud } from '@ant-design/charts';
import axios from "axios";

const DemoWordCloud = function(prams) {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('/player/hotWord/' + prams.id)
            .then(function (response) {
                setData(response.data)
                console.log(data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    var config = {
        data: data,
        wordField: 'text',
        weightField: 'value',
        colorField: 'value',
        // imageMask: 'https://gw.alipayobjects.com/zos/antfincdn/Qw7Xbn76kM/53176454-747c-4f0a-a9e5-936aa66a0082.png',
        wordStyle: {
            fontFamily: 'Verdana',
            fontSize: [30, 60]
        },
    };
    return <WordCloud {...config}/>;
};
export default DemoWordCloud;