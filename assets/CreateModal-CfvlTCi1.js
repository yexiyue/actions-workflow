import{a3 as F,r as c,a7 as t,a4 as e,aa as j}from"./index-Bf3tMyn6.js";import{F as r,M as v}from"./index-DC7BwBzE.js";import{I as m}from"./index-BiSxIIt5.js";const V=p=>{F();const[x,l]=c.useState(!1),{open:f,onClose:o,onOk:i,type:s,operator:n,initialValues:d}=p,[a]=r.useForm();c.useEffect(()=>{a.setFieldsValue(d)},[d]);const u=n==="create"?t._({id:"Btmkds"}):t._({id:"+o7WDh"});return e.jsx(v,{open:f,onCancel:()=>{o==null||o(),a.resetFields()},title:`${u}${s}`,centered:!0,okText:u,onOk:async()=>{l(!0);const h=await a.validateFields();await(i==null?void 0:i(n,h)),a.resetFields(),l(!1)},okButtonProps:{loading:x},children:e.jsxs(r,{layout:"vertical",form:a,children:[e.jsx(r.Item,{label:e.jsx(j,{id:"DBwLcS",values:{type:s}}),name:"name",rules:[{required:!0,message:t._({id:"eFtRqV",values:{type:s}})}],children:e.jsx(m,{placeholder:t._({id:"eFtRqV",values:{type:s}})})}),e.jsx(r.Item,{label:t._({id:"YKeVGf",values:{type:s}}),name:"description",children:e.jsx(m.TextArea,{style:{resize:"none",height:100},count:{max:100},showCount:!0,placeholder:t._({id:"33fTI1",values:{type:s}})})})]})})};export{V as C};
