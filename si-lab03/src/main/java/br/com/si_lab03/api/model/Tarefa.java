package br.com.si_lab03.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Tarefa {
	
	@Id @GeneratedValue
	private Integer id;
	private String descricao;
	
	@ManyToOne
	@JoinColumn
	private ListaDeTarefas listaDeTarefas;
	
	public Tarefa() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public ListaDeTarefas getListaDeTarefas() {
		return listaDeTarefas;
	}

	public void setListaDeTarefas(ListaDeTarefas listaDeTarefas) {
		this.listaDeTarefas = listaDeTarefas;
	}
	
	
}
