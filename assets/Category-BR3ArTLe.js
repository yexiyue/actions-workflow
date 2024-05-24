import{a3 as N,a2 as b,ab as R,r as d,a7 as a,a4 as t,ac as c,a6 as L,aa as m,a9 as O,ah as P}from"./index-BPVxhfy4.js";import{g as u,b as B,I as Q}from"./index-DuPDKWxn.js";import{C as G}from"./CreateModal-Dz8PeBrv.js";import{u as U}from"./useTime-ShdeJrC2.js";import{u as F,P as z}from"./index-BFoBfxDw.js";import{u as M,P as q,a as X}from"./index-Caq4BpzH.js";import{u as y}from"./index-Cj91BlCw.js";import"./index-DgJ2S1Rq.js";const{Search:Y}=Q,H=u(`
  query Categories($pagination:Pagination,$search:String){
    categories(pagination:$pagination,search:$search){
      total
      categories{
        id
        name
        description
        updateAt
        createAt
      }
    }
  }
`),J=u(`
  mutation DeleteCategory($id:Int!){
    deleteCategory(id:$id)
  }
`),Z=u(`
  mutation AddCategory($input:CategoryInput!){
    createCategory(category: $input)
  }
`),K=u(`
  mutation UpdateCategory($id:Int!,$input:CategoryInput!){
    updateCategory(category: $input,id: $id){
      name
    }
  }
`),se=()=>{N();const w=b(),{message:n}=R.useApp(),{formatTime:_,calcRelativeTimeNow:T}=U(),[s,h]=F({page:1}),x=d.useRef(null),o=M(x),f=10,[k,l]=d.useState(!1),{data:r,loading:j}=B(H,{variables:{pagination:{page:(s==null?void 0:s.page)>1?s.page-1:0,pageSize:f},search:s.search}}),[v,C]=d.useState("create"),[p,g]=d.useState(),[A]=y(J,{refetchQueries:["Categories"]}),[S]=y(K,{refetchQueries:["Categories"]}),[E]=y(Z,{refetchQueries:["Categories"]}),I=d.useMemo(()=>{if(p)return r==null?void 0:r.categories.categories.find(e=>e.id===p)},[p]),$=[{dataIndex:"name",title:a._({id:"5vFH6U"}),width:100,render:(e,i)=>t.jsx(c.Link,{onClick:()=>{w(`/?category=${i.id}&page=1`)},children:e})},{dataIndex:"description",title:a._({id:"B0O3Jo"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:e})},{dataIndex:"createAt",title:a._({id:"i9SLU7"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:_(e)}),sorter:(e,i)=>new Date(i.createAt).getTime()-new Date(e.createAt).getTime()},{dataIndex:"updateAt",title:a._({id:"6NpxEF"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:T(e)}),sorter:(e,i)=>new Date(i.createAt).getTime()-new Date(e.createAt).getTime()},{title:a._({id:"5oBbwZ"}),width:100,render:(e,i)=>t.jsxs(L,{size:"large",children:[t.jsx(c.Link,{onClick:()=>{C("update"),g(i.id),l(!0)},children:t.jsx(m,{id:"zil5pJ"})}),t.jsx(q,{title:a._({id:"a96y2n"}),description:a._({id:"GlESuR"}),okText:a._({id:"6Ql6i3"}),cancelText:a._({id:"jxD+iQ"}),onConfirm:async()=>{try{n.open({type:"loading",content:a._({id:"Bj6nL6"}),duration:0,key:"delete"}),await A({variables:{id:i.id}}),n.open({type:"success",content:a._({id:"B9we9a"}),key:"delete"})}catch{n.open({type:"error",content:a._({id:"DX31Ex"}),key:"delete"})}},children:t.jsx(c.Link,{className:"m-0 ",style:{color:"#ff2442"},children:t.jsx(m,{id:"tGxdbR"})})})]})}];return t.jsxs("div",{className:"w-full h-full p-4",children:[t.jsxs("div",{className:"bg-white w-full h-full flex flex-col rounded-lg p-4 gap-2",children:[t.jsxs("div",{className:"flex justify-center relative",children:[t.jsx(Y,{placeholder:a._({id:"ZcQe7X"}),allowClear:!0,value:s.search,className:" max-w-[50%]",onChange:e=>{h({search:e.target.value})},loading:j,enterButton:!0}),t.jsx(O,{className:" absolute left-0",type:"primary",onClick:()=>{l(!0),C("create")},children:t.jsx(t.Fragment,{children:t.jsx(m,{id:"aUkp/m"})})})]}),t.jsx("div",{className:"flex-1 overflow-hidden",ref:x,children:t.jsx(X,{pagination:!1,scroll:{y:o==null?void 0:o.height,x:o==null?void 0:o.width},loading:{spinning:j,indicator:t.jsx(P,{style:{fontSize:24}})},rowKey:e=>e.id,columns:$,virtual:!0,dataSource:r==null?void 0:r.categories.categories})}),t.jsx("div",{className:"flex justify-end",children:t.jsx(z,{pageSize:f,total:r==null?void 0:r.categories.total,current:s.page,onChange:e=>{h({page:e})},showSizeChanger:!1})})]}),t.jsx(G,{open:k,type:a._({id:"4c0lyF"}),operator:v,onClose:()=>{l(!1),g(void 0)},onOk:async(e,i)=>{try{e==="create"?(n.open({type:"loading",content:a._({id:"pOH8Xj"}),duration:0,key:"create"}),await E({variables:{input:{name:i.name,description:i.description??""}}}),n.open({type:"success",content:a._({id:"GPzSBj"}),key:"create"})):e==="update"&&(n.open({type:"loading",content:a._({id:"9S1Ls8"}),duration:0,key:"update"}),await S({variables:{id:p,input:{name:i.name,description:i.description??""}}}),n.open({type:"success",content:a._({id:"PRMjAo"}),key:"update"}))}catch{e==="create"?n.open({type:"error",content:a._({id:"DWjNjr"}),key:"create"}):e==="update"&&n.open({type:"error",content:a._({id:"cdE/c2"}),key:"update"})}finally{g(void 0),l(!1)}},initialValues:I})]})};export{se as Component};
