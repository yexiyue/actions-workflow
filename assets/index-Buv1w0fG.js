import{a3 as m,af as p,a4 as a,ac as i,aa as c,a7 as g,ah as d}from"./index-CNm7ylrt.js";import{g as h,b as u,I as x}from"./index-Daa7Jgxx.js";import{L as y,T as j}from"./TemplateCard-CtQujdeu.js";import{u as T}from"./index-NDjTGhAF.js";import"./tagMapColor-v6oxmCvI.js";import"./index-BYu9k_cg.js";const{Search:f}=x,I=h(`
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
`),W=()=>{m();const{id:o}=p(),[t,n]=T({page:1}),r=10,{data:e,loading:l}=u(I,{variables:{id:parseInt(o),pagination:{page:(t==null?void 0:t.page)>1?t.page-1:0,pageSize:r},search:t.search}});return a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:" bg-neutral-50 flex flex-col items-center",children:[a.jsx(i.Title,{level:4,className:"mt-6",children:e==null?void 0:e.tagByIdWithTemplates.tag.name}),a.jsx(i.Paragraph,{className:" max-w-[300px]",type:"secondary",children:e==null?void 0:e.tagByIdWithTemplates.tag.description}),a.jsx(i.Text,{type:"secondary",className:"mb-4",children:a.jsx(c,{id:"WPNGyN",values:{0:e==null?void 0:e.tagByIdWithTemplates.allCount}})})]}),a.jsx("div",{className:"flex justify-center my-4",children:a.jsx(f,{placeholder:g._({id:"+l8PEL"}),allowClear:!0,value:t.search,className:" max-w-[50%]",onChange:s=>{n({search:s.target.value})},loading:l,enterButton:!0})}),a.jsx("div",{className:"flex-1 bg-white shadow-lg rounded-lg p-4 min-w-[400px] w-[80%] m-auto mt-4 mb-6",children:a.jsx(y,{loading:{spinning:l,indicator:a.jsx(d,{style:{fontSize:24}})},itemLayout:"vertical",size:"large",pagination:{pageSize:r,total:e==null?void 0:e.tagByIdWithTemplates.total,onChange(s){n({page:s})},current:t.page},dataSource:e==null?void 0:e.tagByIdWithTemplates.templates,renderItem:s=>a.jsx(j,{id:s.id},s.id)})})]})};export{W as Component};
