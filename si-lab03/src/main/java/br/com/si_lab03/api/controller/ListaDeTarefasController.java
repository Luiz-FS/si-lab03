package br.com.si_lab03.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.si_lab03.api.controller.operacoes.OperacoesComBanco;
import br.com.si_lab03.api.model.lista.ListaDeTarefas;
import br.com.si_lab03.api.model.tarefa.Tarefa;

@RestController
public class ListaDeTarefasController {
	
	@Autowired
	private OperacoesComBanco operacoesComBanco;
	
	public ListaDeTarefasController() {
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/listas", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ListaDeTarefas>> buscarTodasAsListas() {
		
		List<ListaDeTarefas> listas = operacoesComBanco.buscarTodasAsListas();
		
		return new ResponseEntity<>(listas, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/listas", consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ListaDeTarefas> salvarLista(@RequestBody ListaDeTarefas listaDeTarefas) {
		
		List<Tarefa> t = new ArrayList<>();
		
		
		ListaDeTarefas lista = operacoesComBanco.salvar(listaDeTarefas);
		
		return new ResponseEntity<>(lista, HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/listas/{id}")
	public ResponseEntity<ListaDeTarefas> deletarLista(@PathVariable Integer id) {
		
		boolean deletou = operacoesComBanco.deletar(id);
		
		if (deletou)
			return new ResponseEntity<>(HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
}
