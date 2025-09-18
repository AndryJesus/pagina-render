import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BI3VR6e8.mjs';
import { manifest } from './manifest_BxpYx2qG.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/citas.astro.mjs');
const _page3 = () => import('./pages/contacts.astro.mjs');
const _page4 = () => import('./pages/forgotpassword.astro.mjs');
const _page5 = () => import('./pages/galeria.astro.mjs');
const _page6 = () => import('./pages/inventario.astro.mjs');
const _page7 = () => import('./pages/login.astro.mjs');
const _page8 = () => import('./pages/servicios.astro.mjs');
const _page9 = () => import('./pages/signup.astro.mjs');
const _page10 = () => import('./pages/verify/_token_.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["../../node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin.astro", _page1],
    ["src/pages/citas.astro", _page2],
    ["src/pages/contacts.astro", _page3],
    ["src/pages/forgotPassword.astro", _page4],
    ["src/pages/galeria.astro", _page5],
    ["src/pages/inventario.astro", _page6],
    ["src/pages/login.astro", _page7],
    ["src/pages/servicios.astro", _page8],
    ["src/pages/signup.astro", _page9],
    ["src/pages/verify/[token].astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "middleware",
    "client": "file:///C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/dist/client/",
    "server": "file:///C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
