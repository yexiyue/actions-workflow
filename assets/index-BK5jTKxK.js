import{a3 as g,af as x,a4 as s,a5 as h,ac as t,aa as i,a7 as y,ah as j}from"./index-CNm7ylrt.js";import{g as I,b as f,I as v}from"./index-Daa7Jgxx.js";import{L as T,T as B}from"./TemplateCard-CtQujdeu.js";import{u as U}from"./useTime-D7p7YOta.js";import{u as w}from"./index-NDjTGhAF.js";import"./tagMapColor-v6oxmCvI.js";import"./index-BYu9k_cg.js";const{Search:C}=v,S=I(`
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
`),P=()=>{var c,m,p;g();const{id:u}=x(),[a,n]=w({page:1}),l=10,{data:e,loading:o}=f(S,{variables:{id:parseInt(u),pagination:{page:(a==null?void 0:a.page)>1?a.page-1:0,pageSize:l},search:a.search}}),{formatTime:d}=U();return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"flex gap-2 items-center flex-col bg-neutral-50 p-4",children:[s.jsx(h,{size:"large",src:(c=e==null?void 0:e.userById)==null?void 0:c.avatarUrl}),s.jsx(t.Text,{children:s.jsx(i,{id:"qhnYA0",values:{0:(m=e==null?void 0:e.userById)==null?void 0:m.username}})}),s.jsx(t.Text,{type:"secondary",children:s.jsx(i,{id:"s6YXob",values:{0:d((p=e==null?void 0:e.userById)==null?void 0:p.createAt)}})}),s.jsx(t.Text,{type:"secondary",children:s.jsx(i,{id:"Th+JwN",values:{0:e==null?void 0:e.templatesByUserId.allCount}})})]}),s.jsx("div",{className:"flex justify-center  my-4",children:s.jsx(C,{placeholder:y._({id:"+l8PEL"}),allowClear:!0,value:a.search,className:" max-w-[50%]",onChange:r=>{n({search:r.target.value})},loading:o,enterButton:!0})}),s.jsx("div",{className:"flex-1 bg-white p-4 shadow-lg rounded-lg min-w-[400px] w-[80%] m-auto mt-4 mb-6",children:s.jsx(T,{loading:{spinning:o,indicator:s.jsx(j,{style:{fontSize:24}})},itemLayout:"vertical",size:"large",pagination:{pageSize:l,total:e==null?void 0:e.templatesByUserId.total,onChange(r){n({page:r})},current:a.page},dataSource:e==null?void 0:e.templatesByUserId.templates,renderItem:r=>s.jsx(B,{id:r.id},r.id)})})]})};export{P as Component};
