import {Avatar, Card, Skeleton, Typography} from "antd";
import {Character, REQUEST_STATUS} from "../types/Types";
import React from "react";

const {Meta} = Card;

type propTypes = {
    character: Character,
    status: REQUEST_STATUS,
}

export default function CharacterDetails({character, status}: propTypes) {
    return (
        <React.Fragment>
            <Card
                style={{width: "50vw", marginTop: 16}}
                actions={[
                    <div>Birthday: {character?.birthday}</div>,
                    <div className="status">
                        <div className={`status__dot ${character?.status}`}/>
                        {character?.status}
                    </div>
                ]}
            >
                <Skeleton loading={status === REQUEST_STATUS.LOADING} avatar active>
                    <Meta
                        avatar={
                            <Avatar src={character?.img} size="large"/>
                        }
                        title={character?.name}
                        description={character?.occupation?.join(", ")}
                    />
                    <img src={character?.img} style={{
                        height: 400,
                        objectFit: "cover",
                        margin: "auto",
                        display: "block",
                        marginTop: "40px"
                    }} alt=""/>
                    <div className="char__detail">
                        <Typography.Title level={5}>Portrayed</Typography.Title>
                        &emsp;{character?.portrayed}
                    </div>
                    <div className="char__detail">
                        <Typography.Title level={5}>Nickname</Typography.Title>
                        &emsp;{character?.nickname}
                    </div>
                    <div className="char__detail">
                        <Typography.Title level={5}>Category</Typography.Title>
                        &emsp;{character?.category}
                    </div>
                    {
                        character?.appearance?.length > 0 && (
                            <div className="char__detail">
                                <Typography.Title level={5}>Appearance</Typography.Title>
                                &emsp;{character?.appearance?.join(", ")}
                            </div>
                        )
                    }
                    {
                        character?.better_call_saul_appearance?.length > 0 && (
                            <div className="char__detail">
                                <Typography.Title level={5}>Better Call Saul Appearance</Typography.Title>
                                &emsp;{character?.better_call_saul_appearance?.join(", ")}
                            </div>
                        )
                    }
                </Skeleton>
            </Card>
            {
                character?.quotes?.length > 0 && (
                    <div style={{marginTop: "50px"}}>
                        <Typography.Title level={3}>Quotes</Typography.Title>
                        {
                            character.quotes.map(quote => (
                                <Card style={{marginTop: "20px"}}>
                                    {quote}
                                </Card>
                            ))
                        }
                    </div>
                )
            }
        </React.Fragment>
    )
}