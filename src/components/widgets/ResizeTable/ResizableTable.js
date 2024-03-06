import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const ResizableTable = ({columnsData, site, screenHeight, total}) => {
  const [columns, setColumns] = useState(columnsData);

  useEffect(() => {
    setColumns(columnsData);
  }, [columnsData]);

  const handleResize =
    (index) =>
    (e, { size }) => {
      setColumns((prevColumns) => {
        const nextColumns = [...prevColumns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return nextColumns;
      });
    };

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const columnsWithResizable = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <Table
      components={components}
      columns={columnsWithResizable}
      dataSource={site}
      rowKey={"id"}
      scroll={{
        y: screenHeight,
        x: 1000,
      }}
      pagination={{
        total:total,
        showTotal:(total, range) => (`Total Sites ${total}`)
      }}
    />
  );
};

export default ResizableTable;
