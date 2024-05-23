import{a3 as N,a2 as k,ab as R,r as l,a7 as a,a4 as t,ac as c,a6 as B,aa as m,a9 as O}from"./index-5pNbV5yM.js";import{g as p,b as P,I as Q}from"./index-cW0ZioI2.js";import{C as G}from"./CreateModal-kK_SSoUh.js";import{u as L}from"./useTime-Ds5F1ain.js";import{u as U,P as F}from"./index-ks3wl7Dz.js";import{u as q,P as z,a as M}from"./index-DFKy8eON.js";import{u as x}from"./index-Mq1gim0l.js";import"./index-CgCbgM6x.js";const{Search:Y}=Q,Z=p(`
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
`),J=p(`
  mutation DeleteCategory($id:Int!){
    deleteCategory(id:$id)
  }
`),X=p(`
  mutation AddCategory($input:CategoryInput!){
    createCategory(category: $input)
  }
`),H=p(`
  mutation UpdateCategory($id:Int!,$input:CategoryInput!){
    updateCategory(category: $input,id: $id){
      name
    }
  }
`),se=()=>{N();const C=k(),{message:n}=R.useApp(),{formatTime:w,calcRelativeTimeNow:T}=L(),[s,h]=U({page:1}),f=l.useRef(null),o=q(f),y=10,[_,d]=l.useState(!1),{data:r,loading:v}=P(Z,{variables:{pagination:{page:(s==null?void 0:s.page)>1?s.page-1:0,pageSize:y},search:s.search}}),[A,j]=l.useState("create"),[u,g]=l.useState(),[S]=x(J,{refetchQueries:["Categories"]}),[D]=x(H,{refetchQueries:["Categories"]}),[$]=x(X,{refetchQueries:["Categories"]}),b=l.useMemo(()=>{if(u)return r==null?void 0:r.categories.categories.find(e=>e.id===u)},[u]),E=[{dataIndex:"name",title:a._({id:"5vFH6U"}),width:100,render:(e,i)=>t.jsx(c.Link,{onClick:()=>{C(`/?category=${i.id}&page=1`)},children:e})},{dataIndex:"description",title:a._({id:"B0O3Jo"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:e})},{dataIndex:"createAt",title:a._({id:"i9SLU7"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:w(e)}),sorter:(e,i)=>new Date(i.createAt).getTime()-new Date(e.createAt).getTime()},{dataIndex:"updateAt",title:a._({id:"6NpxEF"}),width:150,render:e=>t.jsx(c.Text,{ellipsis:{tooltip:e},children:T(e)}),sorter:(e,i)=>new Date(i.createAt).getTime()-new Date(e.createAt).getTime()},{title:a._({id:"5oBbwZ"}),width:100,render:(e,i)=>t.jsxs(B,{size:"large",children:[t.jsx(c.Link,{onClick:()=>{j("update"),g(i.id),d(!0)},children:t.jsx(m,{id:"zil5pJ"})}),t.jsx(z,{title:a._({id:"a96y2n"}),description:a._({id:"GlESuR"}),okText:a._({id:"6Ql6i3"}),cancelText:a._({id:"jxD+iQ"}),onConfirm:async()=>{try{await S({variables:{id:i.id}}),n.success(a._({id:"B9we9a"}))}catch{n.error(a._({id:"DX31Ex"}))}},children:t.jsx(c.Link,{className:"m-0 ",style:{color:"#ff2442"},children:t.jsx(m,{id:"tGxdbR"})})})]})}];return t.jsxs("div",{className:"w-full h-full p-4",children:[t.jsxs("div",{className:"bg-white w-full h-full flex flex-col rounded-lg p-4 gap-2",children:[t.jsxs("div",{className:"flex justify-center relative",children:[t.jsx(Y,{placeholder:a._({id:"ZcQe7X"}),allowClear:!0,value:s.search,className:" max-w-[50%]",onChange:e=>{h({search:e.target.value})},loading:v,enterButton:!0}),t.jsx(O,{className:" absolute left-0",type:"primary",onClick:()=>{d(!0),j("create")},children:t.jsx(t.Fragment,{children:t.jsx(m,{id:"aUkp/m"})})})]}),t.jsx("div",{className:"flex-1 overflow-hidden",ref:f,children:t.jsx(M,{pagination:!1,scroll:{y:o==null?void 0:o.height,x:o==null?void 0:o.width},rowKey:e=>e.id,columns:E,virtual:!0,dataSource:r==null?void 0:r.categories.categories})}),t.jsx("div",{className:"flex justify-end",children:t.jsx(F,{pageSize:y,total:r==null?void 0:r.categories.total,current:s.page,onChange:e=>{h({page:e})},showSizeChanger:!1})})]}),t.jsx(G,{open:_,type:a._({id:"4c0lyF"}),operator:A,onClose:()=>{d(!1),g(void 0)},onOk:async(e,i)=>{try{e==="create"?(await $({variables:{input:{name:i.name,description:i.description??""}}}),n.success(a._({id:"GPzSBj"}))):e==="update"&&(await D({variables:{id:u,input:{name:i.name,description:i.description??""}}}),n.success(a._({id:"Cl0ZDA"})))}catch{e==="create"?n.error(a._({id:"DWjNjr"})):e==="update"&&n.error(a._({id:"jx5Bb/"}))}finally{g(void 0),d(!1)}},initialValues:b})]})};export{se as Component};
