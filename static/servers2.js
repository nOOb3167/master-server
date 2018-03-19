(function() {
    function attrappend(node, attr, val) {
	node.setAttribute(attr, node.getAttribute(attr) + " " + val);
    }
    function servers2(it, node) {
	var total = document.createElement("div");
	total.setAttribute("class", "total");
	total.innerHTML =
	    "Players: " + it.total.clients + "/" + it.total_max.clients +
	    "Servers: " + it.total.servers + "/" + it.total_max.servers;
	var table = document.createElement("table");
	var thead = document.createElement("thead");
	thead.innerHTML =
	    "<tr>" +
	    "<th>Address[:Port]</th>" +
	    "<th>Players / Max<br/>Average / Top</th>" +
	    "<th>Version, Subgame[, Mapgen]</th>" +
	    "<th>Name</th>" +
	    "<th>Description</th>" +
	    "<th>Flags</th>" +
	    "<th>Uptime, Age</th>" +
	    "<th>Ping, Lag</th>" +
	    "</tr>";
	var tbody = document.createElement("tbody");
	for (var i = 0; i < it.list.length; i++) {
	    var server = it.list[i];
	    if (master.limit && index > master.limit) break;
	    if (master.min_clients && server.clients < master.min_clients) continue;
	    var tr = document.createElement("tr");

	    var td = document.createElement("td");
	    td.setAttribute("class", "address");
	    td.innerHTML = addressString(server);
	    tr.appendChild(td);

	    var td = document.createElement("td");
	    td.setAttribute("class", "clients");
	    if (server.clients_list && server.clients_list.length > 0)
		attrappend(td, "class", "mts_hover_list_text");
	    td.innerHTML =
		constantWidth(server.clients + "/" + server.clients_max, 3.4) +
		constantWidth(Math.floor(server.pop_v) + "/" + server.clients_top, 3.4) +
		hoverList("Clients", server.clients_list);
	    tr.appendChild(td);

	    var td = document.createElement("td");
	    td.setAttribute("class", "version");
	    if (server.mods && server.mods.length > 0)
		attrappend(td, "class", "mts_hover_list_text");
	    td.innerHTML =
		escapeHTML(server.version) + ", " +
		escapeHTML(server.gameid) + ", " +
		escapeHTML(server.mapgen) +
		hoverList("Mods", server.mods);
	    tr.appendChild(td);

	    var td = document.createElement("td");
	    td.setAttribute("class", "name");
	    td.innerHTML = "invalid";
	    tr.appendChild(td);

	    var td = document.createElement("td");
	    td.setAttribute("class", "description");
	    td.innerHTML = tooltipString(server.description, 50);
	    tr.appendChild(td);

	    var td = document.createElement("td");
	    td.setAttribute("class", "flags");
	    td.innerHTML = "invalid";
	    tr.appendChild(td);

	    var td = document.createElement("td");
	    td.setAttribute("class", "uptime");
	    td.innerHTML = constantWidth(humanTime(server.uptime), 3.2) + "/" + constantWidth(humanTime(server.game_time), 3.2)
	    tr.appendChild(td);

	    var td = document.createElement("td");
	    td.setAttribute("class", "ping");
	    td.innerHTML = constantWidth(Math.floor(server.ping * 1000), 1.8) + "/" + "invalid";
	    tr.appendChild(td);

	    // 'More...' button not generated yet
	    
	    tbody.appendChild(tr);
	    table.appendChild(thead);
	    table.appendChild(tbody);
	    node.appendChild(total);
	    node.appendChild(table);
	}
    }
    window.render = window.render || {};
    window.render['servers2'] = servers2;
}());
