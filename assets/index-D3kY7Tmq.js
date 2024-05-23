import{af as g,a4 as s,a5 as x,ac as t,aa as i,a7 as h,ah as y}from"./index-B0PrfQLx.js";import{g as j,b as I,I as f}from"./index-eE7LXthl.js";import{L as v,T}from"./TemplateCard-DL6EMSqy.js";import{u as B}from"./useTime-DZ3yU9Z5.js";import{u as U}from"./index-CvsYaP6J.js";import"./tagMapColor-DNEdUJNx.js";import"./index-zLrji8-A.js";const{Search:w}=f,C=j(`
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
`),L=()=>{var c,m,p;const{id:u}=g(),[a,n]=U({page:1}),l=10,{data:e,loading:o}=I(C,{variables:{id:parseInt(u),pagination:{page:(a==null?void 0:a.page)>1?a.page-1:0,pageSize:l},search:a.search}}),{formatTime:d}=B();return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"flex gap-2 items-center flex-col bg-neutral-50 p-4",children:[s.jsx(x,{size:"large",src:(c=e==null?void 0:e.userById)==null?void 0:c.avatarUrl}),s.jsx(t.Text,{children:s.jsx(i,{id:"qhnYA0",values:{0:(m=e==null?void 0:e.userById)==null?void 0:m.username}})}),s.jsx(t.Text,{type:"secondary",children:s.jsx(i,{id:"s6YXob",values:{0:d((p=e==null?void 0:e.userById)==null?void 0:p.createAt)}})}),s.jsx(t.Text,{type:"secondary",children:s.jsx(i,{id:"Th+JwN",values:{0:e==null?void 0:e.templatesByUserId.allCount}})})]}),s.jsx("div",{className:"flex justify-center  my-4",children:s.jsx(w,{placeholder:h._({id:"+l8PEL"}),allowClear:!0,value:a.search,className:" max-w-[50%]",onChange:r=>{n({search:r.target.value})},loading:o,enterButton:!0})}),s.jsx("div",{className:"flex-1 bg-white p-4 shadow-lg rounded-lg min-w-[400px] w-[80%] m-auto mt-4 mb-6",children:s.jsx(v,{loading:{spinning:o,indicator:s.jsx(y,{style:{fontSize:24}})},itemLayout:"vertical",size:"large",pagination:{pageSize:l,total:e==null?void 0:e.templatesByUserId.total,onChange(r){n({page:r})},current:a.page},dataSource:e==null?void 0:e.templatesByUserId.templates,renderItem:r=>s.jsx(T,{id:r.id},r.id)})})]})};export{L as Component};
