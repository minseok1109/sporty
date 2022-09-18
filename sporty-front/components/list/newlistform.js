import { useRef } from 'react';
import Card from '@mui/material/Card';
import classes from './NewMeetupForm.module.css';
import TypeSelect from '../layout/TypeSelect';
import RecruitSelect from '../layout/RecruitSelect';
import StartTimeSelect from '../layout/StarttimeSelect';
import EndTimeSelect from '../layout/EndTimeSelect';


// 폼 데이터 제어
function NewListForm(props) {
    const typeInputRef = useRef();
    const dateInputRef = useRef();
    const addressInputRef = useRef();
    const recruitInputRef = useRef();
    const starttimeInputRef = useRef();
    const endtimeInputRef = useRef();


    function submitHandler(event) {
        event.preventDefault();

        const enteredType = typeInputRef.current.value;
        const enteredDate = dateInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredRecruit = recruitInputRef.current.value;
        const enteredStarttime = starttimeInputRef.current.value;
        const enteredEndtime = endtimeInputRef.current.value;


        const listData = {
            type: enteredType,
            date: enteredDate,
            address: enteredAddress,
            recruit: enteredRecruit,
            starttime: enteredStarttime,
            endtime: enteredEndtime,

        };

        props.onAddList(listData);
    }

    return (
        <Card>
            <h2>모집 글쓰기</h2>
            <hr></hr>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="type">운동 종목</label>

                    <TypeSelect type="text" required id='type' ref={typeInputRef}></TypeSelect>
                </div>
                <div className={classes.control}>
                    <label htmlFor="date">운동 날짜</label>
                    <input type="date" required id='date' ref={dateInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="address">운동 장소</label>
                    <input type="address" required id='address' ref={addressInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="type">모집 인원</label>

                    <RecruitSelect type="int" required id='recruit' ref={recruitInputRef} ></RecruitSelect>
                </div>
                <div className={classes.control}>
                    <label htmlFor="type">시작 시간</label>

                    <StartTimeSelect type="int" required id='starttime' ref={starttimeInputRef}></StartTimeSelect>

                    <label htmlFor="type">종료 시간</label>

                    <EndTimeSelect type="int" required id='endtime' ref={endtimeInputRef}></EndTimeSelect>
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