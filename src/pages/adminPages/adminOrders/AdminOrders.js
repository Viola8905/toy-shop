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
import { Button, Form, Modal } from "react-bootstrap";

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
  const [orderStatus, setOrderStatus] = useState({
    status: "",
    pay_status: "",
    id: "",
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
  // console.log(orders);
  const handleChangeSelect1 = (e) => {
    setOrderStatus({ ...orderStatus, status: e.target.value });
  };
  const handleChangeSelect2 = (e) => {
    setOrderStatus({ ...orderStatus, pay_status: e.target.value });
  };

  // console.log(orderStatus);
  function setEdited(order) {
    setOrderStatus({
      pay_status: order.pay_status,
      status: order.status,
      id: order.id,
    });
  }

  const submitEdits = async (orderStatus) => {
    try {
      const responce = await axios.post(
        `${process.env.REACT_APP_BASE_URL}admin/orders/${orderStatus.id}`,
        { status: orderStatus.status, pay_status: orderStatus.pay_status },
        {
          headers: { sanctum: `${localStorage.getItem("token")}` },
        }
      );
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <div>
      <BackBtn />
      <div className="" style={{width:"50%",margin:"0 auto"}}>
        <div>
          <h2>
            #id:
            {orderStatus.id}
          </h2>
        </div>
        <Form.Select
          aria-label="Default select example"
          value={orderStatus.status}
          onChange={handleChangeSelect1}
        >
          <option value="">Оберіть спосіб оплати</option>
          <option value="needs_confirmation">Очікує підтвердження</option>
          <option value="processing">Обробляється</option>
          <option value="arriving">В дорозі</option>
          <option value="done">Виконано</option>
        </Form.Select>
				<br />
        <Form.Select
          aria-label="Default select example"
          value={orderStatus.pay_status}
          onChange={handleChangeSelect2}
        >
          <option value="">Оберіть статус оплати</option>
          <option value="paid">Оплачено</option>
          <option value="not_paid">Не оплачено</option>
        </Form.Select>
				<br/>
        <Button onClick={()=> submitEdits(orderStatus)}>Редаувати</Button>
      </div>

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
                <StyledTableCell align="center" style={{ display: "flex" }}>
                  <div
                    onClick={() => {
                      setOrder3(order);
                      setModalShow3(true);
                    }}
                  >
                    Оплата
                  </div>
                  <img
                    src="https://cdn0.iconfinder.com/data/icons/aami-web-internet/64/simple-59-256.png"
                    style={{
                      width: "30px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    alt=""
                    onClick={() => setEdited(order)}
                  />
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
                <StyledTableCell align="center" style={{ display: "flex" }}>
                  <div>
                    {order.status === "needs_confirmation"
                      ? "Очікує підтвердження"
                      : order.status === "processing"
                      ? "Обробляється"
                      : order.status === "arriving"
                      ? "В дорозі"
                      : "Виконано"}
                  </div>
                  <img
                    src="https://cdn0.iconfinder.com/data/icons/aami-web-internet/64/simple-59-256.png"
                    style={{
                      width: "30px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    alt=""
                    onClick={() => setEdited(order)}
                  />
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
