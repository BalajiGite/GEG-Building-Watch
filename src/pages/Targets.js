import React from 'react';
import { Button, Row, Col, Modal } from "antd";
import { Form, Input, Table } from "antd";
import Electric from '../components/widgets/targetswidgest/Electric';
import Water from '../components/widgets/targetswidgest/Water';
import Gas from '../components/widgets/targetswidgest/Gas';
import { useState } from 'react';
function Targets() {
// const [defaultWidgest,setDefaultWidget] = useState(1);
const [targetWidget, setTargetWidget] = useState(1);
const targetWidgets = (widget) => {
    setTargetWidget(widget);
}
  return (
    <div className="App">
      <Row>
        <Col span={20} style={{ marginBottom: 20 }}>
          <Form>
            <Input
              size="small"
              placeholder="search here ..."
              value={""}
            // onChange={(e) => onChangeText(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Button type="button" onClick = {()=>targetWidgets(1)}>Electric</Button>
      <Button type="button" onClick = {()=> targetWidgets(2)}>Water</Button>
      <Button type="button" onClick = {()=> targetWidgets(3)}>Gas</Button>
      <Button
        className="mb-4 ml-4"
        type="primary"
      // onClick={() => setOpen(true)}
      >
        Add New Electric Target Profile
      </Button>
      {targetWidget===1?<Electric/>:(
        <>
        {targetWidget===2 && <Water/>},
        {targetWidget===3 && <Gas/>}
        </>
      )}
    </div>
  );
}

export default Targets;