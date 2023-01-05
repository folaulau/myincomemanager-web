import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../layout/header";
import Footer from "../../../layout/footer";
import './income.css';
import IncomeApi from "../../../api/IncomeApi";
import IncomeGraphQL from "../../../graphql/IncomeGraphQL";
import Auth from "../../../components/auth/auth";

function SignUpIncome() {

    let navigate = useNavigate();

    const [incomes, setIncomes] = useState([{
        id: 0,
        uuid: "",
        payType: "HOURLY",
        payPeriod: "BI_WEEKLY",
        payPeriodNetAmount: 1500,
        yearlyTotal: 0,
        companyName: "Delta",
        position: "Ramp Agent",
        nextPayDay: "2023-01-06",
        startDate: "",
        endDate: ""
    }]);

    const [total, setTotal] = useState(1500);
    const [errorMsg, setErrorMsg] = useState("");
    const [auth, setAuth] = useState({});

    useEffect(() => {
        console.log("SignUpIncome")

        setAuth(Auth.getAuth())

        IncomeGraphQL.getIncomes()
        .then((response) => {
            // console.log("response: ", response);
            let savedIncomes = response.data.data.incomes
            console.log("savedIncomes: ", savedIncomes);

            if(savedIncomes.length > 0){
                setIncomes(savedIncomes)
            }
            
        }).catch((error) => {
            console.error("Error: ", error);
        });

        // signUpWithEmailAndPassword()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUserInputChange = (e, index) => {
        let name = e.target.name;
        let value = e.target.value;
        // console.log("name: "+name)
        // console.log("value: "+value)
        // console.log("index: "+index)
        let currentIncomes = [...incomes]

        let income = currentIncomes[index]
        income[name] = value
        currentIncomes[index] = income
        setIncomes(currentIncomes);

        let count = currentIncomes.length;
        let currentTotal = 0;
        for (let i = 0; i < count; i++) {
            try {
                let num = parseFloat(currentIncomes[i].payPeriodNetAmount)
                if(!isNaN(num)){
                    currentTotal += num
                }else{
                    currentTotal += 0
                }
            }catch(err) {
                currentTotal += 0
            }
        }
        // console.log("currentTotal: "+currentTotal)
        // console.log("currentTotal type: "+typeof currentTotal)
        setTotal(parseFloat(currentTotal))
    };

    const update = () => {
        let incomeInfo = [...incomes]

        IncomeApi.update(auth.accountUuid, incomeInfo)
        .then((response) => {
            console.log("response: ", response);
            navigate('/signup/goals')
        }).catch((error) => {
            console.error("Error: ", error);
            setErrorMsg(error)
        });
    }

    const add = () => {
        let currentIncomes = [...incomes]
        currentIncomes.push({
            id: 0,
            uuid: "",
            payType: "",
            payPeriod: "",
            payPeriodNetAmount: 0,
            yearlyTotal: 0,
            companyName: "",
            position: "",
            nextPayDay: "",
            startDate: "",
            endDate: ""
        })
        setIncomes(currentIncomes);
    }

    const remove = (index) => {
        console.log("remove income at index: "+index)
        let currentIncomes = [...incomes]

        currentIncomes = currentIncomes.filter((income, i) => {
            if(index!==i){
                return true
            }
            return false
        });
        setIncomes(currentIncomes);
    }

    const goBack = () => {
        navigate('/signup/profile')
    }

    return (
        <>
        <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="row">
                            <div className="col-sm-10 col-12">
                                <h2>Your Income</h2>
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
                        <div className="row">
                            <div className="col-12">
                                {incomes.map((income, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-sm-4 col-12">
                                                    <div className="mb-3">
                                                        <label  className="form-label">Company Name</label>
                                                        <input 
                                                        id="companyName"
                                                        name="companyName"
                                                        value={income.companyName || ''}
                                                        onChange={(e)=>handleUserInputChange(e,index)}
                                                        required
                                                        className="form-control" 
                                                        placeholder="Delta"/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <div className="mb-3">
                                                        <label  className="form-label">Pay Period Net Amount</label>
                                                        <input 
                                                        id="payPeriodNetAmount"
                                                        name="payPeriodNetAmount"
                                                        type="number"
                                                        value={income.payPeriodNetAmount || ''}
                                                        onChange={(e)=>handleUserInputChange(e,index)}
                                                        required
                                                        className="form-control" 
                                                        placeholder="1500"/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <div className="mb-3">
                                                        
                                                        <label  className="form-label">Pay Period Type</label>
                                                        <select 
                                                            name="payPeriod"
                                                            value={income.payPeriod || ''} 
                                                            onChange={(e)=>handleUserInputChange(e,index)}
                                                            className="form-select" 
                                                            aria-label="Default select example">
                                                            <option value=""></option>
                                                            <option value="BI_WEEKLY">Bi Weekly/Every 2 weeks</option>
                                                            <option value="SEMI_MONTHLY">Twice a Month</option>
                                                            <option value="WEEKLY">Weekly</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-4 col-12">
                                                    <div className="mb-3">
                                                        <label  className="form-label">Pay Type</label>
                                                        <select 
                                                            name="payType"
                                                            value={income.payType || ''} 
                                                            onChange={(e)=>handleUserInputChange(e,index)}
                                                            className="form-select" 
                                                            aria-label="Default select example">
                                                            <option value=""></option>
                                                            <option value="HOURLY">Hourly</option>
                                                            <option value="SALARY">Salary</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 col-12">
                                                    <div className="mb-3">
                                                        <label  className="form-label">Your Position</label>
                                                        <input 
                                                        id="yourPosition"
                                                        name="position"
                                                        value={income.position || ''}
                                                        onChange={(e)=>handleUserInputChange(e,index)}
                                                        required
                                                        className="form-control" 
                                                        placeholder=""/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 col-12">
                                                    <div className="mb-3">
                                                        <label  className="form-label">Next Pay Day</label>
                                                        <input 
                                                        id="nextPayDay"
                                                        name="nextPayDay"
                                                        type="date"
                                                        value={income.nextPayDay || ''}
                                                        onChange={(e)=>handleUserInputChange(e,index)}
                                                        required
                                                        className="form-control" 
                                                        placeholder=""/>
                                                    </div>
                                                </div>
                                                {
                                                    (index !== incomes.length-1) &&
                                                    <div className="col-sm-1 col-1">
                                                        <div className="mt-4 addRemoveBtn">
                                                            <button onClick={()=>remove(index)} type="button" className="btn btn-danger">-</button>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    (index === incomes.length-1 && incomes.length <= 4) &&
                                                    <div className="col-sm-1 col-1">
                                                        <div className="mt-4 addRemoveBtn">
                                                            <button onClick={()=>add()} type="button" className="btn btn-primary">+</button>
                                                        </div>
                                                    </div>
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
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

export default SignUpIncome;