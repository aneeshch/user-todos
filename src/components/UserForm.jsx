import React from 'react';
import moment from 'moment';
import { Row, Col, Divider, Button } from 'antd';

const LoginForm = (props) => {
    return (
        <section>
            <Row>
                <Col span={12}>{props.name || props.action}<br />{props.date ? moment(props.date).format("DD/MM/YYYY, h:mm:ss a") : null}</Col>
                <Col span={12}>{props.tabs === 'users' && <><Button type="link" onClick={() => props.handleEdit(props.id, props.name, props.email)}>Edit</Button> |</>} <Button type="link" onClick={() => props.handleDelete(props.id)}>Delete</Button></Col>
            </Row>
            <Divider />
        </section>
    )
}

export default LoginForm;