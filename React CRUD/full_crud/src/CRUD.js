import React, {useState, useEffect, Fragment}  from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const CRUD = () =>{

    const [data, setData] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    
    const handleClose = () => setLgShow(false);
    const handleShow = () => setLgShow(true);

    const [ID, setID]=useState('');
    const [FirstName, setFirstName]=useState('');
    const [LastName, setLastName]=useState('');
    const [Occupation, setOccupation]=useState('');
    const [IsActive, setIsActive]=useState(0);
  
    const [editID, seteditID] = useState('')
    const [editFirstName, seteditFirstName]=useState('');
    const [editLastName, seteditLastName]=useState('');
    const [editOccupation, seteditOccupation]=useState('');
    const [editIsActive, seteditIsActive]=useState(0);

    useEffect (()=>{
        getData();
        // eslint-disable-next-line
    },[])

    const getData = () =>{
      axios.get('https://localhost:7135/api/Employee')
           .then((result)=>{
            setData(result.data)
           })
           .catch((error)=>{
            console.log(error)
           })
    }

    const clear = () =>{
      setID('');
      setFirstName('');
      setLastName('');
      setOccupation('');
      setIsActive(0);
      seteditID('');
      seteditFirstName('');
      seteditLastName('');
      seteditOccupation('');
      seteditIsActive(0);
    }

    const handleEdit = (id)=>{
      handleShow();
      axios.get(`https://localhost:7135/api/Employee/${id}`)
      .then((result)=>{
        seteditFirstName(result.data.firstName);
        seteditLastName(result.data.lastName);
        seteditOccupation(result.data.occupation);
        seteditIsActive(result.data.isActive);
        seteditID(id);
       })
       .catch((error)=>{
        console.log(error)
       })
    }

    const handleUpdate = ()=>{
      const url = `https://localhost:7135/api/Employee/${editID}`;
      const entry = 
      {
        "id": editID,
        "firstName": editFirstName,
        "lastName": editLastName,
        "occupation": editOccupation,
        "isActive": editIsActive
        }
      axios.put(url, entry)
          .then((result)=>{
            handleClose();
            getData();
            clear();
            toast.success('Employee has been added');
    }).catch((error)=>{
      toast.error(error);
    })
    }

    const handleSave=()=>{
      const url = 'https://localhost:7135/api/Employee';
      const entry = {
          "id": ID,
          "firstName": FirstName,
          "lastName": LastName,
          "occupation": Occupation,
          "isActive": IsActive
      }
      axios.post(url, entry)
      .then((result)=>{
        getData();
        clear();
        toast.success('Employee has been added');
      }).catch((error)=>{
        toast.error(error);
      })
    }

    const handleActiveChange=(e)=>{
      if(e.target.checked){
        setIsActive(1);
      }else{
        setIsActive(0);
      }
    }

    const handleEditActiveChange=(e)=>{
      if(e.target.checked){
        seteditIsActive(1);
      }else{
        seteditIsActive(0);
      }
    }

    const handleDelete = (id)=>{
      if(window.confirm("Are you sure you want to DELETE this employee") === true)
        { axios.delete(`https://localhost:7135/api/Employee/${id}`)
                .then((result)=>
          { if(result.status === 200)
           {
            toast.success('Employee has been deleted');
            getData();
           } 
        }).catch((error)=>{
          toast.error(error);
      })}}

    return (
    <Fragment>
      <ToastContainer/>
        <Container>
            <Row>
              <Col><input type='text' className='form-control' placeholder='Enter ID' value={ID} onChange={(e)=>setID(e.target.value)}/></Col>
              <Col><input type='text' className='form-control' placeholder='Enter FirstName' value={FirstName} onChange={(e)=>setFirstName(e.target.value)}/></Col>
              <Col><input type='text' className='form-control' placeholder='Enter LastName' value={LastName} onChange={(e)=>setLastName(e.target.value)}/></Col>
              <Col><input type='text' className='form-control' placeholder='Enter Occupation' value={Occupation} onChange={(e)=>setOccupation(e.target.value)}/></Col>
              <Col><input type='checkbox' checked={ IsActive===1 ? true:false} onChange={(e)=>handleActiveChange(e)} value={IsActive}/><label>IsActive</label></Col>
              <Col><button className='btn btn-primary' onClick={(e)=>handleSave(e)}>Submit</button></Col>
            </Row>
        </Container>
    <br></br>
     <Table striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Occupation</th>
          <th>IsActive</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ?
        data.map((item,index)=>{
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.occupation}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}> 
                      <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                      <button className='btn btn-secondary' onClick={()=>handleDelete(item.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
          :  "Loading..."
        }
      </tbody>
    </Table>
    <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modify Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col><input type='text' className='form-control' placeholder='Enter ID' value={editID} onChange={(e)=>seteditID(e.target.value)}/></Col>
          <Col><input type='text' className='form-control' placeholder='Enter FirstName' value={editFirstName} onChange={(e)=>seteditFirstName(e.target.value)}/></Col>
          <Col><input type='text' className='form-control' placeholder='Enter LastName' value={editLastName} onChange={(e)=>seteditLastName(e.target.value)}/></Col>
          <Col><input type='text' className='form-control' placeholder='Enter Occupation' value={editOccupation} onChange={(e)=>seteditOccupation(e.target.value)}/></Col>
          <Col><input type='checkbox' checked={ editIsActive===1 ? true:false} onChange={(e)=>handleEditActiveChange(e)} value={editIsActive}/><label>IsActive</label></Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
    )
}

export default CRUD;