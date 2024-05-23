import{ab as y,ap as f,a2 as v,r as j,a7 as p,a4 as t,aj as w,ah as I}from"./index-5pNbV5yM.js";import{g as d,b as m,I as T}from"./index-cW0ZioI2.js";import{T as b,t as S}from"./tagMapColor-DTc7TQem.js";import{L as N,T as C}from"./TemplateCard-C9uNITKz.js";import{u as $}from"./index-ks3wl7Dz.js";import"./index-CgCbgM6x.js";const{Search:k}=T,E=d(`
  query Dates($categoryId: Int, $pagination:Pagination,$search:String) {
    templatesWithPagination(categoryId: $categoryId, pagination: $pagination,search: $search) {
      templates{
        id
      }
      total
    }
  }
`),P=d(`
  query TagsAndCategories{
    categories{
      categories{
        id
        name
      }
    }
    tags{
      tags{
        id
        name
      }
    }
  }
`),A=()=>{var g;const{message:u}=y.useApp(),{scrollToTop:h}=f(),x=v(),[e,o]=$({page:1}),i=10,{data:s}=m(P),{data:r,loading:l,error:n}=m(E,{variables:{categoryId:e.category?parseInt(e.category):void 0,pagination:{page:(e==null?void 0:e.page)>1?e.page-1:0,pageSize:i},search:e.search}});j.useEffect(()=>{n&&u.error(n.message)},[n]);const c=((g=s==null?void 0:s.categories)==null?void 0:g.categories.map(a=>({key:a.id,label:a.name})))??[];return c.unshift({key:"all",label:p._({id:"8w35T/"})}),t.jsxs("div",{className:"w-[80%] flex gap-6 m-auto mt-4 relative pb-6 items-start",children:[t.jsx(w,{className:"w-[180px] rounded-lg",items:c,selectedKeys:[e.category??"all"],onSelect:a=>{a.key==="all"?o({category:void 0}):o({category:Number(a.key)}),h()}}),t.jsxs("div",{className:"flex-1 bg-white p-4 min-w-[400px]",children:[t.jsx(k,{placeholder:p._({id:"+l8PEL"}),allowClear:!0,value:e.search,className:"my-2",onChange:a=>{o({search:a.target.value})},loading:l,enterButton:!0}),t.jsx(N,{loading:{spinning:l,indicator:t.jsx(I,{style:{fontSize:24}})},itemLayout:"vertical",size:"large",pagination:{pageSize:i,total:r==null?void 0:r.templatesWithPagination.total,onChange(a){o({page:a})},current:e.page},dataSource:r==null?void 0:r.templatesWithPagination.templates,renderItem:a=>t.jsx(C,{id:a.id},a.id)})]}),t.jsx("div",{className:"w-[280px] shadow-lg  flex flex-wrap gap-3 p-4 rounded-lg bg-white",children:s==null?void 0:s.tags.tags.map(a=>t.jsx(b,{className:"cursor-pointer",color:S[a.name],onClick:()=>{x(`/tag/${a.id}`)},children:a.name},a.id))})]})};export{A as Component,P as TAGS_CATEGORY};
