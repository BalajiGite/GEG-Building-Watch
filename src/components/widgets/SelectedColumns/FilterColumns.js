import { useState } from "react";
import { Select,Input, Col, Row,} from "antd";
import {  CaretDownOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Option } = Select;

export const FilterColumnsData = ({ columns, isVisible }) => {
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const addRows = () => {
        if (rows.length < 5) {
            if (rows.length === 0) {
                const newRow = { id: 1, selectValue: '', comparevalue: '', inputvalue: '' };
                setRows([newRow]);
            }
            else {
                const newRow = { id: rows.length + 1, selectValue: '', comparevalue: '', inputvalue: '' };
                setRows([...rows, newRow]);
            }
        }
    };

    const handleInputChange = (id, event,) => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, selectValue: event.target?.value, comparevalue: event.target?.value, inputvalue: event.target?.value } : row
        );
        setRows(updatedRows);
    };
    console.log(rows);
    const removeRows = (id) => {
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
    }

    console.log(selectedColumns)
    return (
        <>
            <Row gutter={[12]}>
                <Col span={6}>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select Parameters"
                        value={selectedColumns}
                        onChange={(selectedItems) => setSelectedColumns(selectedItems)}
                        size="large"
                    >
                        {columns?.map((item, index) => (
                            <Option key={item.key} value={item.title} style={{ color: "#8E8E8E" }}>
                                {item.title}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col span={4}>
                    <Select
                        suffixIcon={<CaretDownOutlined />}
                        style={{ width: "100%" }}
                        size="large"
                        defaultValue={"equal to"}
                        options={[
                            { value: '!', label: 'is not' },
                            { value: '===', label: 'equal to' },
                            { value: '!==', label: 'not equal to' },
                            { value: '>', label: 'grether than' },
                            { value: '<', label: 'less than' },
                            { value: 'contains', label: 'contains' },
                        ]}
                    />
                </Col>
                <Col span={8}>
                    <Input placeholder="Enter value" style={{ backgroundColor: 'transparent', border: "1px solid #8E8E8E4D" }} />
                </Col>
                <Col span={6} style={{ alignItems: 'center', display: 'flex' }}>
                    <PlusOutlined style={{ color: '#FFFFFF', fontSize: '20px', border: "1px solid #8E8E8E4D", borderRadius: '5px', cursor: 'pointer' }} onClick={addRows} />
                </Col>
            </Row>
            {rows.length > 0 && (rows.map(row => (
                <Row key={row.id} gutter={12} style={{ marginTop: '5px' }}>
                    <Col span={6}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Select Parameters"

                            onChange={(event) => handleInputChange(row.id, event, 1)}
                            size="large"
                        >
                            {columns?.map((item, index) => (
                                <Option key={item.key} value={item.title} style={{ color: "#8E8E8E" }}>
                                    {item.title}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            suffixIcon={<CaretDownOutlined />}
                            style={{ width: "100%" }}
                            size="large"
                            defaultValue={"equal to"}
                            onChange={(event) => handleInputChange(row.id, event)}
                            options={[
                                { value: '!', label: 'is not' },
                                { value: '===', label: 'equal to' },
                                { value: '!==', label: 'not equal to' },
                                { value: '>', label: 'grether than' },
                                { value: '<', label: 'less than' },
                                { value: 'contains', label: 'contains' },
                            ]}
                        />
                    </Col>
                    <Col span={8}>
                        <Input placeholder="Enter value" style={{ backgroundColor: 'transparent', border: "1px solid #8E8E8E4D" }} onChange={(event) => handleInputChange(row.id, event)} />
                    </Col>
                    <Col span={6} style={{ alignItems: 'center', display: 'flex' }}><MinusOutlined style={{ color: '#FFFFFF', fontSize: '20px', border: "1px solid #8E8E8E4D", borderRadius: '5px', cursor: 'pointer', }} onClick={() => removeRows(row.id)} /></Col>
                </Row>)))}
            <Row gutter={[12]} style={{ marginTop: '10px' }}>
                <Col span={8}>
                    <button type="button" className="visible-button">Search</button>
                    <button type="button" className="visible-button" style={{ backgroundColor: 'transparent', marginLeft: '10px' }} onClick={() => setRows([])}>Clear filter</button>
                </Col>
                <Col span={8}></Col>
                <Col span={8}></Col>
            </Row>

        </>
    );
}

