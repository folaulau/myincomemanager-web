import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import TransactionApi from "../../api/TransactionApi";
import TransactionGraphQL from "../../graphql/TransactionGraphQL";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Auth from "../../components/auth/auth";

function Transaction() {

  let navigate = useNavigate();

  const [auth, setAuth] = useState(Auth.getAuth());

  const [transactions, setTransactions] = useState([{}])

  const [newTransactions, setNewTransactions] = useState([{
    name: "",
    price: 0,
    quantity: 1,
    total: 0,
    datetime: "",
    note: "",
    userUuid: auth.uuid
  }]);
  const [editedTransaction, setEditedTransaction] = useState({});


  const [errorMsg, setErrorMsg] = useState("");

  const [addNewTranErrorMsg, setAddNewTranErrorMsg] = useState("");

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);

  const handleClose = () => setShowAddTransactionModal(false);

  useEffect(() => {
    console.log("Transaction")
    setAuth(Auth.getAuth())

    loadTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTransactions = () => {
    TransactionGraphQL.getTransactions()
    .then((response) => {
      console.log("response: ", response);

      let savedTransactions = response.data.data.transactions
      console.log("savedTransactions: ", savedTransactions);

      if(savedTransactions.length > 0){
          setTransactions(savedTransactions)
      }
      
    }).catch((error) => {
      console.error("Error: ", error);
    });
  }

  const handleNewTransactionsInputChange = (e, index) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log("name: "+name)
    // console.log("value: "+value)
    // console.log("index: "+index)
    let currentTransactions = [...newTransactions]

    let transaction = currentTransactions[index]
    transaction[name] = value

    if(name==='quantity' || name==='price'){
      transaction['total'] = transaction['quantity'] * transaction['price']
    }

    currentTransactions[index] = transaction
    setNewTransactions(currentTransactions);
};

  const saveNewTransactions = () => {
    let currentTransactions = [...newTransactions]

    for(let i=0;i<currentTransactions.length;i++){
      let transaction = currentTransactions[i]
      let datetime = transaction['datetime']
      if(datetime!==null && datetime!==undefined && datetime.trim().length>0){
        console.log("toiso")
        console.log(datetime)
        transaction['datetime'] = new Date(datetime).toISOString()
        currentTransactions[i] = transaction
      }
    }

    TransactionApi.create(currentTransactions)
    .then((response) => {
      console.log("response: ", response);

      loadTransactions()

      clearAddTransactionForm()

      setShowAddTransactionModal(false)
      
    }).catch((error) => {
      console.error("Error: ", error);
      setAddNewTranErrorMsg(error.message)
    });

    
  }

  const clearAddTransactionForm = () => {
    setNewTransactions([{
      name: "",
      price: 0,
      quantity: 1,
      total: 0,
      datetime: "",
      note: "",
      userUuid: auth.uuid
    }])
  }

  const saveEditedTransaction = () => {

  }

  const add = () => {
    let currentTransactions = [...newTransactions]
    currentTransactions.push({
      name: "",
      price: 0,
      quantity: 1,
      total: 0,
      datetime: "",
      note: "",
      userUuid: auth.uuid
    })
    setNewTransactions(currentTransactions);
}

const remove = (index) => {
    console.log("remove transaction at index: "+index)
    let currentTransactions = [...newTransactions]

    currentTransactions = currentTransactions.filter((transaction, i) => {
        if(index!==i){
            return true
        }
        return false
    });
    setNewTransactions(currentTransactions);
}

  return (
    <>
      <Header />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-11 col-12">
                    <h2>Transactions</h2>
                </div>
                <div className="col-sm-1 col-6 d-grid gap-2">
                  <button onClick={()=>setShowAddTransactionModal(true)} type="button" className="btn btn-outline-primary">Add</button>
                </div>
              </div>
              
              {errorMsg && 
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger" role="alert">
                      {errorMsg}
                    </div>
                  </div>
                </div>
              }
              <div className="row mt-2">
                <div className="col-12 table-responsive">
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Sum</th>
                        <th scope="col">Date</th>
                        <th scope="col">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.id}</td>
                          <td>{transaction.name}</td>
                          <td>{transaction.price}</td>
                          <td>{transaction.quantity}</td>
                          <td>{transaction.total}</td>
                          <td>{new Date(transaction.datetime + 'Z').toLocaleString()}</td>
                          <td>{transaction.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={showAddTransactionModal} onHide={handleClose} size={`xl`}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                {addNewTranErrorMsg && 
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger" role="alert">
                        {addNewTranErrorMsg}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {newTransactions.map((transaction, index) => (
                  <div key={index} className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <label  className="form-label">Name</label>
                            <input 
                            id="name"
                            name="name"
                            value={transaction.name}
                            onChange={(e)=>handleNewTransactionsInputChange(e,index)}
                            required
                            className="form-control" 
                            placeholder=""/>
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <label  className="form-label">Date</label>
                            <input 
                            id="datetime"
                            name="datetime"
                            type="datetime-local"
                            value={transaction.datetime}
                            onChange={(e)=>handleNewTransactionsInputChange(e,index)}
                            required
                            className="form-control" 
                            placeholder=""/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3 col-3">
                          <div className="mb-3">
                            <label  className="form-label">Price</label>
                            <input 
                            id="price"
                            name="price"
                            type="number"
                            value={transaction.price}
                            onChange={(e)=>handleNewTransactionsInputChange(e,index)}
                            required
                            className="form-control" 
                            placeholder=""/>
                          </div>
                        </div>
                        <div className="col-sm-3 col-3">
                          <div className="mb-3">
                            <label  className="form-label">Quantity</label>
                            <input 
                            id="quantity"
                            name="quantity"
                            type="number"
                            value={transaction.quantity}
                            onChange={(e)=>handleNewTransactionsInputChange(e,index)}
                            required
                            className="form-control" 
                            placeholder=""/>
                          </div>
                        </div>
                        <div className="col-sm-6 col-6">
                          <div className="mb-3">
                            <label  className="form-label">Total</label>
                            <input 
                            id="price"
                            name="price"
                            readOnly
                            value={`$`+transaction.total.toFixed(2)}
                            onChange={(e)=>handleNewTransactionsInputChange(e,index)}
                            required
                            className="form-control" 
                            placeholder=""/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-11 col-11">
                          <div className="mb-3">
                            <label  className="form-label">Note</label>
                            <textarea 
                              name="note"
                              value={transaction.note}
                              onChange={(e)=>handleNewTransactionsInputChange(e,index)}
                              className="form-control" 
                              placeholder=""
                            >
                            </textarea>
                          </div>
                        </div>
                        {
                          (index !== newTransactions.length-1) &&
                          <div className="col-sm-1 col-1">
                              <div className="mt-4 addRemoveBtn d-grid gap-2">
                                  <button onClick={()=>remove(index)} type="button" className="btn btn-danger">-</button>
                              </div>
                          </div>
                        }
                        {
                          (index === newTransactions.length-1 && newTransactions.length <= 4) &&
                          <div className="col-sm-1 col-1">
                              <div className="mt-4 addRemoveBtn d-grid gap-2">
                                  <button onClick={()=>add()} type="button" className="btn btn-primary">+</button>
                              </div>
                          </div>
                        }
                      </div>
                      <hr/>
                    </div>
                  </div>
                  

                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShowAddTransactionModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>saveNewTransactions()}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      <Footer />
    </>
  );
}

export default Transaction;