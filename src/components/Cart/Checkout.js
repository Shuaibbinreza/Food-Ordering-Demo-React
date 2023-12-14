import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length !== 4;
function Checkout(props) {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef('');
    const streetInputRef = useRef('');
    const postalInputRef = useRef('');
    const cityInputRef = useRef('');

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const cityIsValid = !isEmpty(enteredCity);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalIsValid = !isNotFiveChars(enteredPostal);
        
        setFormInputValidity({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postalCode: postalIsValid
        });

        const formIsValid = nameIsValid
            && cityIsValid && postalIsValid
            && streetIsValid;
        
        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            city: enteredCity, 
            street: enteredStreet,
            postalCode: enteredPostal
        });
    };

    const nameControlClasses = `${classes.control} ${
        formInputValidity.name ? '' : classes.invalid
    }`;
    const streetControlClasses = `${classes.control} ${
        formInputValidity.street ? '' : classes.invalid
    }`;
    const postalCodeControlClasses = `${classes.control} ${
        formInputValidity.postalCode ? '' : classes.invalid
    }`;
    const cityControlClasses = `${classes.control} ${
        formInputValidity.city ? '' : classes.invalid
    }`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputValidity.name && <p>Enter Valid Name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef}/>
                {!formInputValidity.street && <p>Enter Valid Street Name</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalInputRef} />
                {!formInputValidity.postalCode && <p>Enter Valid Postal Code</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputValidity.city && <p>Enter Valid City</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;
