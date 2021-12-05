const url = 'http://localhost:3000/api/products';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


let product;
//=====================================================Afficher le produit sélectionné
function generateProductHTML(product) {
  const img = document.createElement("img");
  img.src = `${product.imageUrl}`;
  img.setAttribute("alt", `image ${product.name}`);
  document.querySelector('.item__img').appendChild(img);
  document.getElementById('title').innerText = `${product.name}`;
  document.getElementById('price').innerText = `${product.price}`;
  document.getElementById('description').innerText = `${product.description}`;

  product.colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.innerText = `${color}`;
    document.getElementById('colors').appendChild(option);
  });
};

fetch(`${url}/${id}`)
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    generateProductHTML(data);
    product = data;
  })
  // .then(cartHTML)
  .catch(function (error) {
    console.log(error)
  });


// const elt = document.getElementById('addToCart');    // On récupère l'élément sur lequel on veut détecter le clic
// elt.addEventListener('click', function (event) {    // On écoute l'événement click, notre callback prend un paramètre que nous avons appelé event ici
//   event.preventDefault();                          // On utilise la fonction preventDefault de notre objet event pour empêcher le comportement par défaut de cet élément lors du clic de la souris
//   console.log(product);
//   const products = JSON.parse(localStorage.getItem('products')) || [];
// if(index === -1) {
//   products.push(addproduct);
// } else {
//   products[index] 
// }
let btnAdd = document.querySelector('#addToCart');
btnAdd.addEventListener("click", function () {

  let name = document.querySelector('#title').innerText;
  let description = document.querySelector('#description').innerText;
  let image = document.querySelector('.item__img');
  let color = document.querySelector('#colors')
  // let nb = parseInt(document.getElementById('quantity').value);
  let price = parseInt(document.querySelector('#price').innerText);
  let products = JSON.parse(localStorage.getItem('products')) || [];
  let productIndex = products.findIndex(function (element) {
    console.log(element.price);
    return element.id === id;
  })
  console.log(productIndex);
  console.log(products);
  console.log(products[productIndex]);
  if (productIndex === -1) {
    products.push({
      id: id,
      image: image,
      price: price,
      name: name,
      description: description,
      color: color,
      count: 1
    })
  } else {
    products[productIndex] = {
      id: id,
      image: image,
      price: price,
      name: name,
      description: description,
      color: color,
      count: products[productIndex].count + 1
    }
  }
  console.log(products);
  localStorage.setItem('products', JSON.stringify(products));

  let Total = products.reduce(function (prev, cur) {
    console.log(prev);
    console.log(cur);
    return prev + cur.count;
  }, 0)
  console.log(Total);
  document.querySelector('#quantity').innerHTML = Total;
  localStorage.setItem('number', Total)

  alert(name + " (" + color + ") a été ajouté au panier !");

});








// const elt = document.getElementById('addToCart');    // On récupère l'élément sur lequel on veut détecter le clic
// elt.addEventListener('click', function (event) {    // On écoute l'événement click, notre callback prend un paramètre que nous avons appelé event ici
//   event.preventDefault();                          // On utilise la fonction preventDefault de notre objet event pour empêcher le comportement par défaut de cet élément lors du clic de la souris
//   console.log(product);
//   const nb = parseInt(document.getElementById('quantity').value);
//   const addproduct = { ...product, number: nb };
//   const products = JSON.parse(localStorage.getItem('products')) || [];
//   const index = products.map(function (one) {
//     return one.id;
//   }).indexOf(product.id);
//   if (index === -1) {
//     products.push(addproduct);
//   } else {
//     products[index] = { ...products[index], number: products[index].number + nb }
//   } 
//   localStorage.setItem('products', JSON.stringify(products));
// });
