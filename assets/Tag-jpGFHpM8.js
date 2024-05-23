import{a3 as k,ab as B,a2 as E,r as l,a7 as a,a4 as t,ac as c,a6 as P,aa as m,a9 as Q}from"./index-5pNbV5yM.js";import{g as p,b as G,I as L}from"./index-cW0ZioI2.js";import{C as R}from"./CreateModal-kK_SSoUh.js";import{u as q}from"./useTime-Ds5F1ain.js";import{u as M,P as O}from"./index-ks3wl7Dz.js";import{u as U,P as z,a as F}from"./index-DFKy8eON.js";import{u as x}from"./index-Mq1gim0l.js";import"./index-CgCbgM6x.js";const{Search:J}=L,K=p(`
  query Tags($pagination:Pagination,$search:String){
    tags(pagination:$pagination,search:$search){
      total
      tags{
        id
        name
        description
        updateAt
        createAt
      }
    }
  }
`),V=p(`
  mutation DeleteTag($id:Int!){
    deleteTag(id:$id)
  }
`),Z=p(`
  mutation AddTag($input:TagInput!){
    createTag(tag:$input)
  }
`),H=p(`
  mutation UpdateTag($id:Int!,$input:TagInput!){
    updateTag(tag: $input,id: $id){
      name
    }
  }
`),re=()=>{k();const{message:n}=B.useApp(),w=E(),{formatTime:_,calcRelativeTimeNow:y}=q(),[r,h]=M({page:1}),f=l.useRef(null),o=U(f),T=10,[v,d]=l.useState(!1),{data:s,loading:A}=G(K,{variables:{pagination:{page:(r==null?void 0:r.page)>1?r.page-1:0,pageSize:T},search:r.search}}),[C,j]=l.useState("create"),[u,g]=l.useState(),[S]=x(V,{refetchQueries:["Tags"]}),[b]=x(H,{refetchQueries:["Tags"]}),[D]=x(Z,{refetchQueries:["Tags"]}),I=l.useMemo(()=>{if(u)return s==null?void 0:s.tags.tags.find(e=>e.id===u)},[u]),N=[{dataIndex:"name",title:a._({id:"1RKfdn"}),width:100,render:(e,i)=>t.jsx(c.Link,{onClick:()=>{w(`/tag/${i.id}`)},children:e})},{dataIndex:"description",title:a._({id:"5bNJce"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:e})},{dataIndex:"createAt",title:a._({id:"i9SLU7"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:_(e)}),sorter:(e,i)=>new Date(i.createAt).getTime()-new Date(e.createAt).getTime()},{dataIndex:"updateAt",title:a._({id:"6NpxEF"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:y(e)}),sorter:(e,i)=>new Date(i.createAt).getTime()-new Date(e.createAt).getTime()},{title:a._({id:"5oBbwZ"}),width:100,render:(e,i)=>t.jsxs(P,{size:"large",children:[t.jsx(c.Link,{onClick:()=>{j("update"),g(i.id),d(!0)},children:t.jsx(m,{id:"zil5pJ"})}),t.jsx(z,{title:a._({id:"oRSpSB"}),description:a._({id:"tvPiBt"}),okText:a._({id:"6Ql6i3"}),cancelText:a._({id:"jxD+iQ"}),onConfirm:async()=>{try{await S({variables:{id:i.id}}),n.success(a._({id:"B9we9a"}))}catch{n.error(a._({id:"DX31Ex"}))}},children:t.jsx(c.Link,{className:"m-0 ",style:{color:"#ff2442"},children:t.jsx(m,{id:"tGxdbR"})})})]})}];return t.jsxs("div",{className:"w-full h-full p-4",children:[t.jsxs("div",{className:"bg-white w-full h-full flex flex-col rounded-lg p-4 gap-2",children:[t.jsxs("div",{className:"flex justify-center relative",children:[t.jsx(J,{placeholder:a._({id:"VCf6QO"}),allowClear:!0,value:r.search,className:" max-w-[50%]",onChange:e=>{h({search:e.target.value})},loading:A,enterButton:!0}),t.jsx(Q,{className:" absolute left-0",type:"primary",onClick:()=>{d(!0),j("create")},children:t.jsx(t.Fragment,{children:t.jsx(m,{id:"MCjGYx"})})})]}),t.jsx("div",{className:"flex-1 overflow-hidden",ref:f,children:t.jsx(F,{pagination:!1,scroll:{y:o==null?void 0:o.height,x:o==null?void 0:o.width},rowKey:e=>e.id,columns:N,virtual:!0,dataSource:s==null?void 0:s.tags.tags})}),t.jsx("div",{className:"flex justify-end",children:t.jsx(O,{pageSize:T,total:s==null?void 0:s.tags.total,current:r.page,onChange:e=>{h({page:e})},showSizeChanger:!1})})]}),t.jsx(R,{open:v,type:a._({id:"9qqIHt"}),operator:C,onClose:()=>{d(!1),g(void 0)},onOk:async(e,i)=>{try{e==="create"?(await D({variables:{input:{name:i.name,description:i.description??""}}}),n.success(a._({id:"GPzSBj"}))):e==="update"&&(await b({variables:{id:u,input:{name:i.name,description:i.description??""}}}),n.success(a._({id:"Cl0ZDA"})))}catch{e==="create"?n.error(a._({id:"DWjNjr"})):e==="update"&&n.error(a._({id:"jx5Bb/"}))}finally{g(void 0),d(!1)}},initialValues:I})]})};export{re as Component};
