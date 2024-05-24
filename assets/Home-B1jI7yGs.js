import{a3 as w,ab as N,ap as b,a2 as I,r as S,a7 as d,a4 as e,aj as T,ah as k}from"./index-BPVxhfy4.js";import{g as x,b as u,I as C}from"./index-DuPDKWxn.js";import{M as h,T as A,t as $}from"./MySkeleton-DPDOqslu.js";import{L,T as M}from"./TemplateCard-B5PV8jwu.js";import{u as E}from"./index-BFoBfxDw.js";import"./index-DgJ2S1Rq.js";const{Search:P}=C,_=x(`
  query Dates($categoryId: Int, $pagination:Pagination,$search:String) {
    templatesWithPagination(categoryId: $categoryId, pagination: $pagination,search: $search) {
      templates{
        id
      }
      total
    }
  }
`),q=x(`
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
`),D=()=>{var m;w();const{message:y}=N.useApp(),{scrollToTop:f}=b(),j=I(),[t,o]=E({page:1}),l=10,{data:s,loading:c}=u(q),{data:r,loading:g,error:n}=u(_,{variables:{categoryId:t.category?parseInt(t.category):void 0,pagination:{page:(t==null?void 0:t.page)>1?t.page-1:0,pageSize:l},search:t.search}});S.useEffect(()=>{n&&y.error(n.message)},[n]);const p=((m=s==null?void 0:s.categories)==null?void 0:m.categories.map(a=>({key:a.id,label:a.name})))??[];return p.unshift({key:"all",label:d._({id:"8w35T/"})}),e.jsxs("div",{className:"w-[80%] flex gap-6 m-auto mt-4 relative pb-6 items-start",children:[c?e.jsx("div",{className:"flex gap-2 bg-white w-[180px] flex-shrink-0 rounded-lg flex-col p-2",children:Array.from(Array(15)).map((a,i)=>e.jsx(h,{loading:!0,className:" h-[40px]"},i))}):e.jsx(T,{className:"w-[180px] rounded-lg flex-shrink-0",items:p,selectedKeys:[t.category??"all"],onSelect:a=>{a.key==="all"?o({category:void 0}):o({category:Number(a.key)}),f()}}),e.jsxs("div",{className:"flex-1 bg-white p-4 min-w-[400px]",children:[e.jsx(P,{placeholder:d._({id:"+l8PEL"}),allowClear:!0,value:t.search,className:"my-2",onChange:a=>{o({search:a.target.value})},loading:g,enterButton:!0}),e.jsx(L,{loading:{spinning:g,indicator:e.jsx(k,{style:{fontSize:24}})},itemLayout:"vertical",size:"large",pagination:{pageSize:l,total:r==null?void 0:r.templatesWithPagination.total,onChange(a){o({page:a})},current:t.page},dataSource:r==null?void 0:r.templatesWithPagination.templates,renderItem:a=>e.jsx(M,{id:a.id},a.id)})]}),e.jsx("div",{className:"w-[280px] shadow-lg  flex flex-wrap gap-3 p-4 rounded-lg bg-white",children:c?Array.from(Array(80)).map((a,i)=>{const v=Math.floor(Math.random()*80)+50;return e.jsx(h,{loading:!0,className:"h-6",style:{width:v}},i)}):s==null?void 0:s.tags.tags.map(a=>e.jsx(A,{className:"cursor-pointer",color:$[a.name],onClick:()=>{j(`/tag/${a.id}`)},children:a.name},a.id))})]})};export{D as Component,q as TAGS_CATEGORY};
