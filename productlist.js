const url = "https://kea-alt-del.dk/t7/api/products";
//When we get response - return to Json
fetch (url)
      .then(function(res) {
          return res.json();
      })
      .then(function(data){
          handleProductlist(data);
      })

//Create function to handle Data
function handleProductlist(data){
          console.log(data);//array of objects -list of products
    //data.forEach(function(item){//callback 1 item/time
        //showProduct(item);//show the product pass the item
    data.forEach(showProduct);//for each objects on the list -show product
}


function showProduct(product) {
    console.log(product);//product=forEach
    //grab the template
const template = document.querySelector("#smallProductTemplate").content;

    //clone it - elements copied make a clone incl.all child 
const copy = template.cloneNode(true);

//change content
const imgUrl = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`; 
copy.querySelector("img").src = imgUrl;

copy.querySelector(".subtle").textContent = `${product.articletype} | ${product.brandname}`;

copy.querySelector("h3").textContent = product.productdisplayname;
/* copy.querySelector(".price").textContent = product.price + " kr"; */
copy.querySelector(".price").textContent = `${product.price} kr`;

//condition
if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  
}
//if discount default no

if (product.discount) {
    const oldPrice = product.price;
    const percentage = product.discount;
    const newPrice = ( 100 - percentage ) * oldPrice / 100;
    copy.querySelector("article").classList.add("onSale");
    copy.querySelector(".percentage").textContent = `${product.discount} % `;
    copy.querySelector(".discountedPrice").textContent = `Now ${newPrice} kr`;

}
/*Change the price
<div class="discounted">
            <p>Now 350,95 kr</p>
            <p>-30%</p>
        </div>*/ 
//copy.querySelector("discounted p").textContent = product.price/product.discount;
    //grab parent
const parent = document.querySelector("main");
    //append - new child called COPY
parent.appendChild(copy);
}