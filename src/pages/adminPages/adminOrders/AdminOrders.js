import axios from "axios";
import React, { useEffect, useState } from "react";
import BackBtn from "../../../components/backBtn/BackBtn";
// material ui
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Modal } from "react-bootstrap";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// material ui
// modal window

function MyVerticallyCenteredModal1(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Замовлення #id{props.order.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <h3 className="">Загальна сума {props.order.total_price}$</h3>
          <hr />
          {props.order.items.map((item) => (
            <>
              <div className="">#id товару : {item.product.id}</div>
              <div className="">назва товару: {item.product.name}</div>
              <div className="">кількість: {item.count}</div>
              <div className="">вартість за 1: {item.product.price}$</div>
              <hr />
            </>
          ))}
        </p>
      </Modal.Body>
    </Modal>
  );
}
function MyVerticallyCenteredModal2(props) {
  //дані отримувача
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Замовлення #id{props.order.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <div className="">ім'я : {props.order.receiver.name}</div>
          <div className="">пошта: {props.order.receiver.email}</div>
          <div className="">номер телефону: {props.order.receiver.phone}</div>
          <div className="">адреса: {props.order.receiver.address}</div>
        </p>
      </Modal.Body>
    </Modal>
  );
}

function MyVerticallyCenteredModal3(props) {
  //дані отримувача
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Замовлення #id{props.order.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <div>
            <span style={{ fontWeight: "700" }}>Спосіб оплати: </span>
            {props.order.pay_type === "online" ? "Онлайн" : "Офлайн"}
          </div>
          <div>
            <span style={{ fontWeight: "700" }}>Статус оплати: </span>
            {props.order.pay_status === "paid" ? "Оплачено" : "Не оплачено"}
          </div>
        </p>
      </Modal.Body>
    </Modal>
  );
}
// modal window

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [callback, setCallback] = useState(false);
  const [order, setOrder] = useState({
    id: 0,
    items: [
      {
        count: 0,
        product: {
          name: "",
          id: "",
          price: "",
        },
      },
    ],
  });
  const [order2, setOrder2] = useState({
    id: 0,
    receiver: { name: "", phone: "", address: "", email: "" },
  });
  const [order3, setOrder3] = useState({
    id: 0,
    pay_type: "",
    pay_status: "",
  });
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow3, setModalShow3] = React.useState(false);

  useEffect(() => {
    const Posts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}admin/orders`,
          {
            headers: { sanctum: `${localStorage.getItem("token")}` },
          }
        );

        setOrders(response.data.data);
      } catch (e) {
        console.log(`Error from useEffect: ${e}`);
      }
    };

    Posts();
  }, [callback]);

  return (
    <div>
      <BackBtn />

      <TableContainer component={Paper} style={{ margin: "100px 0 100px 0" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: "20px" }}>#id</StyledTableCell>
              <StyledTableCell align="center">Отримувач</StyledTableCell>
              <StyledTableCell align="center">Дані про оплату</StyledTableCell>
              <StyledTableCell align="center">Дані отримувача</StyledTableCell>
              <StyledTableCell align="center">Товари</StyledTableCell>
              <StyledTableCell align="center">Дата замовлення</StyledTableCell>
              <StyledTableCell align="center">Дата отримання</StyledTableCell>
              <StyledTableCell align="center">Статус</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell component="th" scope="row">
                  {order.id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {order.receiver.name}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setOrder3(order);
                    setModalShow3(true);
                  }}
                >
                  Оплата
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setOrder2(order);
                    setModalShow2(true);
                  }}
                >
                  Дані отримувача
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setOrder(order);
                    setModalShow(true);
                  }}
                >
                  Товари
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(order.created_at).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {order.arrived_at
                    ? new Date(order.arrived_at).toLocaleDateString()
                    : "немає"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {order.status === "needs_confirmation"
                    ? "Очікує підтвердження"
                    : order.status === "processing"
                    ? "Обробляється"
                    : order.status === "arriving"
                    ? "В дорозі"
                    : "Виконано"}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MyVerticallyCenteredModal1
        order={order}
        show={modalShow}
        onHide={() => setModalShow(!modalShow)}
      />
      <MyVerticallyCenteredModal2
        order={order2}
        show={modalShow2}
        onHide={() => setModalShow2(!modalShow2)}
      />
      <MyVerticallyCenteredModal3
        order={order3}
        show={modalShow3}
        onHide={() => setModalShow3(!modalShow3)}
      />
    </div>
  );
};

export default AdminOrders;
