
import MainList from "../../components/list/mainlist";

const DUMMY_LISTS = [
    {
        id: 'm1',
        type: '축구',
        date: '2022-08-01',
        address: '강원대학교 대운동장',
        recruit: '4',
        apply: '2'

    },
    {
        id: 'm2',
        type: '농구',
        date: '2022-08-02',
        address: '강원대학교 농구장',
        recruit: '3',
        apply: '1'

    }

];


function HomePage() {
    return <MainList lists={DUMMY_LISTS} />

}

export default HomePage;