import{af as m,a4 as a,ac as i,aa as p,a7 as c,ah as g}from"./index-5pNbV5yM.js";import{g as d,b as h,I as u}from"./index-cW0ZioI2.js";import{L as x,T as y}from"./TemplateCard-C9uNITKz.js";import{u as j}from"./index-ks3wl7Dz.js";import"./tagMapColor-DTc7TQem.js";import"./index-CgCbgM6x.js";const{Search:T}=u,f=d(`
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
`),S=()=>{const{id:o}=m(),[t,n]=j({page:1}),r=10,{data:e,loading:l}=h(f,{variables:{id:parseInt(o),pagination:{page:(t==null?void 0:t.page)>1?t.page-1:0,pageSize:r},search:t.search}});return a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:" bg-neutral-50 flex flex-col items-center",children:[a.jsx(i.Title,{level:4,className:"mt-6",children:e==null?void 0:e.tagByIdWithTemplates.tag.name}),a.jsx(i.Paragraph,{className:" max-w-[300px]",type:"secondary",children:e==null?void 0:e.tagByIdWithTemplates.tag.description}),a.jsx(i.Text,{type:"secondary",className:"mb-4",children:a.jsx(p,{id:"WPNGyN",values:{0:e==null?void 0:e.tagByIdWithTemplates.allCount}})})]}),a.jsx("div",{className:"flex justify-center my-4",children:a.jsx(T,{placeholder:c._({id:"+l8PEL"}),allowClear:!0,value:t.search,className:" max-w-[50%]",onChange:s=>{n({search:s.target.value})},loading:l,enterButton:!0})}),a.jsx("div",{className:"flex-1 bg-white shadow-lg rounded-lg p-4 min-w-[400px] w-[80%] m-auto mt-4 mb-6",children:a.jsx(x,{loading:{spinning:l,indicator:a.jsx(g,{style:{fontSize:24}})},itemLayout:"vertical",size:"large",pagination:{pageSize:r,total:e==null?void 0:e.tagByIdWithTemplates.total,onChange(s){n({page:s})},current:t.page},dataSource:e==null?void 0:e.tagByIdWithTemplates.templates,renderItem:s=>a.jsx(y,{id:s.id},s.id)})})]})};export{S as Component};
