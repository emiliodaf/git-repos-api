import React, {useState, useEffect}from 'react';
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles';
import api from '../../services/api';
import { FaArrowLeft } from 'react-icons/fa'

//{decodeURIComponent(match.params.repository)}

export default function Repositorio({match}) {

  const [repository, setRepository ] = useState({});
  const [issues, setIssues ] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [page, setPage ] = useState(1);
  const [filters, setFilters ] = useState([
    {state: 'all', label: 'all', active: true},
    {state: 'open', label: 'open', active: false},
    {state: 'closed', label: 'closed', active: false},
  ]);

  const [filterIndex, setFilterIndex ] = useState(0);

useEffect(() =>{

  async function load(){
    const nomeRepo = decodeURIComponent(match.params.repository);
    
   const[repositoryData, issuesData] = await Promise.all([
      api.get(`/repos/${nomeRepo}`),
      api.get(`/repos/${nomeRepo}/issues`,{

        params:{
          state: filters.find(f => f.active).state, //all
          per_page: 10
        }
      }),
    ]);

    setRepository(repositoryData.data);
    setIssues(issuesData.data);
    console.log(issuesData.data);
    setLoading(false);

  }

  load();

}, [filters, setFilters,match.params.repository]);


useEffect(() => {

  async function loadIssue(){
    const nomeRepo = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${nomeRepo}/issues`, {
      params:{
        state: filters[filterIndex].state,
        page,
        per_page: 10,
      },
    });

    setIssues(response.data);

  }

  loadIssue();

}, [filterIndex, filters, page, match.params.repository]);

//we have settled a handlePge function below here that selects the next and previous pages of the repos on mouse click button in the PageActions component//

function handlePage(action){
  setPage(action === 'back' ? page - 1 : page + 1)
}

function handleFilter(index){
  setFilterIndex(index);
}


if(loading){
    return(
      <Loading>
         <h1>Loading...</h1>
      </Loading>
    )

}

  return (
    <Container>

    <BackButton to='/'>
      <FaArrowLeft color='#404040' size={25}/>
    </BackButton>

      <Owner>
        <img src={repository.owner.avatar_url} 
             alt={repository.owner.login} />  
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner> 
      <FilterList active={filterIndex}>

        {filters.map((filter, index) => (
           <button
           type='button'
           key={filter.label}
           onClick={()=> handleFilter(index)}
          >{filter.label}</button>
        ))}

      </FilterList>
       <IssuesList>
          {issues.map(issue =>(
             <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login}/>
               <div>
            <strong>
          <a href={issue.html_url}>{issue.title}</a>
          {issue.labels.map(Label => (
            <span key={String(Label.id)}>{Label.name}</span>
                   
                   ))}
            </strong>
          <p>{issue.user.login}</p> 
              </div>

             </li>  
          ))}
        </IssuesList> 
        <PageActions>
      <button type='button'
      onClick={() => handlePage('back')}
      disabled={page < 2}>
      Back</button>
      <button type='button'onClick={() => handlePage('next')}>
      Next</button> 
        </PageActions>
    </Container>
  )
}
