import {Avatar, List, Skeleton} from "antd";
import {Character, REQUEST_STATUS} from "../types/Types";
import React from "react";
import {Link} from 'react-router-dom';

type propTypes = {
    characters: Character[],
    status: REQUEST_STATUS,
}

export default function CharacterList({characters, status}: propTypes) {
    return (
        <Skeleton loading={status === REQUEST_STATUS.LOADING} active avatar round>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    defaultPageSize: 10,
                }}
                dataSource={characters}
                renderItem={character => (
                    <List.Item
                        key={character.char_id}
                        extra={
                            <div className="status">
                                <div className={`status__dot ${character.status}`}/>
                                {character.status}
                            </div>
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar size="large" src={character.img}/>}
                            title={<Link to={`/${character.char_id}`}>{character.name}</Link>}
                            description={`Birthday - ${character.birthday}`}
                        />
                        {character.occupation?.join(", ")}
                    </List.Item>
                )}
            />
        </Skeleton>
    )
}