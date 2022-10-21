/* const http = require("http");
const server = http.createServer((req, res) => {
  res.status = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello world");
});
const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server en el puerto:${PORT}`);
});
 */

const fs = require("fs");
const archivo = "productos.txt";
const express = require("express");
const PORT = 8080;
const app = express();

class Contenedor {
  constructor(title, price, thumbail) {
    this.title = title;
    this.price = price;
    this.thumbail = thumbail;
  }
  getAll = async () => {
    try {
      const readContent = await fs.promises.readFile(archivo, "utf-8");
      const products = JSON.parse(readContent);
      return products;
    } catch (error) {
      console.log("No se pudo leer el archivo: ", error);
    }
  };
  save = async (product) => {
    try {
      if (fs.existsSync(archivo)) {
        const content = await this.getAll();
        const lastId = content.length;
        let newProduct = {
          id: lastId + 1,
          ...product,
        };
        content.push(newProduct);
        await fs.promises.writeFile(archivo, JSON.stringify(content, null, 2));
        return lastId + 1;
      } else {
        const newProduct = {
          id: 1,
          ...product,
        };
        await fs.promises.writeFile(
          archivo,
          JSON.stringify([newProduct], null, 2)
        );
        return 1;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
let contenedor = new Contenedor(archivo);
let product1 = new Contenedor("papas", 150, "https://asdasd.jpg");
let product2 = new Contenedor("cebolla", 330, "https://qweqwe.jpg");
let product3 = new Contenedor("tomate", 200, "https://zxczxc.jpg");

method = async () => {
  await contenedor.save(product1);
  await contenedor.save(product2);
  await contenedor.save(product3);
};
method();

app.get("/", (request, response) => {
  response.send(`<h1>Hello</h1>
  <p>redirección: /productos /productoRandom</p>
  `);
});

app.get("/productos", (req, res) => {
  fs.readFile(archivo, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    }
    res.send(data);
  });
});
app.get("/productoRandom", (req, res) => {
  fs.readFile(archivo, "utf-8", (error, data) => {
    let prods = JSON.parse(data);
    let random = parseInt(Math.random() * prods.length);
    res.send(prods[random]);
  });
});
const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
server.on("Error", (error) =>
  console.log(`Error en el servidor ${PORT}: ${error}`)
);
