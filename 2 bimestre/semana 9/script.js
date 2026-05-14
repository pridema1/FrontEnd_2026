document.addEventListener("DOMContentLoaded", function () {
	var cpfInput = document.getElementById("cpfInput");
	var cpfButton = document.getElementById("cpfButton");
	var cpfResult = document.getElementById("cpfResult");

	var celsiusInput = document.getElementById("celsiusInput");
	var fahrenheitInput = document.getElementById("fahrenheitInput");
	var converterResult = document.getElementById("converterResult");

	var studentName = document.getElementById("studentName");
	var grade1 = document.getElementById("grade1");
	var grade2 = document.getElementById("grade2");
	var grade3 = document.getElementById("grade3");
	var averageButton = document.getElementById("averageButton");
	var averageResult = document.getElementById("averageResult");

	var flagSelect = document.getElementById("flagSelect");
	var saleValue = document.getElementById("saleValue");
	var installments = document.getElementById("installments");
	var bankButton = document.getElementById("bankButton");
	var bankResult = document.getElementById("bankResult");

	var guestInput = document.getElementById("guestInput");
	var guestAddButton = document.getElementById("guestAddButton");
	var guestList = document.getElementById("guestList");

	var packageSelect = document.getElementById("packageSelect");
	var peopleCount = document.getElementById("peopleCount");
	var budgetButton = document.getElementById("budgetButton");
	var budgetResult = document.getElementById("budgetResult");

	var cardInput = document.getElementById("cardInput");
	var cardButton = document.getElementById("cardButton");
	var cardStatus = document.getElementById("cardStatus");
	var cardFlag = document.getElementById("cardFlag");
	var cardSector = document.getElementById("cardSector");
	var cardIssuer = document.getElementById("cardIssuer");

	function soNumeros(valor) {
		return valor.replace(/\D/g, "");
	}

	function mostrarResultado(elemento, texto, classe) {
		elemento.className = classe ? "result " + classe : "result";
		elemento.innerHTML = texto;
	}

	function formatarDinheiro(valor) {
		return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
	}

	function validarCPF() {
		var cpf = soNumeros(cpfInput.value);

		if (cpf.length !== 11) {
			mostrarResultado(cpfResult, "CPF inválido: informe 11 dígitos.", "danger");
			return;
		}

		if (/^(\d)\1{10}$/.test(cpf)) {
			mostrarResultado(cpfResult, "CPF inválido: sequência repetida.", "danger");
			return;
		}

		var soma = 0;
		for (var i = 0; i < 9; i++) {
			soma += Number(cpf[i]) * (10 - i);
		}
		var digito1 = (soma * 10) % 11;
		if (digito1 === 10) {
			digito1 = 0;
		}

		soma = 0;
		for (var j = 0; j < 10; j++) {
			var valor = j < 9 ? Number(cpf[j]) : digito1;
			soma += valor * (11 - j);
		}
		var digito2 = (soma * 10) % 11;
		if (digito2 === 10) {
			digito2 = 0;
		}

		if (digito1 === Number(cpf[9]) && digito2 === Number(cpf[10])) {
			mostrarResultado(cpfResult, "CPF válido: <strong>" + cpfInput.value + "</strong>", "success");
		} else {
			mostrarResultado(cpfResult, "CPF inválido: os dígitos não conferem.", "danger");
		}
	}

	cpfButton.addEventListener("click", validarCPF);

	var bloqueandoTemperatura = false;

	celsiusInput.addEventListener("input", function () {
		if (bloqueandoTemperatura) {
			return;
		}

		if (celsiusInput.value === "") {
			fahrenheitInput.value = "";
			converterResult.textContent = "Digite um valor em qualquer campo para converter.";
			return;
		}

		var celsius = Number(celsiusInput.value);
		var fahrenheit = (celsius * 9 / 5) + 32;

		bloqueandoTemperatura = true;
		fahrenheitInput.value = fahrenheit.toFixed(2);
		bloqueandoTemperatura = false;

		converterResult.innerHTML = celsius.toFixed(2) + " °C equivalem a <strong>" + fahrenheit.toFixed(2) + " °F</strong>.";
	});

	fahrenheitInput.addEventListener("input", function () {
		if (bloqueandoTemperatura) {
			return;
		}

		if (fahrenheitInput.value === "") {
			celsiusInput.value = "";
			converterResult.textContent = "Digite um valor em qualquer campo para converter.";
			return;
		}

		var fahrenheit = Number(fahrenheitInput.value);
		var celsius = (fahrenheit - 32) * 5 / 9;

		bloqueandoTemperatura = true;
		celsiusInput.value = celsius.toFixed(2);
		bloqueandoTemperatura = false;

		converterResult.innerHTML = fahrenheit.toFixed(2) + " °F equivalem a <strong>" + celsius.toFixed(2) + " °C</strong>.";
	});

	averageButton.addEventListener("click", function () {
		if (grade1.value === "" || grade2.value === "" || grade3.value === "") {
			mostrarResultado(averageResult, "Preencha as três notas.", "danger");
			return;
		}

		var nota1 = Number(grade1.value);
		var nota2 = Number(grade2.value);
		var nota3 = Number(grade3.value);
		var media = (nota1 + nota2 + nota3) / 3;
		var nome = studentName.value.trim();

		if (nome === "") {
			nome = "Aluno";
		}

		if (media >= 7) {
			mostrarResultado(averageResult, nome + ": média <strong>" + media.toFixed(2) + "</strong>. Situação: <strong>APROVADO</strong>.", "info");
		} else if (media >= 4) {
			mostrarResultado(averageResult, nome + ": média <strong>" + media.toFixed(2) + "</strong>. Situação: <strong>EXAME</strong>. Faltam <strong>" + (10 - media).toFixed(2) + "</strong> pontos para 10.", "success");
		} else {
			mostrarResultado(averageResult, nome + ": média <strong>" + media.toFixed(2) + "</strong>. Situação: <strong>REPROVADO</strong>.", "danger");
		}
	});

	bankButton.addEventListener("click", function () {
		if (saleValue.value === "" || installments.value === "") {
			mostrarResultado(bankResult, "Informe o valor da venda e as parcelas.", "danger");
			return;
		}

		var venda = Number(saleValue.value);
		var parcelas = Number(installments.value);
		var taxaBandeira = 0;
		var nomeBandeira = "Visa";

		switch (flagSelect.value) {
			case "master":
				taxaBandeira = 0.0185;
				nomeBandeira = "Master";
				break;
			case "elo":
				taxaBandeira = 0.03;
				nomeBandeira = "Elo";
				break;
			default:
				taxaBandeira = 0.02;
				nomeBandeira = "Visa";
		}

		var taxa = venda * taxaBandeira;
		var juros = venda * 0.0035 * parcelas;
		var mensal = 12.5 * parcelas;
		var total = venda + taxa + juros + mensal;
		var parcela = total / parcelas;

		mostrarResultado(bankResult, "<strong>" + nomeBandeira + "</strong><br>Valor da taxa: " + formatarDinheiro(taxa) + "<br>Valor dos juros: " + formatarDinheiro(juros) + "<br>Tarifa mensal: " + formatarDinheiro(mensal) + "<br>Valor de cada parcela: " + formatarDinheiro(parcela), "warning");
	});

	function criarConvidado(nome) {
		var item = document.createElement("li");
		item.className = "guest-item";

		var linha = document.createElement("div");
		linha.className = "guest-row";

		var texto = document.createElement("span");
		texto.className = "guest-name";
		texto.textContent = nome;

		var botoes = document.createElement("div");
		botoes.className = "guest-buttons";

		var btnConcluir = document.createElement("button");
		btnConcluir.type = "button";
		btnConcluir.textContent = "Concluir";
		btnConcluir.className = "ghost";
		btnConcluir.addEventListener("click", function () {
			item.classList.toggle("classe-riscado");
		});

		var btnEditar = document.createElement("button");
		btnEditar.type = "button";
		btnEditar.textContent = "Editar";
		btnEditar.className = "secondary";
		btnEditar.addEventListener("click", function () {
			var novoNome = prompt("Digite o novo nome:", texto.textContent);
			if (novoNome !== null && novoNome.trim() !== "") {
				texto.textContent = novoNome.trim();
			}
		});

		var btnExcluir = document.createElement("button");
		btnExcluir.type = "button";
		btnExcluir.textContent = "Excluir";
		btnExcluir.addEventListener("click", function () {
			item.remove();
		});

		botoes.appendChild(btnConcluir);
		botoes.appendChild(btnEditar);
		botoes.appendChild(btnExcluir);
		linha.appendChild(texto);
		linha.appendChild(botoes);
		item.appendChild(linha);

		return item;
	}

	guestAddButton.addEventListener("click", function () {
		var nome = guestInput.value.trim();
		if (nome === "") {
			return;
		}

		guestList.appendChild(criarConvidado(nome));
		guestInput.value = "";
		guestInput.focus();
	});

	guestInput.addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			guestAddButton.click();
		}
	});

	budgetButton.addEventListener("click", function () {
		if (peopleCount.value === "") {
			mostrarResultado(budgetResult, "Informe a quantidade de pessoas.", "danger");
			return;
		}

		var quantidade = Number(peopleCount.value);
		var valorPorPessoa = 50;

		if (packageSelect.value === "premium") {
			valorPorPessoa = 80;
		} else if (packageSelect.value === "deluxe") {
			valorPorPessoa = 120;
		}

		var bruto = valorPorPessoa * quantidade;
		var servico = bruto * 0.1;
		var subtotal = bruto + servico;
		var desconto = 0;

		if (quantidade > 100) {
			desconto = subtotal * 0.05;
		}

		var total = subtotal - desconto;

		mostrarResultado(budgetResult, "Custo bruto: <strong>" + formatarDinheiro(bruto) + "</strong><br>Taxa de serviço: <strong>" + formatarDinheiro(servico) + "</strong><br>Desconto aplicado: <strong>" + formatarDinheiro(desconto) + "</strong><br>Total final: <strong>" + formatarDinheiro(total) + "</strong>", desconto > 0 ? "success" : "info");
	});

	function identificarBandeira(numero) {
		if (/^4/.test(numero)) {
			return "Visa";
		}
		if (/^(5[1-5]|2[2-7])/.test(numero)) {
			return "Mastercard";
		}
		if (/^(4011|4312|4389|4514|4576|5041|5067|5090|6277|6362|6363|6500)/.test(numero)) {
			return "Elo";
		}
		if (/^3[47]/.test(numero)) {
			return "American Express";
		}
		if (/^6(?:011|5|4[4-9]|22)/.test(numero)) {
			return "Discover";
		}
		if (/^(606282|3841)/.test(numero)) {
			return "Hipercard";
		}
		return "Desconhecida";
	}

	function identificarSetor(numero) {
		var primeiro = Number(numero[0]);

		if (primeiro === 1 || primeiro === 2) {
			return "Companhias aéreas";
		}
		if (primeiro === 3) {
			return "Viagens e entretenimento";
		}
		if (primeiro === 4 || primeiro === 5) {
			return "Bancos e serviços financeiros";
		}
		if (primeiro === 6) {
			return "Comércio e serviços";
		}
		if (primeiro === 7) {
			return "Petróleo e energia";
		}
		if (primeiro === 8) {
			return "Saúde e telecom";
		}
		if (primeiro === 9) {
			return "Governo e reserva";
		}
		return "Categoria não identificada";
	}

	function identificarBanco(bandeira) {
		if (bandeira === "Visa") {
			return "Banco emissor compatível com a rede Visa";
		}
		if (bandeira === "Mastercard") {
			return "Banco emissor compatível com a rede Mastercard";
		}
		if (bandeira === "Elo") {
			return "Banco emissor compatível com a rede Elo";
		}
		if (bandeira === "American Express") {
			return "American Express Brasil";
		}
		if (bandeira === "Discover") {
			return "Discover Network";
		}
		if (bandeira === "Hipercard") {
			return "Banco emissor Hipercard";
		}
		return "Emissor não identificado";
	}

	function validarCartaoLuhn(numero) {
		var soma = 0;
		var dobrar = false;

		for (var i = numero.length - 1; i >= 0; i--) {
			var digito = Number(numero[i]);

			if (dobrar) {
				digito = digito * 2;
				if (digito > 9) {
					digito = digito - 9;
				}
			}

			soma += digito;
			dobrar = !dobrar;
		}

		return soma % 10 === 0;
	}

	cardButton.addEventListener("click", function () {
		var numero = soNumeros(cardInput.value);

		if (numero.length < 13 || numero.length > 16) {
			cardStatus.textContent = "Inválido";
			cardFlag.textContent = "-";
			cardSector.textContent = "-";
			cardIssuer.textContent = "Número deve ter entre 13 e 16 dígitos.";
			cardStatus.style.color = "var(--danger)";
			cardIssuer.style.color = "var(--danger)";
			return;
		}

		var bandeira = identificarBandeira(numero);
		var setor = identificarSetor(numero);
		var banco = identificarBanco(bandeira);
		var valido = validarCartaoLuhn(numero);

		cardStatus.textContent = valido ? "Válido" : "Inválido";
		cardStatus.style.color = valido ? "var(--success)" : "var(--danger)";
		cardFlag.textContent = bandeira;
		cardSector.textContent = setor;
		cardIssuer.textContent = banco;
		cardIssuer.style.color = "var(--text)";
	});
});
