import{a4 as e,a7 as o,al as n,ah as p}from"./index-5pNbV5yM.js";import{g as c,b as g,I as m}from"./index-cW0ZioI2.js";import{L as u,T as h}from"./TemplateCard-C9uNITKz.js";import{u as d,P as f}from"./index-ks3wl7Dz.js";import"./tagMapColor-DTc7TQem.js";import"./index-CgCbgM6x.js";const{Search:x}=m,j=c(`
query MyFavorite($pagination:Pagination,$search:String){
    favoriteTemplates(pagination: $pagination,search: $search){
      templates{
        id
      }
      total
      allCount
    }
}
`),I=()=>{const[a,r]=d({page:1}),i=10,{data:t,loading:l}=g(j,{variables:{pagination:{page:(a==null?void 0:a.page)>1?a.page-1:0,pageSize:i},search:a.search}});return e.jsx("div",{className:"w-full h-full p-4",children:e.jsxs("div",{className:"bg-white w-full h-full flex flex-col rounded-lg p-4 gap-2",children:[e.jsx(x,{placeholder:o._({id:"+l8PEL"}),allowClear:!0,value:a.search,className:" max-w-[50%] mx-auto",onChange:s=>{r({search:s.target.value})},loading:l,enterButton:!0}),e.jsx(n,{children:e.jsx(u,{loading:{spinning:l,indicator:e.jsx(p,{style:{fontSize:24}})},style:{height:300},itemLayout:"vertical",size:"large",dataSource:t==null?void 0:t.favoriteTemplates.templates,renderItem:s=>e.jsx(h,{id:s.id},s.id)})}),e.jsx("div",{className:"flex justify-end",children:e.jsx(f,{pageSize:i,total:t==null?void 0:t.favoriteTemplates.total,current:a.page,onChange:s=>{r({page:s})}})})]})})};export{I as Component};
