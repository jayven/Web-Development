"use strict";
const recipeList = {
    "36":{
        recipeId: "36",
        author: "Kiki",
        title: "Boston Cream Cake",
        ingredients: `1 box instant vanilla pudding mix, 
                      2 c. cold milk, 1 store-bought angel food cake, 
                      3/4 c. heavy cream, 
                      1.5 c. semisweet chocolate chips`,
        instructions: `1. Make pudding: In a large bowl, whisk together pudding mix and milk until thick, 3 minutes." +
                       2. Slice angel food cake in half lengthwise and spread a thick layer of pudding on top of the bottom half (you'll have about 1/4 of the batch of pudding left, depending on the size of your cake). Top with angel food cake top.
                       3. Make ganache: In a small saucepan over low heat, heat heavy cream just until it bubbles. Place chocolate chips in a heatproof bowl and pour over hot heavy cream. Let sit 5 minutes, then whisk until smooth and no clumps remain.
                       4. Pour ganache over angel food cake until top layer is covered.
                       5. Let cake set for 10 minutes before slicing.`
    },

    "22":{
        recipeId: "22",
        author: "Jessie",
        title: "Marshmallow Fruit Dip",
        ingredients: `2 (8-oz.) blocks cream cheese, softened,
                      1 (7.5-oz.) jar marshmallow crème,
                      Juice of 1 orange (about 3 tbsp.),
                      Assorted fruit, for serving`,
        instructions:`In a large bowl using a hand mixer, beat together cream cheese and marshmallow crème until no lumps remain, then stir in orange juice. 
                      Refrigerate until ready to serve, at least 1 hour. Serve with fruit.`
    },

    "57":{
        recipeId: "57",
        author: "Jason",
        title: "Three Ingredient Matzo Pie Crust",
        ingredients: `4 sheets egg matzo,
                      1 stick melted butter,
                      1 teaspoon salt`,
        instructions: `1. Preheat oven to 350 degrees.
                       2. Place the matzo in the blender and blend to a sand-like texture.
                       3. Add the rest of the ingredients and blend to form the dough.
                       4. Press and form on a pie dish.
                       5. Bake on the middle rack for 15 minutes. Watch to make sure it does not burn. 
                       6. Remove from the oven and fill with quiche filling, pie filling, or whatever recipe you want.`
    }

};

function addRecipe({ recipeId, title, author, ingredients, instructions }) {
    recipeList[recipeId] = { recipeId, title, author, ingredients, instructions };
}

function getRecipeInfo() {
    let recipeInfo = [];
    for ( const id in recipeList ) {
        recipeInfo.push({
            "recipeId": `${recipeList[id].recipeId}`,
            "title": `${recipeList[id].title}`,
            "author": `${recipeList[id].author}` });
    }
    return recipeInfo;
}

const recipes = {
    recipeList,
    addRecipe,
    getRecipeInfo,
}

module.exports = recipes;