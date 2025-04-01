import { ANDataStore } from "@script/wsg/ANDataStore";
import type { EntityMapNode } from "@script/wsg/memorypack/EntityMapNode";
import { NodeType } from "@script/wsg/memorypack/NodeType";
import { ShipTypeOption } from "@script/wsg/Options";
import { Handle, Position, type NodeProps } from "@vue-flow/core";
import { defineComponent } from "vue";
type Prop = {
  data: EntityMapNode;
};
const staticPath = import.meta.env.PUBLIC_STATIC_ASSETS


const GetNodeImageList = (node: EntityMapNode) => {
  const result: string[] = [];
  switch (node.nodeType) {
    case NodeType.Reward:
      result.push(staticPath + "/static/wsg/pve/reward.png");
      break;
    case NodeType.Loss:
      result.push(staticPath + "/static/wsg/pve/loss.png");
      break;
    case NodeType.Boss:
      result.push(staticPath + "/static/wsg/pve/boss.png");
      break;
    case NodeType.Null:
      result.push(staticPath + "/static/wsg/pve/null.png");
      break;
    case NodeType.AirAttack:
      result.push(staticPath + "/static/wsg/pve/air.png");
      break;
    case NodeType.SpecialPoint:
    case NodeType.SpecialBoss:
      result.push(staticPath + "/static/wsg/pve/special_boss.png");
      break;
    case NodeType.LittleBoss:
      result.push(staticPath + "/static/wsg/pve/little_boss.png");
      break;
    case NodeType.PushBuffPoint:
    case NodeType.Figth:
      result.push(staticPath + "/static/wsg/pve/battle.png");
      break;
    default:
      result.push(staticPath + "/static/wsg/pve/unknow.png");
      break;
  }
  if (node.nightAtk) {
    result.push(staticPath + "/static/wsg/pve/night.png");
  }
  if (node.roundabout) {
    result.push(staticPath + "/static/wsg/pve/round.png");
  }
  // console.log(result);
  return result;
};

export default defineComponent<Prop>({
  props: ["data"],
  setup(props, ctx) {
    const imageList = GetNodeImageList(props.data);

    return () => (
      <>
        <Handle
          position={Position.Top}
          style={{ visibility: "hidden" }}
        ></Handle>

        <div
          style={{
            width: "2em",
            height: "2em",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "6px",
              paddingTop: "5px"
              //   background: "#F00",
              // transform: "translateY(-60%)",
              // transform: "scale(50%)",
              // textAlign: "center",
              // lineHeight: "2em",
              // width: "2em",
              // height: "2em",
              // fontSize: "1em",
            }}
          >
            {
              props.data.formation&&props.data.formation.length>0 ? (<>
              <div style={{
                fontSize: "10px",
                background: "#900A",
                padding:"2px",
                borderRadius: "4px 4px 0 0"
              }}>{props.data.flag}
              </div>
              {
              !!props.data.formation ? (<></>) : (<></>)
            }
            <div style={{
              padding:"2px",
              whiteSpace: "nowrap",
              background: "#900A",
              borderRadius: "4px"
            }}>
              {
                props.data.formation?.map(formation => (
                  <div >{formation?.ships?.map(ship => ShipTypeOption.get(ship?.shipType || 0)).join(",")}</div>
                ))

              }
            </div>

              </>) : (
                <div style={{
                  fontSize: "10px",
                }}>{props.data.flag}
                </div>)
            }

          

          </div>

          {imageList.map((src) => (
            <img
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: "translateY(-60%)",
                width: "100%",
                height: "100%",
              }}
              src={src}
            ></img>
          ))}
        </div>
      </>
    );
  },
});
