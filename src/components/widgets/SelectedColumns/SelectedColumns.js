import { useState } from "react";
import {Button,Menu,Checkbox,Popover, Divider} from "antd";
import { DownOutlined } from "@ant-design/icons";
import column from "../../../assets/images/column.svg";
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
        <Menu className="menu-wrapper" style={{ paddingLeft:'12px',maxHeight: '200px', overflowY: 'auto' ,backgroundColor:"#0A1016"}}>
          <Checkbox.Group value={selectedColumns} onChange={(selectedItems) => setSelectedColumns(selectedItems)}>
            {columns?.map((item, index) => (
              <Menu.Item key={item.key} className="custom-menu-popover">
                <Checkbox value={item.key} style={{color: "#8E8E8E"}}>{item.title}</Checkbox>
              </Menu.Item>
            ))}
          </Checkbox.Group>
        </Menu>
        <Divider style={{ margin: '12px 0', borderColor: 'rgba(142, 142, 142, 0.30' }} />
        <div className="custom-popover-buttons">
          <Button type="button" className="custom-modal-button" onClick={CancelHandler}>Reset Columns</Button>
          <Button type="button" className="custom-modal-button" style={{ float: "inline-end",backgroundColor:"transparents" }} onClick={onClickHandler}>Ok</Button>
        </div>
      </>
    );
  
    return(
      <Popover overlayStyle={{ width: '280px' }} placement="bottomRight" content={contents} open={popoverVisible} onOpenChange={onPopoverVisibleChange} title="Configure Columns" trigger="click">
        <button className="ant-dropdown-link custom-button" style={{marginLeft:"5px", marginRight:"5px",paddingLeft:"10px", paddingRight:"10px"}} >
          <img src={column} />
        </button>
      </Popover>
    )
  };
  