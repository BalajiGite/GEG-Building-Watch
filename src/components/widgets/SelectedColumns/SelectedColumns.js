import { useState } from "react";
import {Button,Menu,Checkbox,Popover} from "antd";
import { DownOutlined } from "@ant-design/icons";
export const SelectColumns = ({columns, onSelectColumns}) => {
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [popoverVisible, setPopoverVisible] = useState(false);
  
    const onPopoverVisibleChange = (visible) => {
      setPopoverVisible(visible);
    };
    
    const CancelHandler = () => {
      setSelectedColumns([]);
      onSelectColumns([]);
      setPopoverVisible(false);
  
    }
    const onClickHandler = () => {
      onSelectColumns(selectedColumns);
      setPopoverVisible(false);
    }
    
    const contents = (
      <>
        <Menu style={{ maxHeight: '200px', overflowY: 'auto' ,backgroundColor:"#0A1016"}}>
          <Checkbox.Group value={selectedColumns} onChange={(selectedItems) => setSelectedColumns(selectedItems)}>
            {columns?.map((item, index) => (
              <Menu.Item key={item.key}>
                <Checkbox value={item.key} style={{color: "#8E8E8E"}}>{item.title}</Checkbox>
              </Menu.Item>
            ))}
          </Checkbox.Group>
        </Menu>
        <div className="custom-popover-buttons">
        <Button type="button" className=""onClick={CancelHandler}>Cancel</Button>
        <Button type="button" style={{ float: "inline-end",backgroundColor:"transparents" }} onClick={onClickHandler}>Ok</Button>
        </div>
      </>
    );
  
    return(
      <Popover content={contents} 
              open={popoverVisible}
              onOpenChange={onPopoverVisibleChange}
            title="Select Column" trigger="click">
              {/* <Dropdown overlay={contents} trigger={['click']} > */}
              <button className="ant-dropdown-link custom-button" style={{marginLeft:"5px"}} >
                Select Columns <DownOutlined />
              </button>
              {/* </Dropdown> */}
            </Popover>
    )
  };
  