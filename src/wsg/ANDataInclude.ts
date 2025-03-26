import type { ANData } from "./entiyType";

export function ANDataInclude(data:ANData){
  const items = data.items||{}
  data.campaigns&&Object.entries(data.campaigns).map(item=>item[1]).forEach(item=>{
    item.product = items[item.product?.id||0]
  }) ;
  
};
