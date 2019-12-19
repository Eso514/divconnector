var furnitures = [];

export let get_global = furnitures;

export let set_global = function(a){
    furnitures = [...furnitures, a];
    console.log(furnitures);
}
