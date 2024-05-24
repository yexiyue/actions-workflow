import{a3 as g,af as h,a4 as e,a5 as y,ac as i,aa as l,a7 as j,ah as f}from"./index-2Og1nv0n.js";import{g as I,b as v,I as w}from"./index-BDRk5EhP.js";import{M as n}from"./MySkeleton-BIgMNdIE.js";import{L as T,T as B}from"./TemplateCard-BE_FMq4j.js";import{u as N}from"./useTime-BW_M2mMm.js";import{u as S}from"./index-BQXgRjwF.js";import"./index-BH574STE.js";const{Search:U}=w,C=I(`
  query UserTemplates($id:Int!,$pagination:Pagination,$search:String){
    userById(id:$id) {
      id
      username
      avatarUrl
      createAt
    }
    templatesByUserId(userId:$id,pagination: $pagination,search: $search) {
      templates{
        id
      }
      total
      allCount
    }
  }
`),E=()=>{var m,p,d;g();const{id:u}=h(),[a,o]=S({page:1}),c=10,{data:s,loading:r}=v(C,{variables:{id:parseInt(u),pagination:{page:(a==null?void 0:a.page)>1?a.page-1:0,pageSize:c},search:a.search}}),{formatTime:x}=N();return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex gap-2 items-center flex-col bg-neutral-50 p-4",children:[e.jsx(n,{className:"w-10 h-10 rounded-full",loading:r,children:e.jsx(y,{size:"large",src:(m=s==null?void 0:s.userById)==null?void 0:m.avatarUrl})}),e.jsx(n,{className:"w-[140px]",loading:r,children:e.jsx(i.Text,{children:e.jsx(l,{id:"qhnYA0",values:{0:(p=s==null?void 0:s.userById)==null?void 0:p.username}})})}),e.jsx(n,{className:"w-[230px]",loading:r,children:e.jsx(i.Text,{type:"secondary",children:e.jsx(l,{id:"s6YXob",values:{0:x((d=s==null?void 0:s.userById)==null?void 0:d.createAt)}})})}),e.jsx(n,{className:"w-[150px]",loading:r,children:e.jsx(i.Text,{type:"secondary",children:e.jsx(l,{id:"Th+JwN",values:{0:s==null?void 0:s.templatesByUserId.allCount}})})})]}),e.jsx("div",{className:"flex justify-center  my-4",children:e.jsx(U,{placeholder:j._({id:"+l8PEL"}),allowClear:!0,value:a.search,className:" max-w-[50%]",onChange:t=>{o({search:t.target.value})},loading:r,enterButton:!0})}),e.jsx("div",{className:"flex-1 bg-white p-4 shadow-lg rounded-lg min-w-[400px] w-[80%] m-auto mt-4 mb-6",children:e.jsx(T,{loading:{spinning:r,indicator:e.jsx(f,{style:{fontSize:24}})},itemLayout:"vertical",size:"large",pagination:{pageSize:c,total:s==null?void 0:s.templatesByUserId.total,onChange(t){o({page:t})},current:a.page},dataSource:s==null?void 0:s.templatesByUserId.templates,renderItem:t=>e.jsx(B,{id:t.id},t.id)})})]})};export{E as Component};
