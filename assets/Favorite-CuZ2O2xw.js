import{a3 as o,a4 as a,a7 as n,al as p,ah as c}from"./index-BDD7mHiH.js";import{g,b as u,I as m}from"./index-mwPAbnPL.js";import{L as h,T as d}from"./TemplateCard-DeTTet3C.js";import{u as f,P as x}from"./index-CzBIQUnk.js";import"./MySkeleton-BRiiwqF2.js";import"./index-C3M1MKDk.js";const{Search:j}=m,v=g(`
query MyFavorite($pagination:Pagination,$search:String){
    favoriteTemplates(pagination: $pagination,search: $search){
      templates{
        id
      }
      total
      allCount
    }
}
`),I=()=>{o();const[e,i]=f({page:1}),r=10,{data:t,loading:l}=u(v,{variables:{pagination:{page:(e==null?void 0:e.page)>1?e.page-1:0,pageSize:r},search:e.search}});return a.jsx("div",{className:"w-full h-full p-4",children:a.jsxs("div",{className:"bg-white w-full h-full flex flex-col rounded-lg p-4 gap-2",children:[a.jsx(j,{placeholder:n._({id:"+l8PEL"}),allowClear:!0,value:e.search,className:" max-w-[50%] mx-auto",onChange:s=>{i({search:s.target.value})},loading:l,enterButton:!0}),a.jsx(p,{children:a.jsx(h,{loading:{spinning:l,indicator:a.jsx(c,{style:{fontSize:24}})},style:{height:300},itemLayout:"vertical",size:"large",dataSource:t==null?void 0:t.favoriteTemplates.templates,renderItem:s=>a.jsx(d,{id:s.id},s.id)})}),a.jsx("div",{className:"flex justify-end",children:a.jsx(x,{pageSize:r,total:t==null?void 0:t.favoriteTemplates.total,current:e.page,onChange:s=>{i({page:s})}})})]})})};export{I as Component};
