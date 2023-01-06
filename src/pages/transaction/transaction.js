import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import TransactionApi from "../../api/TransactionApi";
import TransactionGraphQL from "../../graphql/TransactionGraphQL";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Auth from "../../components/auth/auth";
import DateUtil from "../../util/DateUtil";
function Transaction() {

  let navigate = useNavigate();

  const [auth, setAuth] = useState(Auth.getAuth());

  const [transactions, setTransactions] = useState([])

  const [newTransactions, setNewTransactions] = useState([{
    name: "",
    price: 0,
    quantity: 1,
    total: 0,
    datetime: "",
    note: "",
    userUuid: auth.uuid
  }]);

  const [editedTransaction, setEditedTransaction] = useState({
    total: 0
  });


  const [errorMsg, setErrorMsg] = useState("");
  const [total, setTotal] = useState(0);

  const [addNewTranErrorMsg, setAddNewTranErrorMsg] = useState("");
  
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showEditTransactionModal, setShowEditTransactionModal] = useState(false);

  const handleClose = () => setShowAddTransactionModal(false);
  const handleEditModalClose = () => setShowEditTransactionModal(false);



  useEffect(() => {
    console.log("Transaction")
    setAuth(Auth.getAuth())

    loadTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTransactions = () => {
    TransactionGraphQL.getTransactions()
    .then((response) => {
      console.log("loadTransactions response: ", response);

      let savedTransactions = response.data.data.transactions
      console.log("savedTransactions: ", savedTransactions);

      if(savedTransactions.length > 0){
          setTransactions(savedTransactions)
      }

      console.log("transactions: ", transactions);

      let aggregateTotal = response.data.data.transactions_aggregate.aggregate.sum.total
      console.log("aggregateTotal: ", aggregateTotal);
      setTotal(aggregateTotal)
      
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

  const handleEditTransactionInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log("name: "+name)
    console.log("value: "+value)

    let currentEditedTransaction = {...editedTransaction}
    currentEditedTransaction[name] = value
    if(name==='quantity' || name==='price'){
      currentEditedTransaction['total'] = currentEditedTransaction['quantity'] * currentEditedTransaction['price']
    }
    setEditedTransaction(currentEditedTransaction);
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
    let updateTransaction = {...editedTransaction}
    updateTransaction['userUuid'] = auth.uuid
    updateTransaction['datetime'] = DateUtil.convertLocalDateToUTCStr(updateTransaction['datetime'])

    TransactionApi.update(updateTransaction)
    .then((response) => {
      console.log("update response: ", response);

      setEditedTransaction({total: 0})

      loadTransactions()

      setShowEditTransactionModal(false)
      
    }).catch((error) => {
      console.error("Error: ", error);
      setAddNewTranErrorMsg(error.message)
    });
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

const edit = (transaction, index) => {
  let transactionCopy = {...transaction}
  transactionCopy['datetime'] = DateUtil.convertUTCDateToLocalDateStr(transactionCopy.datetime)
  console.log("transactionCopy datetime")
  console.log(transactionCopy['datetime'])

  setEditedTransaction(transactionCopy)

  setShowEditTransactionModal(true)
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
              <div className="row">
                  <div className="col-12">
                    Total: ${total.toFixed(2)}
                  </div>
                </div>
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
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction, index) => (
                        
                        <tr key={index}>
                          <td onClick={()=>edit(transaction,index)}>
                            {transaction.id}
                          </td>
                          <td>{transaction.name}</td>
                          <td>${transaction.price}</td>
                          <td>{transaction.quantity}</td>
                          <td>${transaction.total}</td>
                          <td>{new Date(transaction.datetime + 'Z').toLocaleString()}</td>
                          <td>{transaction.note}</td>
                          <td>
                              <div className="d-grid gap-2">
                                  <button onClick={()=>edit(transaction,index)} type="button" className="btn btn-sm btn-outline-primary">edit</button>
                              </div>
                          </td>
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
        <Modal show={showEditTransactionModal} onHide={handleEditModalClose} size={`xl`}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Transaction</Modal.Title>
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
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-sm-6 col-12">
                        <div className="mb-3">
                          <label  className="form-label">Name</label>
                          <input 
                          id="name"
                          name="name"
                          value={editedTransaction.name || ''}
                          onChange={(e)=>handleEditTransactionInputChange(e)}
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
                          value={editedTransaction.datetime || ''}
                          onChange={(e)=>handleEditTransactionInputChange(e)}
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
                          value={editedTransaction.price || ''}
                          onChange={(e)=>handleEditTransactionInputChange(e)}
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
                          value={editedTransaction.quantity || ''}
                          onChange={(e)=>handleEditTransactionInputChange(e)}
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
                          value={`$`+editedTransaction.total.toFixed(2) || ''}
                          onChange={(e)=>handleEditTransactionInputChange(e)}
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
                            value={editedTransaction.note || ''}
                            onChange={(e)=>handleEditTransactionInputChange(e)}
                            className="form-control" 
                            placeholder=""
                          >
                          </textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>handleEditModalClose(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={()=>saveEditedTransaction()}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      <Footer />
    </>
  );
}

export default Transaction;