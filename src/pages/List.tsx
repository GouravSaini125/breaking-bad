import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {CATEGORY, Character, Filter, REQUEST_STATUS} from "../types/Types";
import {Col, Row} from 'antd';
import ls from 'localstorage-ttl';
import CharacterList from "../components/CharacterList";
import TopBar from "../components/TopBar";


function List(): JSX.Element {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [status, setStatus] = useState<REQUEST_STATUS>(REQUEST_STATUS.SUCCEED);
    const [filter, setFilter] = useState<Filter>({category: 0});

    // TODO: Integrate context api or redux
    useEffect(() => {
        setStatus(REQUEST_STATUS.LOADING);
        const url: string = `https://www.breakingbadapi.com/api/characters`;
        const cache: Character[] | null = ls.get(url);
        if (cache) {
            setStatus(REQUEST_STATUS.SUCCEED);
            setCharacters(cache);
        } else {
            axios.get(url)
                .then(res => {
                    setStatus(REQUEST_STATUS.SUCCEED);
                    setCharacters(res.data);
                    ls.set(url, res.data, [10 * 60 * 1000]);
                })
                .catch(err => {
                    setStatus(REQUEST_STATUS.ERROR);
                    console.error(err.response);
                })
        }
    }, []);

    const getContent = (): JSX.Element => {
        switch (status) {
            case REQUEST_STATUS.ERROR:
                return (
                    <div>An Error Occurred</div>
                );
            default:
                let chars: Character[] = characters;
                if (filter.name)
                    chars = chars.filter(char => char.name.toLowerCase().includes(filter.name.toLowerCase()));
                if (filter.category) {
                    if (filter.category === CATEGORY.BB)
                        chars = chars.filter(char => char.category === "Breaking Bad");
                    else if (filter.category === CATEGORY.BCS)
                        chars = chars.filter(char => char.category === "Better Call Saul");
                }
                return <CharacterList characters={chars} status={status}/>;
        }
    }

    const handleFilter = (type: string, val: string): void => {
        setFilter(prevState => {
            return {
                ...prevState,
                [type]: val,
            }
        });
    }

    return (
        <Row>
            <Col lg={12} offset={6}>
                <TopBar handleFilter={handleFilter} filter={filter}/>
                <div style={{margin: "150px 0 50px 0"}}>
                    {getContent()}
                </div>
            </Col>
        </Row>
    );
}

export default List;
