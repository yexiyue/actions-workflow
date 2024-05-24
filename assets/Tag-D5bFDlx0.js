import{a3 as $,ab as B,a2 as E,r as d,a7 as a,a4 as t,ac as c,a6 as P,aa as m,a9 as L,ah as Q}from"./index-Bf3tMyn6.js";import{g as p,b as R,I as G}from"./index-BiSxIIt5.js";import{C as q}from"./CreateModal-CfvlTCi1.js";import{u as O}from"./useTime-Daqpy5Wr.js";import{u as z,P as M}from"./index-DFwDVimj.js";import{u as U,P as F,a as H}from"./index-DC7BwBzE.js";import{u as x}from"./index-CqyGjLJe.js";import"./index-RQEc1OdY.js";const{Search:J}=G,K=p(`
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
`),X=p(`
  mutation AddTag($input:TagInput!){
    createTag(tag:$input)
  }
`),Z=p(`
  mutation UpdateTag($id:Int!,$input:TagInput!){
    updateTag(tag: $input,id: $id){
      name
    }
  }
`),re=()=>{$();const{message:n}=B.useApp(),w=E(),{formatTime:_,calcRelativeTimeNow:k}=O(),[r,h]=z({page:1}),f=d.useRef(null),o=U(f),T=10,[v,l]=d.useState(!1),{data:s,loading:j}=R(K,{variables:{pagination:{page:(r==null?void 0:r.page)>1?r.page-1:0,pageSize:T},search:r.search}}),[A,y]=d.useState("create"),[u,g]=d.useState(),[S]=x(V,{refetchQueries:["Tags"]}),[C]=x(Z,{refetchQueries:["Tags"]}),[b]=x(X,{refetchQueries:["Tags"]}),I=d.useMemo(()=>{if(u)return s==null?void 0:s.tags.tags.find(e=>e.id===u)},[u]),D=[{dataIndex:"name",title:a._({id:"1RKfdn"}),width:100,render:(e,i)=>t.jsx(c.Link,{onClick:()=>{w(`/tag/${i.id}`)},children:e})},{dataIndex:"description",title:a._({id:"5bNJce"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:e})},{dataIndex:"createAt",title:a._({id:"i9SLU7"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:_(e)}),sorter:(e,i)=>new Date(i.createAt).getTime()-new Date(e.createAt).getTime()},{dataIndex:"updateAt",title:a._({id:"6NpxEF"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:k(e)}),sorter:(e,i)=>new Date(i.createAt).getTime()-new Date(e.createAt).getTime()},{title:a._({id:"5oBbwZ"}),width:100,render:(e,i)=>t.jsxs(P,{size:"large",children:[t.jsx(c.Link,{onClick:()=>{y("update"),g(i.id),l(!0)},children:t.jsx(m,{id:"zil5pJ"})}),t.jsx(F,{title:a._({id:"oRSpSB"}),description:a._({id:"tvPiBt"}),okText:a._({id:"6Ql6i3"}),cancelText:a._({id:"jxD+iQ"}),onConfirm:async()=>{try{n.loading({content:a._({id:"Bj6nL6"}),duration:0,key:"delete"}),await S({variables:{id:i.id}}),n.success({content:a._({id:"B9we9a"}),key:"delete"})}catch{n.error({content:a._({id:"DX31Ex"}),key:"delete"})}},children:t.jsx(c.Link,{className:"m-0 ",style:{color:"#ff2442"},children:t.jsx(m,{id:"tGxdbR"})})})]})}];return t.jsxs("div",{className:"w-full h-full p-4",children:[t.jsxs("div",{className:"bg-white w-full h-full flex flex-col rounded-lg p-4 gap-2",children:[t.jsxs("div",{className:"flex justify-center relative",children:[t.jsx(J,{placeholder:a._({id:"VCf6QO"}),allowClear:!0,value:r.search,className:" max-w-[50%]",onChange:e=>{h({search:e.target.value})},loading:j,enterButton:!0}),t.jsx(L,{className:" absolute left-0",type:"primary",onClick:()=>{l(!0),y("create")},children:t.jsx(t.Fragment,{children:t.jsx(m,{id:"MCjGYx"})})})]}),t.jsx("div",{className:"flex-1 overflow-hidden",ref:f,children:t.jsx(H,{pagination:!1,scroll:{y:o==null?void 0:o.height,x:o==null?void 0:o.width},loading:{spinning:j,indicator:t.jsx(Q,{style:{fontSize:24}})},rowKey:e=>e.id,columns:D,virtual:!0,dataSource:s==null?void 0:s.tags.tags})}),t.jsx("div",{className:"flex justify-end",children:t.jsx(M,{pageSize:T,total:s==null?void 0:s.tags.total,current:r.page,onChange:e=>{h({page:e})},showSizeChanger:!1})})]}),t.jsx(q,{open:v,type:a._({id:"9qqIHt"}),operator:A,onClose:()=>{l(!1),g(void 0)},onOk:async(e,i)=>{try{e==="create"?(n.loading({content:a._({id:"pOH8Xj"}),duration:0,key:"create"}),await b({variables:{input:{name:i.name,description:i.description??""}}}),n.success({content:a._({id:"GPzSBj"}),key:"create"})):e==="update"&&(n.loading({content:a._({id:"lE9b32"}),duration:0,key:"update"}),await C({variables:{id:u,input:{name:i.name,description:i.description??""}}}),n.success({content:a._({id:"Cl0ZDA"}),key:"update"}))}catch{e==="create"?n.error({content:a._({id:"DWjNjr"}),key:"create"}):e==="update"&&n.error({content:a._({id:"jx5Bb/"}),key:"update"})}finally{g(void 0),l(!1)}},initialValues:I})]})};export{re as Component};
