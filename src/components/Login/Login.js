import React, {useState, useEffec, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
    //reducer combine states


    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    //last state snapshot
    const emailReducer = (state, action) => {
        //ehenever received as user input action
        if (action.type === 'USER_INPUT') {
            return {value: action.val, isValid: action.val.includes('@')}
        }
        if (action.type === 'INPUT_BLUR') {
            return {value: state.value, isValid: state.value.includes('@')}
        }

        return {value: '', isValid: false}
    };

    //initial state
    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false,});


    //will run these codes only set form is bvalid, enteredemail or password will run
    // useEffect(() => {
    //     //afetr 500 milisecond itworks keystroke
    //     const identifier = setTimeout(() => {
    //         setFormIsValid(
    //             enteredEmail.includes('@') && enteredPassword.trim().length > 6
    //         );
    //     }, 500);
    //     //cleanup process
    //     return () => {
    //         console.log('clean up');
    //         clearTimeout(identifier);
    //     };
    // }, [setFormIsValid, enteredEmail, enteredPassword]);


    const emailChangeHandler = (event) => {
        //action object
        dispatchEmail({type: 'USER_INPUT', val: event.target.value});

        setFormIsValid(
            event.target.value.includes('@') && enteredPassword.trim().length > 6
        );
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);

        setFormIsValid(
            event.target.value.trim().length > 6 && emailState.isValid
        );
    };

    const validateEmailHandler = () => {
        dispatchEmail({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, enteredPassword);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordIsValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
