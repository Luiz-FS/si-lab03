app.controller("agendaDetarefasCtrl", function ($scope, $http) {

	$scope.app = "Agenda de Tarefas";

	$scope.listaDeTarefasSelecionada = {nome:"Agenda de Tarefas", tarefas:[]};

	$scope.prioridades = [];

	$scope.tableFilter = [
		{filtro: "Todas"},
		{filtro: "Concluidas"},
		{filtro: "Não concluidas"}
		];

	$scope.listasDeTarefas = [];

	$scope.tarefaAtual = {};

	$scope.MAXIMO_PERCENTUAL = 100;
	
	$scope.modoEdicao = false;

	$scope.adicionaTarefa = function (tarefa) {

		tarefa.concluida = false;

		$scope.salvarTarefa(tarefa);

		delete $scope.tarefa;
	}

	$scope.remove = function (tarefa) {

		var index = getIndexTarefa(tarefa);

		$scope.listaDeTarefasSelecionada.tarefas.splice(index, 1);
		
		$scope.deletarTarefa(tarefa);
	}

	$scope.limparTarefas = function () {

		$scope.listaDeTarefasSelecionada.tarefas = [];
		
		$scope.deletarTodasTarefas($scope.listaDeTarefasSelecionada);
	}
	
	$scope.editarTarefa = function() {
		$scope.modoEdicao = true;
	}
	
	$scope.cancelarEdicao = function() {
		$scope.modoEdicao = false;
	}
	
	$scope.salvarEdicao = function(tarefa) {
		
		$scope.modoEdicao = false;
		$scope.alterarTarefa(tarefa);
		fecharJanela();
	}

	$scope.calculaPorcentagem = function (tarefas) {

		var sum = 0;

		tarefas.forEach(function (tarefa) {

			if(tarefa.concluida) {
				sum += 1;
			}
		});

		var porcent = 0;

		if (tarefas.length > 0) {
			porcent = (sum/tarefas.length) * 100;
		}

		return Math.floor(porcent);
	}

	$scope.filtroTarefas = function (select) {

		if (select == null || select.filtro == "Todos") return '';

		if (select.filtro == "Concluidas") return true;
		else if (select.filtro == "Não concluidas") return false;
	}

	$scope.marcarOudesmarcarConcluida = function (tarefa) {

		if (tarefa.concluida) {
			tarefa.concluida = false;
		} else {
			tarefa.concluida = true;
		}
		
		$scope.alterarTarefa(tarefa);
	}

	var getIndexTarefa = function (tarefa) {

		return $scope.listaDeTarefasSelecionada.tarefas.indexOf(tarefa);
	}


	var visualizador = document.getElementById('tarefa-visualizacao');

	var fechar = document.getElementsByClassName("fechar")[0];

	fechar.onclick = function() {
		fecharJanela();
	};

	window.onclick = function (event) {

		if (event.target == visualizador) {

			fecharJanela();
		}
	}
	
	function fecharJanela () {
		visualizador.style.display = "none";
	}

	$scope.abrirTarefa = function (tarefa) {

		$scope.tarefaAtual = tarefa;
		visualizador.style.display = "block";
	}

	$http({method:'GET', url:'http://localhost:8080/listas'})
	.then(function(response){

		$scope.listasDeTarefas = response.data;

	}, function(response){
		console.log(response.data);
		console.log(response.status);
	});

	$http({method:'GET', url:'http://localhost:8080/listas/prioridades'})
	.then(function(response){

		$scope.prioridades = response.data; 

	}, function(response){
		console.log(response.data);
		console.log(response.status);
	});

	$scope.salvarTarefa = function(tarefa) {
		$http({method:'POST', url:'http://localhost:8080/listas/' + $scope.listaDeTarefasSelecionada.id, data:tarefa})
		.then(function(response){

			$scope.listaDeTarefasSelecionada.tarefas.push(response.data);

		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	}
	
	$scope.deletarTarefa = function(tarefa) {
		$http({method:'DELETE', url:'http://localhost:8080/listas/' + $scope.listaDeTarefasSelecionada.id + "/" + tarefa.id})
		.then(function(response){

			console.log(response.status);

		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	}
	
	$scope.alterarTarefa = function(tarefa) {
		$http({method:'PUT', url:'http://localhost:8080/listas/tarefa', data:tarefa})
		.then(function(response){
			
			console.log(response.status);

		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	}
	
	$scope.deletarTodasTarefas = function(listaDeTarefas) {
		$http({method:'DELETE', url:'http://localhost:8080/listas/tarefas/' + listaDeTarefas.id})
		.then(function(response){

			console.log(response.status);

		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	}
	
	$scope.adicionarNovaLista = function(listaDeTarefas) {
		$http({method:'POST', url:'http://localhost:8080/listas', data: listaDeTarefas})
		.then(function(response){

			$scope.listaDeTarefasSelecionada = response.data;
			$scope.listasDeTarefas.push(response.data);
			delete $scope.listaDeTarefas;
			
			console.log(response.status);
			console.log(response.data);

		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	}
	
	$scope.deletarListaTarefas = function(listaDeTarefas) {
		$http({method:'DELETE', url:'http://localhost:8080/listas/' + listaDeTarefas.id})
		.then(function(response){

			var index = $scope.listasDeTarefas.indexOf(listaDeTarefas);
			
			$scope.listasDeTarefas.splice(index, 1);
			$scope.listaDeTarefasSelecionada = {nome:"Agenda de Tarefas", tarefas:[]};
			
			console.log(response.status);

		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	}
	
	$scope.deletarTodasAsListas = function() {
		$http({method:'DELETE', url:'http://localhost:8080/listas'})
		.then(function(response){
			
			$scope.listasDeTarefas = [];
			$scope.listaDeTarefasSelecionada = {nome:"Agenda de Tarefas", tarefas:[]};
			
			console.log(response.status);

		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	}
	
	$scope.alterarNomeDaLista = function(novoNome) {
		$http({method:'PUT', url:'http://localhost:8080/listas/' + $scope.listaDeTarefasSelecionada.id + '/' + novoNome })
		.then(function(response){
			
			$scope.listaDeTarefasSelecionada.nome = response.data.nome;
			
			console.log(response.status);
			
			delete $scope.novoNome;

		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	}
});