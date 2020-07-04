import React from 'react';
import {Row, Col} from 'antd';
import StateOfActivivities  from './chartsx';
class ProjectTrace extends React.Component {

    render() {
        return(
            <Row>
                <Col span={24}>
                    <StateOfActivivities/>
                </Col>
            </Row>
        )
    }

}

export default ProjectTrace;