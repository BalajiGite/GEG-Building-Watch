import React, { useEffect, useRef } from "react";
import { Card, Col, Row, Input, Button } from "antd";
import { Select } from "antd";
import { useState } from "react";
import { DatePicker } from "antd";
import LeftTreeView from "../../components/TreeComponent/LeftTreeView";
import RightTreeView from "../../components/TreeComponent/RightTreeView";
import LeftTreeDataItems from "../../assets/data/LeftTreeDataItems";
import RightTreeDataItems from "../../assets/data/RightTreeDataItem";
import ReportChart from "./ReportChart";
import _ from "lodash";
import * as XLSX from "xlsx";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const provinceData = ["select"];
const granularityData = {
  select: ["Select", "Hourly", "Daily", "Weekly", "Monthly", "Yearly"],
};

function Report(props) {
  const [series, setSeries] = useState([]);
  const [cities, setCities] = useState(granularityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(
    granularityData[provinceData[0]][0]
  );
  const [selectedReports, setSelectedReports] = useState([]);

  const handleProvinceChange = (value) => {
    setCities(granularityData[value]);
    setSecondCity(granularityData[value][0]);
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };
  const arrow = ">>";

  const leftTreeViewRef = useRef(null);
  const rightTreeViewRef = useRef(null);

  const [leftTreeItems, setLeftTreeItems] = useState([...LeftTreeDataItems]);
  const [rightTreeItems, setRightTreeItems] = useState([...RightTreeDataItems]);

  const getLeftTreeView = () => {
    return leftTreeViewRef.current.instance;
  };

  const getRightTreeView = () => {
    return rightTreeViewRef.current.instance;
  };

  const onDragChange = (e) => {
    unselectTreeNodes();
    if (e.fromComponent === e.toComponent) {
      const fromNode = findNode(getTreeView(e.fromData), e.fromIndex);
      const toNode = findNode(getTreeView(e.toData), calculateToIndex(e));
      if (toNode !== null && isChildNode(fromNode, toNode)) {
        e.cancel = true;
      }
    }
  };

  const onDragEnd = (e) => {
    if (e.fromComponent === e.toComponent && e.fromIndex === e.toIndex) {
      return;
    }

    const fromTreeView = getTreeView(e.fromData);
    const toTreeView = getTreeView(e.toData);

    const fromNode = _.cloneDeep(findNode(fromTreeView, e.fromIndex));
    const toNode = findNode(toTreeView, calculateToIndex(e));

    if (e.dropInsideItem || toNode == null || !toNode?.itemData?.isDirectory) {
      return;
    }
    let checkIfPresent = false;
    let tmpId = fromNode?.itemData?.id + toNode?.itemData?.id;
    const presetNode = toNode?.children?.find(
      (item) => item?.itemData?.id === tmpId
    );
    if (presetNode) {
      checkIfPresent = true;
    } else {
      fromNode.itemData.id = tmpId;
    }

    const fromTopVisibleNode = getTopVisibleNode(e.fromComponent);
    const toTopVisibleNode = getTopVisibleNode(e.toComponent);

    const fromItems =
      e.fromData === "leftTree" ? leftTreeItems : rightTreeItems;
    const toItems = e.toData === "leftTree" ? leftTreeItems : rightTreeItems;

    const selectedItem = toItems?.find(
      (item) => item.id === fromNode?.itemData?.id
    );
    if (selectedItem) {
      if (selectedItem.parentId === fromNode.itemData.parentId) {
        return true;
      } else {
        fromNode.itemData.id = fromNode.id + toNode.parentId;
      }
    }
    moveNode(fromNode, toNode, fromItems, toItems, e.dropInsideItem);

    if (e.fromData === "rightTree") {
      setRightTreeItems([...fromItems]);
    }
    if (e.toData === "rightTree") {
      setRightTreeItems([...toItems]);
    }

    fromTreeView.scrollToItem(fromTopVisibleNode);
    toTreeView.scrollToItem(toTopVisibleNode);
  };

  const getTreeView = (treeName) => {
    return treeName === "leftTree" ? getLeftTreeView() : getRightTreeView();
  };

  const calculateToIndex = (e) => {
    if (e.fromComponent !== e.toComponent || e.dropInsideItem) {
      return e.toIndex;
    }

    return e.fromIndex >= e.toIndex ? e.toIndex : e.toIndex + 1;
  };

  const findNode = (treeView, index) => {
    const nodeElement = treeView
      .element()
      .querySelectorAll(".dx-treeview-node")[index];
    if (nodeElement) {
      return findNodeById(
        treeView.getNodes(),
        nodeElement.getAttribute("data-item-id")
      );
    }
    return null;
  };

  const findNodeById = (nodes, id) => {
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i].itemData.id === id) {
        return nodes[i];
      }
      if (nodes[i].children) {
        const node = findNodeById(nodes[i].children, id);
        if (node != null) {
          return node;
        }
      }
    }
    return null;
  };

  const moveNode = (fromNode, toNode, fromItems, toItems, isDropInsideItem) => {
    const fromIndex = fromItems.findIndex(
      (item) => item.id === fromNode.itemData.id
    );
    // fromItems.splice(fromIndex, 1);

    const toIndex =
      toNode === null || isDropInsideItem
        ? toItems.length
        : toItems.findIndex((item) => item.id === toNode.itemData.id);
    toItems.splice(toIndex, 0, fromNode.itemData);

    moveChildren(fromNode, fromItems, toItems);

    if (isDropInsideItem) {
      fromNode.itemData.parentId = toNode.itemData.id;
    } else {
      fromNode.itemData.parentId = toNode.itemData.id;
      // ? toNode.itemData.parentId
      //   ? toNode.itemData.id
      //   : undefined
      // : undefined;
    }
    // console.log(fromItems, toItems)
  };

  const moveChildren = (node, fromDataSource, toDataSource) => {
    if (!node.itemData.isDirectory) {
      return;
    }

    node.children.forEach((child) => {
      if (child.itemData.isDirectory) {
        moveChildren(child, fromDataSource, toDataSource);
      }

      const fromIndex = fromDataSource.findIndex(
        (item) => item.id === child.itemData.id
      );
      // fromDataSource.splice(fromIndex, 1);
      toDataSource.splice(toDataSource.length, 0, child.itemData);
    });
  };

  const isChildNode = (parentNode, childNode) => {
    let { parent } = childNode;
    while (parent !== null) {
      if (parent.itemData.id === parentNode.itemData.id) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  };

  const getTopVisibleNode = (component) => {
    const treeViewElement = component.element();
    const treeViewTopPosition = treeViewElement.getBoundingClientRect().top;
    const nodes = treeViewElement.querySelectorAll(".dx-treeview-node");
    for (let i = 0; i < nodes.length; i += 1) {
      const nodeTopPosition = nodes[i].getBoundingClientRect().top;
      if (nodeTopPosition >= treeViewTopPosition) {
        return nodes[i];
      }
    }

    return null;
  };

  const syncSelection = (treeView) => {
    const selectedNodes = treeView
      .getSelectedNodes()
      .map((node) => node.itemData);

    let temp = [];
    selectedNodes.map((item) => {
      if (!item.isDirectory) {
        temp.push({
          data: item.series,
          name: item.name,
        });
      }
    });
    setSelectedReports(temp);
  };

  const runReport = () => {
    setSeries(selectedReports);
    console.log(selectedReports);
  };

  const exportReportInExcel = (data, fileName) => {
    // debugger;
    const temp = [];
    data.map((item) => {
      temp.push({
        name: item.name,
        data: item.data.toString(),
      });
    });
    var wscols = [{ wch: 30 }, { wch: 100 }];

    const sheetName = "Sheet";
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(temp);
    worksheet["!cols"] = wscols;

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);
  };

  const unselectTreeNodes = () => {
    rightTreeViewRef?.current?.instance?.unselectAll();
    setSelectedReports([]);
  };

  const deleteReport = () => {
    const temp = [];
    const selectedNodes = rightTreeViewRef?.current?.instance
      ?.getSelectedNodes()
      .map((node) => node.itemData);
    const reports = selectedNodes.filter((item) => !item.isDirectory);
    if (reports.length > 0) {
      rightTreeItems?.map((item) => {
        const toBeDeleted = reports?.findIndex(
          (reportItem) => reportItem?.id == item?.id
        );
        if (toBeDeleted === -1) {
          temp.push(item);
        }
      });
    }
    unselectTreeNodes([]);
    setSeries([]);
    setRightTreeItems([...temp]);
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Card style={{ backgroundColor: "rgb(28, 136, 178)", height: 500 }}>
            <Row style={{ height: 40, marginBottom: 10 }}>
              <Col span={12}>
                <h3 style={{ color: "white" }}>Meter Tree</h3>
              </Col>
              <Col span={12}>
                <p style={{ color: "white", textAlign: "end" }}>
                  (Drag requested files {arrow} toFavourites or Reporting){" "}
                </p>
              </Col>
            </Row>
            <Row gutter={[10, 10]} style={{ height: 60 }}>
              <Col span={8}>
                <label style={{ color: "white" }}>Search Text:</label>
                <Input
                  style={{
                    width: "100%",
                    height: 32,
                    borderRadius: 0,
                  }}
                  placeholder="search text"
                />
              </Col>
              <Col span={8}>
                <label style={{ color: "white" }}>Filter Text:</label>
                <Input
                  style={{
                    width: "100%",
                    height: 32,
                    borderRadius: 0,
                  }}
                  placeholder="filter text"
                />
              </Col>
              <Col span={8}>
                <label style={{ color: "white" }}>Filter Type:</label>
                <Select
                  style={{
                    width: "100%",
                    height: 32,
                    borderRadius: 0,
                  }}
                  // value={secondCity}
                  // onChange={onSecondCityChange}
                  // options={cities.map((city) => ({
                  //   label: city,
                  //   value: city,
                  // }))}
                />
              </Col>
            </Row>
            <Row>
              <Card style={{ width: "100%" }}>
                <LeftTreeView
                  onDragChange={onDragChange}
                  onDragEnd={onDragEnd}
                  leftTreeViewRef={leftTreeViewRef}
                  leftTreeItems={leftTreeItems}
                />
              </Card>
            </Row>
          </Card>
        </Col>

        <Col span={12}>
          <Card style={{ backgroundColor: "rgb(28, 136, 178)", height: 500 }}>
            <Row style={{ height: 40, marginBottom: 10 }}>
              <Col span={8}>
                <h3 style={{ color: "white", paddingLeft: 10 }}>Reporting</h3>
              </Col>
              <Col span={15}>
                <Button
                  className=""
                  type="secondary"
                  onClick={runReport}
                  disabled={selectedReports.length == 0}
                >
                  Run Report
                </Button>{" "}
                <Button
                  type="secondary"
                  onClick={() =>
                    exportReportInExcel(selectedReports, "Report.xlsx")
                  }
                  disabled={selectedReports.length == 0}
                >
                  Export Report
                </Button>{" "}
                <Button
                  type="secondary"
                  onClick={deleteReport}
                  disabled={selectedReports.length == 0}
                >
                  Delete Report
                </Button>
              </Col>
            </Row>
            <Row gutter={[10, 10]} style={{ height: 60 }}>
              <Col span={8}>
                <label style={{ color: "white" }}>From Date:</label>
                <DatePicker
                  style={{
                    width: "100%",
                    borderRadius: 0,
                    height: 32,
                  }}
                  onChange={onChange}
                />
              </Col>
              <Col span={8}>
                <label style={{ color: "white" }}>To Date:</label>
                <DatePicker
                  style={{
                    width: "100%",
                    borderRadius: 0,
                    height: 32,
                  }}
                  onChange={onChange}
                />
              </Col>
              <Col span={8}>
                <label style={{ color: "white" }}>Granularity:</label>
                <Select
                  style={{
                    width: "100%",
                    borderRadius: 0,
                    height: 32,
                  }}
                  value={secondCity}
                  onChange={onSecondCityChange}
                  options={cities.map((city) => ({
                    label: city,
                    value: city,
                  }))}
                />
              </Col>
            </Row>
            <Row>
              <Card style={{ width: "100%" }}>
                <RightTreeView
                  onDragChange={onDragChange}
                  onDragEnd={onDragEnd}
                  rightTreeViewRef={rightTreeViewRef}
                  rightTreeItems={rightTreeItems}
                  syncSelection={syncSelection}
                />
              </Card>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={24}>
          {series.length > 0 ? (
            <Card style={{ height: 500 }}>
              <ReportChart series={series} />
            </Card>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
}
export default Report;
