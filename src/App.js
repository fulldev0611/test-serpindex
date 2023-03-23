import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import Pagination from 'react-bootstrap-table2-paginator';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor'
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import { Modal, Button } from 'react-bootstrap';
function App() {
  const [ data, setData] = useState([])
  const [modalInfo, setmodalInfo] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
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
    dataField: "createdOn",
    text: "Create On",

   },
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
  const rowEvents = {
    onClick: (e,row) => {
      console.log(row)
      setmodalInfo(row)
      tooggleTrueFalse()
    }
  }

  const tooggleTrueFalse = () => {
    setShowModal(handleShow)
  }

  const ModalContent = () => {
    return (
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p>Title: {modalInfo.title}</p>
              <p>Created On : {modalInfo.createdOn}</p>
              <p>Category: {modalInfo.category}</p>
              <p>Expired: {modalInfo.validUntil}</p>
              <div>
                {modalInfo.entries.map((item => {
                  return (
                    <div className='d-flex justify-content-between'>
                      <p>indexed count : {item.indexedCount}</p>
                      <span> **** </span>
                      <p>indexed count : {item.indexedTotal}</p>
                    </div>
                  )
                }))}
              </div>  
          </Modal.Body>
      </Modal>
    )
  }

  console.log(data)
  return (
    <div className="App">
      
      <BootstrapTable
        keyField='id'
         data={data} 
         columns={columns} 
         rowEvents={rowEvents}
         striped
         hover
         condensed
         pagination={Pagination({})}
         //cellEdit={cellEditFactory({
          //  mode: "click",
         //})}
         filter={filterFactory()}
        />
        {show ? <ModalContent /> : null}
    </div>
  );
}

export default App;
