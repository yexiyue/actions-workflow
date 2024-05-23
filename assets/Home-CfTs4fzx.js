import{a3 as y,ab as f,ap as v,a2 as j,r as w,a7 as p,a4 as t,aj as I,ah as T}from"./index-CNm7ylrt.js";import{g as u,b as m,I as b}from"./index-Daa7Jgxx.js";import{T as S,t as N}from"./tagMapColor-v6oxmCvI.js";import{L as C,T as $}from"./TemplateCard-CtQujdeu.js";import{u as k}from"./index-NDjTGhAF.js";import"./index-BYu9k_cg.js";const{Search:E}=b,L=u(`
  query Dates($categoryId: Int, $pagination:Pagination,$search:String) {
    templatesWithPagination(categoryId: $categoryId, pagination: $pagination,search: $search) {
      templates{
        id
      }
      total
    }
  }
`),P=u(`
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
`),G=()=>{var g;y();const{message:d}=f.useApp(),{scrollToTop:h}=v(),x=j(),[e,o]=k({page:1}),n=10,{data:s}=m(P),{data:r,loading:l,error:i}=m(L,{variables:{categoryId:e.category?parseInt(e.category):void 0,pagination:{page:(e==null?void 0:e.page)>1?e.page-1:0,pageSize:n},search:e.search}});w.useEffect(()=>{i&&d.error(i.message)},[i]);const c=((g=s==null?void 0:s.categories)==null?void 0:g.categories.map(a=>({key:a.id,label:a.name})))??[];return c.unshift({key:"all",label:p._({id:"8w35T/"})}),t.jsxs("div",{className:"w-[80%] flex gap-6 m-auto mt-4 relative pb-6 items-start",children:[t.jsx(I,{className:"w-[180px] rounded-lg",items:c,selectedKeys:[e.category??"all"],onSelect:a=>{a.key==="all"?o({category:void 0}):o({category:Number(a.key)}),h()}}),t.jsxs("div",{className:"flex-1 bg-white p-4 min-w-[400px]",children:[t.jsx(E,{placeholder:p._({id:"+l8PEL"}),allowClear:!0,value:e.search,className:"my-2",onChange:a=>{o({search:a.target.value})},loading:l,enterButton:!0}),t.jsx(C,{loading:{spinning:l,indicator:t.jsx(T,{style:{fontSize:24}})},itemLayout:"vertical",size:"large",pagination:{pageSize:n,total:r==null?void 0:r.templatesWithPagination.total,onChange(a){o({page:a})},current:e.page},dataSource:r==null?void 0:r.templatesWithPagination.templates,renderItem:a=>t.jsx($,{id:a.id},a.id)})]}),t.jsx("div",{className:"w-[280px] shadow-lg  flex flex-wrap gap-3 p-4 rounded-lg bg-white",children:s==null?void 0:s.tags.tags.map(a=>t.jsx(S,{className:"cursor-pointer",color:N[a.name],onClick:()=>{x(`/tag/${a.id}`)},children:a.name},a.id))})]})};export{G as Component,P as TAGS_CATEGORY};
