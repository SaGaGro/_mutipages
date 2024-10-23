import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Todo from "./pages/Todo/Todo";
import Home from "./pages/Home/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import Layout from "./layouts/Layout/Layout";
import Calculator from "./pages/Calculator/Calculator";
import Products from "./pages/Products/Products";
import Carts from "./pages/Carts/Carts";
import Component from "./pages/Component/Component";
import Animation from "./pages/Animation/Animation";

import "./App.css";
import { fetchProducts } from "./data/products";
import Login from "./Login/Login";

const intTab = "home";

function App() {
  const [products, setProducts] = useState([]);

  const [carts, setCarts] = useState([]);

  const [token, setToken] = useState("");


  useEffect(() => {
    setProducts(fetchProducts());
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const [tap, setTab] = useState("");

  useEffect(() => {
    setTab(intTab);
  }, []); //first load

  if (token === "") {
    return <Login setToken={setToken}></Login>;
  } else {
    return (
      <div className="app-container">
        {/* <h1>Mutipages</h1> */}
        <HashRouter>
          <Routes>
            <Route
              element={
                <Layout
                  products={products}
                  carts={carts}
                  tab={tap}
                  setTab={setTab}
                  setToken={setToken}
                ></Layout>
              }
            >
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/home" element={<Home></Home>}></Route>
              <Route
                path="/calculator"
                element={<Calculator></Calculator>}
              ></Route>
                <Route
                path="/animation"
                element={<Animation></Animation>}
              ></Route>
              <Route
                path="/component"
                element={<Component></Component>}
              ></Route>
              <Route
                path="/products"
                element={
                  <Products
                    products={products}
                    carts={carts}
                    setCarts={setCarts}
                  ></Products>
                }
              ></Route>
              <Route
                path="/carts"
                element={<Carts carts={carts} setCarts={setCarts}></Carts>}
              ></Route>
              <Route path="/todo" element={<Todo></Todo>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
            </Route>
          </Routes>
        </HashRouter>
        {/* <Todo></Todo> */}
      </div>
    );
  }
}
//   return (
//     <div className='app-container'>
//       {/* <h1>Mutipages</h1> */}
//       <HashRouter>
//         <Routes>
//           <Route element={<Layout products={products} carts={carts} tab={tap} setTab={setTab}></Layout>}>
//             <Route path="/" element={<Home></Home>}></Route>
//             <Route path="/home" element={<Home></Home>}></Route>
//             <Route path="/calculator" element={<Calculator></Calculator>}></Route>
//             <Route path="/component" element={<Component></Component>}></Route>
//             <Route path="/products" element={<Products products={products} carts={carts} setCarts={setCarts}></Products>}></Route>
//             <Route path="/carts" element={<Carts carts={carts} setCarts={setCarts}></Carts>}></Route>
//             <Route path="/todo" element={<Todo></Todo>}></Route>
//           </Route>
//         </Routes>
//       </HashRouter>
//       {/* <Todo></Todo> */}
//     </div>
//   )
// }

export default App;
