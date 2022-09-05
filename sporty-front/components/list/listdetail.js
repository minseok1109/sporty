import classes from './listdetail.module.css'


function ListDetail(props) {
    return (
        <section className={classes.detail}>
            <h1>{props.title}</h1>
            <address>
                {props.address}
            </address>
            <p>{props.description}</p>
        </section>
    );
}

export default ListDetail;