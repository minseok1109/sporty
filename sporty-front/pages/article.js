import { useState } from "react";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { faker } from "@faker-js/faker";

const mock = new AxiosMockAdapter(axios);
const sports = ["농구", "축구", "야구", "볼링", "테니스"];
const posts = [...Array(23)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: setIndex,
    name: faker.name.fullName(),
    location: faker.address.cityName(),
    content: faker.lorem.lines(2),
    sport: sports[Math.floor(Math.random() * sports.length)],
  };
});

mock.onGet("/posts").reply(() => {
  try {
    const results = posts;
    return [200, results];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

const Article = () => {
  const [posts, setPosts] = useState([]);
  const [inputData, setInputData] = useState("");

  const list_items = posts?.map((post) => (
    <div key={post.id} className="test">
      <ul>
        <li>{post.name}</li>
        <li>{post.sport}</li>
        <li>{post.location}</li>
      </ul>
      <p>{post.content}</p>
      <style jsx>{`
        div {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  ));

  async function mockData() {
    let testData = await axios.get("/posts");
    setPosts(testData.data);
  }
  mockData();

  const getInputData = (input) => {
    setInputData(input);
  };
  const onSearch = () => {};

  return (
    <div>
      <ul>{list_items}</ul>
    </div>
  );
};
export default Article;
