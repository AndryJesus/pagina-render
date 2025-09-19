import 'kleur/colors';
import { q as decodeKey } from './chunks/astro/server_R0GcbQk2.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_IuJ8mPb6.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/","cacheDir":"file:///C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/node_modules/.astro/","outDir":"file:///C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/dist/","srcDir":"file:///C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/","publicDir":"file:///C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/public/","buildClientDir":"file:///C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/dist/client/","buildServerDir":"file:///C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"citas/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/citas","isIndex":false,"type":"page","pattern":"^\\/citas\\/?$","segments":[[{"content":"citas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/citas.astro","pathname":"/citas","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contacts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contacts","isIndex":false,"type":"page","pattern":"^\\/contacts\\/?$","segments":[[{"content":"contacts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacts.astro","pathname":"/contacts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"forgotPassword/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/forgotpassword","isIndex":false,"type":"page","pattern":"^\\/forgotPassword\\/?$","segments":[[{"content":"forgotPassword","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/forgotPassword.astro","pathname":"/forgotPassword","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"galeria/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/galeria","isIndex":false,"type":"page","pattern":"^\\/galeria\\/?$","segments":[[{"content":"galeria","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/galeria.astro","pathname":"/galeria","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"inventario/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/inventario","isIndex":false,"type":"page","pattern":"^\\/inventario\\/?$","segments":[[{"content":"inventario","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/inventario.astro","pathname":"/inventario","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"servicios/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/servicios","isIndex":false,"type":"page","pattern":"^\\/servicios\\/?$","segments":[[{"content":"servicios","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicios.astro","pathname":"/servicios","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"signup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../../node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/galeria.BkfFH1y6.css"}],"routeData":{"route":"/verify/[token]","isIndex":false,"type":"page","pattern":"^\\/verify\\/([^/]+?)\\/?$","segments":[[{"content":"verify","dynamic":false,"spread":false}],[{"content":"token","dynamic":true,"spread":false}]],"params":["token"],"component":"src/pages/verify/[token].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/citas.astro",{"propagation":"none","containsHead":true}],["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/contacts.astro",{"propagation":"none","containsHead":true}],["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/forgotPassword.astro",{"propagation":"none","containsHead":true}],["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/inventario.astro",{"propagation":"none","containsHead":true}],["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/galeria.astro",{"propagation":"none","containsHead":true}],["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/servicios.astro",{"propagation":"none","containsHead":true}],["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/signup.astro",{"propagation":"none","containsHead":true}],["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/verify/[token].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/citas@_@astro":"pages/citas.astro.mjs","\u0000@astro-page:src/pages/contacts@_@astro":"pages/contacts.astro.mjs","\u0000@astro-page:src/pages/forgotPassword@_@astro":"pages/forgotpassword.astro.mjs","\u0000@astro-page:src/pages/galeria@_@astro":"pages/galeria.astro.mjs","\u0000@astro-page:src/pages/inventario@_@astro":"pages/inventario.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/servicios@_@astro":"pages/servicios.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/verify/[token]@_@astro":"pages/verify/_token_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:../../node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CYPXR_AM.mjs","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B9Yxlg7j.mjs","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/citas.astro?astro&type=script&index=1&lang.ts":"_astro/citas.astro_astro_type_script_index_1_lang.DKN3hshO.js","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/forgotPassword.astro?astro&type=script&index=0&lang.ts":"_astro/forgotPassword.astro_astro_type_script_index_0_lang.BkxOk1LR.js","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.B0NHtdjF.js","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/signup.astro?astro&type=script&index=0&lang.ts":"_astro/signup.astro_astro_type_script_index_0_lang.DgeQDv15.js","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.JvacjeZW.js","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/verify/[token].astro?astro&type=script&index=0&lang.ts":"_astro/_token_.astro_astro_type_script_index_0_lang.j3I23CXw.js","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/citas.astro?astro&type=script&index=0&lang.ts":"_astro/citas.astro_astro_type_script_index_0_lang.CN_LL4YD.js","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/features/auth/AuthProtected.astro?astro&type=script&index=0&lang.ts":"_astro/AuthProtected.astro_astro_type_script_index_0_lang.3V1h3DgD.js","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/features/contacts/ContactsList.astro?astro&type=script&index=0&lang.ts":"_astro/ContactsList.astro_astro_type_script_index_0_lang.Bbyp1FLz.js","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/features/contacts/CreateContactForm.astro?astro&type=script&index=0&lang.ts":"_astro/CreateContactForm.astro_astro_type_script_index_0_lang.BTfoac6k.js","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/features/navigation/NavigationLogin.astro?astro&type=script&index=0&lang.ts":"_astro/NavigationLogin.astro_astro_type_script_index_0_lang.DVvvHKSQ.js","C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/features/navigation/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.DVvvHKSQ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const t=document.querySelectorAll(\".slide\"),o=document.querySelector(\".next\"),i=document.querySelector(\".prev\");let e=0;function c(l){t.forEach((n,r)=>{n.classList.remove(\"opacity-100\"),n.classList.add(\"opacity-0\"),r===l&&(n.classList.remove(\"opacity-0\"),n.classList.add(\"opacity-100\"))})}function s(){e=(e+1)%t.length,c(e)}function d(){e=(e-1+t.length)%t.length,c(e)}c(e),o&&i&&(o.addEventListener(\"click\",s),i.addEventListener(\"click\",d)),setInterval(s,7e3)});"]],"assets":["/_astro/blanquiamiento.aYQOuyAO.jpg","/_astro/equipo-colegas-dentistas.fpdx-b4g.avif","/_astro/equipo-odontologico.CdxytICO.webp","/_astro/istockphoto-1439446550-612x612.CV6E03_6.jpg","/_astro/recepcion.onacbqLT.jpg","/_astro/orto-resultado.DKfaH-oc.jpg","/_astro/sala de espera.Nl4ZzGiw.jpg","/_astro/niño.6or5AU0c.jpg","/_astro/ortodoncia.DbMfyC9k.jpg","/_astro/general.Bqt6lePe.jpg","/_astro/endodoncia.DTVDnnSq.webp","/_astro/dientelimpio.ClvDjrlv.png","/_astro/implanten.BzODkD5S.jpg","/_astro/cirugía.DZcTfAef.jpg","/_astro/periodoncia.D2LTmrIk.webp","/_astro/estectica.D8_lKwbz.jpg","/_astro/clinica-odontologia.DxI0oOtQ.mp4","/_astro/facebook.CANLklR9.png","/_astro/tik-tok.DYhNgQYZ.png","/_astro/instagram.DQOGCOQU.png","/_astro/whatsapp-icon.BCxDlPO_.png","/_astro/fondoLogin.BKMIxHCD.jpg","/_astro/admin.CxF-TMRN.jpg","/_astro/citas.C0uM-mtP.css","/_astro/galeria.BkfFH1y6.css","/favicon.svg","/_astro/auth.module.BtoUEjjw.js","/_astro/AuthProtected.astro_astro_type_script_index_0_lang.3V1h3DgD.js","/_astro/citas.astro_astro_type_script_index_0_lang.CN_LL4YD.js","/_astro/citas.astro_astro_type_script_index_1_lang.DKN3hshO.js","/_astro/contacts.module.BQC9jV0-.js","/_astro/ContactsList.astro_astro_type_script_index_0_lang.Bbyp1FLz.js","/_astro/CreateContactForm.astro_astro_type_script_index_0_lang.BTfoac6k.js","/_astro/endpoints.QH1VciTq.js","/_astro/forgotPassword.astro_astro_type_script_index_0_lang.BkxOk1LR.js","/_astro/index.B9b1t7QR.js","/_astro/index.CViUNx8d.js","/_astro/login.astro_astro_type_script_index_0_lang.B0NHtdjF.js","/_astro/Navigation.astro_astro_type_script_index_0_lang.DVvvHKSQ.js","/_astro/navigation.utils.Nb8TzGl0.js","/_astro/NavigationLogin.astro_astro_type_script_index_0_lang.DVvvHKSQ.js","/_astro/notificiation.DyHDLNjw.js","/_astro/signup.astro_astro_type_script_index_0_lang.DgeQDv15.js","/_astro/_token_.astro_astro_type_script_index_0_lang.j3I23CXw.js","/admin/index.html","/citas/index.html","/contacts/index.html","/forgotPassword/index.html","/galeria/index.html","/inventario/index.html","/login/index.html","/servicios/index.html","/signup/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"agcUMApjFEVG+LAeHcd+wPFr/FXsNM/E8Pxj1x6hFRM=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\andry\\OneDrive\\Desktop\\render-pagina\\contacto-fullstack-lunes\\apps\\frontend\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
