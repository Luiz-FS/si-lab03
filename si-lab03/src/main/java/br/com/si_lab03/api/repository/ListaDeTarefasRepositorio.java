package br.com.si_lab03.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.si_lab03.api.model.lista.ListaDeTarefas;

@Repository
public interface ListaDeTarefasRepositorio extends JpaRepository<ListaDeTarefas, Integer> {

}
