import { useState } from "react";
import { Select, Input, Col, Row } from "antd";
import { CaretDownOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { message } from 'antd';

const { Option } = Select;

export const FilterColumnsData = ({ columns, isVisible, onSearch }) => {
    const [rows, setRows] = useState([{ id: 1, selectValue: '', compareValue: "equalTo", inputValue: '', condition:'' }]);

    const addRows = () => {
        if (rows.length < 3) {
            if (rows.length === 0) {
                const newRow = { id: 1, selectValue: '', compareValue: "equalTo", inputValue: '', condition:'' };
                setRows([newRow]);
            }
            else {
                const newRow = { id: rows.length + 1, selectValue: '', compareValue: "equalTo", inputValue: '', condition:'' };
                setRows([...rows, newRow]);
            }
        }
    };

    const handleInputChange = (id, field, value) => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        );
        setRows(updatedRows);
    };

    const removeRows = (id) => {
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
    }

    const handleSearch = () => {

        const isValid = rows.every(row => row.selectValue && row.inputValue);

        if (!isValid) {
            message.error('Please fill in all required fields to apply search.');
            return;
        }

        // Iterate over the rows dynamically to ensure the select condition of the first two rows is not empty
        for (let i = 0; i < Math.min(2, rows.length); i++) {
            if ( rows.length > 1 && !rows[i].condition) {
                if((i+1) !=rows.length ){
                    message.error(`The select condition of row ${i+1} must be selected.`);
                    return;
                }
            }
        }

        // Check if compareValue is "greaterThan" or "lessThan", then validate inputValue as number
        const invalidRows = rows.filter(row =>
            (row.compareValue === 'greaterThan' || row.compareValue === 'lessThan') && isNaN(Number(row.inputValue))
        );

        if (invalidRows.length > 0) {
            message.error('Enter a valid number for fields "greater than" or "less than".');
            return;
        }

        const selectValues = rows.map(row => row.selectValue);
        const inputValues = rows.map(row => row.inputValue);
        const comapareValues = rows.map(row => row.compareValue);
        const condition = rows.map(row => row.condition);
        onSearch([selectValues, inputValues, comapareValues, condition]);
    };

    const handleClear = () =>{
        setRows([{ id: 1, selectValue: '', compareValue: "equalTo", inputValue: '', condition:'' }])
        onSearch("Reset");
    }

    return (
        <>
            {rows.length > 0 && rows.map(row => (
                <Row key={row.id} gutter={12} style={{ marginTop: '5px' }}>
                    <Col span={6}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Select Parameters"
                            required
                            onChange={(value) => handleInputChange(row.id, 'selectValue', value)}
                            size="large"
                        >
                            {columns?.map((item, index) => (
                                <Option key={item.key} value={item.dataIndex} style={{ color: "#8E8E8E" }}>
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
                            onChange={(value) => handleInputChange(row.id, 'compareValue', value)}
                            options={[
                                { value: 'equalTo', label: 'equal to' },
                                { value: 'notEqualTo', label: 'not equal to' },
                                { value: 'includes', label: 'includes' },
                                { value: 'greaterThan', label: 'greater than' },
                                { value: 'lessThan', label: 'less than' },
                            ]}
                        />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter value" style={{ backgroundColor: 'transparent', border: "1px solid #8E8E8E4D" }} onChange={(e) => handleInputChange(row.id, 'inputValue', e.target.value)} required />
                    </Col>
                    <Col span={4}>
                        <Select
                            suffixIcon={<CaretDownOutlined />}
                            style={{ width: "100%" }}
                            size="large"
                            placeholder="Select Condition"
                            onChange={(value) => handleInputChange(row.id, 'condition', value)}
                            options={[
                                { value: 'and', label: 'and' },
                                { value: 'or', label: 'or' },
                            ]}
                        />
                    </Col>
                    <Col span={4} style={{ alignItems: 'center', display: 'flex' }}>
                        <MinusOutlined style={{ color: '#FFFFFF', fontSize: '20px', border: "1px solid #8E8E8E4D", borderRadius: '5px', cursor: 'pointer', }} onClick={() => removeRows(row.id)} />
                    </Col>
                </Row>
            ))}
            <Row gutter={[12]} style={{ marginTop: '15px' }}>
                <Col span={12}>
                    <button type="button" className="visible-button" onClick={addRows} style={{ backgroundColor: 'transparent', marginRight: '10px' }}>Add condition</button>
                    <button type="button" className="visible-button" onClick={handleSearch}>Search</button>
                    <button type="button" className="visible-button" style={{ backgroundColor: 'transparent', marginLeft: '10px' }} onClick={handleClear}>Clear filter</button>
                </Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
            </Row>
        </>
    );
}
