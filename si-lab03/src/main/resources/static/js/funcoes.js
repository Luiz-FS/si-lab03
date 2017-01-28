/**
 * Created by luiz on 26/11/16.
 */

var app = angular.module("agendaDeTarefas", []);

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

	$scope.adicionaTarefa = function (tarefa) {

		tarefa.concluida = false;
		
		$scope.salvarTarefa(tarefa);

		delete $scope.tarefa;
	}

	$scope.remove = function (tarefa) {

		var index = getIndexTarefa(tarefa);

		$scope.tarefas.splice(index, 1);
	}

	$scope.limparTarefas = function () {

		$scope.listaDeTarfasSelecionada.tarefas = [];
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
	}

	var getIndexTarefa = function (tarefa) {

		for (var i = 0; i < $scope.tarefas.length; i++) {

			if ($scope.tarefas[i] == tarefa) {
				return i;
			}
		}
	}


	var visualizador = document.getElementById('tarefa-visualizacao');

	var fechar = document.getElementsByClassName("fechar")[0];

	fechar.onclick = function () {

		visualizador.style.display = "none";
	}

	window.onclick = function (event) {

		if (event.target == visualizador) {

			visualizador.style.display = "none";
		}
	}

	$scope.abrirTarefa = function (tarefa) {

		$scope.tarefaAtual = tarefa;
		visualizador.style.display = "block";
	}

	$scope.carregarListas = function() {
		$http({method:'GET', url:'http://localhost:8080/listas'})
		.then(function(response){
			
			nomesListas(response.data);
			

		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	}
	
	//Organizar este metodo
	$scope.carregarListas();
	
	function nomesListas(lista) {
		
		arr = [];
		
		for (var i =0; i < lista.length; i++) {
			
			arr.push(lista[i]);
		}
		
		$scope.listasDeTarefas = arr;
	}
	
	//Até aqui está feio
	
	//ajeitar isso
	$scope.carregarPrioridades = function() {
		$http({method:'GET', url:'http://localhost:8080/listas/prioridades'})
		.then(function(response){
			
			$scope.prioridades = response.data; 

		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	}
	
	$scope.carregarPrioridades();
	
	$scope.salvarTarefa = function(tarefa) {
		$http({method:'POST', url:'http://localhost:8080/listas/' + $scope.listaDeTarefasSelecionada.id, data:tarefa})
		.then(function(response){
			 
			$scope.listaDeTarefasSelecionada.tarefas.push(response.data);

		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	}
	
	$scope.selecionarListaDetarefa = function (listaDeTarefa) {
		$scope.listaDeTarefasSelecionada = listaDeTarefa;
		console.log(listaDeTarefa);
	}
});
