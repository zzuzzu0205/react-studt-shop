import { Table } from "react-bootstrap";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "./../store/userSlice.js";
import { addItem, removeItem, delItem } from "../store.js";

let Child = memo(function () {
  console.log("재랜더링됨");
  return <div>자식임</div>;
});

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);

  return (
    <div>
      <Child count={count}></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(increase(100));
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map(function (a, i) {
            return (
              <tr>
                <td>{state.cart[i].id}</td>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addItem(state.cart[i].id));
                    }}
                  >
                    +
                  </button>
                  <button>{state.cart[i].count}</button>
                  <button
                    onClick={() => {
                      dispatch(removeItem(state.cart[i].id));
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(delItem(state.cart[i].id));
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
