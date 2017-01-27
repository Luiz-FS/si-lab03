/**
 * Created by luiz on 26/11/16.
 */

var app = angular.module("agendaDeTarefas", []);

app.controller("agendaDetarefasCtrl", function ($scope) {

    $scope.app = "Agenda de Tarefas";

    $scope.tarefas = [
        {nome: "Fazer o café da manhã", concluida: false},
        {nome: "Ir para a Universidade", concluida: false},
        {nome: "Assistir aula de Sistemas da Informação", concluida: false}
    ];

    $scope.tableFilter = [
        {filtro: "Todas"},
        {filtro: "Concluidas"},
        {filtro: "Não concluidas"}
    ];

    $scope.tarefaAtual = {};

    $scope.MAXIMO_PERCENTUAL = 100;

    $scope.adicionaTarefa = function (tarefa) {

        tarefa.concluida = false;

        $scope.tarefas.push(angular.copy(tarefa));
        delete $scope.tarefa;
    }

    $scope.remove = function (tarefa) {

        var index = getIndexTarefa(tarefa);

        $scope.tarefas.splice(index, 1);
    }

    $scope.limparTarefas = function () {

        $scope.tarefas = [];
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
});
