import { useRef } from 'react';
import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

function NewListForm(props) {
    const typeInputRef = useRef();
    const dateInputRef = useRef();
    const addressInputRef = useRef();
    const recruitInputRef = useRef();


    function submitHandler(event) {
        event.preventDefault();

        const enteredType = typeInputRef.current.value;
        const enteredDate = dateInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredRecruit = recruitInputRef.current.value;


        const listData = {
            type: enteredType,
            date: enteredDate,
            address: enteredAddress,
            recruit: enteredRecruit,

        };

        props.onAddList(listData);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="type">종목</label>
                    <input type="text" required id='type' ref={typeInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="date">날짜</label>
                    <input type="date" required id='date' ref={dateInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="address">장소</label>
                    <input type="address" required id='address' ref={addressInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="type">신청인원</label>
                    <input type="text" required id='recruit' ref={recruitInputRef} />
                </div>

                <div className={classes.control}>
                    <label htmlFor='description'>설명</label>
                    <textarea id='description'
                        required
                        rows='5'
                        ref={recruitInputRef}
                    ></textarea>
                </div>
                <div className={classes.actions}>
                    <button>신청하기</button>
                </div>
            </form>
        </Card>
    );
}

export default NewListForm;