import{a3 as c,af as p,a4 as e,ac as n,aa as g,a7 as d,ah as h}from"./index-BPVxhfy4.js";import{g as x,b as u,I as y}from"./index-DuPDKWxn.js";import{M as r}from"./MySkeleton-DPDOqslu.js";import{L as j,T}from"./TemplateCard-B5PV8jwu.js";import{u as f}from"./index-BFoBfxDw.js";import"./index-DgJ2S1Rq.js";const{Search:I}=y,N=x(`
  query TagTemplates($id:Int!,$pagination:Pagination,$search:String){
    tagByIdWithTemplates(id: $id,pagination: $pagination,search: $search){
      total
      templates{
        id
      }
      tag{
        name
        description
      }
      allCount
    }
  }
`),W=()=>{c();const{id:m}=p(),[s,l]=f({page:1}),o=10,{data:a,loading:i}=u(N,{variables:{id:parseInt(m),pagination:{page:(s==null?void 0:s.page)>1?s.page-1:0,pageSize:o},search:s.search}});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:" bg-neutral-50 flex flex-col items-center",children:[e.jsx(r,{loading:i,className:"w-[100px] h-10 mt-6",children:e.jsx(n.Title,{level:4,className:"mt-6",children:a==null?void 0:a.tagByIdWithTemplates.tag.name})}),e.jsx(r,{loading:i,className:"w-[300px] mt-2",children:e.jsx(n.Paragraph,{className:" max-w-[300px]",type:"secondary",children:a==null?void 0:a.tagByIdWithTemplates.tag.description})}),e.jsx(r,{loading:i,className:"w-[100px] mt-2 mb-4",children:e.jsx(n.Text,{type:"secondary",className:"mb-4",children:e.jsx(g,{id:"WPNGyN",values:{0:a==null?void 0:a.tagByIdWithTemplates.allCount}})})})]}),e.jsx("div",{className:"flex justify-center my-4",children:e.jsx(I,{placeholder:d._({id:"+l8PEL"}),allowClear:!0,value:s.search,className:" max-w-[50%]",onChange:t=>{l({search:t.target.value})},loading:i,enterButton:!0})}),e.jsx("div",{className:"flex-1 bg-white shadow-lg rounded-lg p-4 min-w-[400px] w-[80%] m-auto mt-4 mb-6",children:e.jsx(j,{loading:{spinning:i,indicator:e.jsx(h,{style:{fontSize:24}})},itemLayout:"vertical",size:"large",pagination:{pageSize:o,total:a==null?void 0:a.tagByIdWithTemplates.total,onChange(t){l({page:t})},current:s.page},dataSource:a==null?void 0:a.tagByIdWithTemplates.templates,renderItem:t=>e.jsx(T,{id:t.id},t.id)})})]})};export{W as Component};
