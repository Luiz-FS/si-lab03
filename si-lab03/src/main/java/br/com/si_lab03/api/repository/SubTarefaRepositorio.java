package br.com.si_lab03.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.si_lab03.api.model.tarefa.subtarefa.SubTarefa;

@Repository
public interface SubTarefaRepositorio extends JpaRepository<SubTarefa, Integer> {

}
