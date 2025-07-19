// static/js/scada.js

console.log("✅ scada.js cargado correctamente");

let autoRefresh = true;
let timer = null;

document.addEventListener('DOMContentLoaded', () => {
    conectarYLeer();
    timer = setInterval(() => { if(autoRefresh) conectarYLeer(); }, 5000);

    document.getElementById("auto-refresh-toggle").addEventListener("change", (ev) => {
        autoRefresh = ev.target.checked;
    });
});

async function conectarYLeer() {
    //const btn = document.getElementById("manual-read");
    //btn.setAttribute("aria-busy", "true");
    setEstadoConexion("wait");
    try {
        const respuesta = await fetch('/api/lectura/');
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const { variables } = await respuesta.json();
        pintaTabla(variables);
        setEstadoConexion("ok");
        document.getElementById("last-update").textContent =
            "Última actualización: " + new Date().toLocaleTimeString();
    } catch (e) {
        pintaError(e.message);
        setEstadoConexion("fail");
    } finally {
        btn.setAttribute("aria-busy", "false");
    }
}

function pintaTabla(datos) {
    const tbody = document.querySelector("#datos tbody");
    tbody.innerHTML = "";
    Object.entries(datos).forEach(([clave, info]) => {
        let fila = document.createElement("tr");
        fila.className = "variable-" + info.meta.category;

        let tdVar = document.createElement("td");
        tdVar.textContent = clave;

        let tdDesc = document.createElement("td");
        tdDesc.textContent = info.meta.description;

        let tdValor = document.createElement("td");
        let valor = info.value;
        if (info.meta.type === "bool") {
            tdValor.textContent = valor ? "Activo" : "Inactivo";
            tdValor.className = valor ? "estado-activo" : "estado-inactivo";
        } else if (valor != null) {
            tdValor.textContent = parseFloat(valor).toFixed(2);
        } else {
            tdValor.textContent = "N/A";
        }

        let tdUnidad = document.createElement("td");
        tdUnidad.textContent = info.meta.unit;

        fila.append(tdVar, tdDesc, tdValor, tdUnidad);
        tbody.appendChild(fila);
    });
}

function pintaError(msg) {
    const tbody = document.querySelector("#datos tbody");
    tbody.innerHTML = `<tr><td colspan="4">Error: ${msg}</td></tr>`;
}

function setEstadoConexion(status) {
    let el = document.getElementById("estado-conexion");
    if (status === "ok") {
        el.textContent = "🟢 Conectado";
        el.className = "conectado";
    } else if (status === "fail") {
        el.textContent = "🔴 Sin conexión";
        el.className = "desconectado";
    } else {
        el.textContent = "⏳ Leyendo...";
        el.className = "";
    }
}
