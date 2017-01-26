package br.com.si_lab03.api.model.lista;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import br.com.si_lab03.api.model.tarefa.Tarefa;

@Entity
public class ListaDeTarefas {

	@Id @GeneratedValue
	private Integer id;
	private String nome;
	
	@OneToMany(mappedBy="listaDeTarefas", cascade=CascadeType.ALL)
	private List<Tarefa> tarefas;
	
	public ListaDeTarefas() {
		this.tarefas = new ArrayList<>();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<Tarefa> getTarefas() {
		return tarefas;
	}

	public void setTarefas(List<Tarefa> tarefas) {
		this.tarefas = tarefas;
	}
	
	
}
