// import Footer_li from "./Footer_li";

export default function Footer() {
  const service_arr = ["공지사항", "자주묻는 질문", "고객센터"];
  const company_arr = ["회사소개", "채용", "블로그", "공고"];
  const question_arr = ["사업 제휴", "광고문의"];
  const center_arr = [
    "전화: 1599-0000",
    "이메일: support@sporty.com",
    "민원접수",
  ];
  return (
    <>
      <footer>
        <Footer_li title={"서비스"} list={service_arr} />
        <Footer_li title={"회사"} list={company_arr} />
        <Footer_li title={"문의"} list={question_arr} />
        <Footer_li title={"고객센터"} list={center_arr} />
      </footer>
      <style jsx>
        {`
          footer {
            width: 100%;
            height: 15.25rem;
            background-color: #a04955;
            display: flex;
            justify-content: space-around;
          }
        `}
      </style>
    </>
  );
}

function Footer_li({ title, list }) {
  const list_items = list.map((ele) => (
    <li className="test" key={ele.toString()}>
      {ele}
    </li>
  ));
  return (
    <div>
      <span>{title}</span>
      <ul>{list_items}</ul>
      <style jsx>{`
        div {
          color: white;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        span {
          font-size: 1.5rem;
        }
        .test {
          margin: 10px;
          padding: 0.625rem;
        }
      `}</style>
    </div>
  );
}
