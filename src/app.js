/*
  Función lógica de la página principal
  -consumo de api
  -despliegue de los productos
*/



const search = document.getElementById("search");
const url = "https://nodejs-bsale-api.herokuapp.com";

search.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    divProducts.innerHTML = "";
    fetchSomeProduct(e.target.value);
  }
});

const apiSearch = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((prod) => {
        printProduct(prod);
      });
    });
};

/* FETCH DATA*/
export const fetchProductsData = () => {
  let changeableUrl = url;
  try {
    apiSearch(changeableUrl);
  } catch (error) {
    console.log(error);
  }
};

export const fetchSomeProduct = (nameToSearch) => {
  let changeableUrl = url;

  if (nameToSearch) {
    const name = encodeURIComponent(nameToSearch);
    changeableUrl = `${url}/product/search/${name}`;
  }
  try {
    apiSearch(changeableUrl);
  } catch (error) {
    console.log(error);
  }
};

/* SCREEN  - Función que renderiza los elementos en index.html fetcheados desde la API */
const printProduct = (prod) => {
  const product = `
      <li class="product-content">
          <div class="product">
              <a href="#">
                  <img
                      ngIf="prod"
                      src="${
                        prod.url_image
                          ? prod.url_image
                          : "./assets/imagen-no-disponible.png"
                      }"
                      alt="product${prod.id}" />
              </a>
              <hr>
            <div class="product-name">
                <a id="productName" value="${prod.id}" href="">
                  ${prod.name}
                </a>
            </div>
              <div class="product-price">
                <div> $ ${prod.price} </div>
                   <button class="btn-cart"><i class="bi bi-cart-plus"></i></button>
              </div>
          </div>

      </li>

  `;
  divProducts.insertAdjacentHTML("beforeend", product);
};

fetchProductsData();
