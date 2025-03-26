import ANDataDb from '#src/wsg/ANData.db';
import { NodeType, type EntityMap, type EntityMapNode } from '#src/wsg/entiyType';
import { Button, Fab, IconButton  } from '@mui/material';
import {  ReactFlow, type ReactFlowProps } from '@xyflow/react';
import React, { useState, useRef, useCallback } from 'react';
// import Xarrow, { useXarrow } from "react-xarrows";;
import '@xyflow/react/dist/style.css';
// 定义可拖动组件
const DraggableComponent: React.FC = () => {
  // 定义拖动状态
  // const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [entityMapNode, setEntityMapNodes] = useState<EntityMapNode[]>([])
  const [flowNodes,setFlowNodes]=useState<ReactFlowProps["nodes"]>([{ id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },])
  const [flowEdges,setFlowEdges]=useState<ReactFlowProps["edges"]>([
    { id: 'e1-2', source: '1', target: '2' }
  ])
  // 定义鼠标按下时的处理逻辑
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 记录鼠标按下时的位置
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;
    // 定义鼠标移动时的处理逻辑
    const handleMouseMove = (e: MouseEvent) => {
    

      // 更新位置
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    // 定义鼠标释放时的处理逻辑
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // 添加事件监听器
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [position]);
  ANDataDb.ANDataStoreReload().then(() => {
    const map = Object.values(ANDataDb.ANDataStore.$data?.maps || {}).pop()
    if (!!map && !!map.nodes) {
      setEntityMapNodes(map.nodes)
    }
  })

  return (
    <div
      style={{
        // position: 'absolute',
        // top: `${position.y}px`,
        // left: `${position.x}px`,
        width: '100vw',
        height: '100vh',
        // backgroundColor: 'blue',
        // color: 'white',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // cursor: 'grab',
      }}
      // onMouseDown={handleMouseDown}
    >
       <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        // fitView
      />
      

    </div>
  );
};

export default DraggableComponent;