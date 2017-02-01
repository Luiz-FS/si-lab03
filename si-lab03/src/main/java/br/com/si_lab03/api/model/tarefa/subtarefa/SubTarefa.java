package br.com.si_lab03.api.model.tarefa.subtarefa;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class SubTarefa {
	
	@Id
	private Integer id;
	private String descricao;
	private boolean concluida;
	
	public SubTarefa() {
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
	public boolean isConcluida() {
		return concluida;
	}
	public void setConcluida(boolean concluida) {
		this.concluida = concluida;
	}
	
	
}
