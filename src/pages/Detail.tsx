import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Character, REQUEST_STATUS} from "../types/Types";
import {Col, Row, Typography} from 'antd';
import {withRouter} from 'react-router-dom';
import ls from 'localstorage-ttl';
import CharacterDetails from "../components/CharacterDetails";

function Detail({match}: any): JSX.Element {
    const [character, setCharacter] = useState<Character>(null);
    const [status, setStatus] = useState<REQUEST_STATUS>(REQUEST_STATUS.SUCCEED);


    // TODO: Integrate context api or redux
    useEffect(() => {
        setStatus(REQUEST_STATUS.LOADING);
        const {params: {id}} = match;
        const url: string = `https://www.breakingbadapi.com/api/characters/${id}`;
        const cache: Character | null = ls.get(url);
        if (cache) {
            setStatus(REQUEST_STATUS.SUCCEED);
            setCharacter(cache);
        } else {
            axios.get(url)
                .then(res => {
                    axios.get(`https://www.breakingbadapi.com/api/quote?author=${res.data[0].name.replaceAll(" ", "+")}`)
                        .then(data => {
                            const quotes: string[] = data.data.map(quote => quote.quote)
                            setStatus(REQUEST_STATUS.SUCCEED);
                            setCharacter({...res.data[0], quotes});
                            ls.set(url, {...res.data[0], quotes}, [10 * 60 * 1000]);
                            console.log({...res.data[0], quotes})
                        })
                })
                .catch(err => {
                    setStatus(REQUEST_STATUS.ERROR);
                    console.error(err.response);
                })
        }
    }, [match]);

    const getContent = (): JSX.Element => {
        if (status === REQUEST_STATUS.ERROR)
            return (
                <div>An Error Occurred</div>
            );
        else
            return <CharacterDetails character={character} status={status}/>
    }

    return (
        <Row>
            <Col span={12} offset={6}>
                <Typography.Title className="title">Character Detail</Typography.Title>
                <div style={{margin: "80px 0 50px 0"}}>
                    {getContent()}
                </div>
            </Col>
        </Row>
    );
}

export default withRouter(Detail);
