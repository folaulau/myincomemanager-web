import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import FirebaseApi from "../../api/FirebaseApi";
import UserApi from "../../api/UserApi";
import Auth from "../../components/auth/auth";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Transaction() {

  let navigate = useNavigate();

  const [newTransactions, setNewTransactions] = useState([{
    name: "",
    price: 0,
    quantity: 0,
    total: 0,
    datetime: "",
    note: ""
  }]);
  const [editedTransaction, setEditedTransaction] = useState({});

  const [userInfo, setUserInfo] = useState({
    email: "folaudev+"+Math.floor(Math.random() * 1000000000)+"@gmail.com",
    password: "Test1234!",
    confirmPassword: "Test1234!"
  });

  const [errorMsg, setErrorMsg] = useState("");

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);

  const handleClose = () => setShowAddTransactionModal(false);

  useEffect(() => {
    console.log("Transaction")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewTransactionsInputChange = (e, index) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log("name: "+name)
    // console.log("value: "+value)
    // console.log("index: "+index)
    let currentTransactions = [...newTransactions]

    let transaction = currentTransactions[index]
    transaction[name] = value
    currentTransactions[index] = transaction
    setNewTransactions(currentTransactions);
};

  const saveNewTransaction = () => {
    setShowAddTransactionModal(false)
  }

  const saveEditedTransaction = () => {

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
                      <tr>
                        <td>1</td>
                        <td>restaurant</td>
                        <td>120</td>
                        <td>1</td>
                        <td>120</td>
                        <td>12/12/2023</td>
                        <td>family outing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={showAddTransactionModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                            <label  className="form-label">Price</label>
                            <input 
                            id="price"
                            name="price"
                            value={transaction.price}
                            onChange={(e)=>handleNewTransactionsInputChange(e,index)}
                            required
                            className="form-control" 
                            placeholder=""/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <label  className="form-label">Quantity</label>
                            <input 
                            id="quantity"
                            name="quantity"
                            value={transaction.quantity}
                            onChange={(e)=>handleNewTransactionsInputChange(e,index)}
                            required
                            className="form-control" 
                            placeholder=""/>
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <label  className="form-label">Total</label>
                            <input 
                            id="price"
                            name="price"
                            readOnly
                            value={transaction.total}
                            onChange={(e)=>handleNewTransactionsInputChange(e,index)}
                            required
                            className="form-control" 
                            placeholder=""/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <label  className="form-label">Date</label>
                            <input 
                            id="datetime"
                            name="datetime"
                            type="date"
                            value={transaction.datetime}
                            onChange={(e)=>handleNewTransactionsInputChange(e,index)}
                            required
                            className="form-control" 
                            placeholder=""/>
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <label  className="form-label">Note</label>
                            <input 
                            id="note"
                            name="note"
                            value={transaction.note}
                            onChange={(e)=>handleNewTransactionsInputChange(e,index)}
                            required
                            className="form-control" 
                            placeholder=""/>
                          </div>
                        </div>
                      </div>
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
            <Button variant="primary" onClick={()=>saveNewTransaction()}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      <Footer />
    </>
  );
}

export default Transaction;