const x="https://proyecto-bot-gbbo.onrender.com";let c=null,b=document.getElementById("connectionStatus"),m=b.querySelector(".status-dot"),g=b.querySelector(".status-text"),o=[];function E(){try{const e=localStorage.getItem("appointments");e&&(o=JSON.parse(e),console.log(`📋 Cargadas ${o.length} citas desde almacenamiento local`),r(o))}catch(e){console.error("Error al cargar citas desde almacenamiento:",e)}}function u(){try{localStorage.setItem("appointments",JSON.stringify(o))}catch(e){console.error("Error al guardar citas en almacenamiento:",e)}}function A(e){if(!e)return"N/A";try{const[t,n]=e.split(" "),[i,a,s]=t.split("/");return`${i}/${a}/${s} ${n}`}catch{return e}}function l(e,t){e?(m.classList.add("connected"),g.textContent=t||"Conectado en tiempo real"):(m.classList.remove("connected"),g.textContent=t||"Desconectado")}function r(e){const t=document.getElementById("citasBody");if(t.innerHTML="",e.length===0){t.innerHTML='<tr><td colspan="8" style="text-align: center;">No hay citas registradas</td></tr>';return}e.forEach(n=>{const i=document.createElement("tr"),a=n.status==="confirmed",s=n.status==="cancelled";i.innerHTML=`
                    <td>${n.id||"N/A"}</td>
                    <td>${n.patient_name||n.nombre||"N/A"}</td>
                    <td>${n.patient_phone||n.telefono||"N/A"}</td>
                    <td>${A(n.appointment_date||n.fecha)}</td>
                    <td>${n.service_type||n.servicio||"N/A"}</td>
                    <td>${n.service_price||n.precio||"N/A"}</td>
                    <td>
                        <span class="status-badge ${n.status||"pending"}">
                            ${a?"Confirmado":s?"Cancelado":"Pendiente"}
                        </span>
                    </td>
                    <td class="actions-cell">
                        ${!a&&!s?`<button class="btn btn-success btn-sm confirm-btn" data-id="${n.id}">Confirmar</button>`:""}
                        ${!s&&!a?`<button class="btn btn-danger btn-sm cancel-btn" data-id="${n.id}">Cancelar</button>`:""}
                        ${a||s?'<span class="no-actions">No hay acciones disponibles</span>':""}
                    </td>
                `,t.appendChild(i)}),C()}function C(){document.querySelectorAll(".confirm-btn").forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-id");h(t)})}),document.querySelectorAll(".cancel-btn").forEach(e=>{e.addEventListener("click",function(){this.getAttribute("data-id"),y()})})}function I(e){const t=o.findIndex(n=>n.id===e.id);t===-1?o.unshift(e):o[t]={...o[t],...e},r(o),u()}function v(){c&&c.connected&&console.log("Solicitando todas las citas al servidor...")}function f(){try{typeof io<"u"?(c=io(x),c.on("connect",()=>{console.log("Conectado al servidor de WebSockets en puerto 3002"),l(!0,"Conectado en tiempo real"),v()}),c.on("allAppointments",e=>{console.log("Recibidas todas las citas:",e.length),o=e,r(o),u()}),c.on("newAppointment",e=>{console.log("Nueva cita recibida:",e),I(e),d(`Nueva cita de ${e.patient_name}`)}),c.on("appointmentConfirmed",e=>{console.log("Cita confirmada:",e);const t=o.findIndex(n=>n.id===e.id);t!==-1&&(o[t]={...o[t],...e},r(o),u()),d(`Cita de ${e.patient_name} confirmada`)}),c.on("confirmationResult",e=>{if(console.log("Resultado de confirmación:",e),e.success){d(`Cita ${e.appointmentId} confirmada exitosamente`);const t=o.findIndex(n=>n.id==e.appointmentId);t!==-1&&(o[t].status="confirmed",r(o),u())}else{d(`Error al confirmar cita: ${e.message}`);const t=o.findIndex(n=>n.id==e.appointmentId);t!==-1&&(o[t].status="pending",r(o),u())}}),c.on("disconnect",()=>{console.log("Desconectado del servidor de WebSockets"),l(!1,"Desconectado - Intentando reconectar...")}),c.on("connect_error",e=>{console.error("Error de conexión:",e),l(!1,"Error de conexión")})):(console.error("Socket.io no está disponible"),l(!1,"Error: Socket.io no cargado"))}catch(e){console.error("Error al inicializar WebSocket:",e),l(!1,"Error de conexión")}}function h(e){if(c&&c.connected){console.log(`Enviando confirmación para cita ID: ${e}`);const t=o.findIndex(n=>n.id==e);t!==-1&&(o[t].status="confirmed",r(o)),c.emit("confirmAppointment",e)}else d("Error: No hay conexión con el servidor")}function y(e){d("Función de cancelación no implementada aún")}function d(e){let t=document.getElementById("notification");t||(t=document.createElement("div"),t.id="notification",t.style.cssText=`
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    background: #4CAF50;
                    color: white;
                    border-radius: 5px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s;
                `,document.body.appendChild(t)),t.textContent=e,t.style.opacity="1",setTimeout(()=>{t.style.opacity="0"},3e3)}function p(){const e=document.getElementById("searchInput").value.toLowerCase(),t=document.getElementById("statusFilter").value,n=o.filter(i=>{const a=i.patient_name&&i.patient_name.toLowerCase().includes(e)||i.nombre&&i.nombre.toLowerCase().includes(e)||i.patient_phone&&i.patient_phone.includes(e)||i.telefono&&i.telefono.includes(e),s=t==="all"||i.status===t;return a&&s});r(n)}window.confirmAppointment=h;window.cancelAppointment=y;document.addEventListener("DOMContentLoaded",()=>{E(),f(),document.getElementById("btnAgregar").addEventListener("click",()=>{alert("Para agregar citas manualmente, necesitas implementar un formulario con conexión a tu backend")}),document.getElementById("btnRefresh").addEventListener("click",()=>{c&&c.connected?(c.disconnect(),c.connect()):f()}),document.getElementById("searchInput").addEventListener("input",p),document.getElementById("statusFilter").addEventListener("change",p),setInterval(()=>{(!c||!c.connected)&&(console.log("Intentando reconectar..."),f())},1e4)});
