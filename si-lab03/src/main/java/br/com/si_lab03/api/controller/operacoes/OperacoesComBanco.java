package br.com.si_lab03.api.controller.operacoes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.si_lab03.api.model.lista.ListaDeTarefas;
import br.com.si_lab03.api.model.tarefa.Tarefa;
import br.com.si_lab03.api.repository.ListaDeTarefasRepositorio;

@Component
public class OperacoesComBanco {

	@Autowired
	private ListaDeTarefasRepositorio listaDeTarefasRepositorio;


	public List<ListaDeTarefas> buscarTodasAsListas() {
		return listaDeTarefasRepositorio.findAll();
	}

	public ListaDeTarefas buscarListaTarefaPorId(Integer id) {
		return listaDeTarefasRepositorio.findOne(id);
	}

	public ListaDeTarefas salvarListaDeTarefa(ListaDeTarefas listaDeTarefas) {
		return listaDeTarefasRepositorio.save(listaDeTarefas);
	}

	public Tarefa salvarTarefa(Integer idLista, Tarefa tarefa) {

		ListaDeTarefas listaEncontrada = buscarListaTarefaPorId(idLista);

		if(listaEncontrada != null) {

			listaEncontrada.adicionarTarefa(tarefa);

			ListaDeTarefas listaSalva = salvarListaDeTarefa(listaEncontrada);

			Tarefa tarefaSalva = listaSalva.buscarTarefa(tarefa);

			return tarefaSalva;
		} else {

			return null;

		}
	}

	public boolean deletarListaDeTarefa(Integer id) {

		ListaDeTarefas lista = listaDeTarefasRepositorio.findOne(id);

		if (lista == null) {
			return false;
		} else {
			listaDeTarefasRepositorio.delete(id);
			return true;
		}
	}

	public boolean deletarTarefa(Integer idLista, Integer idTarefa) {

		ListaDeTarefas lista = listaDeTarefasRepositorio.findOne(idLista);

		if (lista == null) {
			return false;
		} else {

			boolean deletou = lista.deletarTarefa(idTarefa);

			if (deletou) {
				salvarListaDeTarefa(lista);
				return true;
				
			} else {
				return false;
			}
		}
	}

	public void deletarTodas() {
		listaDeTarefasRepositorio.deleteAll();
	}
} 