import { useCallback } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { EntityMapNode } from '#src/wsg/entiyType';
import { Fab } from '@mui/material';
 
const handleStyle = { left: 10 };
 
function WSGMapNode({ data }:NodeProps) {
 const mapNode:EntityMapNode = data  
 const nodeId = mapNode.id?.toString()
 if(!!nodeId){
    return (
        <>
          <Fab>
            {mapNode.flag}
          </Fab>
          <Handle type="source" position={Position.Bottom} id="s"></Handle>
        </>
      );
 }

}
export default WSGMapNode