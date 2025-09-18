import { e as createComponent, m as maybeRenderHead, r as renderTemplate } from './astro/server_R0GcbQk2.mjs';
import 'kleur/colors';
import 'clsx';

const limpiezaDental = new Proxy({"src":"/_astro/dientelimpio.ClvDjrlv.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/assets/dientelimpio.png";
							}
							
							return target[name];
						}
					});

const $$Notification = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="notification" class="fixed p-4 top-4 right-4 rounded-2xl z-[60] hidden"> <p id="notification-title">Error</p> <p id="notification-description">Hubo un error obteniendo los contactos</p> </div>`;
}, "C:/Users/andry/OneDrive/Desktop/render-pagina/contacto-fullstack-lunes/apps/frontend/src/features/notifications/Notification.astro", void 0);

export { $$Notification as $, limpiezaDental as l };
