import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import data from "./data.js";
import Detail from "./routes/Detail.js";
import Cart from "./routes/Cart.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

function App(props) {
  // useEffect(() => {
  //   localStorage.setItem("watched", JSON.stringify([]));
  // }, []);

  let [shoes, setShoes] = useState(data);
  let [btn, setBtn] = useState(2);
  let [btnState, setBtnState] = useState(true);
  let navigate = useNavigate();

  let result = useQuery("작명", () =>
    axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      return a.data;
    })
  );

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="Navbar_name">HIVER</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link href="#pricing">마이페이지</Nav.Link>
            <Nav className="ms-auto">
              {result.error && "에러남"}
              {result.isLoading && "로딩중"}
              {result.data && result.data.name}
            </Nav>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main_bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map(function (a, i) {
                    return (
                      <div className="col-md-4">
                        <Item shoes={shoes[i]} i={i + 1}></Item>
                      </div>
                    );
                  })}
                </div>
              </div>
              {btnState == true ? (
                <button
                  onClick={() => {
                    axios
                      .get(
                        "https://codingapple1.github.io/shop/data" +
                          btn +
                          ".json"
                      )
                      .then((result) => {
                        let copy = [...shoes, ...result.data];
                        setShoes(copy);
                        setBtn(btn + 1);

                        if (btn == 3) {
                          setBtnState(false);
                        }
                      })
                      .catch(() => {
                        console.log("실패");
                      });
                  }}
                >
                  더보기
                </button>
              ) : null}
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
function Item(props) {
  let navigate = useNavigate();
  return (
    <div className="item">
      {" "}
      <img
        onClick={() => {
          navigate("/detail/" + (props.i - 1));
        }}
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
      <p>{props.shoes.content}</p>
    </div>
  );
}
function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  );
}
function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}
export default App;
