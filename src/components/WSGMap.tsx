import ANDataDb from '#src/wsg/ANData.db';
import { NodeType, type EntityMap, type EntityMapNode } from '#src/wsg/entiyType';
import { Button, Fab, IconButton  } from '@mui/material';
import {  ReactFlow, ReactFlowProvider, applyNodeChanges, useEdgesState, useNodesState, useReactFlow, type Node, type ReactFlowProps } from '@xyflow/react';
import React, { useState, useRef, useCallback } from 'react';
// import Xarrow, { useXarrow } from "react-xarrows";;
import '@xyflow/react/dist/style.css';
import WSGMapNode from './WSGMapNode';

// 定义可拖动组件
const DraggableComponent: React.FC = () => {
  // 定义拖动状态
  // const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ReactFlowContext= useReactFlow()
  const [entityMapNode, setEntityMapNodes] = useState<EntityMapNode[]>([])
  const [flowNodes,setFlowNodes]=useNodesState<Node<EntityMapNode>>([])
  const [flowEdges,setFlowEdges]=useEdgesState([])
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
      setFlowNodes(map.nodes.map(item=>(
        {
          // type:"entityMapNode",
          id:item.id?.toString()||"",
          position:{x:0,y:0},
          data:item
        }
      )))
      // setFlowNodes([]);
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
<ReactFlowContext>
  
</ReactFlowContext>
    </div>
  );
};

export default DraggableComponent;