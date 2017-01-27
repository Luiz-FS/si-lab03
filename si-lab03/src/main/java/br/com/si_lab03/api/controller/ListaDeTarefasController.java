package br.com.si_lab03.api.controller;

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

		ListaDeTarefas listaSalva = operacoesComBanco.salvarListaDeTarefa(listaDeTarefas);

		return new ResponseEntity<>(listaSalva, HttpStatus.OK);
	}

	@RequestMapping(method=RequestMethod.POST, value="/listas/{idLista}", consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Tarefa> salvarTarefa(@PathVariable Integer idLista, @RequestBody Tarefa tarefa) {

		Tarefa tarefaSalva = operacoesComBanco.salvarTarefa(idLista, tarefa);

		if (tarefaSalva != null)
			return new ResponseEntity<>(tarefaSalva, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/listas/{idLista}/{idTarefa}")
	public ResponseEntity<Tarefa> deletarTarefa(@PathVariable Integer idLista, @PathVariable Integer idTarefa) {

		boolean deletou = operacoesComBanco.deletarTarefa(idLista, idTarefa);

		if (deletou)
			return new ResponseEntity<>(HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(method=RequestMethod.DELETE, value="/listas/{id}")
	public ResponseEntity<ListaDeTarefas> deletarLista(@PathVariable Integer id) {

		boolean deletou = operacoesComBanco.deletarListaDeTarefa(id);

		if (deletou)
			return new ResponseEntity<>(HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
