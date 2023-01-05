import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../layout/header";
import Footer from "../../../layout/footer";
import ExpenseApi from "../../../api/ExpenseApi";
import ExpenseGraphQL from "../../../graphql/ExpenseGraphQL";
import Auth from "../../../components/auth/auth";

function SignUpExpenses() {

    let navigate = useNavigate();

    const [expenses, setExpenses] = useState([{
        id: 0,
        uuid: "",
        type: "",
        name: "",
        amount: 0,
        monthlyDueDay: 0
    }]);

    const [errorMsg, setErrorMsg] = useState("");
    const [total, setTotal] = useState(0);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        console.log("SignUpExpenses")

        setAuth(Auth.getAuth())
        
        ExpenseGraphQL.getExpenses()
        .then((response) => {
            // console.log("response: ", response);
            let savedExpenses = response.data.data.expenses
            console.log("savedExpenses: ", savedExpenses);

            if(savedExpenses.length > 0){
                setExpenses(savedExpenses)

                calculateTotal(savedExpenses)
            }
            
        }).catch((error) => {
            console.error("Error: ", error);
        });
        // signUpWithEmailAndPassword()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (e, index) => {
        let name = e.target.name;
        let value = e.target.value;
        // console.log("name: "+name)
        // console.log("value: "+value)
        // console.log("index: "+index)
        let currentExpenses = [...expenses]

        let expense = currentExpenses[index]
        expense[name] = value
        currentExpenses[index] = expense
        setExpenses(currentExpenses);

        calculateTotal(currentExpenses)
        
    };

    const calculateTotal = (currentExpenses) => {
        let count = currentExpenses.length;
        let currentTotal = 0;
        for (let i = 0; i < count; i++) {
            try {
                let num = parseFloat(currentExpenses[i].amount)
                if(!isNaN(num)){
                    currentTotal += num
                }else{
                    currentTotal += 0
                }
            }catch(err) {
                currentTotal += 0
            }
        }
        setTotal(parseFloat(currentTotal))
    }

    const update = () => {
        let expenseInfo = [...expenses]

        ExpenseApi.update(auth.accountUuid, expenseInfo)
        .then((response) => {
            // console.log("response: ", response);
            navigate('/dashboard')
            
        }).catch((error) => {
            console.error("Error: ", error);
            setErrorMsg(error)
        });
    }

    const add = () => {
        let currentExpenses = [...expenses]
        currentExpenses.push({
            id: 0,
            uuid: "",
            type: "",
            name: "",
            amount: 0,
            monthlyDueDay: 0
        })
        setExpenses(currentExpenses);
    }

    const remove = (index) => {
        // console.log("remove expense at index: "+index)
        let currentExpenses = [...expenses]

        currentExpenses = currentExpenses.filter((expense, i) => {
            if(index!==i){
                return true
            }
            return false
        });

        setExpenses(currentExpenses);
    }

    const goBack = () => {
        navigate('/signup/goals')
    }

    return (
        <>
        <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="row">
                            <div className="col-sm-10 col-12">
                                <h2>Your Expenses</h2>
                            </div>
                            <div className="col-sm-2 col-12">
                                <div className="row">
                                    <div className="col-12 mt-1">
                                        <span>Total</span> <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
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
                        {expenses.map((expense, index) => (
                            <div className="row" key={index}>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <div className="mb-3">
                                                <label  className="form-label">Name</label>
                                                <input 
                                                id="name"
                                                name="name"
                                                value={expense.name || ''}
                                                onChange={(e)=>handleInputChange(e,index)}
                                                required
                                                className="form-control" 
                                                placeholder="Water Bill"/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <div className="mb-3">
                                                <label  className="form-label">Amount</label>
                                                <input 
                                                id="amount"
                                                name="amount"
                                                value={expense.amount || ''}
                                                onChange={(e)=>handleInputChange(e,index)}
                                                required
                                                className="form-control" 
                                                placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 col-12">
                                            <div className="mb-3">
                                                <label  className="form-label">Category</label>
                                                <select 
                                                    name="type"
                                                    value={expense.type || ''} 
                                                    onChange={(e)=>handleInputChange(e,index)}
                                                    className="form-select" 
                                                    aria-label="Default select">
                                                    <option value=""></option>
                                                    <option value="GROCERIES">Groceries</option>
                                                    <option value="HOUSING">Housing</option>
                                                    <option value="UTILITY">Utility</option>
                                                    <option value="INSURANCE">Insurance</option>
                                                    <option value="ENTERTAINMENT">Entertainment</option>
                                                    <option value="DONATION">Donation</option>
                                                    <option value="TITHING_DONATION">Tithing</option>
                                                    <option value="TRANSPORTATION">Transportation</option>
                                                    <option value="HOUSE_SUPPLIES">House Supplies</option>
                                                    <option value="CAR_MAINTENANCE">Vehicle</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-5 col-12">
                                            <div className="mb-3">
                                                <label  className="form-label">Monthly Due Day</label>
                                                <select 
                                                    name="monthlyDueDay"
                                                    value={expense.monthlyDueDay || ''} 
                                                    onChange={(e)=>handleInputChange(e,index)}
                                                    className="form-select" 
                                                    aria-label="Default select">
                                                    <option value=""></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                    <option value="21">21</option>
                                                    <option value="22">22</option>
                                                    <option value="23">23</option>
                                                    <option value="24">24</option>
                                                    <option value="25">25</option>
                                                    <option value="26">26</option>
                                                    <option value="27">27</option>
                                                    <option value="28">28</option>
                                                </select>
                                            </div>
                                        </div>
                                        {
                                            index !== expenses.length-1 &&
                                            <div className="col-sm-1 col-2">
                                                <div className="mt-4 addRemoveBtn">
                                                    <button onClick={()=>remove(index)} type="button" className="btn btn-danger">-</button>
                                                </div>
                                            </div>
                                        }
                                        {
                                            (index === expenses.length-1 && expenses.length <= 4) &&
                                            <div className="col-sm-1 col-2">
                                                <div className="mt-4 addRemoveBtn">
                                                    <button onClick={()=>add()} type="button" className="btn btn-primary">+</button>
                                                </div>
                                            </div>
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="row mt-5">
                            <div className="col-sm-2 col-6">
                                <div className="d-grid gap-2">
                                    <button onClick={()=>goBack()} type="button" className="btn btn-outline-primary">Back</button>
                                </div>
                            </div>
                            <div className="col-sm-2 offset-sm-8 col-6">
                                <div className="d-grid gap-2">
                                    <button onClick={()=>update()} type="button" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Footer />
        </>
    );
}

export default SignUpExpenses;