import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import api from './services/api';
import './App.css';
import Header from './components/Header';

function App() {
  // Desestruturação para obter o retorno do use state, 1 posição conteúdo da variável e 2 posição função para atualizar a variável
  const [projects, setProject] = useState([]);

  /**
   * Função utilizada quando queremos que uma ou mais funções sejam executadas quando alguma informação for alterada
   * 1. Paramentro: Arrow function responsável por disparar as funções
   * 2. Array de dependencia que quando preenchido, monitora a(s) variáveis que se alteradas disparam as funções, se vazio
   *    o useEffect é disparado apenas uma vez, quando o componente for exibido em tela
   */
  useEffect(() => {
    api.get('projects').then(response => {
      setProject(response.data);
    });
  }, []);

  async function handleAddProject() {
    //setProject([...projects, `Projeto ${Date.now()}`]);

    const response = await api.post('projects', {
      title: `Projeto ${Date.now()}`,
      owner: "Miss"
    });

    // utilizando os conceitos de estado e imutabilidades, adicionamos o novo projeto cadastrado
    // pela api no arry que será exibido no front-end
    setProject([...projects, response.data]);

    //"console.log(projects);
  }

  return (
    /**
     * As tags <></> são a implementação do fragment que permite incluir mais de
     * um componente dentro de um container sem a necessidade de se criar uma div
     */
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => {
          return (<li key={project.id}>{project.title}</li>);
        })}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>);
}

export default App;
