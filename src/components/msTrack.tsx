import { onMounted } from "vue";

// import  Clarity  from '@microsoft/clarity';
const projectId= import.meta.env.PUBLIC_MS_TID;
function Init(c:any, l:any, a:any, r:any, i:any, t:any, y:any) {
    if(l.getElementById("clarity-script")){
      return;
    }
    c[a] = c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i + "?ref=npm";
    t.id = "clarity-script"
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  };
export default function(){

    Init(window, document, "clarity", "script", projectId,undefined,undefined)
    return(<></>)
}