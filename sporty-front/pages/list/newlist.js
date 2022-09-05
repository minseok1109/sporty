import NewListForm from '../../components/list/newlistform';

function NewListPage() {
    function addListHandler(enteredListData) {

    }

    return <NewListForm onAddList={addListHandler} />
}

export default NewListPage;