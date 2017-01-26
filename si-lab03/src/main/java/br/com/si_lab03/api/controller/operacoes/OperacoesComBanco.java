package br.com.si_lab03.api.controller.operacoes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.si_lab03.api.model.lista.ListaDeTarefas;
import br.com.si_lab03.api.repository.ListaDeTarefasRepositorio;

@Component
public class OperacoesComBanco {

	@Autowired
	private ListaDeTarefasRepositorio listaDeTarefasRepositorio;
	
	
	public List<ListaDeTarefas> buscarTodasAsListas() {
		return listaDeTarefasRepositorio.findAll();
	}
	
	public ListaDeTarefas buscarTarefaPorId(Integer id) {
		return listaDeTarefasRepositorio.findOne(id);
	}
	
	public ListaDeTarefas salvar(ListaDeTarefas listaDeTarefas) {
		return listaDeTarefasRepositorio.save(listaDeTarefas);
	}
	
	public boolean deletar(Integer id) {
		
		ListaDeTarefas lista = listaDeTarefasRepositorio.findOne(id);
		
		if (lista == null) {
			return false;
		} else {
			listaDeTarefasRepositorio.delete(id);
			return true;
		}
	}
	
	public void deletarTodas() {
		listaDeTarefasRepositorio.deleteAll();
	}
}
