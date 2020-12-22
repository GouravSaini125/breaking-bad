import {Col, Input, Radio, Row, Typography} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React from "react";
import {CATEGORY, Filter} from "../types/Types";

const filterOptions: { label: string, value: CATEGORY, key: CATEGORY }[] = [
    {label: 'All', value: CATEGORY.ALL, key: CATEGORY.ALL},
    {label: 'Breaking Bad', value: CATEGORY.BB, key: CATEGORY.BB},
    {label: 'Better Call Saul', value: CATEGORY.BCS, key: CATEGORY.BCS},
];

type propTypes = {
    handleFilter: (type: string, val: string) => void,
    filter: Filter,
}

export default function TopBar({handleFilter, filter}: propTypes): JSX.Element {
    return (
        <div className="head">
            <Typography.Title>Breaking Bad Characters</Typography.Title>
            <Row justify={"space-between"} style={{width: "100%"}}>
                <Col>
                    <Input placeholder="Enter name" onChange={e => handleFilter('name', e.target.value)}
                           prefix={<SearchOutlined/>}/>
                </Col>
                <Col>
                    <Radio.Group
                        options={filterOptions}
                        onChange={e => handleFilter('category', e.target.value)}
                        value={filter.category}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Col>
            </Row>
        </div>
    )
}