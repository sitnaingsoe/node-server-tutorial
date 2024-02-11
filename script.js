const BtnTag = document.getElementById("menu-btn");
const menuContainerTag = document.getElementById("menu-container");

const createMenu = async () => {
  try {
    const name = document.querySelector("input[name=name]");
    const price = document.querySelector("input[name=price]");

    const menu = {
      name: name.value,
      price: price.value,
    };
    const response = await fetch("http://localhost:2000/menus", {
          method: "POST",
          body: JSON.stringify(menu),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
    
      if(name.value){
       
      data.forEach((item) => {
        ulTag.innerHTML = `<li>${item.name} <button onclick = deleteMenu(${item.id}) id = ${item.id}>Delete</button></li>`;
        menuContainerTag.append(ulTag);
      });
      }
    

    name.value = "";
    price.value = "";
  } catch (error) {
    console.log("Error ", error);
  }
};

BtnTag.addEventListener("click", createMenu);
