import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../layout/header";
import Footer from "../../../layout/footer";
import GoalApi from "../../../api/GoalApi";
import GoalGraphQL from "../../../graphql/GoalGraphQL";
import Auth from "../../../components/auth/auth";

function SignUpGoals() {

    let navigate = useNavigate();

    const [goals, setGoals] = useState([{
        id: 0,
        uuid: "",
        title: "",
        description: "",
        targetAmount: 0,
        currentAmount: 0,
        amountPerPaycheck: 0,
        deadline: ""
    }]);

    const [errorMsg, setErrorMsg] = useState("");
    const [total, setTotal] = useState(0);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        console.log("SignUpGoals")

        setAuth(Auth.getAuth())

        GoalGraphQL.getGoals()
        .then((response) => {
            // console.log("response: ", response);
            let savedGoals = response?.data?.data?.goals
            console.log("savedGoals: ", savedGoals);

            if(savedGoals.length > 0){
                setGoals(savedGoals)
                calculateTotal(savedGoals)
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
        let currentGoals = [...goals]

        let goal = currentGoals[index]
        goal[name] = value
        currentGoals[index] = goal
        setGoals(currentGoals);

        calculateTotal(currentGoals)
    };

    const calculateTotal = (currentGoals) => {
        let count = currentGoals.length;
        let currentTotal = 0;
        for (let i = 0; i < count; i++) {
            try {
                let num = parseFloat(currentGoals[i].targetAmount)
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
        let userGoals = [...goals]
        

        GoalApi.update(auth.accountUuid, userGoals)
        .then((response) => {
            console.log("response: ", response);
            navigate('/signup/expenses')
        }).catch((error) => {
            console.error("Error: ", error);
            setErrorMsg(error)
        });
    }

    const addGoal = () => {
        let currentGoals = [...goals]
        currentGoals.push({
            uuid: "",
            title: "",
            description: "",
            targetAmount: 0,
            currentAmount: 0,
            deadline: ""
        })
        setGoals(currentGoals);
    }

    const removeGoal = (index) => {
        // console.log("remove goal at index: "+index)
        let currentGoals = [...goals]

        currentGoals = currentGoals.filter((goal, i) => {
            if(index!==i){
                return true
            }
            return false
        });

        // currentGoals.splice(index,1);
        setGoals(currentGoals);
    }

    const goBack = () => {
        navigate('/signup/income')
    }

    return (
        <>
        <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="row">
                            <div className="col-sm-10 col-12">
                                <h2>Your Goals</h2>
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
                        {goals.map((goal, index) => (
                            <div className="row" key={index}>
                                <div className="col-sm-4 col-12">
                                    <div className="mb-3">
                                        <label  className="form-label">Name</label>
                                        <input 
                                        id="title"
                                        name="title"
                                        autoComplete="title"
                                        value={goal.title || ''}
                                        onChange={(e)=>handleUserInputChange(e,index)}
                                        required
                                        className="form-control" 
                                        placeholder="Savings"/>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-12">
                                    <div className="mb-3">
                                        <label  className="form-label">Target Amount</label>
                                        <input 
                                        id="targetAmount"
                                        name="targetAmount"
                                        type="number"
                                        value={goal.targetAmount || ''}
                                        onChange={(e)=>handleUserInputChange(e,index)}
                                        required
                                        className="form-control" 
                                        placeholder="10000"/>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-12">
                                    <div className="mb-3">
                                        <label  className="form-label">Deadline</label>
                                        <input 
                                        id="deadline"
                                        name="deadline"
                                        type="date"
                                        value={goal.deadline || ''}
                                        onChange={(e)=>handleUserInputChange(e,index)}
                                        required
                                        className="form-control" 
                                        placeholder=""/>
                                    </div>
                                </div>
                                {
                                    index !== goals.length-1 &&
                                    <div className="col-sm-1 col-2">
                                        <div className="mt-4 addRemoveBtn">
                                            <button onClick={()=>removeGoal(index)} type="button" className="btn btn-danger">-</button>
                                        </div>
                                    </div>
                                }
                                {
                                    (index === goals.length-1 && goals.length <= 4) &&
                                    <div className="col-sm-1 col-2">
                                        <div className="mt-4 addRemoveBtn">
                                            <button onClick={()=>addGoal()} type="button" className="btn btn-primary">+</button>
                                        </div>
                                    </div>
                                }
                                
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

export default SignUpGoals;