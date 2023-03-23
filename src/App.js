import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import Pagination from 'react-bootstrap-table2-paginator';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor'
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';

function App() {
  const [ data, setData] = useState([])
  useEffect(() => {
    getData()
  }, [])
  const getData= () => {
    axios("https://serpindex-demo.svc.violetvault.com/api/index").then((res) => 
      setData(res.data)
    )
  }

  const columns= [
   {
     dataField: "title",
      text: "Title",
      sort: true,
   },
   {
    dataField: "category",
    text: "Category",
    sort: true,
   },
   {
    dataField: "domain",
    text: "Domain",
    sort: true,
    filter: textFilter(),
   }
  ]

  console.log(data)
  return (
    <div className="App">
      
      <BootstrapTable
        keyField='id'
         data={data} 
         columns={columns} 
         striped
         hover
         condensed
         pagination={Pagination()}
         cellEdit={cellEditFactory({
            mode: "click",
         })}
         filter={filterFactory()}
        />
        
    </div>
  );
}

export default App;
